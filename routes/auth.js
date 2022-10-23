const express = require('express');
const router = express.Router();

const usersModel = require("../models/users");

router.post("/register",
    async (req, res) => {
        const body = req.body;

        await usersModel.register(res, body);
    }
);

router.post("/login",
    async (req, res) => {
        const body = req.body;

        await usersModel.login(res, body);
    }
);

router.get("/users",
    async (req, res) => {
        const users = await usersModel.getAllUsers();

        return res.json({ data: users});
    }
);

module.exports = router;
