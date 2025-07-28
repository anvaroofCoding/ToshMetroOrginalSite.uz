"use client"
import React, { useState } from 'react'

export default function page() {

	const [state, SetState] = useState()
	const item =
	{
		"images": [
			{
				"id": 1,
				"image": "https://metro-site.onrender.com/media/news_images/photo_5462870140912792359_y.jpg"
			},
			{
				"id": 2,
				"image": "https://metro-site.onrender.com/media/news_images/photo_5462870140912792358_y.jpg"
			},
			{
				"id": 3,
				"image": "https://metro-site.onrender.com/media/news_images/photo_5463322534113049708_y.jpg"
			},
			{
				"id": 4,
				"image": "https://metro-site.onrender.com/media/news_images/photo_5462870140912792357_y.jpg"
			}
		]
	}


	console.log(item);
	

	return (
		<div>
			<div>
				{
					item.images.map((item, index)=>{
						return <div key={index}>
							{item.image}
						</div>
					})
				}
			</div>
		</div>
	)
}
