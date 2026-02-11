import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ReactPaginateImport from 'react-paginate';
import { Toaster, toast } from 'react-hot-toast'; 

import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal'; 
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie'; 
import css from './App.module.css';

// @ts-ignore
const ReactPaginate = ReactPaginateImport.default || ReactPaginateImport;

const App = () => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const { data, isLoading, isError, error, isSuccess } = useQuery({ 
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: !!query,
    placeholderData: keepPreviousData, 
  });

  useEffect(() => {
    if (isSuccess && data && data.results.length === 0 && query) {
      toast.error('No movies found matching your query.');
    }
  }, [isSuccess, data, query]);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedMovie(null);
  };

  const totalPages = data?.total_pages ? Math.min(data.total_pages, 500) : 0;

  return (
    <div className={css.container}>
      <Toaster position="top-right" />
      
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage message={error.message} />}

      {data && data.results.length > 0 && (
        <MovieGrid 
          movies={data.results} 
          onSelect={openModal} 
        />
      )}
      
      {data && totalPages > 1 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel="→"
          previousLabel="←"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          pageCount={totalPages}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          renderOnZeroPageCount={null}
        />
      )}

      <MovieModal 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal} 
        selectedMovie={selectedMovie} 
      />
    </div>
  );
};

export default App;