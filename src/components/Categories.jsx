

export const Categories = ({categoryValue, onChangeCategory}) => {
  const Categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className='categories'>
      <ul>
        {Categories.map((category, index) => (
          <li
            onClick={() => onChangeCategory(index)}
            className={categoryValue === index ? 'active' : ''}
            key={index}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
