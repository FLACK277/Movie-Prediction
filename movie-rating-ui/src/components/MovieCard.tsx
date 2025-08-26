import { useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Clapperboard, Calendar, Film } from 'lucide-react'
import { RatingStars } from './RatingStars'

export type Movie = {
	id: string
	title: string
	genre: string
	year: number
	posterUrl: string
	rating: number
}

export function MovieCard({ movie, onRate }: { movie: Movie; onRate: (id: string, value: number) => void }) {
	const [localRating, setLocalRating] = useState(movie.rating)
	const x = useMotionValue(0)
	const y = useMotionValue(0)
	const rotateX = useTransform(y, [-50, 50], [8, -8])
	const rotateY = useTransform(x, [-50, 50], [-8, 8])

	function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
		const rect = e.currentTarget.getBoundingClientRect()
		const px = e.clientX - rect.left - rect.width / 2
		const py = e.clientY - rect.top - rect.height / 2
		x.set(px / 6)
		y.set(py / 6)
	}

	return (
		<motion.div
			className="relative group"
			style={{ perspective: 1000 }}
		>
			<motion.div
				onMouseMove={handleMouseMove}
				onMouseLeave={() => { x.set(0); y.set(0) }}
				style={{ rotateX, rotateY }}
				className="glass-panel gradient-ring shadow-depth overflow-hidden rounded-3xl w-full h-full"
			>
				<div className="relative">
					<img src={movie.posterUrl} alt={movie.title} className="h-72 w-full object-cover" />
					<div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/60" />
				</div>
				<div className="p-4 flex flex-col gap-3">
					<div className="flex items-start justify-between gap-3">
						<div>
							<h3 className="text-lg font-semibold tracking-tight">{movie.title}</h3>
							<div className="mt-1 text-sm text-white/70 flex items-center gap-3">
								<span className="inline-flex items-center gap-1"><Film size={16} className="text-white/40" />{movie.genre}</span>
								<span className="inline-flex items-center gap-1"><Calendar size={16} className="text-white/40" />{movie.year}</span>
							</div>
						</div>
						<motion.div
							className="hidden md:flex items-center justify-center rounded-full bg-white/5 border border-white/10 p-2"
							whileHover={{ scale: 1.06 }}
							transition={{ type: 'spring', stiffness: 250, damping: 18 }}
						>
							<Clapperboard size={20} className="text-white/70" />
						</motion.div>
					</div>

					<div className="flex items-center justify-between">
						<RatingStars
							rating={localRating}
							onChange={(v) => { setLocalRating(v); onRate(movie.id, v) }}
						/>
						<motion.span
							className="text-sm text-white/70 px-2 py-1 rounded-full bg-white/5 border border-white/10"
							animate={{ scale: [1, 1.05, 1] }}
							transition={{ duration: 0.6 }}
						>
							{localRating.toFixed(1)} / 5
						</motion.span>
					</div>
				</div>
			</motion.div>
		</motion.div>
	)
}