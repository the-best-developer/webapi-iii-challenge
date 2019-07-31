const express = require('express');
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');
const server = express();

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
server.listen(4000, () => {
  console.log('Server on 4000');
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

