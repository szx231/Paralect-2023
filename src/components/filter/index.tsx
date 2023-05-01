import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import s from './Filter.module.css';
import { OptionList } from './optionList';
import catalogues from '../../store/catalogues/index';
import { Input } from '../ui/input';

const arrowLight = '../../../public/filter/arrowDown.svg';
const arrowBlue = '../../../public/filter/arrowBlue.svg';
const salaryItems = [
  {
    name: 'from',
    placeholder: 'От',
    value: 'От',
  },
  {
    name: 'to',
    placeholder: 'До',
    value: 'До',
  },
];

export const Filter = observer(() => {
  const [active, setActive] = useState(false);
  const [salaryRange, setSalaryRange] = useState([...salaryItems]);

  const toggleActive = () => setActive(!active);

  const decrement = (e) => {
    const { id } = e.target;
    const numberDecrement = 1000;
    return setSalaryRange((prev) => {
      return prev.map((el) => {
        if (el.name === id) {
          let newValue;
          if (typeof el.value === 'string') {
            newValue = numberDecrement;
          } else {
            newValue = el.value - numberDecrement;
          }
          return { ...el, value: newValue };
        }
        return el;
      });
    });
  };

  const increment = (e) => {
    const { id } = e.target;
    const numberDecrement = 1000;
    return setSalaryRange((prev) => {
      return prev.map((el) => {
        if (el.name === id) {
          let newValue;
          if (typeof el.value === 'string') {
            newValue = numberDecrement;
          } else {
            newValue = el.value + numberDecrement;
          }
          return { ...el, value: newValue };
        }
        return el;
      });
    });
  };

  useEffect(() => {
    catalogues.fetchFromGithub();
    catalogues.fetchVacanVacancies();
  }, []);

  useEffect(() => {
    document.addEventListener('click', () => setActive(false));
    return () => {
      document.removeEventListener('click', () => setActive(false));
    };
  }, []);

  const activeCategory = () => {
    const title = catalogues.currentCategory;
    return catalogues.jobCatalogues.findIndex((el) => el.title === title);
  };

  const changeInputValue = (e) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;

    if (targetName === 'from') {
      const valueIsNumber = !Number.isNaN(+targetValue);
      if (valueIsNumber) {
        return setSalaryRange((prev) => prev.map((el) => (el.name === 'from' ? { ...el, value: targetValue } : el)));
      }

      return alert('Можно вводить только цифры!');
    }

    if (targetName === 'to') {
      const valueIsNumber = !Number.isNaN(+targetValue);
      if (valueIsNumber) {
        return setSalaryRange((prev) => prev.map((el) => (el.name === 'to' ? { ...el, value: targetValue } : el)));
      }

      return alert('Можно вводить только цифры!');
    }
  };

  return (
    <section className={s.filter}>
      <div className={s.filter__header}>
        <h3 className={s.filter__title}>Фильтры</h3>
        <div className={s.filter__close}>
          <h4 className={s.filter__reset}>Сбросить все</h4>
          <button className={s.closeButton} type="button">
            <img src="./public/filter/cross.svg" alt="close" />
          </button>
        </div>
      </div>
      <h4 className={s.industry__title}>Отрасль</h4>
      <div className={s.industry__wrapp}>
        <button
          style={{
            border: active && '1px solid var(--color-blue)',
            color: activeCategory() === -1 ? 'var(--color-grey)' : 'var(--color-black)',
          }}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleActive();
          }}
          className={s.industry}
        >
          <div>{catalogues.currentCategory}</div>
          <img
            style={{ transform: active ? 'rotate(180deg)' : 'none' }}
            src={active ? arrowBlue : arrowLight}
            alt="arrow"
          />
          <OptionList toggleActive={toggleActive} active={active} />
        </button>
        <h4 className={s.industry__title}>Оклад</h4>
        {salaryRange.map(({ name, value }) => (
          <Input increment={increment} decrement={decrement} onChange={changeInputValue} name={name} value={value} />
        ))}
        <button className={s.search} type="button" onClick={() => console.log('1')}>
          Применить
        </button>
      </div>
    </section>
  );
});
