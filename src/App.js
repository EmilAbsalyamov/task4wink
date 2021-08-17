import React, {useState} from 'react';
import './App.css';
import Episode from './components/Episode';
import useEventListener from '@use-it/event-listener'

function App() {
  // Дата которая якобы пришла к нам с бэка
  const dataFromAPI = [
    {
      episode: 1,
      duration: 23,
      status: 'Доступно',
      live: false
    },
    {
      episode: 2,
      duration: 20,
      status: 'Доступно',
      live: false
    },
    {
      episode: 3,
      duration: 25,
      status: 'Доступно',
      live: true
    },
    {
      episode: 4,
      duration: 19,
      status: 'Скоро',
      live: false
    },
    {
      episode: 5,
      duration: 20,
      status: 'Скоро',
      live: false
    },
    {
      episode: 6,
      duration: 23,
      status: 'Скоро',
      live: false
    },
    {
      episode: 7,
      duration: 27,
      status: 'Скоро',
      live: false
    },
    {
      episode: 8,
      duration: 21,
      status: 'Скоро',
      live: false
    },
    {
      episode: 9,
      duration: 25,
      status: 'Скоро',
      live: false
    },
    {
      episode: 10,
      duration: 18,
      status: 'Скоро',
      live: false
    },
    {
      episode: 11,
      duration: 22,
      status: 'Скоро',
      live: false
    }
  ]
  // local state для хранения выбранного компонента
  const [selected, setSelected] = useState(1) 

  const arrowKeys = ({ key }) => {
    if ((selected < dataFromAPI.length) && key === 'ArrowDown') {
      setSelected(selected + 1)
      window.scrollBy(0, 137)
      //тут подразумевалась работа с options чтобы сделать behavior: 'smooth'(чтобы скрол стал плавным) , но так и не получилось это
      //реализовать.
      //Думаю можно было бы навесить реф на каждый компонент и следить за положением на странице и делать скрол в зависимости от положения,но // насколько мне известно ,нужно стараться не использовать рефы,поэтому выбрал данное решение]
    }
    else if ((selected > 1) && key === 'ArrowUp') {
      setSelected(selected - 1)
      window.scrollBy(0, -137);
    }
  }
  useEventListener('keydown', arrowKeys);
//никогда до этого не сталкивался с такой задачей,весь вечер вот провел на stackoverflow уверен что решение не оптимальное но крайне не 
//хотелось лезть в DOM используюя рефы.Очень заинтересовали подобного рода задачи на работу с keyboardEvent)
//возможно я допустил архитектурные ошибки,тк давно не работал без апишки и редакса,в основном стараюсь строить работу с данными с thunk -ах 
//и максимально разгружать UI от логики.
//Решение подобных задач мне было бы интересно при работе в компании)
//Если нужно что то подправить или переделать,жду отклика,но старался писать так как сам представляю работу с ивентами клавиатуры

  
  const episodes = dataFromAPI.map((e) => {
    return (
      <Episode selected={selected} episode={e.episode}
        duration={e.duration} status={e.status}
        live={e.live} key={e.episode} />)
  })


  return (
    <div className="App">
      <div className={'content'}>
      <h1>1-й сезон</h1>
        {episodes}
      </div>
    </div>
  );
}

export default App;
