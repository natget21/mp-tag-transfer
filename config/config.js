const EnVar = {
  ENV: process.env.ENV || "TEST",
  APP_NAME: "MP Transfer API",
  BASE_URL: "https://mp-transfer.herokuapp.com/",
  SERVER_PORT: process.env.PORT,
  AUTH_HEADER: process.env.AUTH_HEADER,
};

module.exports.EnVar = EnVar;
