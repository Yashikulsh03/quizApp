require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const checkError = require("./middleware/error");


const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).json({ errorMessage: "Something went wrong!" });
});

app.use("/", require("./routes/user"));
app.use("/api/quiz",require("./routes/quiz"));

app.use(checkError);



mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Db connected!");
    })
    .catch((error) => {
        console.log("Db failed to connect", error);
    });

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Backend server listening at port: ${PORT}`);
});


