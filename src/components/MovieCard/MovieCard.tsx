import type { Movie } from '../../types/movie';
import css from './MovieCard.module.css';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/500x750?text=No+Poster';

  return (
    <div className={css.card}>
      <img src={posterUrl} alt={movie.title} className={css.image} />
      <div className={css.info}>
        <h3 className={css.title}>{movie.title}</h3>
        <p className={css.text}>Average vote: {movie.vote_average}</p>
      </div>
    </div>
  );
};

export default MovieCard;