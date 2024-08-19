import express from "express";
import morgan from "morgan";
import passport from "passport";
import cookieParser from "cookie-parser";
import __dirname from "./path.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import {initializePassport} from "./config/passport.config.js";
import cartRouter from './routes/carts.routes.js';
import productsRouter from './routes/products.routes.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import { initMongoDB }  from './db/mongoDb.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));
app.use(morgan('dev'));
app.use(cookieParser());

// passport
initializePassport();
app.use(passport.initialize());

// rutas
app.use('/api/carts', cartRouter);
app.use('/api/products', productsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use(express.static(`${__dirname}/public`));

app.use(errorHandler);

initMongoDB();

const PORT = 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

