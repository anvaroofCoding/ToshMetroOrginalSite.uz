"use client"

import { useEffect, useState } from "react";

export default function news() {
	const [newsdata, setNewsData] = useState([])
	const getNews = async () => {
		const res = await fetch('https://metro-site.onrender.com/api/news/')
		const data = await res.json()
		setNewsData(data)
	}
	useEffect(() => {
		getNews()
	}, [])
	console.log(newsdata);
	return (
		<div className="w-full">
			<div className="container grid grid-cols-4 h-screen gap-5 border py-5">
				<div className="border h-[100%] border"></div>
				<div className="border h-[100%] border"></div>
				<div className="border h-[100%] border"></div>
				<div className="border h-[100%] border"></div>
				<div className="border h-[100%] border"></div>
				<div className="border h-[100%] border"></div>
			</div>
		</div>
	)
}
