const express = require("express");
const app = express();
const PORT = 8000;
app.get('/', (req, res) => res.send('Express + TypeScript Server'));

const path = require("path");
const fs = require("fs");
fs.readdirSync(path.join(__dirname,"routes"),{withFileTypes: true})
.filter(dirent => dirent.isDirectory())
.forEach(
    file => {console.log("FILE " + file.name);}
);


const mainRouter = (() => {
  const router = express.Router();

  f = (d,router) => {


  }

}
)();


app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});