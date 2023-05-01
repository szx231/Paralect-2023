import { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import catalogues from '../../../store/catalogues/index';
import s from './OptionList.module.css';

export const OptionList = observer(({ active, toggleActive }) => {
  const changeCategory = (title) => {
    catalogues.changeCurrentCategory(title);
    toggleActive();
  };

  return (
    <div style={{ height: !active && '0px' }} className={s.container}>
      {catalogues.jobCatalogues.map((item) => (
        <button type="button" onClick={() => changeCategory(item.title)} className={s.title} key={item.key}>
          {item.title}
        </button>
      ))}
    </div>
  );
});
