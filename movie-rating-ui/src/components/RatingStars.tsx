import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export type RatingStarsProps = {
	value: number
	onChange?: (value: number) => void
	size?: number
	disabled?: boolean
	className?: string
}

function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max)
}

export function RatingStars({ value, onChange, size = 24, disabled = false, className }: RatingStarsProps) {
	const [hoverValue, setHoverValue] = useState<number | null>(null)
	const displayValue = hoverValue ?? value

	const stars = useMemo(() => [1, 2, 3, 4, 5], [])

	return (
		<div className={className} onMouseLeave={() => setHoverValue(null)}>
			<div className="flex items-center gap-1">
				{stars.map((starIndex) => {
					const active = displayValue >= starIndex
					return (
						<motion.button
							key={starIndex}
							type="button"
							disabled={disabled}
							className="p-1 disabled:opacity-50 disabled:cursor-not-allowed"
							whileHover={{ scale: disabled ? 1 : 1.15, rotate: disabled ? 0 : 3 }}
							whileTap={{ scale: disabled ? 1 : 0.9 }}
							transition={{ type: 'spring', stiffness: 400, damping: 20 }}
							onMouseEnter={() => !disabled && setHoverValue(starIndex)}
							onFocus={() => undefined}
							onClick={() => {
								if (disabled) return
								onChange?.(clamp(starIndex, 1, 5))
							}}
						>
							<Star
								width={size}
								height={size}
								className={active ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.7)]' : 'text-slate-400'}
								fill={active ? 'currentColor' : 'transparent'}
								strokeWidth={1.5}
							/>
						</motion.button>
					)
				})}
			</div>
		</div>
	)
}