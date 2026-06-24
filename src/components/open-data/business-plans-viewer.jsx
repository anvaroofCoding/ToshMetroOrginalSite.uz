'use client'

import { cn } from '@/lib/utils'
import {
	getDocumentProxyAbsoluteUrl,
	getDocumentProxyPath,
} from '@/lib/document-proxy'
import { PdfDocumentViewer } from '@/components/open-data/pdf-document-viewer'
import {
	ChevronDown,
	Download,
	Expand,
	FileText,
	Loader2,
	Shrink,
	X,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useMemo, useState } from 'react'

function isPdfFile(fileName = '') {
	return /\.pdf$/i.test(fileName)
}

function isOfficeFile(fileName = '') {
	return /\.(doc|docx)$/i.test(fileName)
}

function getOfficePreviewSrc(fileUrl, siteOrigin) {
	if (!fileUrl) return null

	const absoluteProxyUrl = getDocumentProxyAbsoluteUrl(fileUrl, siteOrigin)
	if (!absoluteProxyUrl) return null

	const host = siteOrigin ? new URL(siteOrigin).hostname : ''
	const isLocal =
		host === 'localhost' ||
		host === '127.0.0.1' ||
		host.startsWith('192.168.') ||
		host.startsWith('10.')

	if (isLocal) return null

	return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(absoluteProxyUrl)}`
}

function findFile(plans, fileId) {
	for (const plan of plans) {
		const file = plan.files?.find(item => item.id === fileId)
		if (file) return { plan, file }
	}
	return { plan: null, file: null }
}

export function BusinessPlansViewer({
	plans = [],
	isLoading,
	isError,
	messagesKey = 'openData.business',
}) {
	const t = useTranslations(messagesKey)
	const [expandedPlanIds, setExpandedPlanIds] = useState([])
	const [selectedFileId, setSelectedFileId] = useState(null)
	const [isExpandedView, setIsExpandedView] = useState(false)
	const [siteOrigin, setSiteOrigin] = useState('')

	useEffect(() => {
		setSiteOrigin(window.location.origin)
	}, [])

	const { plan: selectedPlan, file: selectedFile } = useMemo(
		() => findFile(plans, selectedFileId),
		[plans, selectedFileId],
	)

	useEffect(() => {
		if (!plans.length) {
			setExpandedPlanIds([])
			setSelectedFileId(null)
			return
		}

		const { file } = findFile(plans, selectedFileId)
		if (file) return

		const firstPlan = plans[0]
		const firstFile = firstPlan.files?.[0]
		setExpandedPlanIds([firstPlan.id])
		setSelectedFileId(firstFile?.id ?? null)
	}, [plans, selectedFileId])

	useEffect(() => {
		if (!isExpandedView) {
			document.body.style.overflow = ''
			return
		}

		document.body.style.overflow = 'hidden'

		const onKeyDown = event => {
			if (event.key === 'Escape') {
				setIsExpandedView(false)
			}
		}

		window.addEventListener('keydown', onKeyDown)
		return () => {
			document.body.style.overflow = ''
			window.removeEventListener('keydown', onKeyDown)
		}
	}, [isExpandedView])

	const togglePlan = useCallback(
		plan => {
			const isExpanded = expandedPlanIds.includes(plan.id)

			setExpandedPlanIds(prev =>
				isExpanded ? prev.filter(id => id !== plan.id) : [...prev, plan.id],
			)

			if (!isExpanded && plan.files?.length) {
				setSelectedFileId(plan.files[0].id)
			}
		},
		[expandedPlanIds],
	)

	const selectFile = useCallback((planId, fileId) => {
		setExpandedPlanIds(prev =>
			prev.includes(planId) ? prev : [...prev, planId],
		)
		setSelectedFileId(fileId)
		setIsExpandedView(false)
	}, [])

	const openExpandedView = useCallback(() => {
		setIsExpandedView(true)
	}, [])

	const closeExpandedView = useCallback(() => {
		setIsExpandedView(false)
	}, [])

	const pdfProxySrc =
		selectedFile && isPdfFile(selectedFile.file_name)
			? getDocumentProxyPath(selectedFile.file)
			: null

	const officePreviewSrc =
		selectedFile && isOfficeFile(selectedFile.file_name)
			? getOfficePreviewSrc(selectedFile.file, siteOrigin)
			: null

	const canExpand = Boolean(pdfProxySrc || officePreviewSrc)

	const documentPreview = pdfProxySrc ? (
		<PdfDocumentViewer src={pdfProxySrc} messagesKey={messagesKey} />
	) : officePreviewSrc ? (
		<iframe
			key={officePreviewSrc}
			src={officePreviewSrc}
			title={selectedFile?.file_name || t('documentPreview')}
			className='h-[80vh] w-full border-0'
			allowFullScreen
		/>
	) : null

	if (isLoading) {
		return (
			<div className='flex min-h-[420px] items-center justify-center rounded-2xl border border-blue-100 bg-white'>
				<div className='flex items-center gap-3 text-blue-800'>
					<Loader2 className='h-6 w-6 animate-spin' />
					<span>{t('loading')}</span>
				</div>
			</div>
		)
	}

	if (isError) {
		return (
			<div className='rounded-2xl border border-red-100 bg-red-50 px-6 py-10 text-center text-red-700'>
				{t('loadError')}
			</div>
		)
	}

	if (!plans.length) {
		return (
			<div className='rounded-2xl border border-dashed border-blue-200 bg-blue-50 px-6 py-10 text-center text-blue-800'>
				{t('empty')}
			</div>
		)
	}

	return (
		<div className='flex flex-col gap-4 lg:flex-row lg:items-start'>
			<aside className='lg:w-80 lg:shrink-0 lg:sticky lg:top-24'>
				<div className='rounded-2xl border border-blue-100 bg-white p-3 shadow-sm'>
					<p className='mb-3 px-2 text-xs font-semibold uppercase tracking-wide text-blue-700'>
						{t('categories')}
					</p>

					<ul className='space-y-2'>
						{plans.map(plan => {
							const isExpanded = expandedPlanIds.includes(plan.id)
							const isPlanActive = selectedPlan?.id === plan.id

							return (
								<li
									key={plan.id}
									className={cn(
										'overflow-hidden rounded-xl border transition',
										isPlanActive
											? 'border-blue-200 bg-blue-50/40'
											: 'border-transparent',
									)}
								>
									<button
										type='button'
										onClick={() => togglePlan(plan)}
										className={cn(
											'flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-semibold transition',
											isPlanActive
												? 'text-blue-900'
												: 'text-blue-900 hover:bg-blue-50',
										)}
									>
										<span>{plan.name}</span>
										<ChevronDown
											className={cn(
												'h-4 w-4 shrink-0 text-blue-700 transition-transform',
												isExpanded && 'rotate-180',
											)}
										/>
									</button>

									{isExpanded ? (
										<ul className='space-y-1 border-t border-blue-100 px-2 py-2'>
											{plan.files?.length ? (
												plan.files.map(file => {
													const isFileActive =
														selectedFileId === file.id

													return (
														<li key={file.id}>
															<button
																type='button'
																onClick={() =>
																	selectFile(plan.id, file.id)
																}
																className={cn(
																	'flex w-full items-start gap-2 rounded-lg px-3 py-2.5 text-left text-xs transition sm:text-sm',
																	isFileActive
																		? 'bg-blue-800 text-white shadow-sm'
																		: 'text-slate-700 hover:bg-white',
																)}
															>
																<FileText
																	className={cn(
																		'mt-0.5 h-4 w-4 shrink-0',
																		isFileActive
																			? 'text-white'
																			: 'text-blue-600',
																	)}
																/>
																<span className='line-clamp-2 break-all leading-snug'>
																	{file.file_name}
																</span>
															</button>
														</li>
													)
												})
											) : (
												<li className='px-3 py-2 text-xs text-slate-500'>
													{t('noFiles')}
												</li>
											)}
										</ul>
									) : null}
								</li>
							)
						})}
					</ul>
				</div>
			</aside>

			<section
				className={cn(
					'flex-1 rounded-2xl border border-blue-100 bg-white shadow-sm',
					isExpandedView &&
						'fixed inset-0 z-[120] flex h-[100dvh] flex-col rounded-none border-0 shadow-none',
				)}
			>
				{!selectedFile ? (
					<div className='flex min-h-[320px] items-center justify-center px-6 text-center text-blue-700'>
						{t('selectPlan')}
					</div>
				) : (
					<>
						<div
							className={cn(
								'relative border-b border-blue-100 px-4 py-3',
								isExpandedView && 'border-white/20 bg-[#173aad] text-white',
							)}
						>
							{isExpandedView ? (
								<div
									className='pointer-events-none absolute inset-0 opacity-20'
									style={{
										backgroundImage: 'url("/naqsh.png")',
										backgroundRepeat: 'repeat',
										backgroundSize: '200px',
									}}
								/>
							) : null}

							<div className='relative flex flex-wrap items-center justify-between gap-3'>
								<div className='min-w-0 flex-1'>
									{selectedPlan?.name ? (
										<p
											className={cn(
												'text-xs font-medium uppercase tracking-wide',
												isExpandedView ? 'text-white/80' : 'text-blue-600',
											)}
										>
											{selectedPlan.name}
										</p>
									) : null}
									<p
										className={cn(
											'truncate text-sm font-semibold sm:text-base',
											isExpandedView ? 'text-white' : 'text-blue-900',
										)}
									>
										{selectedFile.file_name}
									</p>
									{isExpandedView ? (
										<p className='mt-1 text-xs text-white/70'>
											{t('pressEscToExit')}
										</p>
									) : null}
								</div>

								<div className='flex items-center gap-2'>
									{selectedFile.file ? (
										<a
											href={selectedFile.file}
											target='_blank'
											rel='noopener noreferrer'
											download
											className={cn(
												'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition',
												isExpandedView
													? 'border border-white/30 text-white hover:bg-white/10'
													: 'border border-blue-200 text-blue-800 hover:bg-blue-50',
											)}
										>
											<Download className='h-4 w-4' />
											{t('download')}
										</a>
									) : null}

									{canExpand ? (
										isExpandedView ? (
											<button
												type='button'
												onClick={closeExpandedView}
												className='inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-blue-900 transition hover:bg-white/90'
												aria-label={t('exitFullscreen')}
											>
												<Shrink className='h-4 w-4' />
												{t('exitFullscreen')}
											</button>
										) : (
											<button
												type='button'
												onClick={openExpandedView}
												className='inline-flex items-center gap-2 rounded-lg bg-blue-800 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700'
											>
												<Expand className='h-4 w-4' />
												{t('fullscreen')}
											</button>
										)
									) : null}

									{isExpandedView ? (
										<button
											type='button'
											onClick={closeExpandedView}
											className='inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/30 text-white transition hover:bg-white/10'
											aria-label={t('exitFullscreen')}
										>
											<X className='h-5 w-5' />
										</button>
									) : null}
								</div>
							</div>
						</div>

						<div
							className={cn(
								'bg-white',
								isExpandedView && 'flex-1 overflow-y-auto',
							)}
						>
							{documentPreview || (
								<div className='flex min-h-[320px] flex-col items-center justify-center gap-4 px-6 py-12 text-center'>
									<FileText className='h-12 w-12 text-blue-300' />
									<p className='max-w-md text-blue-800'>
										{t('previewUnavailable')}
									</p>
									{selectedFile.file ? (
										<a
											href={selectedFile.file}
											target='_blank'
											rel='noopener noreferrer'
											className='inline-flex items-center gap-2 rounded-lg bg-blue-800 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700'
										>
											<Download className='h-4 w-4' />
											{t('download')}
										</a>
									) : null}
								</div>
							)}
						</div>
					</>
				)}
			</section>
		</div>
	)
}
