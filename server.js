import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.connection.js";
import morgan from "morgan";
import user from "./routes/userRoutes.js"
import cors from "cors"

//configure env
dotenv.config();

//DB connection
connectDB()

//rest object
const app = express();

//middleware
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
  })
);
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use("/api/v1/user",user)

app.use("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce website</h1>");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(
    `Server is running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
