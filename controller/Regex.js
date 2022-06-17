module.exports = function (app, data) {
    app.get("/getRegex", function (req, res) {
        res.send(data);
    });
};
