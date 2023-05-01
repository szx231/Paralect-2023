import s from './Input.module.css';

export const Input = ({ name, value, placeholder, onChange, increment, decrement }) => {
  return (
    <div className={s.container}>
      <input
        onFocus={(e) => {
          if (e.target.value === 'От' || e.target.value === 'До') {
            e.target.value = '';
          }
        }}
        onChange={(e) => onChange(e)}
        value={value}
        placeholder={placeholder}
        name={name}
        className={s.input}
      />
      <div className={s.controlls}>
        <button className={s.resetButton} onClick={increment} type="button">
          <img
            id={name}
            className={s.controlls__left}
            alt="arrowUp"
            src="../../../../public/filter/salary/upArrow.svg"
          />
        </button>
        <button className={s.resetButton} onClick={decrement} type="button">
          <img
            id={name}
            className={s.controlls__right}
            alt="arrowDown"
            src="../../../../public/filter/salary/downArrow.svg"
          />
        </button>
      </div>
    </div>
  );
};
