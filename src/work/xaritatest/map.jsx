'use client'

export default function MetroMap() {
	const stations = [
		{ name: 'Chilonzor', x: 50, y: 300, color: 'red' },
		{ name: 'Novza', x: 100, y: 300, color: 'red' },
		{ name: "Milliy bog'", x: 150, y: 300, color: 'red' },
		{ name: 'Paxtakor', x: 200, y: 300, color: 'red' },
		{ name: 'Mustaqillik', x: 250, y: 300, color: 'red' },
		{ name: 'Amir Temur', x: 300, y: 300, color: 'red' },
		{ name: 'Hamid Olimjon', x: 350, y: 300, color: 'red' },
		{ name: 'Pushkin', x: 400, y: 300, color: 'red' },
		{ name: "Buyuk Ipak Yo'li", x: 450, y: 300, color: 'red' },

		{ name: 'Beruniy', x: 200, y: 100, color: 'blue' },
		{ name: 'Tinchlik', x: 200, y: 150, color: 'blue' },
		{ name: 'Chorsu', x: 200, y: 200, color: 'blue' },
		{ name: "G'afur G'ulom", x: 200, y: 250, color: 'blue' },
		{ name: 'Alisher Navoiy', x: 200, y: 300, color: 'blue' },
		{ name: 'Uzbekiston', x: 200, y: 350, color: 'blue' },
		{ name: 'Kosmonavtlar', x: 200, y: 400, color: 'blue' },
		{ name: 'Oybek', x: 200, y: 450, color: 'blue' },
		{ name: 'Toshkent', x: 200, y: 500, color: 'blue' },
		{ name: 'Mashinasozlar', x: 200, y: 550, color: 'blue' },
		{ name: 'Dustlik', x: 200, y: 600, color: 'blue' },

		{ name: 'Yunusobod', x: 300, y: 100, color: 'green' },
		{ name: 'Shahriston', x: 350, y: 150, color: 'green' },
		{ name: 'Bodomzor', x: 400, y: 200, color: 'green' },
		{ name: 'Minor', x: 450, y: 250, color: 'green' },
		{ name: 'Turkiston', x: 500, y: 300, color: 'green' },
		{ name: 'Yunus Rajabiy', x: 300, y: 300, color: 'green' },
	]

	return (
		<svg width='600' height='700' className='bg-white'>
			{['red', 'blue', 'green'].map(lineColor => (
				<polyline
					key={lineColor}
					fill='none'
					stroke={lineColor}
					strokeWidth='4'
					points={stations
						.filter(s => s.color === lineColor)
						.map(s => `${s.x},${s.y}`)
						.join(' ')}
				/>
			))}

			{stations.map((s, i) => (
				<g key={i}>
					<circle cx={s.x} cy={s.y} r='6' fill={s.color} />
					<text x={s.x + 8} y={s.y + 4} fontSize='10' fill='black'>
						{s.name}
					</text>
				</g>
			))}
		</svg>
	)
}
