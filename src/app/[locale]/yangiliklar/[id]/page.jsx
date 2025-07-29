// app/[lang]/yangiliklar/[id]/page.tsx
"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export default function YangilikDetail() {
  const path = usePathname()
  const id = path.split("/")[3]
  const lang = path.split("/")[1]

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getNewsProductions = async () => {
      try {
        const res = await fetch(`https://metro-site.onrender.com/api/news/${lang}/${id}/`, {
          cache: "no-store",
        })
        if (!res.ok) {
          throw new Error(`Xatolik: ${res.status}`)
        }
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error(err)
        setError("Ma'lumotni yuklab bo'lmadi.")
      } finally {
        setLoading(false)
      }
    }

    getNewsProductions()
  }, [id, lang])

  if (loading) return <p className="text-center mt-10">Yuklanmoqda...</p>
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">{data?.[`title_${lang}`]}</h1>
      {data?.images?.[0]?.image && (
        <img
          src={data.images[0].image}
          alt={data?.[`title_${lang}`]}
          className="w-full h-auto mb-6 rounded-md"
        />
      )}
      <p className="text-base leading-7 whitespace-pre-line">
        {data?.[`description_${lang}`]}
      </p>
    </div>
  )
}
