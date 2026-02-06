import axios from 'axios';
import type { FetchMoviesResponse } from '../types/movie';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query: string, page: number): Promise<FetchMoviesResponse> => {
  const { data } = await axios.get<FetchMoviesResponse>(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query: query,
      page: page,
      language: 'en-US',
      include_adult: false,
    },
  });
  return data;
};