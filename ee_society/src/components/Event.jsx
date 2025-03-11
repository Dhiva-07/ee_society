import React, { useEffect, useState } from "react";
import { handleError } from "../utils";
function Event() {
  const [products, setProducts] = useState("");
  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      {products &&
        products.map((item, index) => (
          <ul key={index}>
            <span>
              {item.name} : {item.price}
            </span>
          </ul>
        ))}
    </div>
  );
}

export default Event;
