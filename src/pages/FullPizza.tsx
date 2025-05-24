// Импорт React для создания функционального компонента
import React from 'react';
// Импорт компонента Link из react-router-dom для навигации
import { Link } from 'react-router-dom';
// Импорт библиотеки axios для выполнения HTTP-запросов
import axios from 'axios';
// Импорт хуков useParams и useNavigate из react-router-dom для работы с параметрами URL и навигацией
import { useParams, useNavigate } from 'react-router-dom';

// Определение функционального компонента FullPizza
export const FullPizza: React.FC = () => {
  // Состояние для хранения данных о пицце, изначально undefined
  const [pizza, setPizza] = React.useState<{
    imageUrl: string; // URL изображения пиццы
    title: string; // Название пиццы
    price: number; // Цена пиццы
  }>();

  // Получение параметра id из URL
  const { id } = useParams();
  // Хук для программной навигации
  const navigate = useNavigate();

  // useEffect для выполнения запроса при монтировании компонента
  React.useEffect(() => {
    // Асинхронная функция для получения данных о пицце
    async function fetchPizza() {
      try {
        // Выполнение GET-запроса к API для получения данных пиццы по ID
        const { data } = await axios.get('https://626d16545267c14d5677d9c2.mockapi.io/items/' + id);
        // Установка полученных данных в состояние
        setPizza(data);
      } catch (error) {
        // Обработка ошибки: показ уведомления и перенаправление на главную страницу
        alert('Ошибка при получении пиццы!');
        navigate('/');
      }
    }

    // Вызов функции получения пиццы
    fetchPizza();
  }, []); // Пустой массив зависимостей, эффект срабатывает только при монтировании

  // Если данные о пицце еще не загружены, отображаем индикатор загрузки
  if (!pizza) {
    return <>Загрузка...</>;
  }

  // JSX для рендеринга компонента
  return (
    // Контейнер для содержимого страницы
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
      {/* Ссылка для возврата на главную страницу */}
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

