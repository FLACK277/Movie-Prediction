import type { Movie } from './MovieCard'
import { MovieCard } from './MovieCard'

export type MovieGridProps = {
	movies: Movie[]
	onRate?: (id: string, rating: number) => void
}

export function MovieGrid({ movies, onRate }: MovieGridProps) {
	return (
		<div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
			{movies.map((m) => (
				<MovieCard key={m.id} movie={m} onRate={onRate} />
			))}
		</div>
	)
}