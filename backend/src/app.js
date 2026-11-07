import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
const app = express();
app.use(cors());
app.use(express.json({limit: "5kb"}));
app.use(express.urlencoded({ limit: "5kb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
import userRoutes from "./routes/user.route.js";
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Cannot ${req.method} ${req.originalUrl}`
    });
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    const statusCode = Number.isInteger(err.statusCode)
        ? err.statusCode
        : Number.isInteger(err.status)
            ? err.status
            : 500;

    return res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

export { app };