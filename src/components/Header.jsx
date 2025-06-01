import React, { useEffect } from "react";
import { useState } from "react";

import "./header.css"; // Importing the CSS file for styling

const Header = ({ searchTerm , setSearchTerm }) => {
  // This state will hold the search term entered by the user
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
      const response = await fetch('https://dummyjson.com/products/categories');
      if (!response.ok){
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data);
      console.log("Fetched categories:", data);

    } catch (error) {
      console.error("Error fetching categories:", error);
    }
    }
    
    fetchCategories();
  },[]);

  return (
    <div className="headerMain">
      <div className="headerLeftContent">
        <div className="headerLeftContentLogo">
          <img src="/logoShopsmart.svg" alt="Logo Icon" />
          <h2>ShopSmart</h2>
        </div>
        <a href="#">
          <p>Home</p>
        </a>
        <a href="#">
          <p>Products</p>
        </a>

        <div className="categoriesDropdown"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}

        >
          <a href="#"><p>Categories</p></a>
          {showDropdown && (
            <div className="dropdownContent">
              {categories.map((cat)=>(
                <a key={cat.name} href="#">{cat.name}</a>
              ))}
            </div>
          )}
        </div>
        
        <a href="#">
          <p>About Us</p>
        </a>
      </div>

      <div className="headerRightContent">
        <div className="headerSearch">
          <img src="/searchIcon.svg" alt="Search Icon" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="headerRightRemaining">
          <div className="whishlistCart">
            <img src="/wishlist.svg" alt="Wishlist Icon" />
          </div>
          <div className="whishlistCart">
            <img src="/cart.svg" alt="Cart Icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
