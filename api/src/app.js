require("dotenv").config({ path: "../.env" });
const express = require("express");
const router = require("./routes");
const verifyToken = require("./utilities/verifyToken");
const apiPort = process.env.REACT_APP_SERVER_PORT || "";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "DELETE, PATCH, POST, PUT, GET, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Authorization, Accept"
  );
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use((req, res, next) => {
  if (req.originalUrl === "/login" || req.originalUrl === "/users/create") {
    next();
    return;
  }
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).send("User has no token!");
    return;
  }
  const t = token.substring(7);
  try {
    const verifiedToken = verifyToken(t);
    req.headers.UserID = verifiedToken.UserID;
    req.headers.Email = verifiedToken.Email;
    req.headers.RoleID = verifiedToken.RoleID;
  } catch (err) {
    res.status(401).send(err.toString());
    return;
  }
  next();
});

app.use((err, _req, res, next) => {
  if (err.name === "UnauthorizedError") {
    console.error(err.toString(), "No token found in request.");
    res.status(401).send("Invalid Token");
  } else {
    console.error(err.toString());
    res.status(500).send("Internal Server Error");
  }
  next();
});

app.post("/login", router.login);
app.use("/assignments", router.assignments);
app.use("/courses", router.courses);
app.use("/users", router.users);

const server = app.listen(apiPort);

const gracefulShutdown = () => {
  console.log("Received kill signal, shutting down gracefully.");
  server.close(() => {
    console.log("Closed out remaining connections.");
    process.exit(0);
  });
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
