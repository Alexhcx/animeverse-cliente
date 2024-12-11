//Aqui é o componente da tab que mostra os itens do carrinho e redireciona para o checkout

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartItem from './cartItem';
import { toggleStatusTab } from '../stores/cart';
import { Link } from "react-router-dom";

const CartTab = () => {
    const carts = useSelector(store => store.cart.items);
    const statusTab = useSelector(store => store.cart.statusTab);
    const dispatch = useDispatch();
    const handleCloseTabCart = () => {
        dispatch(toggleStatusTab());
    }
    return (
        <div id='cart-tab' className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px] 
    transform transition-transform duration-500 z-10
    ${statusTab === false ? "translate-x-full" : ""}
    `}>
            <h2 className='p-5 text-white text-2xl'>CARRINHO</h2>
            <div className='p-5'>
                {carts.map((item, key) =>
                    <CartItem key={key} data={item} />
                )}
            </div>
            <div className='grid grid-cols-2'>
                <button className='bg-black text-white' onClick={handleCloseTabCart}>FECHAR</button>
                <Link to="/Checkout" className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded transition flex justify-center items-center">
                    CHECKOUT
                </Link>
            </div>
        </div>
    )
}

export default CartTab