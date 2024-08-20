import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa6";
import { useForm } from "react-hook-form"

const Products = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()


    const loadProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/products')
            setProducts(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadProducts()
        setLoading(false)
    }, [loading])

    if (products.length < 1) {
        return <div>
            <h1>Loading...</h1>
        </div>
    }

    const handleSearch = (data) => {
        console.log("Searched", data);
    }

    return (
        <div>
            <div>
                <h1>Products</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis magni adipisci ut. Minus soluta unde incidunt, itaque a cupiditate, ab aperiam totam recusandae reprehenderit pariatur molestiae rem, consequuntur nemo nisi.</p>
            </div>

            <div>
                <div>
                    <form onSubmit={handleSubmit(handleSearch)}>

                        <div>
                            <select {...register("brandName")} className="py-2 px-8 mx-2 bg-blue-50">
                                <option value="">Brand</option>
                                <option value="square">Square</option>
                                <option value="unilever">Unilever</option>
                                <option value="">other</option>
                            </select>
                            <select {...register("category")} className="py-2 px-8 mx-2 bg-blue-50">
                                <option value="">Category</option>
                                <option value="t-shirt">T-Shirt</option>
                                <option value="shoe">Shoe</option>
                                <option value="pant">Pant</option>
                            </select>
                            <select {...register("priceRange")} className="py-2 px-8 mx-2 bg-blue-50">
                                <option value="">Price Range</option>
                                <option value="t-shirt">1-1000</option>
                                <option value="shoe">1000-10000</option>
                                <option value="pant">10000-100000</option>
                            </select>
                        </div>

                        {/* register your input into the hook by invoking the "register" function */}
                        <input className="py-2 px-8 bg-blue-50 w-[50%] mx-auto block" type="text" name="search" placeholder="Search Here" {...register("search")} />
                        {errors.search && <span>This field is required</span>}


                        <input type="submit" />
                    </form>
                </div>
            </div>

            {/* Product card container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                    !loading && products.map(product => {
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
                                <div>
                                    <button className="px-8 py-2 bg-blue-400 text-white rounded-md">Buy Now</button>
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