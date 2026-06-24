export function DepartmentsSeoDirectory({ departments = [], heading }) {
	if (!departments.length) return null

	return (
		<section
			className='container mx-auto border-t border-blue-100 px-4 py-10'
			aria-label={heading}
		>
			<h2 className='mb-6 text-xl font-semibold text-blue-900'>{heading}</h2>
			<ul className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
				{departments.map(dept => (
					<li key={dept.id ?? dept.title}>
						<article className='rounded-lg border border-blue-100 p-4'>
							<h3 className='text-base font-semibold text-blue-900'>
								{dept.title}
							</h3>
							{dept.head && (
								<p className='mt-2 text-sm text-slate-700'>
									<strong>Xizmat boshlig&apos;i:</strong> {dept.head}
								</p>
							)}
							{dept.schedule && (
								<p className='mt-1 text-sm text-slate-600'>
									<strong>Ish jadvali:</strong> {dept.schedule}
								</p>
							)}
							{dept.reception && (
								<p className='mt-1 text-sm text-slate-600'>
									<strong>Qabul kuni:</strong> {dept.reception}
								</p>
							)}
							{dept.email && (
								<p className='mt-1 text-sm text-slate-600 break-all'>
									<strong>Email:</strong>{' '}
									<a
										href={`mailto:${dept.email}`}
										className='text-blue-800 hover:underline'
									>
										{dept.email}
									</a>
								</p>
							)}
							{dept.phone && (
								<p className='mt-1 text-sm text-slate-600'>
									<strong>Telefon:</strong>{' '}
									<a
										href={`tel:${dept.phone}`}
										className='text-blue-800 hover:underline'
									>
										{dept.phone}
									</a>
								</p>
							)}
						</article>
					</li>
				))}
			</ul>
		</section>
	)
}
