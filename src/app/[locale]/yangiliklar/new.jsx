"use client";

import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link" // bu yuqoriga qo‘shiladi


export default function News() {
	const [newsdata, setNewsData] = useState([]);
	const pathname = usePathname()
	const lang = pathname.split("/")[1] // params: { lang: "uz" } kabi bo'lishi mumkin
	// const lang = params
	console.log(lang);

	const getNews = async () => {
		try {
			const res = await fetch(`https://metro-site.onrender.com/api/news/${lang}/`);
			const data = await res.json();
			setNewsData(data.results);
		} catch (err) {
			console.error("Xatolik:", err);
		}
	};

	useEffect(() => {
		getNews();
	}, [lang]); // lang o‘zgarsa qayta fetch bo‘ladi

	return (
		<div className="w-full">
			<div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-5">
				{newsdata.map((item) => {
					const imageUrl = item.images?.[0]?.image;
					const description =
						lang === "uz"
							? item.description_uz
							: lang === "ru"
								? item.description_ru
								: item.description_en;

					return (
						<Link
							href={`/${lang}/yangiliklar/${item.id}`} // <== IDni URLga qo‘shyapmiz
							key={item.id}
							className="border h-[500px] flex flex-col"
						>
							<div className="w-full h-1/2 border relative">
								{imageUrl ? (
									<Image
										src={imageUrl}
										alt={item.title || "News image"}
										fill
										className="object-cover"
									/>
								) : (
									<div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm">
										Rasm yo‘q
									</div>
								)}
							</div>
							<div className="w-full h-1/2 border p-2 overflow-hidden">
								<h3 className="font-semibold text-lg line-clamp-2">
									{item[`title_${lang}`]}
								</h3>
								<p className="text-sm mt-2 line-clamp-3">
									{description}
								</p>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
