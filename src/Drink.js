import React,  {  useState  } from 'react';
import axios from 'axios';
import Menu from './Components/Menu';

const Drink = () => {
    const drinkData = JSON.parse(localStorage.getItem('drink')) || [];
    const getDrink = JSON.parse(localStorage.getItem("drink")) || []
    const [formdata, setFormdata] = useState({
      ism: '',
      tel: '',
    });
    const [loading, setLoading] = useState(false)
    if (drinkData.length === 0) {
        return (
            <div className='noneProduct'>
                <p>No products have been added yet :(</p>
            </div>
        );
    }

   
    

    function plus(id) {
        drinkData.map((item) => {
            if (item.id === id) {
                item.count++
                localStorage.setItem('drink', JSON.stringify(drinkData))
            }
        })
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 200)
    }
    function minus(id) {
        drinkData.map((item) => {
            if (item.id === id) {
                if (item.count > 0) {
                    item.count--
                    localStorage.setItem('drink', JSON.stringify(drinkData))
                }
            }
        })
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 200)
    }

    
    
   
    const handlechange = (e) => {
      const { name, value } = e.target;
      setFormdata({
        ...formdata,
        [name]: value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (
        formdata.ism.trim() === '' ||
        formdata.tel.trim() === '' 
      ) {
        alert('Please fill in all the fields');
        return;
      }
  
      try {
        const token = '7046532538:AAEvXetjmN0GrXV3_wqoCDT-Y_RbxvxXkNs';
        const chatId = '@drink_channel_amaliyot';
        await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
          chat_id: chatId,
          text: `Drink \nIsmi: ${formdata.ism}\nTelefon raqam: ${formdata.tel}\nmiqdori: ${formdata.son}\nnarxi: ${formdata.narx}\nnomi: ${formdata.nomi}`,
        });
  
        setFormdata({
          ism: '',
          tel: '',
        });
      } catch (error) {
        console.error('xatolik yuz berdi:', error);
        alert("Ma'lumotlarni yuborishda xatolik yuz berdi");
      }
    };
  
    const handleCloseClick = () => {
      setFormdata({
        ism: '',
        tel: '',
      });
      document.querySelector('.burger-cart').style.zIndex = -1;
    };
    

    return (
        <>
             <div className='burgerPage'>
            {drinkData.map((item, index) => {
                return (
                    <div className='card' key={index}>
                        <div className='title'>
                            <b>{item.name}</b>
                            <p>Unit price: ${item.price}</p>
                            <p>{item.count} pcs</p>
                            <p>${item.count * item.price}</p>
                        </div>
                        <img src={item.image} alt={item.name} />
                        <div className='count'>
                            <button onClick={(id) => plus(item.id)}>+</button>
                            <button onClick={(id) => minus(item.id)}>-</button>
                        </div>
                    </div>
                );
            })}
        </div>
  

<div className="checkout-burger">
  {getDrink.map((item, index) => {
    if (item.count > 0) {
      return (
        <div className="order-burger" key={index}>
          <span>Nomi: {item.name}</span>
          <span>Soni: {item.count}</span>
          <span>Narxi: {item.price * item.count}</span>
          <button onClick={() => {document.querySelector('.drink-cart').style.zIndex = 1; setFormdata({...formdata, nomi:item.name , narx: item.price * item.count,son: item.count})}}>Buyurtma berish</button>

        </div>
      );
    } else {
      return null;
    }
  })}
</div>

<div className="drink-cart">
<form onSubmit={handleSubmit}>
          <h1>Drink</h1>
          <label>
            <input
              type="text"
              name="ism"
              placeholder="Ismingizni kiriting"
              value={formdata.ism}
              onChange={handlechange}
            />
          </label>
          <label>
            <input
              type="number"
              name="tel"
              placeholder="Raqamingizni kiriting"
              value={formdata.tel}
              onChange={handlechange}
            />
          </label>
          
          <span>Nomi: {formdata.nomi}</span>
          <span>Narxi: {formdata.narx}</span>
          <span>Soni: {formdata.son}</span>
          <button type="submit" onClick={() => document.querySelector('.drink-cart').style.zIndex = -1}>Yuborish</button>
          <button type='button' onClick={handleCloseClick}>Yopish</button>
        </form>

</div>
     
     <Menu/>
        </>

    );
};

export default Drink