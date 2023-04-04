import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import '../styles.css';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  //* Значення інпута записуємо в стейт
  const handleChangeSearchQuery = e => {
    const searchQuery = e.currentTarget.value.toLowerCase();
    setSearchQuery(searchQuery);
  };

  //*  Передаємо в App значення searchQuery і очищуємо форму
  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <label className="SearchForm-button-label">
            <BsSearch />
          </label>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleChangeSearchQuery}
        />
      </form>
    </header>
  );
};
