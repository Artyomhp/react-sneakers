import React from 'react'
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

const arr = []

function App() {
  const [items, setItems] = React.useState([])
  const [cartOpened, setCartOpened] = React.useState(false)


  // Вот это надо изучить, а также деструктуризацию, а также пересмотреть с 15-й минуты третьего часа
  React.useEffect(() => {
    fetch('https://673a23cba3a36b5a62f0d8df.mockapi.io/items').then((res) => {
      return res.json()
    }).then(json => {
      setItems(json)
    })
  }, [])

  return (
    <div className="wrapper clear">

      {cartOpened && <Drawer onClose={() => setCartOpened(false)} />}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="search" />
            <input type="text" placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items.map((obj) => (
            <Card
              title={obj.title}
              price={obj.price}
              imageUrl={obj.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
