const OktaJwtVerifier = require("@okta/jwt-verifier");
const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: "https://dev-57969952.okta.com/oauth2/default",
});
module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization)
      throw new Error("Access Denied! You must send an Authorization header");

    const [authType, token] = authorization.split(" ");
    if (authType !== "Bearer") throw new Error("Expected a Bearer token");

    await oktaJwtVerifier.verifyAccessToken(token);
    next();
    // res.json("You are successfully verified from Client Credential Flow.");
  } catch (error) {
    console.log("Error:", error);
    res.json({ error: error.message });
  }
};
