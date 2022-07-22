const express = require("express");
const User = require("../../models/User");
const router = express.Router();

//admin
router.get("/", async(req, res) => {
    try {
        var user;
        if (req.query.role) {
            //role göre kullanıcıları listele
            user = await User.find({ role: req.query.role });
        } else {
            user = await User.find();
        }

        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//admin
router.patch("/:id", async(req, res) => {
    try {
        // console.log("role", req.body.role);
        const user = await User.findByIdAndUpdate(
            req.params.id, { role: req.body.role }, {
                new: true,
            }
        );
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//admin
router.delete("/:id", async(req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id);
        res.json("kullanıcı silindi");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;