const mongoose = require("mongoose");
const DB = process.env.DATABASE;

mongoose
  .connect(
    DB
    //{useNewUrlParser: true,useCreateIndex: true,useUnifiedTopology: true,useFindAndModify: false,}
  )
  .then(() => {
    console.log("connection successfull");
  })
  .catch((error) => console.log("error in db connection", error));
