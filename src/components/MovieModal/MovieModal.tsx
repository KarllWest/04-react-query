import ReactModal from 'react-modal';
import type { Movie } from '../../types/movie';
import css from './MovieModal.module.css';

ReactModal.setAppElement('#root');

interface MovieModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedMovie: Movie | null; 
}

const MovieModal = ({ isOpen, onRequestClose, selectedMovie }: MovieModalProps) => {
  if (!selectedMovie) return null;

  const posterUrl = selectedMovie.poster_path
    ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
    : 'https://placehold.co/500x750?text=No+Poster';

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modal}
      overlayClassName={css.overlay}
      contentLabel="Movie Details"
      shouldCloseOnOverlayClick={true}
    >
      <div className={css.content}>
        <button onClick={onRequestClose} className={css.closeBtn}>×</button>
        <img src={posterUrl} alt={selectedMovie.title} className={css.image} />
        <div className={css.info}>
          <h2 className={css.title}>{selectedMovie.title}</h2>
          <p><strong>Rating:</strong> {selectedMovie.vote_average}</p>
          <p className={css.text}>{selectedMovie.overview}</p>
        </div>
      </div>
    </ReactModal>
  );
};

export default MovieModal;