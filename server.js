const express = require("express");
const app = express();
const jenosizeController = require("./controllers/jenosizeController");
const port = 3000;

const validate = (req, res, next) => {
    if (!req.headers['api-key']) {
        res.status(400).json({ message: "Missing header api-key" });
    } else {
        next()
    }
}

app.use(validate)

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

app.listen(3000, () => {
    console.log("Starting server at port " + port);
});