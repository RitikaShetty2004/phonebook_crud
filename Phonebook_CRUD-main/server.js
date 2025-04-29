const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const session = require('express-session');  // ✅ Added session
const connectDB = require('./server/database/connection');

const app = express();

// 🔹 Load environment variables
dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080;

// 🔹 Logger middleware
app.use(morgan('tiny'));

// 🔹 Database connection
connectDB();

// 🔹 Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());  // <-- Added for JSON support (optional but useful)

// 🔹 Session middleware ✅
app.use(session({
    secret: 'yourSecretKey',   // 🔑 Change to a strong secret key
    resave: false,
    saveUninitialized: true
}));

// 🔹 Set view engine
app.set("view engine", "ejs");

// 🔹 Static assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// 🔹 Load routers
app.use('/', require('./server/routes/router'));

// 🔹 Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
