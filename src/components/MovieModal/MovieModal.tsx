import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Movie } from '../../types/movie';
import css from './MovieModal.module.css';

interface MovieModalProps {
  movie: Movie;          
  onClose: () => void;   
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; 

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto'; 
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
    : 'https://placehold.co/600x400?text=No+Backdrop';

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button onClick={onClose} className={css.closeBtn}>
          ×
        </button>
        
        <img src={backdropUrl} alt={movie.title} className={css.image} />
        
        <div className={css.content}>
          <h2 className={css.title}>{movie.title}</h2>
          <p className={css.rating}><strong>Rating:</strong> {movie.vote_average}</p>
          <p className={css.date}><strong>Release Date:</strong> {movie.release_date}</p>
          <p className={css.text}>{movie.overview}</p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MovieModal;