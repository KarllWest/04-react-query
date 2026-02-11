import axios from 'axios';
import type { Movie } from '../types/movie';

interface FetchMoviesResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

const API_KEY = import.meta.env.VITE_TMDB_API_KEY; 
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query: string, page: number): Promise<FetchMoviesResponse> => {
  const options = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: 'application/json',
    },
    params: {
      query,
      page,
      include_adult: false,
      language: 'en-US',
    },
  };

  const response = await axios.get<FetchMoviesResponse>(
    `${BASE_URL}/search/movie`,
    options
  );

  return response.data;
};