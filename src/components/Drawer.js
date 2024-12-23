import React from 'react'
import axios from 'axios';

import Info from './Info'
import { useCart } from '../hooks/useCart'

function Drawer({ onClose, onRemove, items = [] }) {
    const { cartItems, setCartItems, totalPrice } = useCart()
    const [orderId, setOrderId] = React.useState(null)
    const [isOrderComplete, setIsOrderComplete] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)




    const onCLickOrder = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.post('https://8b02527e160ae389.mokky.dev/orders', {
                items: cartItems
            })
            await axios.patch('https://8b02527e160ae389.mokky.dev/cart', [])
            setOrderId(data.id)
            setIsOrderComplete(true)
            setCartItems([])
        } catch (error) {
            alert('Не удалось создать заказ')
        }
        setIsLoading(false)
    }
    return (
        <div className="overlay">
            <div className="drawer" >
                <h2 className="mb-30">Корзина <img onClick={onClose} className="removeBtn cu-p" src="/img//btn-remove.svg" alt="Close" /></h2>
                {
                    items.length > 0 ? (
                        <div className="d-flex flex-column flex">
                            <div className="items">
                                {items.map((obj) => (
                                    <div>
                                        <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                            <div style={{ backgroundImage: `url(${obj.imageUrl})` }} className="cartItemImg"></div>
                                            <div className="mr-20 flex">
                                                <p className="mb-5">{obj.title}</p>
                                                <b>{obj.price} руб.</b>
                                            </div>
                                            <img className="removeBtn" onClick={() => onRemove(obj.id)} src="/img//btn-remove.svg" alt="Remove" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="cartTotalBlock">
                                <ul>
                                    <li>
                                        <span>Итого:</span>
                                        <div></div>
                                        <b>21 998 руб.</b>
                                    </li>
                                    <li>
                                        <span>Налог 5%:</span>
                                        <div></div>
                                        <b>{totalPrice / 100 * 5} руб.</b>
                                    </li >
                                </ul >
                                <button disabled={isLoading} onClick={onCLickOrder} className="greenButton">Оформить заказ <img src="\img\arrow.svg" alt="Arrow" /></button>
                            </div >
                        </div >
                    ) : (
                        <Info
                            image={isOrderComplete ? "/img/complete-order.jpeg" : "/img/empty-cart.jpeg"}
                            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
                            description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте котя бы одну пару кроссовок, чтобы сделать заказ."} />
                    )
                }

            </div >
        </div >
    );
}

export default Drawer;