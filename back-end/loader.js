const app = require("./server");
const router = require("./routes/main.route");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const expressSanitizer = require("express-sanitizer");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const models = require("./models/");

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(
    session({
        secret: "webbookfca",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: true,
            maxAge: 60000,
            httpOnly: true,
        },
    })
);

app.use(function (req, res, next) {
    if (global.sessData === undefined) {
        global.sessData = req.session;
        global.sessData.ID = req.sessionID;
    } else {
        console.log("session exists", global.sessData.ID);
    }
    next();
});

app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
require("./routes/auth.route.js")(app, passport);
require("./config/passport/passport.js")(passport, modesls.user);

models.sequelize
    .sync()
    .then(function () {
        console.log("Nice! Database looks fine");
    })
    .catch(function (err) {
        console.log(err, "Something went wrong with the Database Update!");
    });

app.use("/", router);
module.exports = app;
