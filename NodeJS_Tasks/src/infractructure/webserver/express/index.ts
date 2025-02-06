import express from "express";
import dotenv from "dotenv";
import userRoutes from "./../../../interface/routes/userRoutes.ts";
import db from "../../config/connection.ts";
import colors from "colors";

colors.enable();

export default function(){dotenv.config();
const app = express();
app.use(express.json());

const PORT: number = parseInt(process.env.PORT || "4500");

// Routes adding
app.use("/user", userRoutes);


// database connection
const startServer = async (): Promise<void> => {
  try {
    await db.getConnection();
    console.log("Connection successfuly".cyan.bgGreen);
    app.listen(PORT, () => {
      console.log(`Server Running on PORT ${PORT}`.bgCyan);
    });
  } catch (err) {
    console.log("Unable to connect to the server.".bgRed.white);
  }
};
startServer();
}
