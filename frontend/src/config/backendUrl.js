const PORT = 6010;
let backendUrl;
const mode = "development";
if (mode === "development") {
  backendUrl = `http://localhost:${PORT}`;
} else if (mode === "production") {
  backendUrl = "https://your-production-url.com";
} else {
  console.log("Mode not set");
}

export { backendUrl };
