import React from 'react'
import Info from './Info'
// import AppContext from "../context";
import axios from 'axios';

function Drawer({ onClose, onRemove, items = [] }) {
    // const { cartItems, setCartItems } = React.useContext(AppContext)
    const [orderId, setOrderId] = React.useState(null)
    const [isOrderComplete, setIsOrderComplete] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    // const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)



    const onCLickOrder = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.post('https://6747a10738c8741641d73eb6.mockapi.io/orders', {
                items: cartItems
            })
            await axios.put('https://6747a10738c8741641d73eb6.mockapi.io/cart', [])
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
                                        <div className="cartItem d-flex align-center mb-20">
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
                                    </li>
                                </ul>
                                <button disabled={isLoading} onClick={onCLickOrder} className="greenButton">Оформить заказ <img src="\img\arrow.svg" alt="Arrow" /></button>
                            </div>
                        </div>
                    ) : (
                        <Info
                            image={isOrderComplete ? "/img/complete-order.jpeg" : "/img/empty-cart.jpeg"}
                            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
                            description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте котя бы одну пару кроссовок, чтобы сделать заказ."} />
                    )
                }

            </div>
        </div>
    );
}

export default Drawer;