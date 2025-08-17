import { useEffect, useState } from "react";
import API from "../utils/api";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/api/products")
      .then((res) => {
        setProducts(Array.isArray(res.data.products) ? res.data.products : []);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">All Products</h1>
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
