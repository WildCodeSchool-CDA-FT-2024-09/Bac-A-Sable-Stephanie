import express from "express";
import router from "./router"
const app = express();

app.use(express.json())
app.use('/api', router)

app.listen(3001, ()=> {
    console.log('Server is listening on http://localhost:3001')
})