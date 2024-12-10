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