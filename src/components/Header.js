import React from 'react'
import AppContext from "../context";
import { Link } from 'react-router-dom';

function Header(props) {
    const { cartItems } = React.useContext(AppContext)
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to="/">
                <div className="d-flex align-center">
                    <img className="mr-15" width={40} height={40} src="/img/logo.png" alt="logo" />
                    <div>
                        <h3 className="text-uppercase">React Sneakers</h3>
                        <p className="opacity-5">Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className="d-flex">
                <li onClick={props.onClickCart} className="mr-30 cu-p">
                    <img className="mr-25" width={18} height={18} src="/img/cart.svg" alt="корзина" />
                    <span>{totalPrice} руб.</span>
                </li>
                <li className="mr-20 cu-p">
                    <Link to="favorites">
                        <img className="mr-25" width={18} height={18} src="/img/heart.svg" alt="избранное" />
                    </Link>
                </li>
                <li>
                    <img width={18} height={18} src="/img/user.svg" alt="пользователь" />
                </li>
            </ul>
        </header>
    );
}

export default Header;