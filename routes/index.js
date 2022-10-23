const express = require('express');
const router = express.Router();

const documentsModel = require("../models/documents");
const usersModel = require("../models/users");

router.get("/", (req, res) => {
    const data = {
        data: {
            msg: "Welcome! Here you can find all documents under the route /documents."
        }
    };

    res.json(data);
});

router.get("/documents/:userId",
    (req, res, next) => usersModel.checkToken(req, res, next),
    async (req, res) => {
        const documents = await documentsModel.getDocuments(req.params.userId);

        return res.json({ data: documents});
    }
);

router.post("/documents",
    async (req, res) => {
        const newDocument = req.body;

        // const result = await documentsModel.insertDocument(newDocument);

        // res.json(result);

        if (newDocument.title && newDocument.content) {
            const result = await documentsModel.insertDocument(newDocument);

            return res.status(201).json({ data: result });
        } else {
            return res.status(400).json({ errors: {
                message: "Title and content needed to create document."
            }});
        }
    }
);

router.put("/documents",
    async (req, res) => {
        const updateDocument = req.body;

        const result = await documentsModel.updateDocument(updateDocument);

        res.json(result);
    }
);

module.exports = router;
