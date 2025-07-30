"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState, useCallback, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"




export default function OptimizedNews() {
	const [newsdata, setNewsData] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [likingItems, setLikingItems] = useState(new Set())


	const pathname = usePathname()
	const lang = pathname.split("/")[1]
	const { toast } = useToast()

	const getNews = useCallback(async () => {
		try {
			setLoading(true)
			setError(null)

			const res = await fetch(`https://metro-site.onrender.com/api/news/${lang}/`)

			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`)
			}

			const data = await res.json()
			setNewsData(data.results)
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : "Unknown error occurred"
			setError(errorMessage)
			console.error("Error fetching news:", err)

			toast({
				title: "Error",
				description: "Failed to load news. Please try again.",
				variant: "destructive",
			})
		} finally {
			setLoading(false)
		}
	}, [lang, toast])

	const handleLike = useCallback(
		async (itemId) => {
			// Prevent multiple simultaneous likes on the same item
			if (likingItems.has(itemId)) return

			try {
				setLikingItems((prev) => new Set(prev).add(itemId))

				// Optimistic update
				setNewsData((prevData) =>
					prevData.map((item) =>
						item.id === itemId
							? {
								...item,
								like_count: item.is_liked ? item.like_count - 1 : item.like_count + 1,
								is_liked: !item.is_liked,
							}
							: item,
					),
				)

				const response = await fetch(`https://metro-site.onrender.com/api/news/${itemId}/like/`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				})

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`)
				}

				const data = await response.json()

				// Update with actual server response
				setNewsData((prevData) =>
					prevData.map((item) =>
						item.id === itemId ? { ...item, like_count: data.like_count, is_liked: true } : item,
					),
				)

				toast({
					title: "Success",
					description: data.message,
				})
			} catch (err) {
				// Revert optimistic update on error
				setNewsData((prevData) =>
					prevData.map((item) =>
						item.id === itemId
							? {
								...item,
								like_count: item.is_liked ? item.like_count + 1 : item.like_count - 1,
								is_liked: !item.is_liked,
							}
							: item,
					),
				)

				const errorMessage = err instanceof Error ? err.message : "Failed to like"
				console.error("Error liking news:", err)

				toast({
					title: "Error",
					description: "Failed to like the news. Please try again.",
					variant: "destructive",
				})
			} finally {
				setLikingItems((prev) => {
					const newSet = new Set(prev)
					newSet.delete(itemId)
					return newSet
				})
			}
		},
		[likingItems, toast],
	)

	useEffect(() => {
		getNews()
	}, [getNews])

	const memoizedNewsItems = useMemo(() => {
		return newsdata.map((item) => {
			const imageUrl = item.images?.[0]?.image
			const description = item[`description_${lang}`]
			const title = item[`title_${lang}`]
			const isLiking = likingItems.has(item.id)

			return (
				<Card key={item.id} className="h-[500px] flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
					<div className="relative h-1/2">
						{imageUrl ? (
							<Image
								src={imageUrl || "/placeholder.svg"}
								alt={title || "News image"}
								fill
								className="object-cover"
								sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
								priority={false}
							/>
						) : (
							<div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
								No Image Available
							</div>
						)}
					</div>

					<CardContent className="flex-1 p-4 flex flex-col justify-between">
						<div className="flex-1">
							<Link href={`/${lang}/yangiliklar/${item.id}`} className="block hover:text-blue-600 transition-colors">
								<h3 className="font-semibold text-lg line-clamp-2 mb-2">{title}</h3>
								<p className="text-sm text-gray-600 line-clamp-3">{description}</p>
							</Link>
						</div>

						<div className="flex items-center justify-between mt-4 pt-3 border-t">
							<Button
								variant={item.is_liked ? "default" : "outline"}
								size="sm"
								onClick={() => handleLike(item.id)}
								disabled={isLiking}
								className="flex items-center gap-2"
							>
								{isLiking ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									<Heart className={`h-4 w-4 ${item.is_liked ? "fill-current" : ""}`} />
								)}
								<span>{item.like_count}</span>
							</Button>

							<Link
								href={`/${lang}/yangiliklar/${item.id}`}
								className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
							>
								Read More
							</Link>
						</div>
					</CardContent>
				</Card>
			)
		})
	}, [newsdata, lang, likingItems, handleLike])

	if (loading) {
		return (
			<div className="w-full">
				<div className="container py-5">
					<div className="flex items-center justify-center min-h-[400px]">
						<div className="flex items-center gap-2">
							<Loader2 className="h-6 w-6 animate-spin" />
							<span>Loading news...</span>
						</div>
					</div>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="w-full">
				<div className="container py-5">
					<div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
						<p className="text-red-600">Error: {error}</p>
						<Button onClick={getNews} variant="outline">
							Try Again
						</Button>
					</div>
				</div>
			</div>
		)
	}

	if (newsdata.length === 0) {
		return (
			<div className="w-full">
				<div className="container py-5">
					<div className="flex items-center justify-center min-h-[400px]">
						<p className="text-gray-500">No news available.</p>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="w-full">
			<div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-5">
				{memoizedNewsItems}
			</div>
		</div>
	)
}
