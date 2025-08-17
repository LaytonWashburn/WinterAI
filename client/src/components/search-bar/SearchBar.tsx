import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useErrorToast } from '../../hooks/useErrorToast';
import { ErrorToast } from '../error-toast/ErrorToast';
import style from './SearchBar.module.css';

export const SearchBar = () => {
  const [ query, setQuery ] = useState('');
  const navigate = useNavigate();
  const { isVisible, message, showError } = useErrorToast(5000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault();
  if (query && query.trim()) {
    navigate(`/services/career/search?query=${encodeURIComponent(query.trim())}`);
  } else {
    showError('No Search Query Provided, Please Input A Query'); // show the toast
  }
};

  return (
    <div id={style.search_bar}>
      <form onSubmit={handleSubmit} className={style.search_bar_inner}>
        <div className={style.search_left}>Search</div>
        <input
          className={style.search_input}
          onChange={handleChange}
          value={query}
          placeholder="Explore the web ..."
          type="text"
        />
        <button type="submit" style={{ display: 'none' }}></button>
        <div className={`${style.search_right} material-symbols-outlined`}>
          search
        </div>
      </form>
      {isVisible && <ErrorToast error_description={message || ''} />}
    </div>
  );
};
