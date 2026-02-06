import type { Movie } from '../../types/movie';
import css from './MovieCard.module.css';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Poster';

  return (
    <div className={css.card}>
      <img src={posterUrl} alt={movie.title} className={css.image} />
      <div className={css.info}>
        <h3 className={css.title}>{movie.title}</h3>
        <p>Release: {movie.release_date}</p>
        <p>Rating: {movie.vote_average}</p>
      </div>
    </div>
  );
};

export default MovieCard;