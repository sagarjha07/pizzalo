require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const PORT = process.env.PORT || 3300;
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo")(session);

//mongoDB connection
const url = "mongodb://localhost/pizzalo";
mongoose.connect(url, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
	useFindAndModify: true,
});
const connection = mongoose.connection;
connection
	.once("open", () => {
		console.log("Database Connected....");
	})
	.catch((err) => {
		console.log("connection failed....");
	});

//session store
let mongoStore = new MongoDbStore({
	mongooseConnection: connection,
	collection: "sessions",
});

//Session config
app.use(
	session({
		secret: process.env.COOKIE_SECRET,
		resave: false,
		saveUninitialized: false,
		store: mongoStore,
		cookie: { maxAge: 1000 * 60 * 60 * 24 },
	})
);

app.use(flash());

//assets
app.use(express.static("public"));
app.use(express.json());

//global middlewares
app.use((req,res,next)=>{
	res.locals.session=req.session;
	next();
})

//set template emgine
app.use(expressLayout);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/resources/views"));

//routes
require("./routes/web")(app);

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
