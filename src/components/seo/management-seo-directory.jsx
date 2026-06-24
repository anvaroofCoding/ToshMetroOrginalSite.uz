function getMemberName(member) {
	return [member.lastName, member.firstName, member.middleName]
		.filter(Boolean)
		.join(' ')
		.trim()
}

export function ManagementSeoDirectory({ members = [], heading }) {
	if (!members.length) return null

	return (
		<section
			className='container mx-auto border-t border-blue-100 px-4 py-10'
			aria-label={heading}
		>
			<h2 className='mb-6 text-xl font-semibold text-blue-900'>{heading}</h2>
			<ul className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
				{members.map(member => {
					const name = getMemberName(member)

					return (
						<li key={member.id ?? name}>
							<article className='rounded-lg border border-blue-100 p-4'>
								<h3 className='text-base font-semibold text-blue-900'>
									{name}
								</h3>
								{member.position && (
									<p className='mt-2 text-sm text-slate-700'>
										<strong>Lavozim:</strong> {member.position}
									</p>
								)}
								{member.phone && (
									<p className='mt-1 text-sm text-slate-600'>
										<strong>Telefon:</strong>{' '}
										<a
											href={`tel:${member.phone}`}
											className='text-blue-800 hover:underline'
										>
											{member.phone}
										</a>
									</p>
								)}
								{member.email && (
									<p className='mt-1 text-sm text-slate-600 break-all'>
										<strong>Email:</strong>{' '}
										<a
											href={`mailto:${member.email}`}
											className='text-blue-800 hover:underline'
										>
											{member.email}
										</a>
									</p>
								)}
								{member.hours && (
									<p className='mt-1 text-sm text-slate-600'>
										<strong>Qabul vaqti:</strong> {member.hours}
									</p>
								)}
								{member.biography &&
									member.biography !== 'Aniq emas' && (
										<p className='mt-2 text-sm text-slate-600 leading-relaxed'>
											<strong>Biografiya:</strong> {member.biography}
										</p>
									)}
							</article>
						</li>
					)
				})}
			</ul>
		</section>
	)
}

export { getMemberName }
