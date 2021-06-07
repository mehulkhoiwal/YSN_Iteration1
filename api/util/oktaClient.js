const okta = require("@okta/okta-sdk-nodejs");

const client = new okta.Client({
  orgUrl: "https://dev-57969952.okta.com",
  token: "00RfdAYh94bQ7rk-U3odU2-5OTBff8xpFOhaLBYURj",
});

module.exports = client;
