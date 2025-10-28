import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart(){
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")||"[]"));
  const nav = useNavigate();

  function updateQty(idx, delta){
    const c = [...cart];
    c[idx].qty = Math.max(1, c[idx].qty + delta);
    setCart(c); localStorage.setItem("cart", JSON.stringify(c));
  }

  return (
    <div style={{padding:12}}>
      <h2>Cart</h2>
      {cart.length===0 && <div>No items</div>}
      {cart.map((it, idx) => (
        <div key={it.menuId} style={{display:"flex", alignItems:"center", gap:12, marginBottom:8}}>
          <div style={{width:70, height:60, background:"#eee"}}>Img</div>
          <div style={{flex:1}}>
            <div>{it.name}</div>
            <div>₹{it.price}</div>
          </div>
          <div>
            <button onClick={()=>updateQty(idx,-1)}>-</button>
            <span style={{padding:"0 8px"}}>{it.qty}</span>
            <button onClick={()=>updateQty(idx,1)}>+</button>
          </div>
        </div>
      ))}
      <div style={{marginTop:12}}>
        <button onClick={()=>nav("/menu/checkout")}>Checkout</button>
      </div>
    </div>
  );
}
