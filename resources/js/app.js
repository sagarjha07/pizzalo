import axios from "axios";
import Noty from "noty";

let addTocart = document.querySelectorAll(".add-to-cart");
let cartCounter = document.getElementById("cart-counter");

function updateCart(pizza) {
	axios
		.post("/update-cart", pizza)
		.then((res) => {
			cartCounter.innerText = res.data.totalQty;
			new Noty({
				type: "success",
				timeout: 1000,
				text: "Item added to cart",
				progressBar: false,
			}).show();
		})
		.catch((err) => {
			new Noty({
				type: "error",
				timeout: 700,
				text: "Something went Wrong",
				progressBar: false,
			}).show();
		});
}

addTocart.forEach((btn) => {
	btn.addEventListener("click", (e) => {
		let pizza = JSON.parse(btn.dataset.pizza);
		updateCart(pizza);
	});
});

const alertMsg = document.querySelector("#success-alert");
if (alertMsg) {
	setTimeout(() => {
		alertMsg.remove();
	}, 2000);
}
