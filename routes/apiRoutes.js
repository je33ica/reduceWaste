const router = require("express").Router();
const db = require("../models")

router.post("/api/sign-up", ({body}, res) => {

    const user = new db.User(body);
    user.lastUpdatedDate();

    db.User.create(user)
    .then(newlyCreatedUser =>{
        res.json(newlyCreatedUser)
    })
    .catch(err => {
        res.json(err)
    })
})

module.exports = router;