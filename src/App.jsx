import React from "react";
import { useState } from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  

  return (
    <div>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        
      />
      <HomePage searchTerm={searchTerm} />
    </div>
  );
};

export default MainPage;
