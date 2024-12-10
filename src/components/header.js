import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import iconCart from '../assets/images/iconCart.png';
import { useSelector, useDispatch } from 'react-redux';
import { toggleStatusTab } from '../stores/cart';

const Header = () => {
    const [totalQuantity, setTotalQuantity] = useState(0);
    const carts = useSelector(store => store.cart.items);
    const dispatch = useDispatch();

    useEffect(() => {
        let total = 0;
        carts.forEach(item => total += item.quantity);
        setTotalQuantity(total);
    }, [carts]);

    const handleOpenTabCart = () => {
        dispatch(toggleStatusTab());
    };

    const userName = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');

    const handleLogout = () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        window.location.href = '/'; 
    };

    return (
        <header className='flex justify-end items-center mb-5'>
            <Link to="/" className='text-xl font-semibold mr-5 ml-5 hover:bg-blue-700 transition rounded-2xl pl-2 pr-2'>HOME</Link>
            <Link to="/quemsomos" className='text-xl font-semibold mr-5 ml-5 hover:bg-blue-700 transition rounded-2xl pl-2 pr-2'>QUEM SOMOS</Link>
            {userId ? (
                <div>
                    <Link to="/login" className='text-xl font-semibold mr-5 ml-5 hover:bg-blue-700 transition rounded-2xl pl-2 pr-2'>{userName.toUpperCase()}</Link>
                    <Link className='text-xl font-semibold mr-5 ml-5 hover:bg-blue-700 transition rounded-2xl pl-2 pr-2' onClick={handleLogout}>LOGOUT</Link>
                </div>
            ) : (
                <Link to="/login" className='text-xl font-semibold mr-5 ml-5 hover:bg-blue-700 transition rounded-2xl pl-2 pr-2'>LOGIN</Link>
            )}
            <div className='w-10 h-10 bg-gray-100 rounded-full flex justify-center items-center relative mr-5 ml-5' onClick={handleOpenTabCart}>
                <img src={iconCart} alt="" className='w-6' />
                <span className='absolute top-2/3 right-1/2 bg-red-500 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center'>{totalQuantity}</span>
            </div>
        </header>
    );
};

export default Header;