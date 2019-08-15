
const express = require('express');
const router = express.Router();
const userDb = require('./userDb');
const postDb = require('../posts/postDb');

//  ##########
//  ##########
//     GET
//  ##########
//  ##########

router.get('/', (req, res) => {
    userDb.get()
    .then(userList => {
        res.status(200).json(userList);
    })
    .catch(_ => {
        res.status(500).json({ error: "The users information could not be retrieved." });
    })
});

router.get('/:id', validateUserId, (req, res) => {
    const id = req.user;

    userDb.getById(id)
    .then(userInfo => {
        res.status(200).json(userInfo);
    })
    .catch(_ => {
        res.status(500).json({ error: "The users information could not be retrieved." });
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
    const id = req.user;

    userDb.getUserPosts(id)
    .then(userPosts => {
        res.status(200).json(userPosts);
    })
    .catch(_ => {
        res.status(500).json({ error: "The users information could not be retrieved." });
    })
});

//  ##########
//  ##########
//    DELETE
//  ##########
//  ##########

router.delete('/:id', validateUserId, (req, res) => {
    const id = req.user;

    userDb.remove(id)
    .then(userInfo => {
        res.status(200).json(userInfo);
    })
    .catch(_ => {
        res.status(500).json({ error: "The users information could not be retrieved." });
    })
});

//  ##########
//  ##########
//     PUT
//  ##########
//  ##########

router.put('/:id', validateUserId, (req, res) => {
    const id = req.user;
    const userData = req.body;
    
    userDb.update(id, userData)
    .then(userInfo => {
        res.status(200).json(userInfo);
    })
    .catch(_ => {
        res.status(500).json({ error: "The users information could not be retrieved." });
    })
});

//  ##########
//  ##########
//     POST
//  ##########
//  ##########

router.post('/:id/posts', validatePost, (req, res) => {
    const postData = req.body;
    const {id} = req.params;

    const newPost = {
        text: postData.text,
        user_id : id
    }

    postDb.insert(newPost)
    .then(postInfo => {
        res.status(200).json(postInfo);
    })
    .catch(err => {
        res.status(500).json({ error: "The post information could not be retrieved.", msg: err.message });
    })
});

router.post('/', validateUser, (req, res) => {
    const postData = req.body;

    userDb.insert(postData)
    .then(postInfo => {
        res.status(200).json(postInfo);
    })
    .catch(err => {
        res.status(500).json({ error: "The user information could not be retrieved.", msg: err.message });
    })
});

//  ##########
//  ##########
//    MIDDLE
//     WARE
//  ##########
//  ##########

function validateUserId(req, res, next) {
    const {id} = req.params;
    
    userDb.getById(id)
    .then(userInfo => {
        if (userInfo.name != "") {
            req.user = id;
            next();
        }
        else {
            res.status(400).json({ message: "invalid user id" });
        }
    })
    .catch(_ => {
        res.status(400).json({ message: "invalid user id" });
    })
};

function validateUser(req, res, next) {
    if (req.body.name === undefined) {
        res.status(400).json({ message: "missing required name field" });
    }
    next();
};

function validatePost(req, res, next) {
    if (req.body.text === undefined) {
        res.status(400).json({ message: "missing required text field" });
    }
    next();
};

module.exports = router;
