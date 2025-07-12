const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const database = require('./database/db')
const UserRouter = require('./routes/login-registor-routes')



dotenv.config();

const app = express();
database()

app.use(cors({
      origin: "http://localhost:5173"
}));
app.use(express.json());

app.use("/api/users",UserRouter);

app.get('/',(req,res) =>{
    res.send("Backend is running ✅");
})

app.post('/',(req,res) => {
    const {name ,email} = req.body;
    console.log(`Name: ${name}  email:${email}`);

     res.status(201).json({ message: "Member created successfully!" });
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is connected at port ${PORT}`);
})