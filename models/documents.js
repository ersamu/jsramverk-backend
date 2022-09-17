const database = require("../db/database.js");
let ObjectId = require('mongodb').ObjectId;

const documents = {
    getAllDocuments: async function getAllDocuments() {
        let db;

        try {
            db = await database.getDb();

            const allDocuments = await db.collection.find().toArray();

            return allDocuments;
        } catch (error) {
            return {
                errors: {
                    message: error.message,
                }
            };
        } finally {
            await db.client.close();
        }
    },
    insertDocument: async function insertDocument(newDocument) {
        let db;

        try {
            db = await database.getDb();

            const result = await db.collection.insertOne(newDocument);

            return {
                ...newDocument,
                _id: result.insertedId,
            };
        } catch (error) {
            console.error(error.message);
        } finally {
            await db.client.close();
        }
    },
    updateDocument: async function updateDocument(docToUpdate) {
        let db;

        try {
            db = await database.getDb();

            const filter = { _id: ObjectId(docToUpdate["_id"]) };
            const updateDocument = {
                title: docToUpdate.title,
                content: docToUpdate.content,
            };

            const result = await db.collection.updateOne(
                filter,
                {$set: updateDocument},
            );

            return result;

        } catch (error) {
            console.error(error.message);
        } finally {
            await db.client.close();
        }
    }
};

module.exports = documents;
