// src/components/MovieGrid/MovieGrid.tsx
import type { Movie } from '../../types/movie';
import MovieCard from '../MovieCard/MovieCard';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  // Ми видалили рядок: onMovieClick: (movie: Movie) => void;
}

const MovieGrid = ({ movies }: MovieGridProps) => {
  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.item}>
          {/* Ми видалили onClick={() => onMovieClick(movie)} */}
          <MovieCard movie={movie} />
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;