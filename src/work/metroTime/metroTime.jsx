'use client'

import { Search } from 'lucide-react'
import { useState } from 'react'

const MetroInfo = () => {
	const [search, setSearch] = useState('')

	const metroSchedule = [
		{ station: 'Chilonzor yoli', open: '05:00', close: '00:00' },
		{ station: 'Ozbekiston yoli', open: '05:00', close: '00:00' },
		{ station: 'Yunisobod', open: '05:30', close: '23:30' },
		{ station: 'UZB mustaqiligi yoli', open: '05:15', close: '23:45' },
	]

	return (
		<div className='h-[50px] container flex flex-col sm:flex-row items-center justify-between  shadow-sm gap-2 px-2'>
			{/* Qidiruv input */}
			<div className='relative w-3/3 sm:w-3/3 2xl:w-1/3'>
				<input
					type='text'
					value={search}
					onChange={e => setSearch(e.target.value)}
					placeholder='Bekat qidirish...'
					className='w-full rounded-md border border-gray-300 p-2 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
				/>
				<Search className='absolute left-2 top-2.5 w-4 h-4 text-gray-400' />
			</div>

			{/* Metro vaqtlar */}
			<div className='2xl:flex hidden items-center justify-between gap-2 text-sm sm:text-sm text-blue-900 font-medium overflow-x-auto'>
				{metroSchedule.map((s, i) => {
					const isMatch = s.station.toLowerCase().includes(search.toLowerCase())
					return (
						<div
							key={i}
							className={`rounded px-2 py-1 flex items-center gap-1 ${
								isMatch ? 'bg-blue-100' : 'bg-gray-100'
							}`}
						>
							<span>{s.station}:</span>
							<span>
								{s.open}-{s.close}
							</span>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default MetroInfo
