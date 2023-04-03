const express = require("express");
const cors = require('cors');
const app = express();
const jenosizeController = require("./controllers/jenosizeController");

const PORT = process.env.PORT || 8080;
const validate = (req, res, next) => {
    if (!req.headers['api-key']) {
        res.status(400).json({ message: "Missing header api-key" });
    } else {
        next()
    }
}

app.use(cors());
app.use(validate)

app.get("/", (req, res) => {
    res.send('Hello from App Engine!');
});

app.get("/place/:id",
    jenosizeController.findRestaurant(),
    (req, res, next) => {
        res.json(req.data)
        next()
    }
);

app.get("/game",
    jenosizeController.checkGame(),
    (req, res, next) => {
        res.json(req.data)
        next()
    }
);

app.listen(PORT, () => {
    console.log("Starting server at port " + PORT);
});