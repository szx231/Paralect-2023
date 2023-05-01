import s from './search.module.css';

export const Search = () => {
  return (
    <div className={s.container}>
      <img className={s.icon} alt="loop" src="../../../public/search/Search.svg" />
      <input placeholder="Введите название вакансии" className={s.input} />
      <button className={s.searchButton} type="button">
        Поиск
      </button>
    </div>
  );
};
