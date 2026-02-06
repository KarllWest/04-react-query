import type { Movie } from '../../types/movie';
import MovieCard from '../MovieCard/MovieCard';
import css from './MovieList.module.css';

interface MovieListProps {
  movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.item}>
          <MovieCard movie={movie} />
        </li>
      ))}
    </ul>
  );
};

export default MovieList;