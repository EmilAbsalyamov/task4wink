import React, {useState, useRef, useEffect} from 'react';
import './App.css';
import Episode from './components/Episode';
import useEventListener from '@use-it/event-listener'

function App() {
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

  const [selected, setSelected] = useState(1) //выбранная серия

  const arrowKeys = ({ key }) => {
    if ((selected < dataFromAPI.length) && key === 'ArrowDown') {
      setSelected(selected + 1)
    }
    else if ((selected > 1) && key === 'ArrowUp') {
      setSelected(selected - 1)
    }
  }
  // выбрал keyup,вместо keydown чтобы побороть скролл при зажимании клавиши,при этом оставляя возможность скроллить мышкой(если нам нужно убрать скролл и на мышке ,я бы в css добавил overflow: hidden;).
  useEventListener('keyup', arrowKeys)
  window.addEventListener('keydown', (e) => e.preventDefault(), false)

  //повесил реф на родительский элемент(116 str),чтобы стучаться через children в каждый эпизод и получать его позицию.
  //почитал документацию в реакте ,на сколько я понял,в данном случае , рефы применять приемлимо
  const episodesRef = useRef(null)
  // в эффекте я проверяю кординаты выбранного элемента и сравниваю с высотой экрана пользователя и в случае необходимости скролю на высоту равную высоте элемента
  useEffect(() => {
    const selectedEpisode = episodesRef.current.children[selected - 1] //получаем элемент с выбранной серией
    const selBottom = selectedEpisode.getBoundingClientRect().bottom //беру кординаты нижнего края по Y
    const elemHeight = selectedEpisode.getBoundingClientRect().height //высота элемента

    if (selBottom + elemHeight > window.innerHeight) { //делаю запас в 1 элемент как на видео к ТЗ
      window.scrollBy({ top: elemHeight, behavior: 'smooth' })  //плавный скролл вниз на высоту элемента
    }
    else if (selBottom < elemHeight * 2) {
      window.scrollBy({ top: -elemHeight , behavior: 'smooth'})
    }
  }, [selected])

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
        <div ref={episodesRef}>
          {episodes}
        </div>
      </div>
    </div>
  );
}

export default App;
