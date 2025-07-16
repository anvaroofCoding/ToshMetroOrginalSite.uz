// 'use client'

// import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent } from '@/components/ui/card'
// import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
// import { ChevronDown, ChevronUp, Clock, Eye, Mail, Phone } from 'lucide-react'
// import Image from 'next/image'

// import { useState } from 'react'
// import rasm1 from '../../../../public/raxbariyat/1.jpg'
// import rasm2 from '../../../../public/raxbariyat/2.jpg'
// import rasm3 from '../../../../public/raxbariyat/3.jpg'
// import rasm4 from '../../../../public/raxbariyat/4.jpg'
// import rasm5 from '../../../../public/raxbariyat/5.jpg'
// import rasm6 from '../../../../public/raxbariyat/6.jpg'
// import rasm7 from '../../../../public/raxbariyat/7.jpg'
// import rasm8 from '../../../../public/raxbariyat/8.jpg'

// const managementData = [
// 	{
// 		id: 6,
// 		firstName: 'Djaxongirovich',
// 		middleName: 'Raxmonbek',
// 		lastName: 'Usmanov',
// 		position: '«Toshkent metropoliteni» DUK boshlig’i',
// 		department: 'Safety & Security',
// 		phone: '+998 71-241-65-14',
// 		email: 'tash.metropoliten@mail.ru metro@tashmetro.uz',
// 		hours: 'Oyning 3- va 4- haftasi payshanba kuni',
// 		image: rasm6,
// 		biography:
// 			'Lisa Johnson ensures the safety and security of all Metro operations and passengers. She has extensive experience in emergency management and has developed comprehensive safety protocols that have significantly reduced incidents across the Metro system.',
// 	},
// 	{
// 		id: 4,
// 		firstName: 'Mirhokim',
// 		middleName: 'Mirxasilovich',
// 		lastName: 'Mirhusanov',
// 		position: '«Toshkent metropoliteni» DUK bosh muhandisi',
// 		department: 'Human Resources',
// 		phone: '+998 71-239-89-33',
// 		email: 'ng@tashmetro.uz',
// 		hours: 'Chorshanba kuni 10:00-11:00',
// 		image: rasm4,
// 		biography:
// 			"Sarah Williams leads Metro's human resources department, focusing on employee development, recruitment, and organizational culture. She holds a Master's in Human Resources Management and has been recognized for her innovative approach to workforce development.",
// 	},
// 	{
// 		id: 7,
// 		firstName: 'Turg’unovich',
// 		middleName: 'To‘lqin',
// 		lastName: 'Xalikov',
// 		position:
// 			'«Toshkent metropoliteni» DUK boshlig’ining xavfsizlik masalalari bo‘yicha o‘rinbosari',
// 		department: 'Maintenance & Engineering',
// 		phone: '+998 71-227-44-03',
// 		email: 'nzb@tashmetro.uz',
// 		hours: 'Juma kuni 14:00-16:00',
// 		image: rasm7,
// 		biography:
// 			"Michael Brown oversees all maintenance operations for Metro's fleet and infrastructure. With over 30 years of experience in mechanical engineering and maintenance management, he ensures optimal performance and reliability of all Metro assets.",
// 	},
// 	{
// 		id: 5,
// 		firstName: 'Sanjar',
// 		middleName: 'Berkinovich',
// 		lastName: 'Sayidov',
// 		position: '«Toshkent metropoliteni» DUK boshlig’ining o‘rinbosari',
// 		department: 'Information Technology',
// 		phone: '+998 71-245-13-99',
// 		email: 'nzf@tashmetro.uz',
// 		hours: 'Chorshanba kuni 14:00-17:00',
// 		image: rasm5,
// 		biography:
// 			"James Davis spearheads Metro's digital transformation initiatives and oversees all technology infrastructure. With a background in software engineering and systems architecture, he has modernized Metro's operations through innovative technology solutions.",
// 	},
// 	{
// 		id: 8,
// 		firstName: 'Elyor',
// 		middleName: 'Rustamovich',
// 		lastName: 'Eltayev',
// 		position:
// 			'«Toshkent metropoliteni» DUK boshlig’ining marketing masalalari bo‘yicha o‘rinbosari',
// 		department: 'Customer Service',
// 		phone: '+998 71-245-27-35',
// 		email: 'nzm@tashmetro.uz',
// 		hours: 'Chorshanba kuni 14:00-17:00',
// 		image: rasm8,
// 		biography:
// 			"Jennifer Wilson leads Metro's customer service initiatives and community outreach programs. She has transformed customer satisfaction ratings and established innovative communication channels between Metro and the communities it serves.",
// 	},
// 	{
// 		id: 2,
// 		firstName: 'Sobir',
// 		middleName: 'Shamsidinovich',
// 		lastName: 'Oripov',
// 		position:
// 			'«Toshkent metropoliteni» DUK boshlig’ining qurilish bo‘yicha o‘rinbosari',
// 		department: 'Operations',
// 		phone: '+998 71-245-47-68',
// 		email: 'nzs@tashmetro.uz',
// 		hours: 'Payshanba kuni 10:00-11:00',
// 		image: rasm2,
// 		biography:
// 			"Maria Rodriguez is a seasoned transportation professional with expertise in operations management and strategic planning. She has been instrumental in implementing Metro's sustainability initiatives and has received numerous awards for operational excellence.",
// 	},
// 	{
// 		id: 1,
// 		firstName: 'Suxrob',
// 		middleName: 'Turakulovich',
// 		lastName: 'Norkulov',
// 		position:
// 			'«Toshkent metropoliteni» DUK boshligining ilmiy innovatsion rivojlanish masalalari boyicha orinbosari-transport universiteti prorektori ',
// 		department: 'Executive Office',
// 		phone: '+998 71-245-71-69',
// 		email: 'nzip@tashmetro.uz',
// 		hours: 'Seyshanba kuni 14:00-16:00',
// 		image: rasm1,
// 		biography:
// 			"Robert Anderson brings over 25 years of experience in public transportation management. He has led major infrastructure projects across three states and holds a Master's degree in Public Administration from Georgetown University. Under his leadership, Metro has achieved a 98% on-time performance rating.",
// 	},

// 	{
// 		id: 3,
// 		firstName: 'Dostonjon',
// 		middleName: 'Qobiljonovich',
// 		lastName: 'Ergashev ',
// 		position:
// 			"«Toshkent metropoliteni» DUK boshlig'ining o'rinbosari harakat xavfsizligi bo'yicha bosh taftishchi",
// 		department: 'Finance',
// 		phone: '+998 71-296-03-24',
// 		email: 'rb@tashmetro.uz',
// 		hours: 'Juma kuni 10:00-17:00',
// 		image: rasm3,
// 		biography:
// 			'David Thompson oversees all financial operations for Metro, including budgeting, accounting, and financial planning. He is a CPA with over 20 years of experience in public sector finance and has successfully managed budgets exceeding $500 million annually.',
// 	},
// ]

// export default function ManagementPage() {
// 	const [expandedBios, setExpandedBios] = useState(new Set()) // ✅ to'g'rilandi

// 	const toggleBio = id => {
// 		const newExpanded = new Set(expandedBios)
// 		if (newExpanded.has(id)) {
// 			newExpanded.delete(id)
// 		} else {
// 			newExpanded.add(id)
// 		}
// 		setExpandedBios(newExpanded)
// 	}

// 	return (
// 		<div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50'>
// 			{/* Header */}
// 			<div>
// 				<div className='container mx-auto pt-10'>
// 					<div className='text-start'>
// 						<h1 className='text-4xl md:text-4xl font-bold mb-4'>
// 							Metropoliteni rahbariyati
// 						</h1>
// 					</div>
// 				</div>
// 			</div>

// 			{/* Management Grid */}
// 			<div className='container mx-auto py-10'>
// 				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
// 					{managementData.map(member => (
// 						<Card
// 							key={member.id}
// 							className='group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2'
// 						>
// 							<CardContent className='p-0'>
// 								{/* Image Section with Hover Effect */}
// 								<div className='relative overflow-hidden'>
// 									<Dialog>
// 										<DialogTrigger asChild>
// 											<div className='relative cursor-pointer'>
// 												<Image
// 													src={member.image || '/placeholder.svg'}
// 													alt={`${member.firstName} ${member.lastName}`}
// 													width={300}
// 													height={300}
// 													className='w-full h-64 object-contain transition-transform duration-300 group-hover:scale-110'
// 												/>
// 												{/* Hover Overlay */}
// 												<div className='absolute inset-0  bg-opacity-0 group-hover:bg-opacity-90 transition-all duration-300 flex items-end justify-center'>
// 													<div className='text-gray-300 w-full bg-[#0E327F] text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 py-3 rounded-t-[10px]'>
// 														<h3 className='text-xl font-bold mb-2'>
// 															{member.firstName} {member.middleName}{' '}
// 															{member.lastName}
// 														</h3>
// 														<p className='text-sm text-gray-200 flex justify-center items-center'>
// 															<Eye />
// 														</p>
// 													</div>
// 												</div>
// 											</div>
// 										</DialogTrigger>
// 										<DialogContent className='max-w-2xl'>
// 											<Image
// 												src={member.image || '/placeholder.svg'}
// 												alt={`${member.firstName} ${member.lastName}`}
// 												width={600}
// 												height={600}
// 												className='w-full h-auto rounded-lg'
// 											/>
// 										</DialogContent>
// 									</Dialog>
// 								</div>

// 								{/* Content Section */}
// 								<div className='p-6'>
// 									{/* Name and Position */}
// 									<div className='mb-4'>
// 										<h3 className='text-xl font-bold text-gray-900 mb-1'>
// 											{member.firstName} {member.middleName} {member.lastName}
// 										</h3>
// 										<Badge className='bg-[#0E327F] hover:bg-[#0E327F]/90 text-white mb-2'>
// 											{member.position}
// 										</Badge>
// 										{/* <p className='text-sm text-gray-600'>{member.department}</p> */}
// 									</div>

// 									{/* Contact Information */}
// 									<div className='space-y-2 mb-4'>
// 										<div className='flex items-center text-sm text-gray-600'>
// 											<Phone className='w-4 h-4 mr-2 text-[#0E327F]' />
// 											{member.phone}
// 										</div>
// 										<div className='flex items-center text-sm text-gray-600'>
// 											<Mail className='w-4 h-4 mr-2 text-[#0E327F]' />
// 											{member.email}
// 										</div>
// 										<div className='flex items-center text-sm text-gray-600'>
// 											<Clock className='w-4 h-4 mr-2 text-[#0E327F]' />
// 											{member.hours}
// 										</div>
// 									</div>

// 									{/* Biography Toggle */}
// 									<Button
// 										onClick={() => toggleBio(member.id)}
// 										variant='outline'
// 										className='w-full border-[#0E327F] text-[#0E327F] hover:bg-[#0E327F] hover:text-white transition-colors duration-300'
// 									>
// 										{expandedBios.has(member.id) ? (
// 											<>
// 												Hide Biography <ChevronUp className='w-4 h-4 ml-2' />
// 											</>
// 										) : (
// 											<>
// 												View Biography <ChevronDown className='w-4 h-4 ml-2' />
// 											</>
// 										)}
// 									</Button>

// 									{/* Biography Content */}
// 									<div
// 										className={`overflow-hidden transition-all duration-500 ease-in-out ${
// 											expandedBios.has(member.id)
// 												? 'max-h-96 opacity-100 mt-4'
// 												: 'max-h-0 opacity-0'
// 										}`}
// 									>
// 										<div className='bg-gray-50 p-4 rounded-lg border-l-4 border-[#0E327F]'>
// 											<p className='text-sm text-gray-700 leading-relaxed'>
// 												{member.biography}
// 											</p>
// 										</div>
// 									</div>
// 								</div>
// 							</CardContent>
// 						</Card>
// 					))}
// 				</div>
// 			</div>

// 			{/* Footer */}
// 			{/* <div className='bg-[#0E327F] text-white py-8'>
// 				<div className='container mx-auto px-4 text-center'>
// 					<p className='text-blue-200'>
// 						For general inquiries, please contact Metro Customer Service at
// 						(555) 000-METRO
// 					</p>
// 				</div>
// 			</div> */}
// 		</div>
// 	)
// }


"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ChevronDown, ChevronUp, Clock, Eye, Mail, Phone } from "lucide-react"
import Image from "next/image"
import { useState } from 'react'
import rasm1 from '../../../../public/raxbariyat/1.jpg'
import rasm2 from '../../../../public/raxbariyat/2.jpg'
import rasm3 from '../../../../public/raxbariyat/3.jpg'
import rasm4 from '../../../../public/raxbariyat/4.jpg'
import rasm5 from '../../../../public/raxbariyat/5.jpg'
import rasm6 from '../../../../public/raxbariyat/6.jpg'
import rasm7 from '../../../../public/raxbariyat/7.jpg'
import rasm8 from '../../../../public/raxbariyat/8.jpg'

const managementData = [
	{
		id: 6,
		firstName: 'Djaxongirovich',
		middleName: 'Raxmonbek',
		lastName: 'Usmanov',
		position: '«Toshkent metropoliteni» DUK boshlig’i',
		department: 'Safety & Security',
		phone: '+998 71-241-65-14',
		email: 'tash.metropoliten@mail.ru metro@tashmetro.uz',
		hours: 'Oyning 3- va 4- haftasi payshanba kuni',
		image: rasm6,
		biography: "Aniq emas"
	},
	{
		id: 4,
		firstName: 'Mirhokim',
		middleName: 'Mirxasilovich',
		lastName: 'Mirhusanov',
		position: '«Toshkent metropoliteni» DUK bosh muhandisi',
		department: 'Human Resources',
		phone: '+998 71-239-89-33',
		email: 'ng@tashmetro.uz',
		hours: 'Chorshanba kuni 10:00-11:00',
		image: rasm4,
		biography: "aniq emas"
	},
	{
		id: 7,
		firstName: 'Turg’unovich',
		middleName: 'To‘lqin',
		lastName: 'Xalikov',
		position:
			'«Toshkent metropoliteni» DUK boshlig’ining xavfsizlik masalalari bo‘yicha o‘rinbosari',
		department: 'Maintenance & Engineering',
		phone: '+998 71-227-44-03',
		email: 'nzb@tashmetro.uz',
		hours: 'Juma kuni 14:00-16:00',
		image: rasm7,
		biography:"aniq emas"
	},
	{
		id: 5,
		firstName: 'Sanjar',
		middleName: 'Berkinovich',
		lastName: 'Sayidov',
		position: '«Toshkent metropoliteni» DUK boshlig’ining o‘rinbosari',
		department: 'Information Technology',
		phone: '+998 71-245-13-99',
		email: 'nzf@tashmetro.uz',
		hours: 'Chorshanba kuni 14:00-17:00',
		image: rasm5,
		biography:
			"James Davis spearheads Metro's digital transformation initiatives and oversees all technology infrastructure. With a background in software engineering and systems architecture, he has modernized Metro's operations through innovative technology solutions.",
	},
	{
		id: 8,
		firstName: 'Elyor',
		middleName: 'Rustamovich',
		lastName: 'Eltayev',
		position:
			'«Toshkent metropoliteni» DUK boshlig’ining marketing masalalari bo‘yicha o‘rinbosari',
		department: 'Customer Service',
		phone: '+998 71-245-27-35',
		email: 'nzm@tashmetro.uz',
		hours: 'Chorshanba kuni 14:00-17:00',
		image: rasm8,
		biography:
			"Jennifer Wilson leads Metro's customer service initiatives and community outreach programs. She has transformed customer satisfaction ratings and established innovative communication channels between Metro and the communities it serves.",
	},
	{
		id: 2,
		firstName: 'Sobir',
		middleName: 'Shamsidinovich',
		lastName: 'Oripov',
		position:
			'«Toshkent metropoliteni» DUK boshlig’ining qurilish bo‘yicha o‘rinbosari',
		department: 'Operations',
		phone: '+998 71-245-47-68',
		email: 'nzs@tashmetro.uz',
		hours: 'Payshanba kuni 10:00-11:00',
		image: rasm2,
		biography:
			"Maria Rodriguez is a seasoned transportation professional with expertise in operations management and strategic planning. She has been instrumental in implementing Metro's sustainability initiatives and has received numerous awards for operational excellence.",
	},
	{
		id: 1,
		firstName: 'Suxrob',
		middleName: 'Turakulovich',
		lastName: 'Norkulov',
		position:
			'«Toshkent metropoliteni» DUK boshligining ilmiy innovatsion rivojlanish masalalari boyicha orinbosari-transport universiteti prorektori ',
		department: 'Executive Office',
		phone: '+998 71-245-71-69',
		email: 'nzip@tashmetro.uz',
		hours: 'Seyshanba kuni 14:00-16:00',
		image: rasm1,
		biography:
			"Robert Anderson brings over 25 years of experience in public transportation management. He has led major infrastructure projects across three states and holds a Master's degree in Public Administration from Georgetown University. Under his leadership, Metro has achieved a 98% on-time performance rating.",
	},

	{
		id: 3,
		firstName: 'Dostonjon',
		middleName: 'Qobiljonovich',
		lastName: 'Ergashev ',
		position:
			"«Toshkent metropoliteni» DUK boshlig'ining o'rinbosari harakat xavfsizligi bo'yicha bosh taftishchi",
		department: 'Finance',
		phone: '+998 71-296-03-24',
		email: 'rb@tashmetro.uz',
		hours: 'Juma kuni 10:00-17:00',
		image: rasm3,
		biography:
			'David Thompson oversees all financial operations for Metro, including budgeting, accounting, and financial planning. He is a CPA with over 20 years of experience in public sector finance and has successfully managed budgets exceeding $500 million annually.',
	},
]


export default function ManagementPage() {
  const [expandedBios, setExpandedBios] = useState(new Set())

  const toggleBio = (id) => {
    const newExpanded = new Set(expandedBios)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedBios(newExpanded)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div>
        <div className="container mx-auto pt-10">
          <div className="text-start">
            <h1 className="text-4xl md:text-4xl font-bold mb-4">Metropoliteni rahbariyati</h1>
          </div>
        </div>
      </div>
      {/* Management Grid */}
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {managementData.map((member) => (
            <Card
              key={member.id}
              className="group overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 rounded-lg"
            >
              <CardContent className="p-0">
                {/* Image Section with Hover Effect */}
                <div className="relative overflow-hidden">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative cursor-pointer">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={`${member.firstName} ${member.lastName}`}
                          width={300}
                          height={300}
                          className="w-full h-64 object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0E327F]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                          <div className="text-white w-full text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 py-3">
                            <h3 className="text-xl font-bold mb-2">
                              {member.firstName} {member.middleName} {member.lastName}
                            </h3>
                            <p className="text-sm text-gray-200 flex justify-center items-center">
                              <Eye className="w-4 h-4 mr-1" /> View Profile
                            </p>
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={`${member.firstName} ${member.lastName}`}
                        width={600}
                        height={600}
                        className="w-full h-auto rounded-lg"
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                {/* Content Section */}
                <div className="p-6">
                  {/* Name and Position */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {member.firstName} {member.middleName} {member.lastName}
                    </h3>
                    <Badge className="bg-[#0E327F] hover:bg-[#0E327F]/90 text-white mb-2">{member.position}</Badge>
                  </div>
                  {/* Contact Information */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2 text-[#0E327F]" />
                      {member.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2 text-[#0E327F]" />
                      {member.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-[#0E327F]" />
                      {member.hours}
                    </div>
                  </div>
                  {/* Biography Toggle */}
                  <Button
                    onClick={() => toggleBio(member.id)}
                    variant="outline"
                    className="w-full border-[#0E327F] text-[#0E327F] hover:bg-[#0E327F] hover:text-white transition-colors duration-300"
                  >
                    {expandedBios.has(member.id) ? (
                      <>
                        Hide Biography <ChevronUp className="w-4 h-4 ml-2" />
                      </>
                    ) : (
                      <>
                        View Biography <ChevronDown className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                  {/* Biography Content */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      expandedBios.has(member.id) ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-[#0E327F]">
                      <p className="text-sm text-gray-700 leading-relaxed">{member.biography}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
