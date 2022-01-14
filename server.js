const express = require("express");
const app = express();
const PORT = 8000;
const mainRouter = require("./routes/index");


app.use("/",mainRouter)


app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});