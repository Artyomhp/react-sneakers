import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import AppContext from "./context";

import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Orders from './pages/Orders'

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)



  // Вот это надо изучить, а также деструктуризацию, а также пересмотреть с 15-й минуты третьего часа
  React.useEffect(() => {
    async function fetchData() {

      const cartResponse = await axios.get('https://8b02527e160ae389.mokky.dev/cart')
      const itemsResponse = await axios.get('https://8b02527e160ae389.mokky.dev/items')
      const favoritesResponse = await axios.get('https://8b02527e160ae389.mokky.dev/favorites')

      setIsLoading(false)

      setCartItems(cartResponse.data)
      setFavorites(favoritesResponse.data)
      setItems(itemsResponse.data)
    }
    fetchData()

  }, [])

  const onAddToCart = (obj) => {
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
      axios.delete(`https://8b02527e160ae389.mokky.dev/cart/${obj.id}`)
    }
    else {
      axios.post('https://8b02527e160ae389.mokky.dev/cart', obj).then(res => setCartItems(prev => [...prev, res.data]))
    }

  }

  const onRemoveCartItem = (id) => {
    axios.delete(`https://8b02527e160ae389.mokky.dev/cart/${id}`)
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value)
  }


  const onAddToFavorites = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://8b02527e160ae389.mokky.dev/favorites/${obj.id}`)
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
        // Вот из-за этой говностроки я потратил больше часа и сильно разочаровался.
      }
      else {
        const { data } = await axios.post('https://8b02527e160ae389.mokky.dev/favorites', obj)
        setFavorites(prev => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить товар в избранное')
    }
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id))
  }


  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToFavorites, onAddToCart, setCartOpened, setCartItems }}>
      <div className="wrapper clear">
        {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveCartItem} />}
        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorites={onAddToFavorites}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites />
            }
          />

          <Route
            path="/orders"
            element={
              <Orders />
            }
          />

        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
