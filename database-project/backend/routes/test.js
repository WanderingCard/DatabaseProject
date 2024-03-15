// Router Template. 

import express from "express";
import bodyParser from "body-parser"

import db from "../db/connection.js";

import { ObjectId } from "mongodb";

const router = express.Router();

let collection = await db.collection("IntegerationTest");

router.get("/", async (req, res) => {
    // let collection = await db.collection("Test");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
});

// req.params: Takes the parameters from the request URL (I.E in this case req.params contains id)

router.get("/:id", async (req, res) => {
    // let collection = await db.collection("Test");
    let query = {_id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});

// Req.body contains any body content of the request (this will be the JSON)

router.post("/", async (req, res) => {
    try {
        console.log(req.body)
        let newDocument = {
            data:req.body['data']
        };
        // let collection = await db.collection("Test");
        let result = await collection.insertOne(newDocument);
        res.send(result).status(204);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding record");
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const query = {_id: new ObjectId(req.params.id) };
        const updates = {
            $set: {
                data: req.params.data
            },
        };
        // let collection = await db.collection("records");
        let results = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating records");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const query = {_id: new ObjectId(req.params.id) };

        // const collection = db.collection("records");
        let result = await collection.deleteOne(query);

        res.send(result).status(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error delete record");
    }
});

export default router;