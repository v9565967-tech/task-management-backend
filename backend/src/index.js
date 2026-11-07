import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
});

import { connectToDatabase } from "./db/index.js";
import { app } from "./app.js";

connectToDatabase()
.then(() => {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
});