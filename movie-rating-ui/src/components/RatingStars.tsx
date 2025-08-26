import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export type RatingStarsProps = {
	rating: number
	max?: number
	onChange?: (value: number) => void
	size?: number
}

export function RatingStars({ rating, max = 5, onChange, size = 24 }: RatingStarsProps) {
	const [hoverIndex, setHoverIndex] = useState<number | null>(null)
	const current = hoverIndex !== null ? hoverIndex + 1 : rating

	return (
		<div className="flex items-center gap-1 select-none">
			{Array.from({ length: max }).map((_, i) => {
				const active = i < current
				return (
					<motion.button
						key={i}
						whileHover={{ scale: 1.15, rotate: -3 }}
						whileTap={{ scale: 0.9 }}
						onMouseEnter={() => setHoverIndex(i)}
						onMouseLeave={() => setHoverIndex(null)}
						onFocus={() => setHoverIndex(i)}
						onBlur={() => setHoverIndex(null)}
						onClick={() => onChange?.(i + 1)}
						className="p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-brand/60 focus:ring-offset-2 focus:ring-offset-transparent"
						aria-label={`Rate ${i + 1} star${i === 0 ? '' : 's'}`}
					>
						<motion.span
							initial={false}
							animate={{
								filter: active ? 'drop-shadow(0 0 12px rgba(250,204,21,0.35))' : 'none',
							}}
							transition={{ type: 'spring', stiffness: 300, damping: 20 }}
						>
							<Star
								size={size}
								className={active ? 'text-yellow-400 fill-yellow-400' : 'text-white/30'}
							/>
						</motion.span>
					</motion.button>
				)
			})}
		</div>
	)
}