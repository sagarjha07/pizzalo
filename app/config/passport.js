const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcrypt");

function init(passport) {
	passport.use(
		new LocalStrategy(
			{ usernameField: "email" },
			async (email, password, done) => {
				//login
				//check if email exisits
				const user = await User.findOne({ email: email });
				if (!user) {
					return done(null, false, {
						message: "No user with this email exists",
					});
				}

				bcrypt
					.compare(password, user.password)
					.then((match) => {
						if (match) {
							return done(null, user, { message: "Logged in Successfully" });
						}
						return done(null, false, { message: "Wrong credentials !!!" });
					})
					.catch((err) => {
						return done(null, false, { message: "Something went Wrong" });
					});
			}
		)
	);
	passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});
}

module.exports = init;
