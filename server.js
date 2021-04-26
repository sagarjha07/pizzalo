const express = require("express");
const app = express();
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require("path");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3300;

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

//assets
app.use(express.static("public"));

//set template emgine
app.use(expressLayout);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/resources/views"));

//routes
require("./routes/web")(app);

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
