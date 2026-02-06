export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
}

export interface FetchMoviesResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}