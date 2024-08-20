import { useEffect, useState } from "react";
import axios from "axios";

const useProducts = () => {
    const [products, setProducts] = useState([])

    useEffect(()=>{
        const data = axios.get('http://localhost:5000/products')
        setProducts(data);
    },[])

    return products;
};

export default useProducts;