import React from 'react'

function Menu() {
    const burgerData = JSON.parse(localStorage.getItem('burger')) || [];
    const drinkData = JSON.parse(localStorage.getItem("drink")) || []
    const sweetData = JSON.parse(localStorage.getItem("sweet")) || []


  return (
   
        <div className="menu" >
  {burgerData.map((item, id) => {
    if (item.count > 0) {
      return (
        <div className="menuTitle" key={id}>
          <b>nomi: {item.count > 0 ? item.name : ""}</b>
          <h3>soni: {item.count > 0 ? item.count : ""} </h3>
          <p>umumiy narxi: {item.count > 0 ? item.count * item.price : ""}</p>

        </div>
      );
    }else{
      return('')
    }
  })}
  {drinkData.map((item, id) => {
    if (item.count > 0) {
      return (
        <div className="menuTitle" key={id}>
          <b>nomi: {item.count > 0 ? item.name : ""}</b>
          <h3>soni: {item.count > 0 ? item.count : ""} </h3>
          <p>umumiy narxi: {item.count > 0 ? item.count * item.price : ""}</p>

        </div>
      );
    }else{
      return('')
    }
  })}
  {sweetData.map((item, id) => {
    if (item.count > 0) {
      return (
        <div className="menuTitle" key={id}>
          <b>nomi: {item.count > 0 ? item.name : ""}</b>
          <h3>soni: {item.count > 0 ? item.count : ""} </h3>
          <p>umumiy narxi: {item.count > 0 ? item.count * item.price : ""}</p>

        </div>
      );
    }else{
      return('')
    }
  })}

    </div>
  )
}

export default Menu