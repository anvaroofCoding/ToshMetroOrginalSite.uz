'use client'

import { Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

async function getPdfJs() {
	const pdfjs = await import('pdfjs-dist')

	if (!pdfjs.GlobalWorkerOptions.workerSrc) {
		pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`
	}

	return pdfjs
}

export function PdfDocumentViewer({
	src,
	className = '',
	messagesKey = 'openData.business',
}) {
	const t = useTranslations(messagesKey)
	const containerRef = useRef(null)
	const [pageImages, setPageImages] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	useEffect(() => {
		let cancelled = false

		async function renderPdf() {
			if (!src) return

			setLoading(true)
			setError(false)
			setPageImages([])

			try {
				const pdfjs = await getPdfJs()
				await new Promise(resolve => requestAnimationFrame(resolve))

				const loadingTask = pdfjs.getDocument({ url: src, withCredentials: false })
				const pdf = await loadingTask.promise
				const images = []
				const containerWidth = Math.max(
					containerRef.current?.clientWidth || 0,
					320,
				)

				for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
					if (cancelled) return

					const page = await pdf.getPage(pageNumber)
					const baseViewport = page.getViewport({ scale: 1 })
					const scale = Math.max(1, (containerWidth - 8) / baseViewport.width)
					const viewport = page.getViewport({ scale })
					const canvas = document.createElement('canvas')
					const context = canvas.getContext('2d')

					canvas.width = viewport.width
					canvas.height = viewport.height

					await page.render({
						canvasContext: context,
						viewport,
					}).promise

					images.push(canvas.toDataURL('image/png'))
				}

				if (!cancelled) {
					setPageImages(images)
				}
			} catch {
				if (!cancelled) {
					setError(true)
				}
			} finally {
				if (!cancelled) {
					setLoading(false)
				}
			}
		}

		renderPdf()

		return () => {
			cancelled = true
		}
	}, [src])

	return (
		<div ref={containerRef} className={`w-full bg-white ${className}`}>
			{loading ? (
				<div className='flex min-h-[240px] items-center justify-center py-12'>
					<div className='flex items-center gap-3 text-blue-800'>
						<Loader2 className='h-6 w-6 animate-spin' />
						<span>{t('loading')}</span>
					</div>
				</div>
			) : null}

			{error ? (
				<div className='px-6 py-10 text-center text-red-600'>
					{t('previewUnavailable')}
				</div>
			) : null}

			{!loading && !error
				? pageImages.map((imageSrc, index) => (
						<img
							key={`${src}-page-${index + 1}`}
							src={imageSrc}
							alt={`${t('documentPreview')} ${index + 1}`}
							className='block h-auto w-full'
							loading={index === 0 ? 'eager' : 'lazy'}
						/>
					))
				: null}
		</div>
	)
}
