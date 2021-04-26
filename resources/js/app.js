import axios from 'axios';

let addTocart=document.querySelectorAll(".add-to-cart");
let cartCounter=document.getElementById("cart-counter")

function updateCart(pizza){
    axios.post("/update-cart",pizza).then((res)=>{
        // console.log(res);
        cartCounter.innerText=res.data.totalQty;
    });
}

addTocart.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        let pizza=JSON.parse(btn.dataset.pizza);
        updateCart(pizza);
    });
});