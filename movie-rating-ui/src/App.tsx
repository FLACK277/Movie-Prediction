import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Film, Sparkles } from 'lucide-react'
import type { Movie } from './components/MovieCard'
import { MovieGrid } from './components/MovieGrid'
import './App.css'

const SAMPLE_MOVIES: Movie[] = [
	{
		id: '1',
		title: 'Neon Nights',
		genre: 'Sci‑Fi',
		year: 2024,
		posterUrl: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1280&auto=format&fit=crop',
	},
	{
		id: '2',
		title: 'Echoes of Aurora',
		genre: 'Drama',
		year: 2022,
		posterUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963f?q=80&w=1280&auto=format&fit=crop',
	},
	{
		id: '3',
		title: 'Midnight Drive',
		genre: 'Thriller',
		year: 2021,
		posterUrl: 'https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?q=80&w=1280&auto=format&fit=crop',
	},
	{
		id: '4',
		title: 'Stellar Bloom',
		genre: 'Fantasy',
		year: 2023,
		posterUrl: 'https://images.unsplash.com/photo-1507878866276-a947ef722fee?q=80&w=1280&auto=format&fit=crop',
	},
	{
		id: '5',
		title: 'Crimson Alley',
		genre: 'Action',
		year: 2020,
		posterUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1280&auto=format&fit=crop',
	},
]

export default function App() {
	const [movies] = useState<Movie[]>(SAMPLE_MOVIES)
	const [ratings, setRatings] = useState<Record<string, number>>({})

	const averageRating = useMemo(() => {
		const values = Object.values(ratings)
		return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0
	}, [ratings])

	function handleRate(id: string, rating: number) {
		setRatings((prev) => ({ ...prev, [id]: rating }))
	}

	return (
		<div className="min-h-screen">
			{/* Decorative orbs */}
			<div className="pointer-events-none fixed inset-0">
				<motion.div
					className="absolute -top-24 -left-24 h-96 w-96 rounded-full blur-3xl"
					style={{ background: 'radial-gradient(circle at 30% 30%, rgba(244,114,182,0.35), transparent 60%)' }}
					initial={{ opacity: 0.3, scale: 0.9 }}
					animate={{ opacity: 0.5, scale: 1 }}
					transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror' }}
				/>
				<motion.div
					className="absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full blur-3xl"
					style={{ background: 'radial-gradient(circle at 70% 70%, rgba(99,102,241,0.35), transparent 60%)' }}
					initial={{ opacity: 0.3, scale: 0.9 }}
					animate={{ opacity: 0.5, scale: 1 }}
					transition={{ duration: 3, repeat: Infinity, repeatType: 'mirror' }}
				/>
			</div>

			<header className="sticky top-0 z-50 backdrop-blur-md/30">
				<div className="mx-auto max-w-7xl px-4 py-6">
					<div className="glass rounded-2xl px-5 py-4 flex items-center justify-between">
						<div className="flex items-center gap-3">
							<Film className="text-fuchsia-300" />
							<h1 className="text-lg md:text-2xl font-semibold tracking-tight">Cinematic Ratings</h1>
						</div>
						<div className="flex items-center gap-2 text-sm text-white/80">
							<Sparkles size={16} className="text-cyan-300" />
							<span className="hidden xs:inline">Avg:</span>
							<span className="font-semibold">{averageRating.toFixed(1)}</span>
						</div>
					</div>
				</div>
			</header>

			<main className="mx-auto max-w-7xl px-4 pb-20 pt-8">
				<div className="mb-8 md:mb-12">
					<motion.h2
						className="text-2xl md:text-4xl font-semibold tracking-tight"
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						Discover and rate your next favorite movie
					</motion.h2>
					<p className="text-white/70 max-w-prose mt-2">Interactive 3D cards with smooth animations, glassy surfaces, and neon glows—made with Tailwind and Framer Motion.</p>
				</div>

				<MovieGrid
					movies={movies}
					onRate={handleRate}
				/>
			</main>
		</div>
	)
}
