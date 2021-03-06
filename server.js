const express = require("express");
const app = express();
const PORT = 8000;
const path = require("path")
const Stack = require("stack-lifo");
const { Router } = require("express");
const fs = require("fs");
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const authenticator = require("./middlewares/authenticator");
const cors = require("cors");

mongoose.connect("mongodb://localhost:27017/test");

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use(authenticator);
app.use(express.static(path.join(__dirname , "public")))

app.set("view engine","pug");

const mainRouter = (() => {
  const resultRouter = Router();
  var currentDir = path.join(__dirname, "routes");
  var currentPath = [""];
  const dirStack = new Stack();
  dirStack.push(currentDir);
  while (!dirStack.isEmpty()) {
    currentDir = dirStack.pop();
    currentPath = [" "].concat(currentDir.split(path.sep).slice(currentDir.split(path.sep).indexOf("routes") + 1)).join("/");
    currentPath = currentPath.trim() == "" ?"/":currentPath.trim();
    try{
      //console.log(currentDir);
      console.log(path.join(currentDir,"index.js"));
      var subRouter = require(path.join(currentDir, "index.js"));
      
      resultRouter.use(currentPath, subRouter);
    }catch(err){
      
      console.log("WARNING: ERROR ON " + currentDir + " directory");
      console.log(err);
    }
    fs.readdirSync(currentDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .forEach(dirent => { dirStack.push(path.join(currentDir, dirent.name)) });


  }

  return resultRouter
})();


app.use("/", mainRouter);


app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});