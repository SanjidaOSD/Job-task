import axios from "axios";
import { FaStar } from "react-icons/fa6";
import { useForm } from "react-hook-form"
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const Products = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const [search, setSearch] = useState('')

    const { data: products = [], isLoading } = useQuery({
        queryFn: () => getProducts(),
        queryKey: ['products', search]
    })

    const [sortedProducts, setSortedProducts] = useState([]);

    useEffect(() => {
        setSortedProducts([...products]);
    }, [products]);

    const getProducts = async () => {
        const { data } = await axios.get(`http://localhost:5000/products?search=${search}`)
        return data;
    }

    const handleSearch = (data) => {
        setSearch(data.search);
    }

    const handleSort = (event) => {
        const sortBy = event.target.value;
        let sortedArray = [...products];

        if (sortBy === "price") {
            sortedArray.sort((a, b) => a.price - b.price);
        } else if (sortBy === "date") {
            sortedArray.sort((a, b) => new Date(b.creationDateTime) - new Date(a.creationDateTime));
        }

        setSortedProducts(sortedArray);
    }

    if (isLoading) {
        return <div>
            <h1>Loading...</h1>
        </div>
    }

    return (
        <div>
            <div>
                <h1 className="text-2xl font-bold text-center mb-10">Find Your Best Product Here</h1>
            </div>

            <div>
                <div>
                    <form onSubmit={handleSubmit(handleSearch)}>

                        <div className="w-[50%] mx-auto flex justify-center gap-5 mb-5">
                            <select {...register("brandName")} className="py-2 px-8 block w-full bg-blue-50">
                                <option value="">Brand</option>
                                <option value="square">Square</option>
                                <option value="unilever">Unilever</option>
                            </select>
                            <select {...register("category")} className="py-2 px-8 block w-full bg-blue-50">
                                <option value="">Category</option>
                                <option value="t-shirt">T-Shirt</option>
                                <option value="shoe">Shoe</option>
                                <option value="pant">Pant</option>
                            </select>
                            <select {...register("priceRange")} className="py-2 px-8 block w-full bg-blue-50">
                                <option value="">Price Range</option>
                                <option value="level1">1-1000</option>
                                <option value="level2">1000-10000</option>
                                <option value="level3">10000-100000</option>
                            </select>
                        </div>

                        <input className="py-2 px-8 bg-blue-50 w-[50%] mx-auto block" type="text" name="search" placeholder="Search Here" {...register("search")} />
                        {errors.search && <span>This field is required</span>}

                        <div className="w-full flex justify-center my-8">
                            <input className="px-8 py-[5px] bg-blue-400 rounded-md cursor-pointer text-white hover:bg-blue-600 duration-200" type="submit" value={"Search"} />
                        </div>
                    </form>
                </div>
                <div className="mb-8 flex gap-3 items-center justify-end">
                    <p>Sort By : </p>
                    <select className="py-2 px-8 block bg-blue-50" onChange={handleSort}>
                        <option value="price">Price</option>
                        <option value="date">Date</option>
                    </select>
                </div>
            </div>

            {/* Product card container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
                {
                    sortedProducts.map(product => {
                        return <div className="border border-gray-200 rounded-xl" key={product._id}>
                            <div>
                                <img className="w-full rounded-t-xl h-[250px] object-cover" src={product.productImage} alt="Product Image" />
                            </div>
                            <div className="p-3">
                                <div className="flex justify-between gap-5">
                                    <div className="px-5 py-[5px] bg-blue-100 border border-blue-300 rounded-md">
                                        <p>{product.category}</p>
                                    </div>
                                    <div className="flex justify-end gap-1 items-center">
                                        <p className="font-semibold text-lg">{product.ratings}</p> <FaStar className="text-xl text-orange-500" />
                                    </div>
                                </div>
                                <h1 className="mt-3 text-xl font-semibold">{product.productName}</h1>
                                <p className="font-medium mt-2 mb-5">{product.description}</p>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-lg">Price : ${product.price}</p>
                                    </div>
                                    <div>
                                        <button className="px-8 py-2 bg-blue-400 text-white rounded-md">Buy Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default Products;
