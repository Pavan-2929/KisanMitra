import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "./models/user.model.js";
import { Strategy as MagicLinkStrategy } from "passport-magic-link";
import mailSender from "./utils/mailSender.js";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";

passport.use(new GoogleStrategy({
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
	try {
		let user = await User.findOne({ googleId: profile.id });
		if (!user) {
			user = new User({ googleId: profile.id, email: profile.email, fullName: profile.displayName, profile: { url: profile.photos[0].value } });
			await user.save();
		}
		return done(null, user);
	} catch (err) {
		console.log("error while saving profile", err);
		return done(err, null);
	}
}));
const verify = async (user) => {
	console.log("User verification started for:", user);

	try {
		let existingUser = await User.findOne({ email: user.email });

		if (!existingUser) {
			console.log("New user created:", existingUser);
			return {
				success: false,
				error: "User not found"
			}
		} else {
			console.log("User already exists:", existingUser);
			existingUser.isVerified = true;
			await existingUser.save();
			return {
				success: true,
				user: existingUser
			}
		}

	} catch (error) {
		console.log("Error during user verification:", error);
		return {
			success: false,
			error: error.message || "Error during user verification"
		}
	}
};


passport.use("magiclink", new MagicLinkStrategy({
	secret: 'keyboard cat',
	userFields: ['email'],
	tokenField: 'token',
	verifyUserAfterToken: true,
	passReqToCallbacks: true,
},
	async (req, user, token) => {
		console.log(" body details : ", req.body);
		const { categories, password, fullName } = req.body;
		try {
			const link = `${process.env.BASE_URL}/api/auth/magiclink/callback?token=${token}`;
			console.log(link)
			const emailBody = `Click the link to login: <a href="${link}">${link}</a>`;
			await mailSender(user.email, "Your Magic Login Link", emailBody);
			const saltRound = 10;
			const salt = await bcrypt.genSalt(saltRound);
			const hashPassword = await bcrypt.hash(password, salt);
			const existingUser = await User.findOne({ email: user.email });
			if (!existingUser) {
				const newUser = await new User({ email: user.email, password: hashPassword, fullName: fullName, categories: categories }).save();
			}
			// return done(null, user, { message: "Your Magic Login Link sent successfully" });
			return req.res.status(200).json({
				success: true,
				message: "mail sent successfully"
			})

		} catch (error) {
			console.log(error);
			return req.res.status(200).json({
				success: false,
				error: "error while sending mail"
			})
		}
		// return "Your Magic Login Link"
		// console.log("Your Magic Login Link", emailBody);
	},
	async (req, user) => {
		console.log("Verification function is running!", req.body);
		try {
			const verifiedUser = await verify(user);
			return verifiedUser
			// return done(null, verifiedUser);
		} catch (err) {
			console.log("Error in verification:", err);
			return {
				success: false,
				error: err.message
			}
			// return done(err);
		}
	},
));

passport.use('local', new LocalStrategy({ usernameField: "email" },
	async (email, password, done) => {
		try {
			const user = await User.findOne({ email });
			if (!user) {
				return done(null, false, { message: "User not found" });
			}

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return done(null, false, { message: "Incorrect password" });
			}

			// console.log(" finded user " + user)

			return done(null, user);
		} catch (err) {
			return done(err);
		}
	}
));

passport.serializeUser((user, done) => {
	console.log("user serialized")
	done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
	console.log("deserialized")
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (error) {
		console.log("error deserializing user", error)
		done(error, false)
	}
})