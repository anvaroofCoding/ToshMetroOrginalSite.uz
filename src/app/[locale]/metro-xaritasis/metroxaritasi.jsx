// 'use client'

// import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from '@/components/ui/select'
// import { Separator } from '@/components/ui/separator'
// import {
// 	Clock,
// 	MapPin,
// 	Navigation,
// 	RotateCcw,
// 	Train,
// 	Users,
// 	X,
// 	ZoomIn,
// 	ZoomOut,
// } from 'lucide-react'
// import { useCallback, useMemo, useRef, useState } from 'react'

// export default function TashkentMetroMap() {
// 	const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 })
// 	const [isDragging, setIsDragging] = useState(false)
// 	const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
// 	const [selectedOrigin, setSelectedOrigin] = useState('')
// 	const [selectedDestination, setSelectedDestination] = useState('')
// 	const [showDirections, setShowDirections] = useState(false)
// 	const [selectedStationName, setSelectedStationName] = useState(null) // Renamed for clarity
// 	const [showSidebar, setShowSidebar] = useState(false) // New state for sidebar visibility
// 	const svgRef = useRef(null)

// 	const stations = {
// 		// Red Line (Chilonzor Line)
// 		Olmazor: {
// 			x: 100,
// 			y: 580,
// 			line: 'red',
// 			nameUz: 'Olmazor',
// 			nameEn: 'Olmazor',
// 		},
// 		Choshtepa: {
// 			x: 100,
// 			y: 650,
// 			line: 'red',
// 			nameUz: 'Choshtepa',
// 			nameEn: 'Choshtepa',
// 		},
// 		"O'zgarish": {
// 			x: 100,
// 			y: 720,
// 			line: 'red',
// 			nameUz: "O'zgarish",
// 			nameEn: 'Change',
// 		},
// 		Sergeli: {
// 			x: 100,
// 			y: 790,
// 			line: 'red',
// 			nameUz: 'Sergeli',
// 			nameEn: 'Sergeli',
// 		},
// 		Yangihayot: {
// 			x: 200,
// 			y: 850,
// 			line: 'red',
// 			nameUz: 'Yangihayot',
// 			nameEn: 'New Life',
// 		},
// 		Chinor: {
// 			x: 280,
// 			y: 900,
// 			line: 'red',
// 			nameUz: 'Chinor',
// 			nameEn: 'Plane Tree',
// 		},
// 		Chilonzor: {
// 			x: 150,
// 			y: 500,
// 			line: 'red',
// 			nameUz: 'Chilonzor',
// 			nameEn: 'Chilanzar',
// 		},
// 		'Mirzo Ulugbek': {
// 			x: 180,
// 			y: 450,
// 			line: 'red',
// 			nameUz: "Mirzo Ulug'bek",
// 			nameEn: 'Mirzo Ulugbek',
// 		},
// 		Novza: { x: 210, y: 400, line: 'red', nameUz: 'Novza', nameEn: 'Novza' },
// 		"Milliy bog'": {
// 			x: 230,
// 			y: 350,
// 			line: 'red',
// 			nameUz: "Milliy bog'",
// 			nameEn: 'National Park',
// 		},
// 		"Xalqlar do'stligi": {
// 			x: 270,
// 			y: 320,
// 			line: 'red',
// 			nameUz: "Xalqlar do'stligi",
// 			nameEn: 'Friendship of Nations',
// 		},
// 		Paxtakor: {
// 			x: 330,
// 			y: 290,
// 			line: 'red',
// 			nameUz: 'Paxtakor',
// 			nameEn: 'Cotton Picker',
// 		},
// 		'Mustaqillik maydoni': {
// 			x: 440,
// 			y: 250,
// 			line: 'red',
// 			nameUz: 'Mustaqillik maydoni',
// 			nameEn: 'Independence Square',
// 		},
// 		'Amir Temur xiyoboni': {
// 			x: 550,
// 			y: 270,
// 			line: 'red',
// 			nameUz: 'Amir Temur xiyoboni',
// 			nameEn: 'Amir Temur Avenue',
// 		},
// 		'Hamid Olimjon': {
// 			x: 610,
// 			y: 250,
// 			line: 'red',
// 			nameUz: 'Hamid Olimjon',
// 			nameEn: 'Hamid Olimjon',
// 		},
// 		Pushkin: {
// 			x: 680,
// 			y: 250,
// 			line: 'red',
// 			nameUz: 'Pushkin',
// 			nameEn: 'Pushkin',
// 		},
// 		"Buyuk ipak yo'li": {
// 			x: 750,
// 			y: 250,
// 			line: 'red',
// 			nameUz: "Buyuk ipak yo'li",
// 			nameEn: 'Great Silk Road',
// 		},
// 		// Blue Line (O'zbekiston Line)
// 		Beruniy: {
// 			x: 60,
// 			y: 60,
// 			line: 'blue',
// 			nameUz: 'Beruniy',
// 			nameEn: 'Beruniy',
// 		},
// 		Tinchlik: {
// 			x: 120,
// 			y: 120,
// 			line: 'blue',
// 			nameUz: 'Tinchlik',
// 			nameEn: 'Peace',
// 		},
// 		Chorsu: {
// 			x: 160,
// 			y: 160,
// 			line: 'blue',
// 			nameUz: 'Chorsu',
// 			nameEn: 'Chorsu',
// 		},
// 		"G'afur G'ulom": {
// 			x: 210,
// 			y: 210,
// 			line: 'blue',
// 			nameUz: "G'afur G'ulom",
// 			nameEn: 'Gafur Gulom',
// 		},
// 		'Alisher Navoiy': {
// 			x: 280,
// 			y: 280,
// 			line: 'blue',
// 			nameUz: 'Alisher Navoiy',
// 			nameEn: 'Alisher Navoi',
// 		},
// 		"O'zbekiston": {
// 			x: 350,
// 			y: 350,
// 			line: 'blue',
// 			nameUz: "O'zbekiston",
// 			nameEn: 'Uzbekistan',
// 		},
// 		Kosmonavtlar: {
// 			x: 400,
// 			y: 370,
// 			line: 'blue',
// 			nameUz: 'Kosmonavtlar',
// 			nameEn: 'Cosmonauts',
// 		},
// 		Oybek: { x: 470, y: 430, line: 'blue', nameUz: 'Oybek', nameEn: 'Oybek' },
// 		Toshkent: {
// 			x: 550,
// 			y: 450,
// 			line: 'blue',
// 			nameUz: 'Toshkent',
// 			nameEn: 'Tashkent',
// 		},
// 		"Do'stlik": {
// 			x: 650,
// 			y: 460,
// 			line: 'blue',
// 			nameUz: "Do'stlik",
// 			nameEn: 'Friendship',
// 		},
// 		// Green Line (Yunusobod Line)
// 		Turkiston: {
// 			x: 500,
// 			y: 20,
// 			line: 'green',
// 			nameUz: 'Turkiston',
// 			nameEn: 'Turkestan',
// 		},
// 		Yunusobod: {
// 			x: 500,
// 			y: 60,
// 			line: 'green',
// 			nameUz: 'Yunusobod',
// 			nameEn: 'Yunusabad',
// 		},
// 		Shahriston: {
// 			x: 500,
// 			y: 100,
// 			line: 'green',
// 			nameUz: 'Shahriston',
// 			nameEn: 'Shahristan',
// 		},
// 		Bodomzor: {
// 			x: 500,
// 			y: 140,
// 			line: 'green',
// 			nameUz: 'Bodomzor',
// 			nameEn: 'Almond Grove',
// 		},
// 		Minor: {
// 			x: 500,
// 			y: 180,
// 			line: 'green',
// 			nameUz: 'Minor',
// 			nameEn: 'Minaret',
// 		},
// 		'Abdulla Qodiriy': {
// 			x: 520,
// 			y: 210,
// 			line: 'green',
// 			nameUz: 'Abdulla Qodiriy',
// 			nameEn: 'Abdulla Qadiri',
// 		},
// 		'Yunus Rajabiy': {
// 			x: 540,
// 			y: 242,
// 			line: 'green',
// 			nameUz: 'Yunus Rajabiy',
// 			nameEn: 'Yunus Rajabi',
// 		},
// 		"Mingo'rik": {
// 			x: 480,
// 			y: 400,
// 			line: 'green',
// 			nameUz: "Mingo'rik",
// 			nameEn: "Ming'orik",
// 		},
// 		// Yellow Line (Sirg'ali Line)
// 		Texnopark: {
// 			x: 710,
// 			y: 450,
// 			line: 'yellow',
// 			nameUz: 'Texnopark',
// 			nameEn: 'Technopark',
// 		},
// 		Yashnobod: {
// 			x: 750,
// 			y: 500,
// 			line: 'yellow',
// 			nameUz: 'Yashnobod',
// 			nameEn: 'Yashnabad',
// 		},
// 		Tuzel: { x: 790, y: 540, line: 'yellow', nameUz: 'Tuzel', nameEn: 'Tuzel' },
// 		Olmos: {
// 			x: 790,
// 			y: 590,
// 			line: 'yellow',
// 			nameUz: 'Olmos',
// 			nameEn: 'Diamond',
// 		},
// 		Rohat: {
// 			x: 795,
// 			y: 630,
// 			line: 'yellow',
// 			nameUz: 'Rohat',
// 			nameEn: 'Comfort',
// 		},
// 		Yangiobod: {
// 			x: 795,
// 			y: 680,
// 			line: 'yellow',
// 			nameUz: 'Yangiobod',
// 			nameEn: 'New Settlement',
// 		},
// 		"Qo'yliq": {
// 			x: 750,
// 			y: 740,
// 			line: 'yellow',
// 			nameUz: "Qo'yliq",
// 			nameEn: 'Sheep Pasture',
// 		},
// 		Matonat: {
// 			x: 650,
// 			y: 720,
// 			line: 'yellow',
// 			nameUz: 'Matonat',
// 			nameEn: 'Firmness',
// 		},
// 		Qiyot: { x: 580, y: 720, line: 'yellow', nameUz: 'Qiyot', nameEn: 'Qiyot' },
// 		Tolariq: {
// 			x: 500,
// 			y: 720,
// 			line: 'yellow',
// 			nameUz: 'Tolariq',
// 			nameEn: 'Tolariq',
// 		},
// 		Xonobod: {
// 			x: 420,
// 			y: 750,
// 			line: 'yellow',
// 			nameUz: 'Xonobod',
// 			nameEn: 'Khan Settlement',
// 		},
// 		Quruvchilar: {
// 			x: 400,
// 			y: 800,
// 			line: 'yellow',
// 			nameUz: 'Quruvchilar',
// 			nameEn: 'Builders',
// 		},
// 		Turon: { x: 380, y: 840, line: 'yellow', nameUz: 'Turon', nameEn: 'Turan' },
// 		Qipchoq: {
// 			x: 320,
// 			y: 900,
// 			line: 'yellow',
// 			nameUz: 'Qipchoq',
// 			nameEn: 'Kipchak',
// 		},
// 	}

// 	// Detailed station information
// 	const stationDetails = {
// 		'Mustaqillik maydoni': {
// 			opened: '1977',
// 			depth: '22m',
// 			dailyPassengers: '45,000',
// 			architect: 'Igor Rozhin',
// 			history:
// 				"Dastlab 'Lenin maydoni' deb nomlangan bu stansiya 1991-yilda O'zbekiston mustaqillikka erishgach qayta nomlandi. U tizimdagi eng muhim stansiyalardan biri bo'lib, shaharning asosiy Mustaqillik maydoniga ulanadi.",
// 			features: [
// 				'Yer osti savdo markazi',
// 				'Bir nechta chiqish joylari',
// 				'Yaqin atrofdagi tarixiy yodgorliklar',
// 			],
// 			nearbyAttractions: [
// 				'Mustaqillik maydoni',
// 				'Senat binosi',
// 				"O'zbekiston mehmonxonasi",
// 				'Amir Temur muzeyi',
// 			],
// 			description:
// 				"Sovet davri arxitekturasi va zamonaviy ta'mirlash ishlari bilan ajralib turadigan markaziy stansiya. Stansiya o'zining keng zallari va O'zbekiston madaniyati hamda mustaqilligini aks ettiruvchi badiiy bezaklari bilan mashhur.",
// 		},
// 		'Alisher Navoiy': {
// 			opened: '1984',
// 			depth: '18m',
// 			dailyPassengers: '38,000',
// 			architect: 'Shavkat Abdurakhimov',
// 			history:
// 				"Buyuk o'zbek shoiri Alisher Navoiy nomi bilan atalgan bu stansiya qizil va ko'k liniyalar o'rtasidagi asosiy o'tish nuqtasi bo'lib xizmat qiladi. Stansiya Navoiy asarlaridan sahnalarni tasvirlaydigan chiroyli mozaikalar bilan bezatilgan.",
// 			features: [
// 				"O'tish stansiyasi",
// 				"Madaniy ko'rgazmalar",
// 				'Badiiy mozaikalar',
// 			],
// 			nearbyAttractions: [
// 				'Navoiy nomidagi opera teatri',
// 				"Tasviriy san'at muzeyi",
// 				'Amir Temur maydoni',
// 			],
// 			description:
// 				"Bu o'tish stansiyasi o'zining madaniy ahamiyati va an'anaviy o'zbek naqshlari hamda zamonaviy arxitektura elementlarini o'z ichiga olgan chiroyli ichki dizayni bilan mashhur.",
// 		},
// 		Toshkent: {
// 			opened: '1980',
// 			depth: '20m',
// 			dailyPassengers: '52,000',
// 			architect: 'Vladimir Kurbatov',
// 			history:
// 				"Toshkent metropoliteni tizimining asosiy stansiyasi bo'lib, markaziy transport markazi vazifasini bajaradi. Dastlab Sovet metro tizimining ulug'vorligini mahalliy o'zbek madaniy elementlari bilan namoyish etish uchun mo'ljallangan.",
// 			features: [
// 				'Asosiy terminal',
// 				"Savdo ob'ektlari",
// 				"Turistik ma'lumot markazi",
// 			],
// 			nearbyAttractions: [
// 				"Toshkent temir yo'l vokzali",
// 				'Chorsu bozori',
// 				"Ko'kaldosh madrasasi",
// 			],
// 			description:
// 				"Toshkent metropolitenining flagman stansiyasi bo'lib, Sovet monumentalizmi va an'anaviy o'zbek dizayn elementlarini uyg'unlashtirgan ta'sirchan arxitekturaga ega.",
// 		},
// 	}

// 	const lineColors = {
// 		red: '#DC2626',
// 		blue: '#2563EB',
// 		green: '#16A34A',
// 		yellow: '#CA8A04',
// 	}

// 	const lineNames = {
// 		red: 'Chilonzor liniyasi',
// 		blue: "O'zbekiston liniyasi",
// 		green: 'Yunusobod liniyasi',
// 		yellow: "Sirg'ali liniyasi",
// 	}

// 	const connections = [
// 		// Red line connections
// 		{ from: 'Olmazor', to: 'Choshtepa' },
// 		{ from: 'Choshtepa', to: "O'zgarish" },
// 		{ from: "O'zgarish", to: 'Sergeli' },
// 		{ from: 'Sergeli', to: 'Yangihayot' },
// 		{ from: 'Yangihayot', to: 'Chinor' },
// 		{ from: 'Chilonzor', to: 'Olmazor' },
// 		{ from: 'Mirzo Ulugbek', to: 'Chilonzor' },
// 		{ from: 'Novza', to: 'Mirzo Ulugbek' },
// 		{ from: "Milliy bog'", to: 'Novza' },
// 		{ from: "Xalqlar do'stligi", to: "Milliy bog'" },
// 		{ from: 'Paxtakor', to: "Xalqlar do'stligi" },
// 		{ from: 'Paxtakor', to: 'Mustaqillik maydoni' },
// 		{ from: 'Alisher Navoiy', to: 'Paxtakor' },
// 		{ from: 'Amir Temur xiyoboni', to: 'Mustaqillik maydoni' },
// 		{ from: 'Amir Temur xiyoboni', to: "Yunus Rajabiy" },
// 		{ from: 'Hamid Olimjon', to: 'Amir Temur xiyoboni' },
// 		{ from: 'Pushkin', to: 'Hamid Olimjon' },
// 		{ from: "Buyuk ipak yo'li", to: 'Pushkin' },
// 		// Blue line connections
// 		{ from: 'Beruniy', to: 'Tinchlik' },
// 		{ from: 'Tinchlik', to: 'Chorsu' },
// 		{ from: 'Chorsu', to: "G'afur G'ulom" },
// 		{ from: "G'afur G'ulom", to: 'Alisher Navoiy' },
// 		{ from: 'Alisher Navoiy', to: "O'zbekiston" },
// 		{ from: "O'zbekiston", to: 'Kosmonavtlar' },
// 		{ from: 'Kosmonavtlar', to: 'Oybek' },
// 		{ from: 'Oybek', to: "Mingo'rik" },
// 		{ from: 'Oybek', to: 'Toshkent' },
// 		{ from: 'Toshkent', to: "Do'stlik" },
// 		{ from: "Do'stlik", to: 'Texnopark' },
// 		// Green line connections
// 		{ from: 'Turkiston', to: 'Yunusobod' },
// 		{ from: 'Yunusobod', to: 'Shahriston' },
// 		{ from: 'Shahriston', to: 'Bodomzor' },
// 		{ from: 'Bodomzor', to: 'Minor' },
// 		{ from: 'Minor', to: 'Abdulla Qodiriy' },
// 		{ from: 'Abdulla Qodiriy', to: 'Yunus Rajabiy' },
// 		{ from: 'Yunus Rajabiy', to: 'Amir Temur xiyoboni' },
// 		// { from: 'Amir Temur xiyoboni', to: 'Yunus Rajabiy' },
// 		{ from: 'Yunus Rajabiy', to: "Mingo'rik" },
// 		// Yellow line connections
// 		{ from: 'Texnopark', to: 'Yashnobod' },
// 		{ from: 'Yashnobod', to: 'Tuzel' },
// 		{ from: 'Tuzel', to: 'Olmos' },
// 		{ from: 'Olmos', to: 'Rohat' },
// 		{ from: 'Rohat', to: 'Yangiobod' },
// 		{ from: 'Yangiobod', to: "Qo'yliq" },
// 		{ from: "Qo'yliq", to: 'Matonat' },
// 		{ from: 'Matonat', to: 'Qiyot' },
// 		{ from: 'Qiyot', to: 'Tolariq' },
// 		{ from: 'Tolariq', to: 'Xonobod' },
// 		{ from: 'Xonobod', to: 'Quruvchilar' },
// 		{ from: 'Quruvchilar', to: 'Turon' },
// 		{ from: 'Turon', to: 'Qipchoq' },
// 		{ from: 'Qipchoq', to: 'Chinor' },
// 	]

// 	// Build adjacency graph for route finding
// 	const graph = useMemo(() => {
// 		const adj = {}
// 		Object.keys(stations).forEach(station => {
// 			adj[station] = []
// 		})
// 		connections.forEach(conn => {
// 			adj[conn.from].push(conn.to)
// 			adj[conn.to].push(conn.from)
// 		})
// 		return adj
// 	}, [])

// 	// Find shortest path using BFS
// 	const findRoute = useCallback(
// 		(origin, destination) => {
// 			if (!origin || !destination || origin === destination) return null
// 			const queue = [[origin]]
// 			const visited = new Set([origin])
// 			while (queue.length > 0) {
// 				const path = queue.shift()
// 				const current = path[path.length - 1]
// 				if (current === destination) {
// 					return path
// 				}
// 				for (const neighbor of graph[current] || []) {
// 					if (!visited.has(neighbor)) {
// 						visited.add(neighbor)
// 						queue.push([...path, neighbor])
// 					}
// 				}
// 			}
// 			return null
// 		},
// 		[graph]
// 	)

// 	// Generate text directions
// 	const generateDirections = useCallback(route => {
// 		if (!route || route.length < 2) return []
// 		const directions = []
// 		let currentLine = stations[route[0]].line
// 		let stationsOnCurrentLine = [route[0]]
// 		for (let i = 1; i < route.length; i++) {
// 			const station = route[i]
// 			const stationLine = stations[station].line
// 			if (stationLine === currentLine) {
// 				stationsOnCurrentLine.push(station)
// 			} else {
// 				// Line change
// 				if (stationsOnCurrentLine.length > 1) {
// 					directions.push({
// 						type: 'travel',
// 						line: currentLine,
// 						from: stationsOnCurrentLine[0],
// 						to: stationsOnCurrentLine[stationsOnCurrentLine.length - 1],
// 						stations: stationsOnCurrentLine.length - 1,
// 					})
// 				}
// 				directions.push({
// 					type: 'transfer',
// 					station: stationsOnCurrentLine[stationsOnCurrentLine.length - 1],
// 					fromLine: currentLine,
// 					toLine: stationLine,
// 				})
// 				currentLine = stationLine
// 				stationsOnCurrentLine = [
// 					stationsOnCurrentLine[stationsOnCurrentLine.length - 1],
// 					station,
// 				]
// 			}
// 		}
// 		// Add final segment
// 		if (stationsOnCurrentLine.length > 1) {
// 			directions.push({
// 				type: 'travel',
// 				line: currentLine,
// 				from: stationsOnCurrentLine[0],
// 				to: stationsOnCurrentLine[stationsOnCurrentLine.length - 1],
// 				stations: stationsOnCurrentLine.length - 1,
// 			})
// 		}
// 		return directions
// 	}, [])

// 	const route = useMemo(() => {
// 		return findRoute(selectedOrigin, selectedDestination)
// 	}, [selectedOrigin, selectedDestination, findRoute])

// 	const directions = useMemo(() => {
// 		return generateDirections(route)
// 	}, [route, generateDirections])

// 	const handleGetDirections = () => {
// 		if (selectedOrigin && selectedDestination) {
// 			setShowDirections(true)
// 		}
// 	}

// 	const handleClearDirections = () => {
// 		setShowDirections(false)
// 		setSelectedOrigin('')
// 		setSelectedDestination('')
// 	}

// 	const handleZoomIn = () => {
// 		setTransform(prev => ({ ...prev, scale: Math.min(prev.scale * 1.2, 3) }))
// 	}

// 	const handleZoomOut = () => {
// 		setTransform(prev => ({ ...prev, scale: Math.max(prev.scale / 1.2, 0.5) }))
// 	}

// 	const handleReset = () => {
// 		setTransform({ x: 0, y: 0, scale: 1 })
// 	}

// 	const handleMouseDown = useCallback(
// 		e => {
// 			setIsDragging(true)
// 			setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y })
// 		},
// 		[transform]
// 	)

// 	const handleMouseMove = useCallback(
// 		e => {
// 			if (!isDragging) return
// 			setTransform(prev => ({
// 				...prev,
// 				x: e.clientX - dragStart.x,
// 				y: e.clientY - dragStart.y,
// 			}))
// 		},
// 		[isDragging, dragStart]
// 	)

// 	const handleMouseUp = useCallback(() => {
// 		setIsDragging(false)
// 	}, [])

// 	const handleTouchStart = useCallback(
// 		e => {
// 			if (e.touches.length === 1) {
// 				const touch = e.touches[0]
// 				setIsDragging(true)
// 				setDragStart({
// 					x: touch.clientX - transform.x,
// 					y: touch.clientY - transform.y,
// 				})
// 			}
// 		},
// 		[transform]
// 	)

// 	const handleTouchMove = useCallback(
// 		e => {
// 			if (!isDragging || e.touches.length !== 1) return
// 			e.preventDefault()
// 			const touch = e.touches[0]
// 			setTransform(prev => ({
// 				...prev,
// 				x: touch.clientX - dragStart.x,
// 				y: touch.clientY - dragStart.y,
// 			}))
// 		},
// 		[isDragging, dragStart]
// 	)

// 	const handleTouchEnd = useCallback(() => {
// 		setIsDragging(false)
// 	}, [])

// 	const handleWheel = useCallback(e => {
// 		e.preventDefault()
// 		const delta = e.deltaY > 0 ? 0.9 : 1.1
// 		setTransform(prev => ({
// 			...prev,
// 			scale: Math.max(0.5, Math.min(3, prev.scale * delta)),
// 		}))
// 	}, [])

// 	// Handle station click
// 	const handleStationClick = (stationName, e) => {
// 		e.stopPropagation()
// 		setSelectedStationName(stationName)
// 		setShowSidebar(true)
// 	}

// 	// Get station details with fallback
// 	const getStationDetails = stationName => {
// 		const station = stations[stationName]
// 		const details = stationDetails[stationName]

// 		return {
// 			...station,
// 			opened: details?.opened || '1980-yillar',
// 			depth: details?.depth || '15-25m',
// 			dailyPassengers: details?.dailyPassengers || '25,000',
// 			architect: details?.architect || 'Sovet metro arxitektorlari',
// 			history:
// 				details?.history ||
// 				`${station?.nameUz} stansiyasi Toshkent metropoliteni tizimining muhim qismi bo'lib, har kuni minglab yo'lovchilarga xizmat ko'rsatadi va shaharning turli qismlarini bog'laydi.`,
// 			features: details?.features || [
// 				'Zamonaviy qulayliklar',
// 				'Nogironlar uchun qulayliklar',
// 				'Xavfsizlik tizimlari',
// 			],
// 			nearbyAttractions: details?.nearbyAttractions || [
// 				'Mahalliy diqqatga sazovor joylar',
// 				'Savdo hududlari',
// 				"Madaniy ob'ektlar",
// 			],
// 			description:
// 				details?.description ||
// 				`Zamonaviy qulayliklarga ega va ${
// 					lineNames[station?.line]
// 				} tarmog'ida muhim transport markazi bo'lib xizmat qiladigan yaxshi loyihalashtirilgan metro stansiyasi.`,
// 		}
// 	}

// 	const sidebarStationDetails = selectedStationName
// 		? getStationDetails(selectedStationName)
// 		: null

// 	return (
// 		<div className='container'>
// 			<Card className='border-none mt-10 shadow-none'>
// 				<CardHeader className='text-center border-none shadow-none px-0'>
// 					<CardTitle className='text-5xl font-bold text-blue-900 mb-2'>
// 						Toshkent Metropoliteni
// 					</CardTitle>
// 					{/* Route Planning Section */}
// 					<div className='mt-6 p-6 rounded-xl shadow-sm'>
// 						<h3 className='text-lg font-semibold mb-4 flex items-center gap-2 text-blue-900'>
// 							<Navigation className='w-5 h-5 text-blue-700' />
// 							Yo'nalish olish
// 						</h3>
// 						<div className='grid grid-cols-1 md:grid-cols-3 gap-4 items-end'>
// 							<div>
// 								<label className='block text-sm font-semibold mb-2 text-blue-900'>
// 									Qayerdan:
// 								</label>
// 								<Select
// 									value={selectedOrigin}
// 									onValueChange={setSelectedOrigin}
// 								>
// 									<SelectTrigger className='bg-transparent border-2 border-blue-900 text-blue-900 placeholder:text-blue-700 focus:ring-blue-900 data-[state=open]:border-blue-900 data-[state=open]:ring-blue-900'>
// 										<SelectValue placeholder='Stansiyani tanlang' />
// 									</SelectTrigger>
// 									<SelectContent className='border-blue-900 bg-white text-blue-900'>
// 										{Object.entries(stations).map(([key, station]) => (
// 											<SelectItem
// 												key={key}
// 												value={key}
// 												className='text-blue-900 hover:bg-blue-100 focus:bg-blue-100'
// 											>
// 												{station.nameUz}
// 											</SelectItem>
// 										))}
// 									</SelectContent>
// 								</Select>
// 							</div>
// 							<div>
// 								<label className='block text-sm font-semibold mb-2 text-blue-900'>
// 									Qayerga:
// 								</label>
// 								<Select
// 									value={selectedDestination}
// 									onValueChange={setSelectedDestination}
// 								>
// 									<SelectTrigger className='bg-transparent border-2 border-blue-900 text-blue-900 placeholder:text-blue-700 focus:ring-blue-900 data-[state=open]:border-blue-900 data-[state=open]:ring-blue-900'>
// 										<SelectValue placeholder='Stansiyani tanlang' />
// 									</SelectTrigger>
// 									<SelectContent className='border-blue-900 bg-white text-blue-900'>
// 										{Object.entries(stations).map(([key, station]) => (
// 											<SelectItem
// 												key={key}
// 												value={key}
// 												className='text-blue-900 hover:bg-blue-100 focus:bg-blue-100'
// 											>
// 												{station.nameUz}
// 											</SelectItem>
// 										))}
// 									</SelectContent>
// 								</Select>
// 							</div>
// 							<div className='flex gap-2'>
// 								<Button
// 									onClick={handleGetDirections}
// 									disabled={!selectedOrigin || !selectedDestination}
// 									className='flex-1 bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed'
// 								>
// 									Yo'nalish
// 								</Button>
// 								{showDirections && (
// 									<Button
// 										onClick={handleClearDirections}
// 										variant='outline'
// 										size='icon'
// 										className='border-2 border-blue-300 text-blue-700 hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 bg-transparent'
// 									>
// 										<X className='w-4 h-4' />
// 									</Button>
// 								)}
// 							</div>
// 						</div>
// 					</div>
// 					{/* Directions Display */}
// 					{showDirections && route && (
// 						<div className='mt-4 p-4 bg-green-50 rounded-lg text-left'>
// 							<h4 className='font-semibold text-green-800 mb-3'>
// 								{stations[selectedOrigin].nameUz} dan{' '}
// 								{stations[selectedDestination].nameUz} ga yo'nalish:
// 							</h4>
// 							<div className='space-y-2'>
// 								{directions.map((dir, index) => (
// 									<div key={index} className='flex items-start gap-3'>
// 										<div className='w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5'>
// 											{index + 1}
// 										</div>
// 										<div className='flex-1'>
// 											{dir.type === 'travel' ? (
// 												<p className='text-sm'>
// 													<span
// 														className='font-medium'
// 														style={{ color: lineColors[dir.line] }}
// 													>
// 														{lineNames[dir.line]}
// 													</span>{' '}
// 													orqali {stations[dir.from].nameUz} dan{' '}
// 													{stations[dir.to].nameUz} ga boring
// 													<span className='text-gray-600'>
// 														{' '}
// 														({dir.stations} stansiya)
// 													</span>
// 												</p>
// 											) : (
// 												<p className='text-sm'>
// 													<span className='font-medium'>
// 														{stations[dir.station].nameUz}
// 													</span>{' '}
// 													da{' '}
// 													<span style={{ color: lineColors[dir.fromLine] }}>
// 														{lineNames[dir.fromLine]}
// 													</span>{' '}
// 													dan{' '}
// 													<span style={{ color: lineColors[dir.toLine] }}>
// 														{lineNames[dir.toLine]}
// 													</span>{' '}
// 													ga o'ting
// 												</p>
// 											)}
// 										</div>
// 									</div>
// 								))}
// 							</div>
// 							<div className='mt-3 pt-3 border-t border-green-200'>
// 								<p className='text-sm text-green-700'>
// 									<strong>Jami:</strong> {route.length - 1} stansiya, taxminan{' '}
// 									{Math.ceil((route.length - 1) * 2)} daqiqa
// 								</p>
// 							</div>
// 						</div>
// 					)}
// 					<div className='flex flex-wrap justify-center gap-4 mt-4'>
// 						<div className='flex items-center gap-2'>
// 							<div className='w-4 h-4 bg-red-600 rounded'></div>
// 							<span className='text-sm text-blue-800'>Chilonzor liniyasi</span>
// 						</div>
// 						<div className='flex items-center gap-2'>
// 							<div className='w-4 h-4 bg-blue-600 rounded'></div>
// 							<span className='text-sm text-blue-800'>
// 								O'zbekiston liniyasi
// 							</span>
// 						</div>
// 						<div className='flex items-center gap-2'>
// 							<div className='w-4 h-4 bg-green-600 rounded'></div>
// 							<span className='text-sm text-blue-800'>Yunusobod liniyasi</span>
// 						</div>
// 						<div className='flex items-center gap-2'>
// 							<div className='w-4 h-4 bg-yellow-600 rounded'></div>
// 							<span className='text-sm text-blue-800'>Sirg'ali liniyasi</span>
// 						</div>
// 					</div>
// 				</CardHeader>
// 				<CardContent className="px-0" >
// 					<div className='mb-4 flex justify-center gap-2'>
// 						<Button
// 							onClick={handleZoomIn}
// 							size='sm'
// 							variant='outline'
// 							className='border-2 border-blue-300 text-blue-700 hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 bg-transparent'
// 						>
// 							<ZoomIn className='w-4 h-4' />
// 						</Button>
// 						<Button
// 							onClick={handleZoomOut}
// 							size='sm'
// 							variant='outline'
// 							className='border-2 border-blue-300 text-blue-700 hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 bg-transparent'
// 						>
// 							<ZoomOut className='w-4 h-4' />
// 						</Button>
// 						<Button
// 							onClick={handleReset}
// 							size='sm'
// 							variant='outline'
// 							className=' text-blue-700 hover:bg-blue-100 hover:border-blue-100 transition-all duration-200 bg-transparent'
// 						>
// 							<RotateCcw className='w-4 h-4' />
// 						</Button>
// 					</div>
// 					<div
// 						className='relative overflow-hidden  rounded-xl  shadow-lg'
// 						style={{ height: '600px' }}
// 						onMouseDown={handleMouseDown}
// 						onMouseMove={handleMouseMove}
// 						onMouseUp={handleMouseUp}
// 						onMouseLeave={handleMouseUp}
// 						onTouchStart={handleTouchStart}
// 						onTouchMove={handleTouchMove}
// 						onTouchEnd={handleTouchEnd}
// 						onWheel={handleWheel}
// 					>
// 						<svg
// 							ref={svgRef}
// 							viewBox='0 0 900 950'
// 							className='w-full h-full cursor-grab active:cursor-grabbing'
// 							style={{
// 								transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
// 								transformOrigin: 'center center',
// 								transition: isDragging ? 'none' : 'transform 0.1s ease-out',
// 							}}
// 						>
// 							<defs>
// 								{/* Gradients for lines */}
// 								<linearGradient
// 									id='redGradient'
// 									x1='0%'
// 									y1='0%'
// 									x2='100%'
// 									y2='100%'
// 								>
// 									<stop offset='0%' stopColor='#DC2626' />
// 									<stop offset='100%' stopColor='#B91C1C' />
// 								</linearGradient>
// 								<linearGradient
// 									id='blueGradient'
// 									x1='0%'
// 									y1='0%'
// 									x2='100%'
// 									y2='100%'
// 								>
// 									<stop offset='0%' stopColor='#2563EB' />
// 									<stop offset='100%' stopColor='#1D4ED8' />
// 								</linearGradient>
// 								<linearGradient
// 									id='greenGradient'
// 									x1='0%'
// 									y1='0%'
// 									x2='100%'
// 									y2='100%'
// 								>
// 									<stop offset='0%' stopColor='#16A34A' />
// 									<stop offset='100%' stopColor='#15803D' />
// 								</linearGradient>
// 								<linearGradient
// 									id='yellowGradient'
// 									x1='0%'
// 									y1='0%'
// 									x2='100%'
// 									y2='100%'
// 								>
// 									<stop offset='0%' stopColor='#CA8A04' />
// 									<stop offset='100%' stopColor='#A16207' />
// 								</linearGradient>
// 								{/* Route gradient */}
// 								<linearGradient
// 									id='routeGradient'
// 									x1='0%'
// 									y1='0%'
// 									x2='100%'
// 									y2='100%'
// 								>
// 									<stop offset='0%' stopColor='#10B981' />
// 									<stop offset='100%' stopColor='#059669' />
// 								</linearGradient>
// 								{/* Drop shadow filter */}
// 								<filter
// 									id='dropshadow'
// 									x='-50%'
// 									y='-50%'
// 									width='200%'
// 									height='200%'
// 								>
// 									<feDropShadow
// 										dx='2'
// 										dy='2'
// 										stdDeviation='3'
// 										floodOpacity='0.3'
// 									/>
// 								</filter>
// 							</defs>
// 							{/* Draw connections/lines with improved styling */}
// 							{connections.map((connection, index) => {
// 								const fromStation = stations[connection.from]
// 								const toStation = stations[connection.to]
// 								if (!fromStation || !toStation) return null
// 								return (
// 									<g key={index}>
// 										{/* Outer glow */}
// 										<line
// 											x1={fromStation.x}
// 											y1={fromStation.y}
// 											x2={toStation.x}
// 											y2={toStation.y}
// 											stroke={lineColors[fromStation.line]}
// 											strokeWidth='8'
// 											strokeLinecap='round'
// 											opacity='0.3'
// 										/>
// 										{/* Main line */}
// 										<line
// 											x1={fromStation.x}
// 											y1={fromStation.y}
// 											x2={toStation.x}
// 											y2={toStation.y}
// 											stroke={`url(#${fromStation.line}Gradient)`}
// 											strokeWidth='5'
// 											strokeLinecap='round'
// 											filter='url(#dropshadow)'
// 										/>
// 									</g>
// 								)
// 							})}
// 							{/* Draw route path in green */}
// 							{showDirections && route && route.length > 1 && (
// 								<g>
// 									{route.slice(0, -1).map((stationName, index) => {
// 										const fromStation = stations[stationName]
// 										const toStation = stations[route[index + 1]]
// 										if (!fromStation || !toStation) return null
// 										return (
// 											<g key={`route-${index}`}>
// 												{/* Route glow */}
// 												<line
// 													x1={fromStation.x}
// 													y1={fromStation.y}
// 													x2={toStation.x}
// 													y2={toStation.y}
// 													stroke='#10B981'
// 													strokeWidth='12'
// 													strokeLinecap='round'
// 													opacity='0.4'
// 												/>
// 												{/* Main route line */}
// 												<line
// 													x1={fromStation.x}
// 													y1={fromStation.y}
// 													x2={toStation.x}
// 													y2={toStation.y}
// 													stroke='url(#routeGradient)'
// 													strokeWidth='8'
// 													strokeLinecap='round'
// 													filter='url(#dropshadow)'
// 												/>
// 											</g>
// 										)
// 									})}
// 								</g>
// 							)}
// 							{/* Draw stations with improved styling */}
// 							{Object.entries(stations).map(([name, station]) => {
// 								const isOnRoute =
// 									showDirections && route && route.includes(name)
// 								const isOrigin = name === selectedOrigin
// 								const isDestination = name === selectedDestination
// 								return (
// 									<g key={name}>
// 										{/* Station outer ring */}
// 										<circle
// 											cx={station.x}
// 											cy={station.y}
// 											r={isOnRoute ? '15' : '12'}
// 											fill={isOnRoute ? '#10B981' : lineColors[station.line]}
// 											opacity='0.3'
// 										/>
// 										{/* Station main circle */}
// 										<circle
// 											cx={station.x}
// 											cy={station.y}
// 											r={isOnRoute ? '11' : '9'}
// 											fill='white'
// 											stroke={isOnRoute ? '#10B981' : lineColors[station.line]}
// 											strokeWidth={isOnRoute ? '4' : '3'}
// 											filter='url(#dropshadow)'
// 											className='cursor-pointer hover:r-11 transition-all duration-200'
// 											onClick={e => handleStationClick(name, e)}
// 										/>
// 										{/* Station inner dot */}
// 										<circle
// 											cx={station.x}
// 											cy={station.y}
// 											r={isOnRoute ? '6' : '4'}
// 											fill={isOnRoute ? '#10B981' : lineColors[station.line]}
// 											opacity='0.8'
// 											className='cursor-pointer'
// 											onClick={e => handleStationClick(name, e)}
// 										/>
// 										{/* Origin/Destination markers */}
// 										{isOrigin && (
// 											<text
// 												x={station.x}
// 												y={station.y + 3}
// 												textAnchor='middle'
// 												className='text-xs font-bold fill-white pointer-events-none'
// 												style={{ fontSize: '10px' }}
// 											>
// 												A
// 											</text>
// 										)}
// 										{isDestination && (
// 											<text
// 												x={station.x}
// 												y={station.y + 3}
// 												textAnchor='middle'
// 												className='text-xs font-bold fill-white pointer-events-none'
// 												style={{ fontSize: '10px' }}
// 											>
// 												B
// 											</text>
// 										)}
// 										{/* Station name in Uzbek Latin */}
// 										<text
// 											x={station.x}
// 											y={station.y - (isOnRoute ? 22 : 18)}
// 											textAnchor='middle'
// 											className={`text-xs font-semibold pointer-events-none ${
// 												isOnRoute ? 'fill-green-800' : 'fill-blue-900'
// 											}`}
// 											style={{ fontSize: isOnRoute ? '12px' : '11px' }}
// 										>
// 											{station.nameUz}
// 										</text>
// 										{/* English name below */}
// 										<text
// 											x={station.x}
// 											y={station.y + (isOnRoute ? 28 : 25)}
// 											textAnchor='middle'
// 											className={`text-xs font-medium pointer-events-none ${
// 												isOnRoute ? 'fill-green-600' : 'fill-blue-700'
// 											}`}
// 											style={{ fontSize: isOnRoute ? '10px' : '9px' }}
// 										>
// 											{/* {station.nameEn} */}
// 										</text>
// 									</g>
// 								)
// 							})}
// 							{/* Transfer stations indicators */}
// 							{[
// 								'Alisher Navoiy',
// 								'Amir Temur xiyoboni',
// 								"Do'stlik",
// 								"Mingo'rik",
// 							].map(stationName => {
// 								const station = stations[stationName]
// 								if (!station) return null
// 								return (
// 									<g key={`transfer-${stationName}`}>
// 										<circle
// 											cx={station.x}
// 											cy={station.y}
// 											r='18'
// 											fill='none'
// 											stroke='#1e3a8a'
// 											strokeWidth='2'
// 											strokeDasharray='5,5'
// 											opacity='0.7'
// 										/>
// 										<text
// 											x={station.x + 25}
// 											y={station.y - 25}
// 											className='text-xs font-bold fill-blue-800'
// 											style={{ fontSize: '10px' }}
// 										>
// 											Transfer
// 										</text>
// 									</g>
// 								)
// 							})}
// 						</svg>
// 					</div>
// 					<div className='mt-6 text-center text-sm text-blue-700'>
// 						<p className='mt-1'>
// 							Zoom: {Math.round(transform.scale * 100)}% | Pan va zoom uchun
// 							suring | Stansiya ma'lumotlari uchun bosing
// 						</p>
// 					</div>
// 				</CardContent>
// 			</Card>

// 			{/* Station Details Sidebar */}
// 			<div
// 				className={`fixed inset-y-0 right-0 w-full md:w-1/2 lg:w-1/3  bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
// 					showSidebar ? 'translate-x-0' : 'translate-x-full'
// 				} overflow-y-auto`}
// 			>
// 				{sidebarStationDetails && (
// 					<div className='h-full flex flex-col'>
// 						<div className='bg-blue-900 p-4 flex items-center justify-between flex-shrink-0'>
// 							<h2 className='flex items-center gap-3 text-white text-2xl font-bold'>
// 								<div
// 									className='w-6 h-6 rounded-full'
// 									style={{
// 										backgroundColor: lineColors[sidebarStationDetails.line],
// 									}}
// 								/>
// 								<span>{sidebarStationDetails.nameUz}</span>
// 								<span className='text-lg text-blue-200'>
// 									({sidebarStationDetails.nameEn})
// 								</span>
// 							</h2>
// 							<Button
// 								variant='ghost'
// 								size='icon'
// 								onClick={() => setShowSidebar(false)}
// 								className='text-white hover:bg-blue-800 rounded-full w-8 h-8'
// 								aria-label='Yopish'
// 							>
// 								<X className='w-5 h-5' />
// 							</Button>
// 						</div>

// 						<div className='flex-1 overflow-y-auto p-6 space-y-6'>
// 							{/* Station Image */}
// 							<div className='relative h-64 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg overflow-hidden shadow-lg '>
// 								<img
// 									src={`/placeholder.svg?height=256&width=600&text=${encodeURIComponent(
// 										sidebarStationDetails.nameUz + ' Stansiyasi'
// 									)}`}
// 									alt={`${sidebarStationDetails.nameUz} stansiyasi`}
// 									className='w-full h-full object-cover opacity-80'
// 								/>
// 								<div className='absolute inset-0 bg-black bg-opacity-20 flex items-end'>
// 									<div className='p-4 text-white'>
// 										<h3 className='text-xl font-bold'>
// 											{sidebarStationDetails.nameUz}
// 										</h3>
// 										<p className='text-sm opacity-90'>
// 											{lineNames[sidebarStationDetails.line]}
// 										</p>
// 									</div>
// 								</div>
// 							</div>

// 							{/* Quick Stats */}
// 							<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
// 								<div className='bg-blue-50 p-4 rounded-lg text-center shadow-sm border border-blue-100'>
// 									<Clock className='w-6 h-6 mx-auto mb-2 text-blue-600' />
// 									<div className='text-sm text-gray-600'>Ochilgan</div>
// 									<div className='font-semibold text-blue-900'>
// 										{sidebarStationDetails.opened}
// 									</div>
// 								</div>
// 								<div className='bg-blue-50 p-4 rounded-lg text-center shadow-sm border border-blue-100'>
// 									<MapPin className='w-6 h-6 mx-auto mb-2 text-blue-600' />
// 									<div className='text-sm text-gray-600'>Chuqurlik</div>
// 									<div className='font-semibold text-blue-900'>
// 										{sidebarStationDetails.depth}
// 									</div>
// 								</div>
// 								<div className='bg-blue-50 p-4 rounded-lg text-center shadow-sm border border-blue-100'>
// 									<Users className='w-6 h-6 mx-auto mb-2 text-blue-600' />
// 									<div className='text-sm text-gray-600'>Kunlik yo'lovchi</div>
// 									<div className='font-semibold text-blue-900'>
// 										{sidebarStationDetails.dailyPassengers}
// 									</div>
// 								</div>
// 								<div className='bg-blue-50 p-4 rounded-lg text-center shadow-sm border border-blue-100'>
// 									<Train className='w-6 h-6 mx-auto mb-2 text-blue-600' />
// 									<div className='text-sm text-gray-600'>Liniya</div>
// 									<div
// 										className='font-semibold text-blue-900'
// 										style={{ color: lineColors[sidebarStationDetails.line] }}
// 									>
// 										{lineNames[sidebarStationDetails.line].split(' ')[0]}
// 									</div>
// 								</div>
// 							</div>

// 							{/* History Section */}
// 							<div className='bg-blue-50 p-6 rounded-lg shadow-md border border-blue-100'>
// 								<h4 className='text-lg font-semibold mb-3 text-blue-900'>
// 									Tarix
// 								</h4>
// 								<p className='text-gray-800 leading-relaxed'>
// 									{sidebarStationDetails.history}
// 								</p>
// 								<div className='mt-4'>
// 									<Badge
// 										variant='outline'
// 										className='mr-2 border-blue-300 text-blue-700 bg-blue-100'
// 									>
// 										Arxitektor: {sidebarStationDetails.architect}
// 									</Badge>
// 								</div>
// 							</div>

// 							{/* Features */}
// 							<div>
// 								<h4 className='text-lg font-semibold mb-3 text-blue-900'>
// 									Xususiyatlar
// 								</h4>
// 								<div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
// 									{sidebarStationDetails.features.map((feature, index) => (
// 										<div
// 											key={index}
// 											className='bg-blue-100 p-3 rounded-lg shadow-sm border border-blue-200'
// 										>
// 											<div className='text-sm font-medium text-blue-800'>
// 												{feature}
// 											</div>
// 										</div>
// 									))}
// 								</div>
// 							</div>

// 							{/* Gallery */}
// 							<div>
// 								<h4 className='text-lg font-semibold mb-3 text-blue-900'>
// 									Galereya
// 								</h4>
// 								<div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
// 									{[1, 2, 3].map(i => (
// 										<div
// 											key={i}
// 											className='relative h-32 bg-gray-200 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 shadow-md border border-gray-300'
// 										>
// 											<img
// 												src={`/placeholder.svg?height=128&width=200&text=Galereya ${i}`}
// 												alt={`${sidebarStationDetails.nameUz} galereyasi ${i}`}
// 												className='w-full h-full object-cover opacity-80'
// 											/>
// 										</div>
// 									))}
// 								</div>
// 							</div>

// 							{/* Video Section */}
// 							<div>
// 								<h4 className='text-lg font-semibold mb-3 text-blue-900'>
// 									Video
// 								</h4>
// 								<div className='relative h-64 bg-gray-200 rounded-lg overflow-hidden shadow-md border border-gray-300'>
// 									<div className='absolute inset-0 flex items-center justify-center'>
// 										<div className='text-center text-gray-800'>
// 											<div className='w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-red-700 transition-colors'>
// 												<svg
// 													className='w-6 h-6 ml-1 text-white'
// 													fill='currentColor'
// 													viewBox='0 0 24 24'
// 												>
// 													<path d='M8 5v14l11-7z' />
// 												</svg>
// 											</div>
// 											<p className='text-sm'>
// 												Virtual tur: {sidebarStationDetails.nameUz}
// 											</p>
// 										</div>
// 									</div>
// 								</div>
// 							</div>

// 							{/* Nearby Attractions */}
// 							<div>
// 								<h4 className='text-lg font-semibold mb-3 text-blue-900'>
// 									Yaqin atrofdagi joylar
// 								</h4>
// 								<div className='space-y-2'>
// 									{sidebarStationDetails.nearbyAttractions.map(
// 										(attraction, index) => (
// 											<div
// 												key={index}
// 												className='flex items-center gap-3 p-3 bg-blue-100 rounded-lg shadow-sm border border-blue-200'
// 											>
// 												<MapPin className='w-4 h-4 text-blue-600 flex-shrink-0' />
// 												<span className='text-sm text-blue-800'>
// 													{attraction}
// 												</span>
// 											</div>
// 										)
// 									)}
// 								</div>
// 							</div>

// 							<Separator className='bg-blue-200' />

// 							{/* Description */}
// 							<div className='bg-blue-50 p-6 rounded-lg shadow-md border border-blue-100'>
// 								<h4 className='text-lg font-semibold mb-3 text-blue-900'>
// 									Batafsil ma'lumot
// 								</h4>
// 								<p className='text-gray-800 leading-relaxed'>
// 									{sidebarStationDetails.description}
// 								</p>
// 							</div>
// 						</div>
// 					</div>
// 				)}
// 			</div>
// 		</div>
// 	)
// }


"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Clock,
  MapPin,
  Navigation,
  RotateCcw,
  Train,
  Users,
  X,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
} from "lucide-react"
import { useCallback, useMemo, useRef, useState, useEffect } from "react"

export default function TashkentMetroMap() {
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [selectedOrigin, setSelectedOrigin] = useState("")
  const [selectedDestination, setSelectedDestination] = useState("")
  const [showDirections, setShowDirections] = useState(false)
  const [selectedStationName, setSelectedStationName] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const svgRef = useRef(null)
  const containerRef = useRef(null)

  const stations = {
    // Red Line (Chilonzor Line)
    Olmazor: {
      x: 100,
      y: 580,
      line: "red",
      nameUz: "Olmazor",
      nameEn: "Olmazor",
    },
    Choshtepa: {
      x: 100,
      y: 650,
      line: "red",
      nameUz: "Choshtepa",
      nameEn: "Choshtepa",
    },
    "O'zgarish": {
      x: 100,
      y: 720,
      line: "red",
      nameUz: "O'zgarish",
      nameEn: "Change",
    },
    Sergeli: {
      x: 100,
      y: 790,
      line: "red",
      nameUz: "Sergeli",
      nameEn: "Sergeli",
    },
    Yangihayot: {
      x: 200,
      y: 850,
      line: "red",
      nameUz: "Yangihayot",
      nameEn: "New Life",
    },
    Chinor: {
      x: 280,
      y: 900,
      line: "red",
      nameUz: "Chinor",
      nameEn: "Plane Tree",
    },
    Chilonzor: {
      x: 150,
      y: 500,
      line: "red",
      nameUz: "Chilonzor",
      nameEn: "Chilanzar",
    },
    "Mirzo Ulugbek": {
      x: 180,
      y: 450,
      line: "red",
      nameUz: "Mirzo Ulug'bek",
      nameEn: "Mirzo Ulugbek",
    },
    Novza: { x: 210, y: 400, line: "red", nameUz: "Novza", nameEn: "Novza" },
    "Milliy bog'": {
      x: 230,
      y: 350,
      line: "red",
      nameUz: "Milliy bog'",
      nameEn: "National Park",
    },
    "Xalqlar do'stligi": {
      x: 270,
      y: 320,
      line: "red",
      nameUz: "Xalqlar do'stligi",
      nameEn: "Friendship of Nations",
    },
    Paxtakor: {
      x: 330,
      y: 290,
      line: "red",
      nameUz: "Paxtakor",
      nameEn: "Cotton Picker",
    },
    "Mustaqillik maydoni": {
      x: 440,
      y: 250,
      line: "red",
      nameUz: "Mustaqillik maydoni",
      nameEn: "Independence Square",
    },
    "Amir Temur xiyoboni": {
      x: 550,
      y: 270,
      line: "red",
      nameUz: "Amir Temur xiyoboni",
      nameEn: "Amir Temur Avenue",
    },
    "Hamid Olimjon": {
      x: 610,
      y: 250,
      line: "red",
      nameUz: "Hamid Olimjon",
      nameEn: "Hamid Olimjon",
    },
    Pushkin: {
      x: 680,
      y: 250,
      line: "red",
      nameUz: "Pushkin",
      nameEn: "Pushkin",
    },
    "Buyuk ipak yo'li": {
      x: 750,
      y: 250,
      line: "red",
      nameUz: "Buyuk ipak yo'li",
      nameEn: "Great Silk Road",
    },
    // Blue Line (O'zbekiston Line)
    Beruniy: {
      x: 60,
      y: 60,
      line: "blue",
      nameUz: "Beruniy",
      nameEn: "Beruniy",
    },
    Tinchlik: {
      x: 120,
      y: 120,
      line: "blue",
      nameUz: "Tinchlik",
      nameEn: "Peace",
    },
    Chorsu: {
      x: 160,
      y: 160,
      line: "blue",
      nameUz: "Chorsu",
      nameEn: "Chorsu",
    },
    "G'afur G'ulom": {
      x: 210,
      y: 210,
      line: "blue",
      nameUz: "G'afur G'ulom",
      nameEn: "Gafur Gulom",
    },
    "Alisher Navoiy": {
      x: 280,
      y: 280,
      line: "blue",
      nameUz: "Alisher Navoiy",
      nameEn: "Alisher Navoi",
    },
    "O'zbekiston": {
      x: 350,
      y: 350,
      line: "blue",
      nameUz: "O'zbekiston",
      nameEn: "Uzbekistan",
    },
    Kosmonavtlar: {
      x: 400,
      y: 370,
      line: "blue",
      nameUz: "Kosmonavtlar",
      nameEn: "Cosmonauts",
    },
    Oybek: { x: 470, y: 430, line: "blue", nameUz: "Oybek", nameEn: "Oybek" },
    Toshkent: {
      x: 550,
      y: 450,
      line: "blue",
      nameUz: "Toshkent",
      nameEn: "Tashkent",
    },
    "Do'stlik": {
      x: 650,
      y: 460,
      line: "blue",
      nameUz: "Do'stlik",
      nameEn: "Friendship",
    },
    // Green Line (Yunusobod Line)
    Turkiston: {
      x: 500,
      y: 20,
      line: "green",
      nameUz: "Turkiston",
      nameEn: "Turkestan",
    },
    Yunusobod: {
      x: 500,
      y: 60,
      line: "green",
      nameUz: "Yunusobod",
      nameEn: "Yunusabad",
    },
    Shahriston: {
      x: 500,
      y: 100,
      line: "green",
      nameUz: "Shahriston",
      nameEn: "Shahristan",
    },
    Bodomzor: {
      x: 500,
      y: 140,
      line: "green",
      nameUz: "Bodomzor",
      nameEn: "Almond Grove",
    },
    Minor: {
      x: 500,
      y: 180,
      line: "green",
      nameUz: "Minor",
      nameEn: "Minaret",
    },
    "Abdulla Qodiriy": {
      x: 520,
      y: 210,
      line: "green",
      nameUz: "Abdulla Qodiriy",
      nameEn: "Abdulla Qadiri",
    },
    "Yunus Rajabiy": {
      x: 540,
      y: 242,
      line: "green",
      nameUz: "Yunus Rajabiy",
      nameEn: "Yunus Rajabi",
    },
    "Mingo'rik": {
      x: 480,
      y: 400,
      line: "green",
      nameUz: "Mingo'rik",
      nameEn: "Ming'orik",
    },
    // Yellow Line (Sirg'ali Line)
    Texnopark: {
      x: 710,
      y: 450,
      line: "yellow",
      nameUz: "Texnopark",
      nameEn: "Technopark",
    },
    Yashnobod: {
      x: 750,
      y: 500,
      line: "yellow",
      nameUz: "Yashnobod",
      nameEn: "Yashnabad",
    },
    Tuzel: { x: 790, y: 540, line: "yellow", nameUz: "Tuzel", nameEn: "Tuzel" },
    Olmos: {
      x: 790,
      y: 590,
      line: "yellow",
      nameUz: "Olmos",
      nameEn: "Diamond",
    },
    Rohat: {
      x: 795,
      y: 630,
      line: "yellow",
      nameUz: "Rohat",
      nameEn: "Comfort",
    },
    Yangiobod: {
      x: 795,
      y: 680,
      line: "yellow",
      nameUz: "Yangiobod",
      nameEn: "New Settlement",
    },
    "Qo'yliq": {
      x: 750,
      y: 740,
      line: "yellow",
      nameUz: "Qo'yliq",
      nameEn: "Sheep Pasture",
    },
    Matonat: {
      x: 650,
      y: 720,
      line: "yellow",
      nameUz: "Matonat",
      nameEn: "Firmness",
    },
    Qiyot: { x: 580, y: 720, line: "yellow", nameUz: "Qiyot", nameEn: "Qiyot" },
    Tolariq: {
      x: 500,
      y: 720,
      line: "yellow",
      nameUz: "Tolariq",
      nameEn: "Tolariq",
    },
    Xonobod: {
      x: 420,
      y: 750,
      line: "yellow",
      nameUz: "Xonobod",
      nameEn: "Khan Settlement",
    },
    Quruvchilar: {
      x: 400,
      y: 800,
      line: "yellow",
      nameUz: "Quruvchilar",
      nameEn: "Builders",
    },
    Turon: { x: 380, y: 840, line: "yellow", nameUz: "Turon", nameEn: "Turan" },
    Qipchoq: {
      x: 320,
      y: 900,
      line: "yellow",
      nameUz: "Qipchoq",
      nameEn: "Kipchak",
    },
  }

  // Detailed station information
  const stationDetails = {
    "Mustaqillik maydoni": {
      opened: "1977",
      depth: "22m",
      dailyPassengers: "45,000",
      architect: "Igor Rozhin",
      history:
        "Dastlab 'Lenin maydoni' deb nomlangan bu stansiya 1991-yilda O'zbekiston mustaqillikka erishgach qayta nomlandi. U tizimdagi eng muhim stansiyalardan biri bo'lib, shaharning asosiy Mustaqillik maydoniga ulanadi.",
      features: ["Yer osti savdo markazi", "Bir nechta chiqish joylari", "Yaqin atrofdagi tarixiy yodgorliklar"],
      nearbyAttractions: ["Mustaqillik maydoni", "Senat binosi", "O'zbekiston mehmonxonasi", "Amir Temur muzeyi"],
      description:
        "Sovet davri arxitekturasi va zamonaviy ta'mirlash ishlari bilan ajralib turadigan markaziy stansiya. Stansiya o'zining keng zallari va O'zbekiston madaniyati hamda mustaqilligini aks ettiruvchi badiiy bezaklari bilan mashhur.",
    },
    "Alisher Navoiy": {
      opened: "1984",
      depth: "18m",
      dailyPassengers: "38,000",
      architect: "Shavkat Abdurakhimov",
      history:
        "Buyuk o'zbek shoiri Alisher Navoiy nomi bilan atalgan bu stansiya qizil va ko'k liniyalar o'rtasidagi asosiy o'tish nuqtasi bo'lib xizmat qiladi. Stansiya Navoiy asarlaridan sahnalarni tasvirlaydigan chiroyli mozaikalar bilan bezatilgan.",
      features: ["O'tish stansiyasi", "Madaniy ko'rgazmalar", "Badiiy mozaikalar"],
      nearbyAttractions: ["Navoiy nomidagi opera teatri", "Tasviriy san'at muzeyi", "Amir Temur maydoni"],
      description:
        "Bu o'tish stansiyasi o'zining madaniy ahamiyati va an'anaviy o'zbek naqshlari hamda zamonaviy arxitektura elementlarini o'z ichiga olgan chiroyli ichki dizayni bilan mashhur.",
    },
    Toshkent: {
      opened: "1980",
      depth: "20m",
      dailyPassengers: "52,000",
      architect: "Vladimir Kurbatov",
      history:
        "Toshkent metropoliteni tizimining asosiy stansiyasi bo'lib, markaziy transport markazi vazifasini bajaradi. Dastlab Sovet metro tizimining ulug'vorligini mahalliy o'zbek madaniy elementlari bilan namoyish etish uchun mo'ljallangan.",
      features: ["Asosiy terminal", "Savdo ob'ektlari", "Turistik ma'lumot markazi"],
      nearbyAttractions: ["Toshkent temir yo'l vokzali", "Chorsu bozori", "Ko'kaldosh madrasasi"],
      description:
        "Toshkent metropolitenining flagman stansiyasi bo'lib, Sovet monumentalizmi va an'anaviy o'zbek dizayn elementlarini uyg'unlashtirgan ta'sirchan arxitekturaga ega.",
    },
  }

  const lineColors = {
    red: "#DC2626",
    blue: "#2563EB",
    green: "#16A34A",
    yellow: "#CA8A04",
  }

  const lineNames = {
    red: "Chilonzor liniyasi",
    blue: "O'zbekiston liniyasi",
    green: "Yunusobod liniyasi",
    yellow: "Sirg'ali liniyasi",
  }

  const connections = [
    // Red line connections
    { from: "Olmazor", to: "Choshtepa" },
    { from: "Choshtepa", to: "O'zgarish" },
    { from: "O'zgarish", to: "Sergeli" },
    { from: "Sergeli", to: "Yangihayot" },
    { from: "Yangihayot", to: "Chinor" },
    { from: "Chilonzor", to: "Olmazor" },
    { from: "Mirzo Ulugbek", to: "Chilonzor" },
    { from: "Novza", to: "Mirzo Ulugbek" },
    { from: "Milliy bog'", to: "Novza" },
    { from: "Xalqlar do'stligi", to: "Milliy bog'" },
    { from: "Paxtakor", to: "Xalqlar do'stligi" },
    { from: "Paxtakor", to: "Mustaqillik maydoni" },
    { from: "Alisher Navoiy", to: "Paxtakor" },
    { from: "Amir Temur xiyoboni", to: "Mustaqillik maydoni" },
    { from: "Amir Temur xiyoboni", to: "Yunus Rajabiy" },
    { from: "Hamid Olimjon", to: "Amir Temur xiyoboni" },
    { from: "Pushkin", to: "Hamid Olimjon" },
    { from: "Buyuk ipak yo'li", to: "Pushkin" },
    // Blue line connections
    { from: "Beruniy", to: "Tinchlik" },
    { from: "Tinchlik", to: "Chorsu" },
    { from: "Chorsu", to: "G'afur G'ulom" },
    { from: "G'afur G'ulom", to: "Alisher Navoiy" },
    { from: "Alisher Navoiy", to: "O'zbekiston" },
    { from: "O'zbekiston", to: "Kosmonavtlar" },
    { from: "Kosmonavtlar", to: "Oybek" },
    { from: "Oybek", to: "Mingo'rik" },
    { from: "Oybek", to: "Toshkent" },
    { from: "Toshkent", to: "Do'stlik" },
    { from: "Do'stlik", to: "Texnopark" },
    // Green line connections
    { from: "Turkiston", to: "Yunusobod" },
    { from: "Yunusobod", to: "Shahriston" },
    { from: "Shahriston", to: "Bodomzor" },
    { from: "Bodomzor", to: "Minor" },
    { from: "Minor", to: "Abdulla Qodiriy" },
    { from: "Abdulla Qodiriy", to: "Yunus Rajabiy" },
    { from: "Yunus Rajabiy", to: "Amir Temur xiyoboni" },
    { from: "Yunus Rajabiy", to: "Mingo'rik" },
    // Yellow line connections
    { from: "Texnopark", to: "Yashnobod" },
    { from: "Yashnobod", to: "Tuzel" },
    { from: "Tuzel", to: "Olmos" },
    { from: "Olmos", to: "Rohat" },
    { from: "Rohat", to: "Yangiobod" },
    { from: "Yangiobod", to: "Qo'yliq" },
    { from: "Qo'yliq", to: "Matonat" },
    { from: "Matonat", to: "Qiyot" },
    { from: "Qiyot", to: "Tolariq" },
    { from: "Tolariq", to: "Xonobod" },
    { from: "Xonobod", to: "Quruvchilar" },
    { from: "Quruvchilar", to: "Turon" },
    { from: "Turon", to: "Qipchoq" },
    { from: "Qipchoq", to: "Chinor" },
  ]

  // Build adjacency graph for route finding
  const graph = useMemo(() => {
    const adj = {}
    Object.keys(stations).forEach((station) => {
      adj[station] = []
    })
    connections.forEach((conn) => {
      adj[conn.from].push(conn.to)
      adj[conn.to].push(conn.from)
    })
    return adj
  }, [])

  // Find shortest path using BFS
  const findRoute = useCallback(
    (origin, destination) => {
      if (!origin || !destination || origin === destination) return null
      const queue = [[origin]]
      const visited = new Set([origin])
      while (queue.length > 0) {
        const path = queue.shift()
        const current = path[path.length - 1]
        if (current === destination) {
          return path
        }
        for (const neighbor of graph[current] || []) {
          if (!visited.has(neighbor)) {
            visited.add(neighbor)
            queue.push([...path, neighbor])
          }
        }
      }
      return null
    },
    [graph],
  )

  // Generate text directions
  const generateDirections = useCallback((route) => {
    if (!route || route.length < 2) return []
    const directions = []
    let currentLine = stations[route[0]].line
    let stationsOnCurrentLine = [route[0]]
    for (let i = 1; i < route.length; i++) {
      const station = route[i]
      const stationLine = stations[station].line
      if (stationLine === currentLine) {
        stationsOnCurrentLine.push(station)
      } else {
        // Line change
        if (stationsOnCurrentLine.length > 1) {
          directions.push({
            type: "travel",
            line: currentLine,
            from: stationsOnCurrentLine[0],
            to: stationsOnCurrentLine[stationsOnCurrentLine.length - 1],
            stations: stationsOnCurrentLine.length - 1,
          })
        }
        directions.push({
          type: "transfer",
          station: stationsOnCurrentLine[stationsOnCurrentLine.length - 1],
          fromLine: currentLine,
          toLine: stationLine,
        })
        currentLine = stationLine
        stationsOnCurrentLine = [stationsOnCurrentLine[stationsOnCurrentLine.length - 1], station]
      }
    }
    // Add final segment
    if (stationsOnCurrentLine.length > 1) {
      directions.push({
        type: "travel",
        line: currentLine,
        from: stationsOnCurrentLine[0],
        to: stationsOnCurrentLine[stationsOnCurrentLine.length - 1],
        stations: stationsOnCurrentLine.length - 1,
      })
    }
    return directions
  }, [])

  const route = useMemo(() => {
    return findRoute(selectedOrigin, selectedDestination)
  }, [selectedOrigin, selectedDestination, findRoute])

  const directions = useMemo(() => {
    return generateDirections(route)
  }, [route, generateDirections])

  const handleGetDirections = () => {
    if (selectedOrigin && selectedDestination) {
      setShowDirections(true)
    }
  }

  const handleClearDirections = () => {
    setShowDirections(false)
    setSelectedOrigin("")
    setSelectedDestination("")
  }

  const handleZoomIn = () => {
    setTransform((prev) => ({ ...prev, scale: Math.min(prev.scale * 1.2, 5) }))
  }

  const handleZoomOut = () => {
    setTransform((prev) => ({ ...prev, scale: Math.max(prev.scale / 1.2, 0.3) }))
  }

  const handleReset = () => {
    setTransform({ x: 0, y: 0, scale: 1 })
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
    if (!isFullscreen) {
      // Reset transform when entering fullscreen for better UX
      setTransform({ x: 0, y: 0, scale: 0.8 })
    } else {
      // Reset to normal view when exiting fullscreen
      setTransform({ x: 0, y: 0, scale: 1 })
    }
  }

  // Handle escape key for fullscreen
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (showModal) {
          setShowModal(false)
        } else if (isFullscreen) {
          setIsFullscreen(false)
          setTransform({ x: 0, y: 0, scale: 1 })
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isFullscreen, showModal])

  // Setup non-passive touch event listeners
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0]
        setIsDragging(true)
        setDragStart({
          x: touch.clientX - transform.x,
          y: touch.clientY - transform.y,
        })
        e.preventDefault()
      }
    }

    const handleTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return
      const touch = e.touches[0]
      const newX = touch.clientX - dragStart.x
      const newY = touch.clientY - dragStart.y
      setTransform((prev) => ({
        ...prev,
        x: newX,
        y: newY,
      }))
      e.preventDefault()
    }

    const handleTouchEnd = (e) => {
      setIsDragging(false)
      e.preventDefault()
    }

    // Add non-passive event listeners
    container.addEventListener("touchstart", handleTouchStart, { passive: false })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })
    container.addEventListener("touchend", handleTouchEnd, { passive: false })

    return () => {
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isDragging, dragStart, transform])

  // Mouse handlers
  const handleMouseDown = useCallback(
    (e) => {
      setIsDragging(true)
      setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y })
    },
    [transform],
  )

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return
      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y
      setTransform((prev) => ({
        ...prev,
        x: newX,
        y: newY,
      }))
    },
    [isDragging, dragStart],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleWheel = useCallback(
    (e) => {
      e.preventDefault()
      const delta = e.deltaY > 0 ? 0.9 : 1.1
      const maxScale = isFullscreen ? 8 : 3
      const minScale = isFullscreen ? 0.2 : 0.5
      setTransform((prev) => ({
        ...prev,
        scale: Math.max(minScale, Math.min(maxScale, prev.scale * delta)),
      }))
    },
    [isFullscreen],
  )

  // Handle station click
  const handleStationClick = (stationName, e) => {
    e.stopPropagation()
    setSelectedStationName(stationName)
    setShowModal(true)
  }

  // Get station details with fallback
  const getStationDetails = (stationName) => {
    const station = stations[stationName]
    const details = stationDetails[stationName]
    return {
      ...station,
      opened: details?.opened || "1980-yillar",
      depth: details?.depth || "15-25m",
      dailyPassengers: details?.dailyPassengers || "25,000",
      architect: details?.architect || "Sovet metro arxitektorlari",
      history:
        details?.history ||
        `${station?.nameUz} stansiyasi Toshkent metropoliteni tizimining muhim qismi bo'lib, har kuni minglab yo'lovchilarga xizmat ko'rsatadi va shaharning turli qismlarini bog'laydi.`,
      features: details?.features || ["Zamonaviy qulayliklar", "Nogironlar uchun qulayliklar", "Xavfsizlik tizimlari"],
      nearbyAttractions: details?.nearbyAttractions || [
        "Mahalliy diqqatga sazovor joylar",
        "Savdo hududlari",
        "Madaniy ob'ektlar",
      ],
      description:
        details?.description ||
        `Zamonaviy qulayliklarga ega va ${
          lineNames[station?.line]
        } tarmog'ida muhim transport markazi bo'lib xizmat qiladigan yaxshi loyihalashtirilgan metro stansiyasi.`,
    }
  }

  const sidebarStationDetails = selectedStationName ? getStationDetails(selectedStationName) : null

  return (
    <div className={`${isFullscreen ? "fixed inset-0 z-50 bg-white" : "container mx-auto px-2 sm:px-4 lg:px-6"}`}>
      <Card className={`border-none ${isFullscreen ? "h-full" : "mt-4 sm:mt-10"} shadow-none`}>
        {!isFullscreen && (
          <CardHeader className="text-center border-none shadow-none px-2 sm:px-4 lg:px-0">
            <CardTitle className="text-2xl sm:text-4xl lg:text-5xl font-bold text-blue-900 mb-2">
              Toshkent Metropoliteni
            </CardTitle>
            {/* Route Planning Section */}
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 lg:p-6 rounded-xl shadow-sm bg-white border border-gray-100">
              <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-3 sm:mb-4 flex items-center justify-center gap-2 text-blue-900">
                <Navigation className="w-4 h-4 sm:w-5 sm:h-5 text-blue-700" />
                Yo'nalish olish
              </h3>
              <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-1 lg:grid-cols-3 sm:gap-4 items-end">
                <div className="space-y-3 sm:space-y-4 sm:col-span-1 lg:col-span-2 sm:grid sm:grid-cols-2 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold mb-2 text-blue-900">Qayerdan:</label>
                    <Select value={selectedOrigin} onValueChange={setSelectedOrigin}>
                      <SelectTrigger className="w-full bg-transparent border-2 border-blue-900 text-blue-900 placeholder:text-blue-700 focus:ring-blue-900 data-[state=open]:border-blue-900 data-[state=open]:ring-blue-900 h-10 sm:h-11">
                        <SelectValue placeholder="Stansiyani tanlang" />
                      </SelectTrigger>
                      <SelectContent className="border-blue-900 bg-white text-blue-900 max-h-60">
                        {Object.entries(stations).map(([key, station]) => (
                          <SelectItem
                            key={key}
                            value={key}
                            className="text-blue-900 hover:bg-blue-100 focus:bg-blue-100"
                          >
                            {station.nameUz}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold mb-2 text-blue-900">Qayerga:</label>
                    <Select value={selectedDestination} onValueChange={setSelectedDestination}>
                      <SelectTrigger className="w-full bg-transparent border-2 border-blue-900 text-blue-900 placeholder:text-blue-700 focus:ring-blue-900 data-[state=open]:border-blue-900 data-[state=open]:ring-blue-900 h-10 sm:h-11">
                        <SelectValue placeholder="Stansiyani tanlang" />
                      </SelectTrigger>
                      <SelectContent className="border-blue-900 bg-white text-blue-900 max-h-60">
                        {Object.entries(stations).map(([key, station]) => (
                          <SelectItem
                            key={key}
                            value={key}
                            className="text-blue-900 hover:bg-blue-100 focus:bg-blue-100"
                          >
                            {station.nameUz}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2 sm:col-span-1">
                  <Button
                    onClick={handleGetDirections}
                    disabled={!selectedOrigin || !selectedDestination}
                    className="flex-1 bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2.5 px-3 sm:px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed text-sm sm:text-base h-10 sm:h-11"
                  >
                    Yo'nalish
                  </Button>
                  {showDirections && (
                    <Button
                      onClick={handleClearDirections}
                      variant="outline"
                      size="icon"
                      className="border-2 border-blue-300 text-blue-700 hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 bg-transparent h-10 w-10 sm:h-11 sm:w-11"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
            {/* Directions Display */}
            {showDirections && route && (
              <div className="mt-4 p-3 sm:p-4 bg-green-50 rounded-lg text-left border border-green-200">
                <h4 className="font-semibold text-green-800 mb-3 text-sm sm:text-base">
                  {stations[selectedOrigin].nameUz} dan {stations[selectedDestination].nameUz} ga yo'nalish:
                </h4>
                <div className="space-y-2">
                  {directions.map((dir, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mt-0.5 flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        {dir.type === "travel" ? (
                          <p className="text-xs sm:text-sm">
                            <span className="font-medium" style={{ color: lineColors[dir.line] }}>
                              {lineNames[dir.line]}
                            </span>{" "}
                            orqali {stations[dir.from].nameUz} dan {stations[dir.to].nameUz} ga boring
                            <span className="text-gray-600"> ({dir.stations} stansiya)</span>
                          </p>
                        ) : (
                          <p className="text-xs sm:text-sm">
                            <span className="font-medium">{stations[dir.station].nameUz}</span> da{" "}
                            <span style={{ color: lineColors[dir.fromLine] }}>{lineNames[dir.fromLine]}</span> dan{" "}
                            <span style={{ color: lineColors[dir.toLine] }}>{lineNames[dir.toLine]}</span> ga o'ting
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-green-200">
                  <p className="text-xs sm:text-sm text-green-700">
                    <strong>Jami:</strong> {route.length - 1} stansiya, taxminan {Math.ceil((route.length - 1) * 2)}{" "}
                    daqiqa
                  </p>
                </div>
              </div>
            )}
            {/* Line Legend */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 mt-4 px-2">
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-600 rounded flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-blue-800 whitespace-nowrap">Chilonzor liniyasi</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-600 rounded flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-blue-800 whitespace-nowrap">O'zbekiston liniyasi</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-600 rounded flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-blue-800 whitespace-nowrap">Yunusobod liniyasi</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-600 rounded flex-shrink-0"></div>
                <span className="text-xs sm:text-sm text-blue-800 whitespace-nowrap">Sirg'ali liniyasi</span>
              </div>
            </div>
          </CardHeader>
        )}
        <CardContent className={`${isFullscreen ? "h-full p-0" : "px-2 sm:px-4 lg:px-0"}`}>
          <div
            className={`${isFullscreen ? "mb-2" : "mb-4"} flex justify-center gap-1 sm:gap-2 ${
              isFullscreen
                ? "absolute top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-10 bg-white/95 backdrop-blur-sm rounded-lg p-1 sm:p-2 shadow-lg"
                : ""
            }`}
          >
            <Button
              onClick={handleZoomIn}
              size="sm"
              variant="outline"
              className="border-2 border-blue-300 text-blue-700 hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 bg-white/95 h-8 w-8 sm:h-10 sm:w-10 p-0"
            >
              <ZoomIn className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
            <Button
              onClick={handleZoomOut}
              size="sm"
              variant="outline"
              className="border-2 border-blue-300 text-blue-700 hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 bg-white/95 h-8 w-8 sm:h-10 sm:w-10 p-0"
            >
              <ZoomOut className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
            <Button
              onClick={handleReset}
              size="sm"
              variant="outline"
              className="text-blue-700 hover:bg-blue-100 hover:border-blue-100 transition-all duration-200 bg-white/95 h-8 w-8 sm:h-10 sm:w-10 p-0"
            >
              <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
            <Button
              onClick={toggleFullscreen}
              size="sm"
              variant="outline"
              className="border-2 border-blue-300 text-blue-700 hover:bg-blue-100 hover:border-blue-400 transition-all duration-200 bg-white/95 h-8 w-8 sm:h-10 sm:w-10 p-0"
            >
              {isFullscreen ? (
                <Minimize className="w-3 h-3 sm:w-4 sm:h-4" />
              ) : (
                <Maximize className="w-3 h-3 sm:w-4 sm:h-4" />
              )}
            </Button>
          </div>
          <div
            ref={containerRef}
            className={`relative overflow-hidden rounded-xl shadow-lg bg-gray-50 ${isFullscreen ? "h-screen" : ""}`}
            style={{
              height: isFullscreen ? "100vh" : "500px",
              minHeight: isFullscreen ? "100vh" : "400px",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          >
            <svg
              ref={svgRef}
              viewBox="0 0 900 1000"
              className="w-full h-full cursor-grab active:cursor-grabbing select-none"
              style={{
                transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
                transformOrigin: "center center",
                transition: isDragging ? "none" : "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <defs>
                {/* Gradients for lines */}
                <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#DC2626" />
                  <stop offset="100%" stopColor="#B91C1C" />
                </linearGradient>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#1D4ED8" />
                </linearGradient>
                <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#16A34A" />
                  <stop offset="100%" stopColor="#15803D" />
                </linearGradient>
                <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#CA8A04" />
                  <stop offset="100%" stopColor="#A16207" />
                </linearGradient>
                {/* Route gradient */}
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                {/* Drop shadow filter */}
                <filter id="dropshadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
                </filter>
              </defs>
              {/* Draw connections/lines with improved styling */}
              {connections.map((connection, index) => {
                const fromStation = stations[connection.from]
                const toStation = stations[connection.to]
                if (!fromStation || !toStation) return null
                return (
                  <g key={index}>
                    {/* Outer glow */}
                    <line
                      x1={fromStation.x}
                      y1={fromStation.y}
                      x2={toStation.x}
                      y2={toStation.y}
                      stroke={lineColors[fromStation.line]}
                      strokeWidth="8"
                      strokeLinecap="round"
                      opacity="0.3"
                    />
                    {/* Main line */}
                    <line
                      x1={fromStation.x}
                      y1={fromStation.y}
                      x2={toStation.x}
                      y2={toStation.y}
                      stroke={`url(#${fromStation.line}Gradient)`}
                      strokeWidth="5"
                      strokeLinecap="round"
                      filter="url(#dropshadow)"
                    />
                  </g>
                )
              })}
              {/* Draw route path in green */}
              {showDirections && route && route.length > 1 && (
                <g>
                  {route.slice(0, -1).map((stationName, index) => {
                    const fromStation = stations[stationName]
                    const toStation = stations[route[index + 1]]
                    if (!fromStation || !toStation) return null
                    return (
                      <g key={`route-${index}`}>
                        {/* Route glow */}
                        <line
                          x1={fromStation.x}
                          y1={fromStation.y}
                          x2={toStation.x}
                          y2={toStation.y}
                          stroke="#10B981"
                          strokeWidth="12"
                          strokeLinecap="round"
                          opacity="0.4"
                        />
                        {/* Main route line */}
                        <line
                          x1={fromStation.x}
                          y1={fromStation.y}
                          x2={toStation.x}
                          y2={toStation.y}
                          stroke="url(#routeGradient)"
                          strokeWidth="8"
                          strokeLinecap="round"
                          filter="url(#dropshadow)"
                        />
                      </g>
                    )
                  })}
                </g>
              )}
              {/* Draw stations with improved styling */}
              {Object.entries(stations).map(([name, station]) => {
                const isOnRoute = showDirections && route && route.includes(name)
                const isOrigin = name === selectedOrigin
                const isDestination = name === selectedDestination
                return (
                  <g key={name}>
                    {/* Station outer ring */}
                    <circle
                      cx={station.x}
                      cy={station.y}
                      r={isOnRoute ? "15" : "12"}
                      fill={isOnRoute ? "#10B981" : lineColors[station.line]}
                      opacity="0.3"
                    />
                    {/* Station main circle */}
                    <circle
                      cx={station.x}
                      cy={station.y}
                      r={isOnRoute ? "11" : "9"}
                      fill="white"
                      stroke={isOnRoute ? "#10B981" : lineColors[station.line]}
                      strokeWidth={isOnRoute ? "4" : "3"}
                      filter="url(#dropshadow)"
                      className="cursor-pointer hover:r-11 transition-all duration-200"
                      onClick={(e) => handleStationClick(name, e)}
                    />
                    {/* Station inner dot */}
                    <circle
                      cx={station.x}
                      cy={station.y}
                      r={isOnRoute ? "6" : "4"}
                      fill={isOnRoute ? "#10B981" : lineColors[station.line]}
                      opacity="0.8"
                      className="cursor-pointer"
                      onClick={(e) => handleStationClick(name, e)}
                    />
                    {/* Origin/Destination markers */}
                    {isOrigin && (
                      <text
                        x={station.x}
                        y={station.y + 3}
                        textAnchor="middle"
                        className="text-xs font-bold fill-white pointer-events-none"
                        style={{ fontSize: "10px" }}
                      >
                        A
                      </text>
                    )}
                    {isDestination && (
                      <text
                        x={station.x}
                        y={station.y + 3}
                        textAnchor="middle"
                        className="text-xs font-bold fill-white pointer-events-none"
                        style={{ fontSize: "10px" }}
                      >
                        B
                      </text>
                    )}
                    {/* Station name in Uzbek Latin */}
                    <text
                      x={station.x}
                      y={station.y - (isOnRoute ? 22 : 18)}
                      textAnchor="middle"
                      className={`text-xs font-semibold pointer-events-none ${
                        isOnRoute ? "fill-green-800" : "fill-blue-900"
                      }`}
                      style={{
                        fontSize: isOnRoute ? "12px" : "10px",
                        textShadow: "1px 1px 2px rgba(255,255,255,0.9), -1px -1px 2px rgba(255,255,255,0.9)",
                      }}
                    >
                      {station.nameUz}
                    </text>
                  </g>
                )
              })}
              {/* Transfer stations indicators */}
              {["Alisher Navoiy", "Amir Temur xiyoboni", "Do'stlik", "Mingo'rik"].map((stationName) => {
                const station = stations[stationName]
                if (!station) return null
                return (
                  <g key={`transfer-${stationName}`}>
                    <circle
                      cx={station.x}
                      cy={station.y}
                      r="18"
                      fill="none"
                      stroke="#1e3a8a"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      opacity="0.7"
                    />
                    <text
                      x={station.x + 25}
                      y={station.y - 25}
                      className="text-xs font-bold fill-blue-800"
                      style={{
                        fontSize: "10px",
                        textShadow: "1px 1px 2px rgba(255,255,255,0.9)",
                      }}
                    >
                      Transfer
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>
          {!isFullscreen && (
            <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-blue-700">
              <p className="mt-1">
                Zoom: {Math.round(transform.scale * 100)}% | Pan va zoom uchun suring | Stansiya ma'lumotlari uchun
                bosing
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      {/* Station Details Modal */}
      {showModal && sidebarStationDetails && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4  bg-opacity-50 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-blue-900 p-4 sm:p-6 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: lineColors[sidebarStationDetails.line],
                  }}
                />
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white truncate">
                    {sidebarStationDetails.nameUz}
                  </h2>
                  <p className="text-sm sm:text-base text-blue-200 truncate">({sidebarStationDetails.nameEn})</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowModal(false)}
                className="text-white hover:bg-blue-800 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0"
                aria-label="Yopish"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="p-4 sm:p-6 space-y-6">
                {/* Station Image */}
                <div className="relative h-48 sm:h-64 lg:h-80 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={`/placeholder.svg?height=320&width=800&text=${encodeURIComponent(
                      sidebarStationDetails.nameUz + " Stansiyasi",
                    )}`}
                    alt={`${sidebarStationDetails.nameUz} stansiyasi`}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end">
                    <div className="p-4 sm:p-6 text-white">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold">{sidebarStationDetails.nameUz}</h3>
                      <p className="text-sm sm:text-base opacity-90">{lineNames[sidebarStationDetails.line]}</p>
                    </div>
                  </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 sm:p-6 rounded-lg text-center shadow-sm border border-blue-100">
                    <Clock className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3 text-blue-600" />
                    <div className="text-sm text-gray-600 mb-1">Ochilgan</div>
                    <div className="font-semibold text-blue-900 text-lg">{sidebarStationDetails.opened}</div>
                  </div>
                  <div className="bg-blue-50 p-4 sm:p-6 rounded-lg text-center shadow-sm border border-blue-100">
                    <MapPin className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3 text-blue-600" />
                    <div className="text-sm text-gray-600 mb-1">Chuqurlik</div>
                    <div className="font-semibold text-blue-900 text-lg">{sidebarStationDetails.depth}</div>
                  </div>
                  <div className="bg-blue-50 p-4 sm:p-6 rounded-lg text-center shadow-sm border border-blue-100">
                    <Users className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3 text-blue-600" />
                    <div className="text-sm text-gray-600 mb-1">Kunlik yo'lovchi</div>
                    <div className="font-semibold text-blue-900 text-lg">{sidebarStationDetails.dailyPassengers}</div>
                  </div>
                  <div className="bg-blue-50 p-4 sm:p-6 rounded-lg text-center shadow-sm border border-blue-100">
                    <Train className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3 text-blue-600" />
                    <div className="text-sm text-gray-600 mb-1">Liniya</div>
                    <div className="font-semibold text-lg" style={{ color: lineColors[sidebarStationDetails.line] }}>
                      {lineNames[sidebarStationDetails.line].split(" ")[0]}
                    </div>
                  </div>
                </div>

                {/* Two Column Layout for larger screens */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* History Section */}
                    <div className="bg-blue-50 p-4 sm:p-6 rounded-lg shadow-md border border-blue-100">
                      <h4 className="text-lg sm:text-xl font-semibold mb-4 text-blue-900 flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Tarix
                      </h4>
                      <p className="text-gray-800 leading-relaxed text-sm sm:text-base mb-4">
                        {sidebarStationDetails.history}
                      </p>
                      <Badge variant="outline" className="border-blue-300 text-blue-700 bg-blue-100 text-sm">
                        Arxitektor: {sidebarStationDetails.architect}
                      </Badge>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold mb-4 text-blue-900 flex items-center gap-2">
                        <Train className="w-5 h-5" />
                        Xususiyatlar
                      </h4>
                      <div className="space-y-3">
                        {sidebarStationDetails.features.map((feature, index) => (
                          <div
                            key={index}
                            className="bg-blue-100 p-4 rounded-lg shadow-sm border border-blue-200 flex items-center gap-3"
                          >
                            <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                            <div className="text-sm sm:text-base font-medium text-blue-800">{feature}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Gallery */}
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold mb-4 text-blue-900 flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Galereya
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="relative h-24 sm:h-32 bg-gray-200 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 shadow-md border border-gray-300 cursor-pointer"
                          >
                            <img
                              src={`/placeholder.svg?height=128&width=200&text=Galereya ${i}`}
                              alt={`${sidebarStationDetails.nameUz} galereyasi ${i}`}
                              className="w-full h-full object-cover opacity-80"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Nearby Attractions */}
                    <div>
                      <h4 className="text-lg sm:text-xl font-semibold mb-4 text-blue-900 flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        Yaqin atrofdagi joylar
                      </h4>
                      <div className="space-y-3">
                        {sidebarStationDetails.nearbyAttractions.map((attraction, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 sm:p-4 bg-blue-100 rounded-lg shadow-sm border border-blue-200 hover:bg-blue-200 transition-colors cursor-pointer"
                          >
                            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                            <span className="text-sm sm:text-base text-blue-800">{attraction}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description - Full Width */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-lg shadow-md border border-blue-100">
                  <h4 className="text-lg sm:text-xl font-semibold mb-4 text-blue-900 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Batafsil ma'lumot
                  </h4>
                  <p className="text-gray-800 leading-relaxed text-sm sm:text-base">
                    {sidebarStationDetails.description}
                  </p>
                </div>

                {/* Video Section */}
                <div>
                  <h4 className="text-lg sm:text-xl font-semibold mb-4 text-blue-900 flex items-center gap-2">
                    <Train className="w-5 h-5" />
                    Virtual tur
                  </h4>
                  <div className="relative h-48 sm:h-64 bg-gray-200 rounded-lg overflow-hidden shadow-md border border-gray-300">
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                      <div className="text-center text-gray-800">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-red-700 transition-colors shadow-lg">
                          <svg
                            className="w-6 h-6 sm:w-8 sm:h-8 ml-1 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <p className="text-sm sm:text-base font-medium">Virtual tur: {sidebarStationDetails.nameUz}</p>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">360° ko'rinish</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
