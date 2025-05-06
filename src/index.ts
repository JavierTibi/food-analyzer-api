import express from "express";
import dotenv from "dotenv";
import uploadRoutes from "./routes/upload";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use("/", uploadRoutes);

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});