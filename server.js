require('dotenv').config();
const express = require('express');
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');
const server = express();
const port = process.env.PORT || 5000;

// use express and add the logging middleware.
server.use(express.json());
server.use(logger);

// link our routers to their respective urls
server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

// Start server
server.listen(port, () => {
  console.log(`Server on ${port}`);
});

//  ##########
//  ##########
//    MIDDLE
//     WARE
//  ##########
//  ##########

function logger(req, res, next) {
  console.log(`${req.method} @ ${req.url} at ${new Date().toISOString()}`)
  next();
};

