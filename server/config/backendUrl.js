const PORT = process.env.PORT || 5000;

const backendUrl = {
  development: `http://localhost:${PORT}`,
  production: "https://your-production-url.com",
};
export default backendUrl;
