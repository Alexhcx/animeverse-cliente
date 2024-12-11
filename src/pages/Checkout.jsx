//Este componente React representa a página de finalização de compra (checkout) de um e-commerce. Ele exibe os itens do carrinho, 
//calcula o subtotal, permite a escolha do método de pagamento e envia os dados do pedido para a API. O componente Checkout utiliza 
//o useSelector para acessar os itens do carrinho armazenados no Redux e o useState para gerenciar o método de pagamento e o subtotal. 
// a função handleCheckout  envia uma requisição POST para a API com os detalhes do pedido, incluindo informações do usuário, produtos, 
//método de pagamento e status. Após a criação do pedido, ele atualiza o estoque dos produtos via PUT request e limpa o carrinho de compras. 
//O componente também inclui lógica para lidar com erros nas requisições e exibir alertas ao usuário.

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItemCheckout from '../components/cartItemCheckout';
import axios from 'axios';

function Checkout() {
  const CartItemCheckouts = useSelector(state => state.cart.items);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [subtotal, setSubtotal] = useState(0);

  const dispatch = useDispatch();

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCheckout = async () => {
    try {
      const orderData = {
        userId: localStorage.getItem('userId'),
        status: "PAGAMENTO APROVADO",
        valorTotal: subtotal.toFixed(2),
        metodoEnvio: "SEDEX",
        custoEnvio: "GRATIS",
        numeroRastreamento: "12345678910",
        produtos: CartItemCheckouts.map(item => ({
          id: item.productId,
          qtdProdutos: item.quantity
        })),
        metodoPagamento: paymentMethod,
        statusPagamento: "APROVADO"
      };

      const response = await axios.post('http://localhost:8080/anime/api/pedidos', orderData);

      console.log("Orderdata:  " + response);

      if (response.status === 201) {
        const estoqueDTO = {
          itens: CartItemCheckouts.map(item => ({
            productId: item.productId,
            quantidade: item.quantity
          }))
        };
        console.log("EstoqueDTO:  " + estoqueDTO);
        await axios.put(`http://localhost:8080/anime/api/produtos/estoque`, estoqueDTO);

        localStorage.setItem('carts', JSON.stringify([]));
        alert('Pedido efetuado com sucesso!', response.data);
      } else {
        alert('Erro ao criar pedido!', response.status, response.data);
      }
    } catch (error) {
      alert('Erro na requisição!', error);
    }
  };

  useLayoutEffect(() => {
    setTimeout(() => {
      const calculateSubtotal = () => {
        const priceElements = document.querySelectorAll('#produto-preço2');
        let total = 0;

        priceElements.forEach(element => {
          const priceText = element.textContent;
          const price = parseFloat(priceText.replace('R$', '').replace(',', '.'));
          total += price;
        });

        return total;
      };

      setSubtotal(calculateSubtotal());
    }, 100);
  },
    [CartItemCheckouts]);
  return (
    <>
      <div className='h-[685px] flex justify-center items-center m'>
        <div className='flex mr-10 ml-3 w-[90%] justify-center gap-20'>
          <div>
            <h1 className='font-bold text-2xl m-1 mb-10  '>CARRINHO</h1>
            <div className='flex flex-col gap-6 w-[90%]'>
              {CartItemCheckouts.map(item => (
                <CartItemCheckout key={item.productId} data={item} />
              ))}
              <div className="flex flex-col items-end w-[100%]">
                <p className='w-[30%] flex flex-row align-middle justify-end '>Subtotal: R${subtotal.toFixed(2)}</p>
                <p>Custo Envio: Gratis</p>
                <strong>Total: R${subtotal.toFixed(2)}</strong>
              </div>
              <Link to={"/"} className='m-1 bg-black text-white font-bold p-2 rounded-xl pl-3 pr-3 w-[50%] w-min-[50%]'>&lt; Continuar Comprando</Link>
            </div>
          </div>
          <div className='flex flex-col items-center justify-between ml-10 mr-3'>
            <h2 className='font-bold text-2xl'>PAGAMENTO</h2>
            <div className="flex flex-col gap-2">
              <label>
                <input
                  type="radio"
                  value="Cartão de credito"
                  checked={paymentMethod === 'Cartão de credito'}
                  onChange={handlePaymentMethodChange}
                  className='mr-1'
                />
                Cartão de Credito
              </label>
              <label>
                <input
                  type="radio"
                  value="PagSeguro"
                  checked={paymentMethod === 'PagSeguro'}
                  onChange={handlePaymentMethodChange}
                  className='mr-1'
                />
                PagSeguro
              </label>
              <label>
                <input
                  type="radio"
                  value="Mercado Pago"
                  checked={paymentMethod === 'Mercado Pago'}
                  onChange={handlePaymentMethodChange}
                  className='mr-1'
                />
                Mercado Pago
              </label>
            </div>
            <div>
              <Link onClick={handleCheckout} className='m-1 bg-black text-white font-bold p-2 rounded-xl pl-3 pr-3'>Checkout</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default Checkout;