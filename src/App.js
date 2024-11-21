import React from 'react'
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

const arr = []

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)


  // Вот это надо изучить, а также деструктуризацию, а также пересмотреть с 15-й минуты третьего часа
  React.useEffect(() => {
    fetch('https://673a23cba3a36b5a62f0d8df.mockapi.io/items').then((res) => {
      return res.json()
    }).then(json => {
      setItems(json)
    })
  }, [])


  const onAddToCart = (obj) => {
    if (cartItems.includes(obj)) {
      alert('товар уже добавлен в корзину')
    } else { setCartItems(prev => [...prev, obj]) }


  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }


  return (
    <div className="wrapper clear">

      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} />}
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="search" />
            <input type="text" onChange={onChangeSearchInput} placeholder="Поиск..." />
            {searchValue && (<img onClick={() => setSearchValue('')} className="removeBtn" src="/img//btn-remove.svg" alt="Remove" />)}
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavorite={() => console.log('Добавили в закладки')}
              onPlus={(obj) => onAddToCart(obj)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
