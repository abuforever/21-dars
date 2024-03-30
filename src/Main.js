// IMPORTS START

import React, { useRef, useState, useEffect } from "react";
import { NavLink, Routes, Route, Link } from "react-router-dom";

import logo from "./logo.png";
import Burger from "./Burger";
import Drink from "./Drink";
import Sweet from "./Sweet";
import Input from './Input'

// IMPORTS END

const Main = () => {
  // VARIABLES START

  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const burgerData = JSON.parse(localStorage.getItem("burger")) || []
    
  const drinkData = JSON.parse(localStorage.getItem("drink")) || []
    
  const sweetData = JSON.parse(localStorage.getItem("sweet")) || []


  const [ data, setData ] =  useState({});

useEffect(()=>{
  burgerData.map((item)=>{
    item.count > 0 ? setData(item) : setData(null);
  })
},[])
useEffect(()=>{
  drinkData.map((item)=>{
    item.count > 0 ? setData(item) : setData(null);
  })
},[])
useEffect(()=>{
  sweetData.map((item)=>{
    item.count > 0 ? setData(item) : setData(null);
  })
},[])
console.log(data);







    



  // VARIABLES END

  // SUBMIT FUNKSIYA START



  // SUBMIT FUNKSIYA END

  // /TOTAL PRICE CHIQARADIGAN START
  useEffect(() => {
    function total() {
      const categories = ["burger", "drink", "sweet"];
      let total = 0;
      categories.forEach((item) => {
        const data = JSON.parse(localStorage.getItem(item)) || [];
        data.forEach((item) => {
          total += item.count * item.price;
        });
      });
      setTotalPrice(total);
    }

    total();
  }, []);

  // /TOTAL PRICE CHIQARADIGAN END

  return (
    // wrapper start
    <div className="wrapper">
      {/* sitebar start */}
      <div className="sitebar">
        <a href="/" className="logo">
          <img src={logo} alt="" />
          <p>Burger Cafe</p>
        </a>
        <div className="links">
          <NavLink activeClassName="active" to="/">
           Burgers
          </NavLink>
          <NavLink activeClassName="active" to="/drink">
             Drinks
          </NavLink>
          <NavLink activeClassName="active" to="/sweet">
             Sweets
          </NavLink>
        </div>

        <Link className="modal" to='/input'>Add New</Link>
      </div>
      {/* sitebar end */}

      {/* komponents start */}
      <Routes>
        <Route path="/" element={<Burger />} />
        <Route path="/drink" element={<Drink />} />
        <Route path="/sweet" element={<Sweet />} />
        <Route path="/input" element={<Input />} />
      </Routes>

      {/* komponents end */}



    </div>
    // wrapper end
  );
};

export default Main;
