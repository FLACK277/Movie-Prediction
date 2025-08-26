import { useState } from 'react'
import { movies as seed } from './data/movies'
import { MovieCard, type Movie } from './components/MovieCard'
import { motion } from 'framer-motion'
import { Film } from 'lucide-react'

function App() {
	const [movies, setMovies] = useState<Movie[]>(seed)

	function handleRate(id: string, value: number) {
		setMovies((prev) => prev.map((m) => (m.id === id ? { ...m, rating: value } : m)))
	}

	return (
		<div className="min-h-dvh bg-cinema grain">
			<header className="px-6 md:px-10 py-8">
				<div className="max-w-7xl mx-auto flex items-center gap-4">
					<div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-brand to-sky-500 flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(124,58,237,0.6)]">
						<Film className="text-white" />
					</div>
					<div>
						<h1 className="text-2xl md:text-3xl font-semibold tracking-tight" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>CineGlow</h1>
						<p className="text-white/70 text-sm">Rate movies in a cinematic, immersive UI</p>
					</div>
				</div>
			</header>

			<main className="px-6 md:px-10 pb-16">
				<div className="max-w-7xl mx-auto">
					<motion.div
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
					>
						{movies.map((m) => (
							<motion.div key={m.id} layout>
								<MovieCard movie={m} onRate={handleRate} />
							</motion.div>
						))}
					</motion.div>
				</div>
			</main>
		</div>
	)
}

export default App
