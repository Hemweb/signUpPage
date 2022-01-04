require("@babel/core").transform("code", {
    presets: ["@babel/preset-env"],
});

require('dotenv').config()
import express from "express";
import cors from 'cors'
import helmet from "helmet";
import ConnectDB from './database/connection'
import Auth from './api/auth'

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/user', Auth)


app.listen(4000, () => {
    ConnectDB()
    .then(() => {
        console.log("server is running!!!");
    })
    .catch((err) => {
        console.log("server is running,but database connection failed..");
        console.log(err);
    });
})