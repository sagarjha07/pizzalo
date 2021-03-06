const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");
const guest = require("../app/http/middlewares/guest");
const orderController = require("../app/http/controllers/customers/orderController");
const auth = require("../app/http/middlewares/auth");
const adminOrderController = require("../app/http/controllers/admin/orderController");
const statusController = require("../app/http/controllers/admin/statusController");
const admin = require("../app/http/middlewares/admin");

function initRoutes(app) {
	app.get("/", homeController().index);
	app.get("/login", guest, authController().login);
	app.post("/login", authController().postLogin);

	app.get("/register", guest, authController().register);
	app.post("/register", authController().postRegister);

	app.post("/logout", authController().logout);

	app.get("/cart", cartController().index);
	app.post("/update-cart", cartController().update);

	//admin routes
	app.get("/admin/orders", admin, adminOrderController().index);
	// admin/order/status
	app.post("/admin/order/status", admin, statusController().update);

	//customers  routes
	app.post("/orders", orderController().store);
	app.get("/customer/orders/:id", auth, orderController().show);
	app.get("/customer/orders", auth, orderController().index);
	
}

module.exports = initRoutes;
