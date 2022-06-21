import app from "./app";

const port = process.env.PORT || 8082;

app.listen(port, () => {
  console.log(`Auth API running on http://localhost:${port} 🚀`);
});
