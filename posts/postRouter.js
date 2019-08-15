const express = require('express');
const postDb = require('./postDb')
const router = express.Router();

//  ##########
//  ##########
//     GET
//  ##########
//  ##########

router.get('/', (req, res) => {

    postDb.get()
    .then(postsData => {
        res.status(200).json(postsData);
    })
    .catch(_ => {
        res.status(500).json({ error: "The post information could not be retrieved." });
    })
});

router.get('/:id', validatePostId, (req, res) => {
    const {id} = req.params;

    postDb.getById(id)
    .then(postData => {
        res.status(200).json(postData);
    })
    .catch(_ => {
        res.status(500).json({ error: "The post information could not be retrieved." });
    })
});

//  ##########
//  ##########
//    DELETE
//  ##########
//  ##########

router.delete('/:id', validatePostId, (req, res) => {
    const {id} = req.params;

    postDb.remove(id)
    .then(postData => {
        res.status(200).json(postData);
    })
    .catch(_ => {
        res.status(500).json({ error: "The post information could not be retrieved." });
    })
});

//  ##########
//  ##########
//     PUT
//  ##########
//  ##########

router.put('/:id', validatePostId, (req, res) => {
    const {id} = req.params;
    const postData = req.body;
    
    postDb.update(id, postData)
    .then(postInfo => {
        res.status(200).json(postInfo);
    })
    .catch(_ => {
        res.status(500).json({ error: "The post information could not be retrieved." });
    })
});

//  ##########
//  ##########
//    MIDDLE
//     WARE
//  ##########
//  ##########

function validatePostId(req, res, next) {
    const {id} = req.params;
    
    postDb.getById(id)
    .then(postInfo => {
        if (postInfo.text != "") {
            next();
        }
        else {
            res.status(400).json({ message: "invalid post id" });
        }
    })
    .catch(_ => {
        res.status(400).json({ message: "invalid post id" });
    })
};


module.exports = router;