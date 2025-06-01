import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import "./HomePage.css";
import Spinner from "../components/Spinner.jsx";

const HomePage = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const [paginationStart, setPaginationStart] = useState(1);
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(totalProducts / limit);
  const skipItem = (page - 1) * limit;
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const fetchProducts = async () => {
    setLoading(true);
    setErrorMsg("");
    try {

      
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${debouncedSearchTerm}&limit=${limit}&skip=${skipItem}`
      );
      if (!response.ok) {
        throw new Error("The product is not available at the moment");
      }

      const data = await response.json();

      setProducts(data.products);
      setTotalProducts(data.total);
      //   setLimit(data.limit);
      setPage(data.skip / data.limit + 1);
    } catch (error) {
      setProducts([]);
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products/categories');
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const categories = await response.json();
      console.log("Categories:", categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  fetchCategories();
}, []);

  useEffect(() =>{
    fetchProducts();
  },[]);
  
  useEffect(() => {
    setPage(1);
    setPaginationStart(1);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearchTerm, page]);

  return (
    <div className="homePageBody">
      <h1>Our Products</h1>

      <div className="products">
        {loading ? (
          <Spinner />
        ) : errorMsg ? (
          <div className="error">
            <h2>Error: {errorMsg}</h2>
          </div>
        ) : products.length > 0 ? (
          products.map((elem) => (
            <div className="productItem" key={elem.id}>
              <div className="image">
                <img
                  style={{ width: "100%", height: "176px", objectFit: "cover" }}
                  src={elem.thumbnail}
                  alt={elem.title}
                />
              </div>
              <div className="productInfo">
                <p>
                  {elem.brand ? (
                    elem.brand
                  ) : (
                    <span>Brand Name Not Available</span>
                  )}
                </p>
                <h2>{elem.title}</h2>
                <h3>$ {elem.price}</h3>
                <h5>{elem.availabilityStatus}</h5>
                <div className="productOptionsToDo">
                  <button>
                    <img src="/cart.svg" alt="" />
                  </button>
                  <button>
                    <img src="/wishlist.svg" alt="" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      <div className="pagination">
        {totalProducts > 0 && (
          <div className="page-numbers">
            <button
              onClick={() =>
                setPaginationStart((prev) => Math.max(prev - 1, 1))
              }
              disabled={paginationStart === 1}
            >
              &lt;
            </button>

            {[...Array(5)].map((_, idx) => {
              const pageNumber = paginationStart + idx;
              if (pageNumber > totalPages) return null;

              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={page === pageNumber ? "active" : ""}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() =>
                setPaginationStart((prev) =>
                  Math.min(prev + 1, Math.max(totalPages - 4, 1))
                )
              }
              disabled={paginationStart + 4 >= totalPages}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
