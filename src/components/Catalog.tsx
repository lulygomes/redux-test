import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../services/api";
import { addProductToCart } from "../store/modules/cart/actions";
import { IProduct } from "../store/modules/cart/types";

const Catalog: React.FC = () => {
  const dispach = useDispatch();
  const [catalog, setCatalog] = useState<IProduct[]>([]);

  useEffect(() => {
    api.get('products').then(response => {
      setCatalog(response.data);
    })
  }, [])

  const handleAddProductToCart = useCallback((product: IProduct) => {
    dispach(addProductToCart(product))
  }, [])

  return (
    <main>
      <h1>Catalog</h1>
      {catalog.map(product => (
        <article key={product.id}>
          <strong>{product.title}</strong> {" - "}
          <span>{product.price}</span> {"  "}

          <button
            type="button"
            onClick={() => handleAddProductToCart(product)}
          >
            Comprar
          </button>
        </article>
        
      ))}

    </main>
    );
};

export default Catalog;