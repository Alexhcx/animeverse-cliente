//Este componente React, ProductCart, representa um cartão de produto em um e-commerce, exibindo 
//informações como nome, preço e imagem do produto. Sua principal funcionalidade é adicionar o produto 
//ao carrinho de compras, considerando a disponibilidade em estoque. Ele utiliza o useSelector para acessar 
//o estado do carrinho do Redux e o useDispatch para despachar a ação addToCart. Ao clicar no botão "Adicionar ao Carrinho", 
//a função handleAddToCart verifica a quantidade do produto em estoque e no carrinho, impedindo a adição caso não haja estoque suficiente. 
//Em seguida, despacha a ação addToCart com o ID do produto e a quantidade a ser adicionada, atualizando o estado do carrinho.


import React from 'react'
import { Link } from 'react-router-dom';
import iconCart from '../assets/images/iconCart.png'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../stores/cart';

const ProductCart = (props) => {
    const carts = useSelector(store => store.cart.items);
    const { id, name, price, image, qtdEstoque, slug } = props.data;
    const dispatch = useDispatch();
    const handleAddToCart = () => {
        // Obtém o carrinho do localStorage
        const cartItems = JSON.parse(localStorage.getItem('carts')) || [];

        // Procura o produto no carrinho
        const existingCartItem = cartItems.find(item => item.productId === id);

        // Calcula a quantidade total do produto no carrinho (se existir)
        const currentQuantityInCart = existingCartItem ? existingCartItem.quantity : 0;

        // Calcula a quantidade máxima que pode ser adicionada
        const maxQuantityToAdd = qtdEstoque - currentQuantityInCart;

        // Impede a adição se a quantidade máxima for zero
        if (maxQuantityToAdd <= 0) {
            alert("Produto sem estoque!")
            return;
        }

        // Adiciona o produto ao carrinho (no máximo a quantidade disponível)
        dispatch(addToCart({
            productId: id,
            quantity: Math.min(1, maxQuantityToAdd)
        }));
    };
    return (
        <div className='bg-white p-5 rounded-xl shadow-sm flex flex-col justify-between'>
            <Link to={slug}>
                <img src={image} alt='' className='w-full h-80 object-cover object-top shadow-md' />
            </Link>
            <h3 className='text-2xl py-3 text-center font-medium'>{name}</h3>
            <div className='flex justify-between items-center'>
                <p className='text-2xl font-medium'>
                    R$ <span className='text-2xl font-medium'>{price.toFixed(2)}</span>
                </p>
                <button className='bg-gray-300 p-2 rounded-md text-sm hover:bg-gray-400 flex gap-2 shadow-md' onClick={handleAddToCart}>
                    <img src={iconCart} alt="" className='w-5' />
                </button>
            </div>
        </div>
    )
}

export default ProductCart