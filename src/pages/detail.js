//essa é a pagima de detalhes do produto, onde o usuário pode ver mais informações sobre o produto 
//e adicionar ao carrinho

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../ProductsContext';
import { useDispatch } from 'react-redux';
import { addToCart } from '../stores/cart';

const Detail = () => {
    const { slug } = useParams();
    const { products } = useProducts();
    const [detail, setDetail] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    useEffect(() => {
        const findDetail = products.find(product => product.slug === slug);
        if (findDetail) {
            setDetail(findDetail);
        } else {
            window.location.href = '/';
        }
    }, [slug, products]);

    const handleMinusQuantity = () => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
    };

    const handlePlusQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleAddToCart = () => {
        if (detail) {
            dispatch(addToCart({
                productId: detail.id,
                quantity: quantity
            }));
        }
    };

    if (!detail) {
        return <p>Loading product details...</p>;
    }

    return (
        <div className='mb-[59px]'>
            <h2 className='text-3xl text-center'>PRODUCT DETAIL</h2>
            <div className='grid grid-cols-2 gap-5 mt-5'>
                <div>
                    <img src={detail.image} alt={detail.name} className='w-full' />
                </div>
                <div className='flex flex-col gap-5'>
                    <h1 className='text-4xl uppercase font-bold'>{detail.name}</h1>
                    <p className='font-bold text-3xl'>
                        ${detail.price}
                    </p>
                    <div className='flex gap-5'>
                        <div className='flex gap-2 justify-center items-center'>
                            <button className='bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center' onClick={handleMinusQuantity}>-</button>
                            <span className='bg-gray-200 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center'>{quantity}</span>
                            <button className='bg-gray-100 h-full w-10 font-bold text-xl rounded-xl flex justify-center items-center' onClick={handlePlusQuantity}>+</button>
                        </div>
                        <button className='bg-slate-900 text-white px-7 py-3 rounded-xl shadow-2xl' onClick={handleAddToCart}>
                            Add To Cart
                        </button>
                    </div>
                    <p>
                        {detail.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Detail;
