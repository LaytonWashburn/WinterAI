import style from './SearchBar.module.css';

export const SearchBar = () => {
  return (
    <div className={style.search_bar}>
      <div className={style.search_bar_inner}>
            <div className={style.search_left}>Search</div>
        <input
            className={style.search_input}
            type="text"
        />
        <div className={`${style.search_right} material-symbols-outlined`}>
            search
        </div>
      </div>
    </div>
  );
};