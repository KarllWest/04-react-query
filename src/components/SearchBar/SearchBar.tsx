import toast, { Toaster } from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleSubmit = (formData: FormData) => {
    const query = formData.get('query') as string;
    
    if (!query.trim()) {
      toast.error('Please enter a search term!');
      return; 
    }

    onSubmit(query);
  };

  return (
    <header className={css.header}>
      <form action={handleSubmit} className={css.form}>
        <input
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={css.input}
        />
        <button type="submit" className={css.btn}>
          Search
        </button>
      </form>
      <Toaster position="top-right" />
    </header>
  );
};

export default SearchBar;