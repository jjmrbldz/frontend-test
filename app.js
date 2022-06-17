var express = require("express");
var app = express();
var swig = require("swig");
var axios = require("axios");
var bodyParser = require("body-parser");
const Regex = require("./controller/Regex");

app.engine("html", swig.renderFile);
app.set("view engine", "html");
app.set("views", __dirname + "/src/views");
app.use(express.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());

let inputFields;
let allow = false;

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    if (allow) {
        Regex(app, inputFields);
        res.render("register", { inputItems: inputFields });
        console.log("Registration fields rendered using Swig template engine.");
    } else {
        res.redirect("/");
    }
});

app.post("/login", (req, res) => {
    const userLogin = {
        login: req.body.login,
        pass: req.body.password
    };
    if (userLogin) {
        axios
            .post(
                "https://platon.cf-it.at/affiliate/getRegistrationFields",
                userLogin
            )
            .then((response) => {
                if (response.data.ok === 1) {
                    allow = true;
                    inputFields = response.data.data;
                    console.log("Login success!");
                    res.redirect("/register");
                } else {
                    console.log("Incorrect Username/Password.");
                    res.render("login");
                }
            })
            .catch((error) => {
                console.log(error.data);
                res.redirect("/");
            });
    } else {
        res.redirect("/");
    }
});

const port = 8080;

app.use(express.static(`${__dirname}/public`));
app.listen(port, () =>
    console.info(`App started and listening on http://localhost:${port}`)
);
