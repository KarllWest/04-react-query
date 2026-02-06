import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ReactPaginateImport from 'react-paginate'; 

import SearchBar from '../SearchBar/SearchBar';
import MovieList from '../MovieList/MovieList';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { fetchMovies } from '../../api/tmdb';
import type { FetchMoviesResponse } from '../../types/movie'; 
import css from './App.module.css';

// @ts-ignore
const ReactPaginate = ReactPaginateImport.default || ReactPaginateImport;

const App = () => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const { data, isLoading, isError, error } = useQuery<FetchMoviesResponse, Error>({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: !!query,
    placeholderData: keepPreviousData, 
  });

  const handlePageClick = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = data?.total_pages 
    ? Math.min(data.total_pages, 500) 
    : 0;

  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} />

      {isLoading && <Loader />}
      
      {isError && <ErrorMessage message={error.message} />}

      {data && data.results.length > 0 && <MovieList movies={data.results} />}
      
      {data && data.results.length === 0 && query && !isLoading && (
        <p className={css.noResults}>No movies found matching your query.</p>
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
    </div>
  );
};

export default App;