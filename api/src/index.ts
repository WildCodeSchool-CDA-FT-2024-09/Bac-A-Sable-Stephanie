import express from "express";
import router from "./router"
import "reflect-metadata"
import AppDataSource from "./data-source"

const app = express();

app.use(express.json())
app.use('/api', router)

app.listen(3001, async () => {
    await AppDataSource.initialize();
    console.log('Server is listening on http://localhost:3001')
})