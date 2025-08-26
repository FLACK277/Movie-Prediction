import { useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Clapperboard } from 'lucide-react'
import { RatingStars } from './RatingStars'

export type Movie = {
	id: string
	title: string
	genre: string
	year: number
	posterUrl: string
	initialRating?: number
}

export type MovieCardProps = {
	movie: Movie
	onRate?: (id: string, rating: number) => void
}

export function MovieCard({ movie, onRate }: MovieCardProps) {
	const [rating, setRating] = useState<number>(movie.initialRating ?? 0)
	// Initialize motion values for 3D tilt and hover effects
	const rotateX = useMotionValue(0)
	const rotateY = useMotionValue(0)
	const hover = useMotionValue(0)

	const shadow = useTransform(hover, [0, 1], ['0 10px 30px rgba(0,0,0,0.4)', '0 35px 80px rgba(0,0,0,0.65)'])
	const glowOpacity = useTransform(hover, [0, 1], [0.1, 0.35])
	const lift = useTransform(hover, [0, 1], [0, -8])

	function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		const edgePadding = 16
		const bounds = e.currentTarget.getBoundingClientRect()
		const x = clamp(e.clientX - bounds.left, edgePadding, bounds.width - edgePadding)
		const y = clamp(e.clientY - bounds.top, edgePadding, bounds.height - edgePadding)
		const px = x / bounds.width
		const py = y / bounds.height
		rotateY.set((px - 0.5) * 16)
		rotateX.set(-(py - 0.5) * 16)
	}

	function clamp(value: number, min: number, max: number) {
		return Math.min(Math.max(value, min), max)
	}

	return (
		<motion.div
			className="relative card-3d glass rounded-3xl overflow-hidden group"
			style={{ boxShadow: shadow }}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => hover.set(1)}
			onMouseLeave={() => {
				rotateX.set(0)
				rotateY.set(0)
				hover.set(0)
			}}
			transition={{ type: 'spring', stiffness: 200, damping: 20 }}
		>
			<motion.div
				className="relative"
				style={{ transform: 'perspective(900px)', rotateX, rotateY, y: lift }}
			>
				{/* Poster */}
				<div className="relative aspect-[2/3] w-full">
					<img
						src={movie.posterUrl}
						alt={`${movie.title} poster`}
						className="h-full w-full object-cover"
					/>
					{/* Gradient overlay */}
					<div className="absolute inset-0 cinematic-gradient" style={{ opacity: 0.2 }} />
					{/* Glow */}
					<motion.div
						className="absolute inset-0"
						style={{ background: 'radial-gradient(650px 200px at 50% 110%, rgba(255,255,255,0.15), transparent 60%)', opacity: glowOpacity }}
					/>
					{/* Top-left chip */}
					<div className="absolute left-3 top-3 glass rounded-full px-3 py-1 text-xs text-white/90 flex items-center gap-1">
						<Clapperboard size={14} className="text-fuchsia-300" />
						<span>{movie.genre}</span>
					</div>
				</div>

				{/* Info */}
				<div className="absolute inset-x-0 bottom-0 p-4 pt-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
					<div className="flex items-end justify-between gap-3">
						<div className="space-y-1">
							<h3 className="text-lg md:text-xl font-semibold tracking-tight drop-shadow-lg pop-3d">{movie.title}</h3>
							<p className="text-xs md:text-sm text-white/80">{movie.year}</p>
						</div>
						<motion.div initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }}>
							<RatingStars
								value={rating}
								onChange={(v) => {
									setRating(v)
									onRate?.(movie.id, v)
								}}
								className="pop-3d"
							/>
						</motion.div>
					</div>
				</div>
			</motion.div>
		</motion.div>
	)
}