const express = require("express");
const app = express();
const PORT = 8000;
const path = require("path")
const Stack = require("stack-lifo");
const { Router } = require("express");
const fs = require("fs");

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
    var subRouter = require(path.join(currentDir, "index.js"));
    resultRouter.use(currentPath, subRouter);
    fs.readdirSync(currentDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .forEach(dirent => { dirStack.push(path.join(currentDir, dirent.name)) });


  }

  return resultRouter
})();


app.use("/", mainRouter)


app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});