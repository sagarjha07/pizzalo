const Order = require("../../../models/order");
const moment = require("moment");
const mongoose = require("mongoose");

function orderController() {
	return {
		store(req, res) {
			const { phone, address } = req.body;
			//validate request
			if (!phone || !address) {
				req.flash("error", "All fields are required !!!");
				return res.redirect("/cart");
			}

			const order = new Order({
				customerId: req.user._id,
				items: req.session.cart.items,
				phone: phone,
				address: address,
			});

			order
				.save()
				.then((result) => {
					req.flash("success", "Order placed Successfully");
					delete req.session.cart;
					return res.redirect("/customer/orders");
				})
				.catch((err) => {
					req.flash("error", "something went Wrong !!!");
					return res.redirect("/cart");
				});
		},
		async index(req, res) {
			const orders = await Order.find({ customerId: req.user._id }, null, {
				sort: { createdAt: -1 },
			});
			res.header("Cache-Control", "no-store");
			res.render("customers/orders", { orders: orders, moment: moment });
		},
		async show(req, res) {
			try {
				const order = await Order.findById(req.params.id);
				// Authorize user
				if (req.user._id.toString() === order.customerId.toString()) {
					return res.render("customers/singleOrder", { order });
				}
				return res.redirect("/");
			} catch (err) {
				console.log(err);
			}
		},
	};
}

module.exports = orderController;
