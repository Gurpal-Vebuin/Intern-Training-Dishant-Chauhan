import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import userRoutes from "../../../interface/routes/userRoutes.ts"; 
import swaggerUi from "swagger-ui-express";
import colors from "colors";
import swaggerDocument from "../../../../swagger/swagger.json" with { type: "json" };
import AppDataSource from "../../typeOrm/config/typeorm.ts"; 

colors.enable();

dotenv.config();

const app = express();
app.use(express.json());

const PORT: number = Number(process.env.PORT) || 4500;


app.use("/users", userRoutes);

AppDataSource.initialize()
.then(() => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    console.log("Database connection successful".bgGreen);

     app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`.bgCyan);
    });
  })
  .catch((err) => {
    console.error("Error initializing database connection:", err);
  });
