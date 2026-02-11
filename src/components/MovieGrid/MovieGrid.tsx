import type { Movie } from '../../types/movie';
import MovieCard from '../MovieCard/MovieCard';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const MovieGrid = ({ movies, onSelect }: MovieGridProps) => {
  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.item}>
          <div onClick={() => onSelect(movie)}> 
            <MovieCard movie={movie} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;