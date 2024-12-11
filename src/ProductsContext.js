//Este componente React busca dados de produtos de uma API e os disponibiliza para toda a aplicação através 
//da Context API. Ele faz uma requisição para a API, armazena os dados recebidos no estado products, 
//formatando-os para uso na aplicação, e gerencia o estado de carregamento enquanto a requisição é processada. 
//O componente ProductsProvider  envolve a aplicação e disponibiliza os dados e o estado de carregamento através 
//do ProductsContext, permitindo que qualquer componente acesse essas informações com o hook useProducts. 
//Basicamente, ele centraliza o acesso aos dados dos produtos, facilitando o uso e evitando a necessidade 
//de passar props repetidamente.

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/anime/api/produtos');
                setProducts(response.data.map(product => ({
                    id: product.id,
                    name: product.nome,
                    price: parseFloat(product.preco),
                    image: product.imagens ? product.imagens[0] : null,
                    description: product.descricao,
                    qtdEstoque: product.qtdEstoque,
                    slug: product.nome.toLowerCase().replace(/ /g, '-')
                })));
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <ProductsContext.Provider value={{ products, loading }}>
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsContext;

