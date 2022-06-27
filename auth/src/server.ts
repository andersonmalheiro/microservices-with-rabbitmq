import * as db from "@config/db/initialData";
import app from "./app";

const port = process.env.PORT || 8080;

if (process.env.NODE_ENV === 'development') {
  db.createInitialData();
}

app.listen(port, () => {
  console.log(`Auth API running on http://localhost:${port} 🚀`);
});
