export const isLoggedIn = (req, res, next) => {
	// console.log("🔹 Session ID:", req.sessionID);
	// console.log(req.authenticated)

	// console.log("🔹 Session Data:", req.session);
	// console.log("🔹 Authenticated:", req.isAuthenticated());
	// console.log("🔹 User:", req.user);
	// console.log("🔹 passport:", req.passort);
	if (req.isAuthenticated()) {
		return next(); // User is logged in, proceed
	}
	return res.status(401).json({ success: false, message: "Unauthorized! Please log in." });
};

export const isFarmer = (req, res, next) => {
	if (req.isAuthenticated() && req.user.categories === "Farmer") {
		return next();
	}
	return res.status(403).json({ success: false, message: "Access denied! Only Farmers allowed." });
};

export const isDealer = (req, res, next) => {
	if (req.isAuthenticated() && req.user.categories === "Dealer") {
		return next();
	}
	return res.status(403).json({ success: false, message: "Access denied! Only Dealers allowed." });
};

export const isContractor = (req, res, next) => {
	if (req.isAuthenticated() && req.user.categories === "Contractors") {
		return next();
	}
	return res.status(403).json({ success: false, message: "Access denied! Only Contractors allowed." });
};
