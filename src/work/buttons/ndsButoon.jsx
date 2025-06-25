import { ChevronRight } from 'lucide-react'

const Button = () => {
	return (
		<button
			className='
				inline-flex items-center 
				bg-blue-900 text-white font-semibold 
				px-4 py-2 rounded-md 
				shadow-md 
				overflow-hidden
				transition-all duration-500 ease-out 
				group
				hover:px-6
			'
		>
			<span className='relative flex items-center'>
				Batafsil
				<ChevronRight
					className='
						w-4 h-4 ml-1
						opacity-0 
						transform translate-x-[-6px]
						group-hover:opacity-100 
						group-hover:translate-x-0 
						transition-all duration-500 ease-out
					'
				/>
			</span>
		</button>
	)
}

export default Button
