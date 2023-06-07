const express = require("express");
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//for resistering user
const db = require("./database/connect");

//register
app.post("/user", (req, res) => {
  const { firstName, lastName, username, password, email } = req.body;
  //checking if the user exists already with username and email
  const sql = `SELECT * FROM signup WHERE username = ? AND email = ?`;

  db.query(sql, [username, email], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return res
        .status(409)
        .send("User with email or username already exists!");
    }
    //insert the user// resister the new user
    const newUserSql =
      "INSERT INTO `signup`(`first name`, `last name`, `username`, `email`, `password`) VALUES (?,?,?,?,?)";
    db.query(
      newUserSql,
      [firstName, lastName, username, email, password],
      (err, result) => {
        if (err) throw err;
        res.send("user created!");
      }
    );
  });
});

//login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const sql = `SELECT * FROM signup WHERE username = ? AND password= ?`;
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    res.send("Login Successful");
  });
});

app.listen(5000, () => {
  console.log("The server is running at http://localhost:5000");
});
