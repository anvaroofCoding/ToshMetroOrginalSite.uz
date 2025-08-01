"use client"

import Image from "next/image"
import Link from "next/link"

const documents = [
  {
    title: "O'zbekiston Respublikasi Konstitutsiyasi",
    url: "https://lex.uz/docs/-6445145",
    year: "1992",
  },
  {
    title: 'O\'zbekiston Respublikasining "Oila kodeksi"',
    url: "https://lex.uz/docs/-104720",
    year: "1998",
  },
  {
    title: "O'zbekiston Respublikasining Mehnat Kodeksi",
    url: "https://lex.uz/ru/docs/-6257288",
    year: "2003",
  },
  {
    title: "O'zbekiston Respublikasining \"Xotin-qizlarni tazyiq va zo'ravonlikdan himoya qilish to'g'risida\" Qonuni",
    url: "https://lex.uz/acts/-4494709",
    year: "2019",
  },
  {
    title:
      "O'zbekiston Respublikasining \"Xotin-qizlar va erkaklar uchun teng huquq hamda imkoniyatlar kafolatlari to'g'risida\" Qonuni",
    url: "https://lex.uz/docs/-4494849",
    year: "2019",
  },
  {
    title:
      "O'zbekiston Respublikasining \"Og'ir ijtimoiy ahvolda qolgan xotin-qizlar huquqlari kafolatlarini ta'minlash bo'yicha qo'shimcha chora-tadbirlar qabul qilinganligi munosabati bilan o'zbekiston respublikasining ayrim qonun hujjatlariga qo'shimcha va o'zgartishlar kiritish to'g'risida\" Qonuni",
    url: "https://lex.uz/ru/docs/-5766205",
    year: "2020",
  },
  {
    title:
      "O'zbekiston Respublikasining \"Xotin-qizlar va bolalar huquqlari, erkinliklari hamda qonuniy manfaatlarini ishonchli himoya qilish tizimi yanada takomillashtirilishi munosabati bilan O'zbekiston Respublikasining ayrim qonun hujjatlariga o'zgartish va qo'shimchalar kiritish to'g'risida\" Qonuni",
    url: "https://lex.uz/uz/docs/-6430272",
    year: "2021",
  },
  {
    title:
      "O'zbekiston Respublikasi Oliy Majlisi Senatining \"2030-yilga qadar o'zbekiston respublikasida gender tenglikka erishish strategiyasini tasdiqlash haqida\" qarori",
    url: "https://lex.uz/docs/-5466673",
    year: "2022",
  },
  {
    title:
      "O'zbekiston Respublikasi Oliy Majlisi Senati kengashining \"Xotin-qizlarning jamiyatdagi rolini oshirish, gender tenglik va oila masalalari bo'yicha respublika komissiyasini tashkil etish to'g'risida\" qarori",
    url: "https://lex.uz/en/docs/-5949556",
    year: "2023",
  },
]

export default function Meyoriy() {
  return (
    <div className=" min-h-screen py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-900 mb-3 sm:mb-4">
            Me'yoriy hujjatlar
          </h1>
          <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto rounded-full"></div>
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-blue-700 max-w-2xl mx-auto">
            O'zbekiston Respublikasining asosiy qonun hujjatlari va me'yoriy aktlari
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line - hidden on mobile, visible on larger screens */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-0.5 w-0.5 bg-gradient-to-b from-blue-300 via-blue-400 to-blue-300 h-full rounded-full"></div>

          {documents.map((doc, index) => (
            <div key={index} className="relative mb-8 sm:mb-12 lg:mb-16">
              {/* Timeline dot - hidden on mobile */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white  border-blue-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src="https://i.pinimg.com/originals/dd/05/2c/dd052c198318a2f216fcb64504fdd358.png"
                    alt="O'zbekiston gerbi"
                    width={24}
                    height={24}
                    className=" w-full"
                  />
                </div>
              </div>

              {/* Content */}
              <div
                className={`w-full md:w-5/12 ${
                  index % 2 === 0 ? "md:pr-6 lg:pr-8 md:text-right" : "md:ml-auto md:pl-6 lg:pl-8"
                }`}
              >
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 sm:p-6 lg:p-8 border border-blue-100 hover:border-blue-200 group">
                  {/* Year badge */}
                  <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4 shadow-sm">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {doc.year}
                  </div>

                  {/* Document title */}
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-4 sm:mb-6 leading-tight group-hover:text-blue-800 transition-colors duration-300">
                    {doc.title}
                  </h3>

                  {/* Read link */}
                  <Link
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2.5 sm:px-5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium text-sm sm:text-base shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    Onlayn o'qish
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

       
      </div>
    </div>
  )
}
