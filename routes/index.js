const express = require('express');
const router = express.Router();

const documentsModel = require("../models/documents");

router.get("/", (req, res) => {
    const data = {
        data: {
            msg: "Welcome! Here you can find all documents under the route /documents."
        }
    };

    res.json(data);
});

router.get("/documents",
    async (req, res) => {
        const documents = await documentsModel.getAllDocuments();

        res.json({ data: documents});
    }
);

router.post("/documents",
    async (req, res) => {
        const newDocument = req.body;

        const result = await documentsModel.insertDocument(newDocument);

        res.json(result);
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
