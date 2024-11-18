function Drawer(props) {
    console.log(props)

    return (
        <div className="overlay">

            <div className="drawer" >

                <h2 className="mb-30">Корзина <img onClick={props.onClose} className="removeBtn cu-p" src="/img//btn-remove.svg" alt="Close" /></h2>

                <div className="items">
                    <div className="cartItem d-flex align-center mb-20">

                        <div style={{ backgroundImage: 'url(/img/sneakers/2.jpeg)' }} className="cartItemImg"></div>

                        <div className="mr-20 flex">
                            <p className="mb-5">Мужские Кроссовки Nike Blazer Mid Suede</p>
                            <b>12 999</b>
                        </div>
                        <img className="removeBtn" src="/img//btn-remove.svg" alt="Remove" />
                    </div>

                    <div className="cartItem d-flex align-center">

                        <div style={{ backgroundImage: 'url(/img/sneakers/4.jpeg)' }} className="cartItemImg"></div>

                        <div className="mr-20 flex">
                            <p className="mb-5">Кроссовки Puma X Aka Boku Future Rider</p>
                            <b>8 999</b>
                        </div>
                        <img className="removeBtn" src="/img//btn-remove.svg" alt="Remove" />
                    </div>
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
                            <b>1 099 руб.</b>
                        </li>
                    </ul>
                    <button className="greenButton">Оформить заказ <img src="\img\arrow.svg" alt="Arrow" /></button>
                </div>
            </div>
        </div>
    );
}

export default Drawer;