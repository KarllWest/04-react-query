import { type FormEvent, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [value, setValue] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) {
      toast.error('Please enter a search term!');
      return;
    }
    onSearch(value);
    setValue('');
  };

  return (
    <header className={css.header}>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className={css.button}>Search</button>
      </form>
    </header>
  );
};

export default SearchBar;