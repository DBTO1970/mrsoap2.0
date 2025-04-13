const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    MAILGUN_SEND_API_KEY: process.env.MAILGUN_SEND_API_KEY,
    MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
    MONGODB_URL: process.env.MONGODB_URL,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    CLOUD_UPDATE_PRESET: process.env.CLOUD_UPDATE_PRESET,
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_API: process.env.CLOUD_API,
    NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
  },
});