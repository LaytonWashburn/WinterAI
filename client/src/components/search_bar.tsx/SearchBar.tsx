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


// import style from './SearchBar.module.css';


// export const SearchBar = () => {


//     return (
//         <div id={style.search_bar} className="">
//             <div id={style.search_left}>Search</div>
//             <input id={style.search_input} type="text" placeholder="Search..." />
//             <div id={style.search_right} className="material-symbols-outlined">search</div>
//         </div>
//     )
// }