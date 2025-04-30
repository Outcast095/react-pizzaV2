import { useState } from 'react';

export const Categories = () => {
  const Categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const [active, setActive] = useState(0);

  const onClickCategory = (index) => {
    setActive(index);
  };

  return (
    <div className='categories'>
      <ul>
        {Categories.map((category, index) => (
          <li
            onClick={() => onClickCategory(index)}
            className={active === index ? 'active' : ''}
            key={index}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
