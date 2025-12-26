// src/context/ProductContext.jsx
import { createContext, useContext, useState } from "react";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Classic Wooden Frame (8x10)",
      price: 49,
      category: "frames",
      image: "https://m.media-amazon.com/images/I/618822mQcxL.jpg",
    },
    {
      id: 2,
      name: "Premium Leather Album",
      price: 299,
      category: "albums",
      image: "https://m.media-amazon.com/images/I/71T37AXEXvL._AC_UF894,1000_QL80_.jpg",
    },
    {
      id: 3,
      name: "Custom Wedding Photo Book",
      price: 599,
      category: "books",
      image: "https://cdn-image.staticsfly.com/i/store/WF1130270/WF1130270_SY_WeddingPB_Marquee_2_798x627.webp?quality=80",
    },
    {
      id: 4,
      name: "Metal Wall Frame Set",
      price: 149,
      category: "frames",
      image: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/3fb7379e-f06c-4cd6-a8bb-fbd1bbe52bef.__CR0,0,970,600_PT0_SX970_V1___.png",
    },
    {
      id: 5,
      name: "Collage Multi-Photo Frame",
      price: 199,
      category: "frames",
      image: "https://m.media-amazon.com/images/I/718bXRoIEzL._AC_UF894,1000_QL80_.jpg",
    },
    {
      id: 6,
      name: "Handmade Scrapbook Album",
      price: 399,
      category: "albums",
      image: "https://c02.purpledshub.com/uploads/sites/51/2021/02/DIY-scrapbook-0c6eed7.jpg?w=1200",
    },
  ]);

  const addProduct = (product) => {
    setProducts([...products, { id: Date.now(), ...product }]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};