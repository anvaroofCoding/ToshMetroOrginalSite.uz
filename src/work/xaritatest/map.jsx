'use client'

const stations = [
	// STANSIYALAR RO'YXATINI SHU YERDA TO'LDIRASAN
	{ name: 'Chilonzor', x: 100, y: 500, color: 'red' },
	{ name: 'Novza', x: 140, y: 480, color: 'red' },
	{ name: "Milliy bog'", x: 180, y: 460, color: 'red' },
	{ name: "Halklar Do'stligi", x: 220, y: 440, color: 'red' },
	// Boshqalarni qo'sh...
]

export default function MetroMap() {
	return (
		<div className='container overflow-auto border shadow-lg p-2 bg-white'>
			<svg width={1000} height={600} style={{ background: '#f0f0f0' }}>
				{/* LINIYALAR */}
				{['red', 'blue', 'green'].map(color => (
					<polyline
						key={color}
						points={stations
							.filter(s => s.color === color)
							.map(s => `${s.x},${s.y}`)
							.join(' ')}
						fill='none'
						stroke={color}
						strokeWidth={4}
					/>
				))}

				{/* STANSIYA NUQTALARI + NOMLARI */}
				{stations.map((s, i) => (
					<g key={i}>
						<circle
							cx={s.x}
							cy={s.y}
							r='6'
							fill={s.color}
							stroke='black'
							strokeWidth='1'
						/>
						<text
							x={s.x + 10}
							y={s.y + 4}
							fontSize='12'
							fontFamily='sans-serif'
							fill='black'
						>
							{s.name}
						</text>
					</g>
				))}
			</svg>
		</div>
	)
}
