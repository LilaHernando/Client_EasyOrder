import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import search from "../images/Search.svg";
import { useSelector } from "react-redux";
import s from "../styles/SearchBar.module.css";
import * as actions from "../redux/product/actions";
import { useNavigate } from "react-router-dom";
import Autosuggest from "react-autosuggest";
import { useEffect } from "react";
import { all } from "axios";

export const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products);

  // useEffect(() => {
  //   if (products.length == 0) {
  //     dispatch(actions.getProducts());
  //     console.log("PRODUCTS", products);
  //   }
  // }, [products]);

  const allProducts = products.map((p) => {
    return {
      name: p.name,
      category: p.category[0].name,
    };
  });

  const [productsList, setProductsList] = useState(allProducts); // ----------> Estado que almacena todos los productos existentes
  const [inputValue, setInputValue] = useState(""); // ----------> Estado que setea el valor del input para luego compararlo con las opciones de arriba
  const [selectedProduct, setSelectedProduct] = useState({}); // ----------> Estado que almacena la opcion seleccionada
  //---------------------- verificación y normalización de valor ingresado -----------------------------------------------------------
  const filterProduct = (inputValue) => {
    const clearedValue = inputValue.value.trim().toLowerCase(); // ----------> toma el valor ingresado y lo "limpia" eliminando espacios y mayusculas
    let data;
    let filteredProducts = productsList.filter((p) => {
      data = p.name + "-" + p.category; //-----------> toma el estado de todas las opciones

      if (
        data
          .toLocaleLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(clearedValue)
      ) {
        // console.log("DATA", data);
        // console.log("PRODUCTO QUE COINCIDE", p);
        return p;
      }
    });
    return clearedValue.length === 0 ? [] : filteredProducts;
  };

  //---------------------- el estado product almacenará los valores que coindidan con lo ingresado -------------------------------------

  const onSuggestionsFetchRequested = (inputValue) => {
    setProductsList(filterProduct(inputValue));
  };
  //---------------------- el estado product se borrará por completo ---------------------------------------------------------------------
  const onSuggestionsClearRequested = () => {
    setProductsList(allProducts);
  };
  //---------------------- el estado product almacenará la opción seleccionada -----------------------------------------------------------
  const getSuggestionValue = (suggestion) => {
    return `${suggestion.name}`;
  };
  //---------------------- metodo que selecciona la opcion y la almacena en el estado -----------------------------------------------------

  const selectProduct = (suggestion) => {
    console.log(suggestion.name);
    setSelectedProduct(suggestion.name);
  };
  //---------------------- este método renderiza las sugerencias --------------------------------------------------------------------------

  const renderSuggestion = (suggestion) => (
    <div
      onClick={() => {
        selectProduct(suggestion);
      }}
    >
      {`${suggestion.name} - ${suggestion.category}`}
    </div>
  );

  const onChange = (e, { newValue }) => {
    setInputValue(newValue);
  };

  const inputProps = {
    placeholder: "Buscar un plato",
    value: inputValue,
    onChange,
  };

  //--------------------------------------------------------------------------------------------------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue !== "") {
      dispatch(actions.getProductByName(inputValue));
      setInputValue("");
      navigate("/resultsearch");
    }
  };
  return (
    <div className={s.container_search}>
      <form className={s.container} onSubmit={handleSubmit}>
        <div className={s.containerInput}>
          <Autosuggest
            suggestions={productsList}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
        </div>
        <button className={s.btn} type="submit">
          <span className="material-symbols-outlined">search</span>
        </button>
      </form>
    </div>
  );
};
