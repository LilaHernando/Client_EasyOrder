import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavBar } from ".";
import s from "../styles/Cart.module.css";
import st from "../styles/ItemCount.module.css";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const { productsCart } = useSelector((state) => state.products);
  // const [count, setCount] = useState(1);
  // const [product, setProduct] = useState(productsCart);
  const [storage, setStorage] = useState([]);

  const createStorage = () => {
    if (productsCart.length !== 0) {
      localStorage.setItem("cart", JSON.stringify(productsCart));
    }
    getStorage();
  };

  const getStorage = () => {
    let localS = localStorage.getItem("cart");
    setStorage(JSON.parse(localS));
  };

  useEffect(() => {
    createStorage();
  }, []);

  const navigate = useNavigate();
  var total = 0;

  const resta = (e) => {
    console.log(e.target.value);
    const piMenos = storage.findIndex((p) => p.id === e.target.value);
    // const piMenos = product.findIndex((p) => p.id === e.target.value);
    actualizarCart(e.target.value, piMenos, false);
  };

  const suma = (e) => {
    console.log(e.target.value);
    const piMas = storage.findIndex((p) => p.id === e.target.value);
    // const piMas = product.findIndex((p) => p.id === e.target.value);
    actualizarCart(e.target.value, piMas, true);
  };

  const actualizarCart = (id, i, sumar) => {
    let actual = storage[i];
    let newState = storage;
    // let actual = product[i];
    // let newState = product;
    actual.count = sumar ? actual.count + 1 : actual.count - 1;
    actual.priceTotal = actual.price * actual.count;
    newState[i] = actual;
    // setProduct([...newState]);
    setStorage([...newState]);
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("pedido exitoso");
  };

  const handleToPay = (e) => {
    e.preventDefault();
    console.log("pagando...");
    localStorage.removeItem("cart"); //elimina localStorage
    navigate("/pagepay");
  };

  return (
    <div>
      <NavBar />
      {storage.length &&
        storage.map((p) => (
          <div key={p.id} className={s.container}>
            <div className={s.img}>
              <img src={p.image} alt={p.name} />
            </div>
            <div className={s.nameCantidad}>
              <h2>{p.name}</h2>
              <div className={s.cantidad}>
                <h3>Amount: </h3>
                <div className={st.counter}>
                  <button
                    disabled={p.count <= 1}
                    className={st.btn}
                    onClick={resta}
                    value={p.id}
                  >
                    -
                  </button>
                  <span>{p.count}</span>
                  <button value={p.id} className={st.btn} onClick={suma}>
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className={s.price}>
              <span>${p.priceTotal}</span>
              <p>{(total = total + p.priceTotal)}</p>
            </div>
            <br />
          </div>
        ))}
      <div className={s.total}>
        <div>
          <h3>Total</h3>
        </div>
        <div>
          <span>${total}</span>
        </div>
      </div>

      <div className={s.conteiner_buttons}>
        <button className={s.btn1} onClick={handleClick}>
          Make an Order
        </button>

        <button className={s.btn2} onClick={handleToPay}>
          Go pay
        </button>
      </div>
    </div>
  );
};
