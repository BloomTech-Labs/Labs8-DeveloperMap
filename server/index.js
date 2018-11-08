const server = require('./server');
require('dotenv').config();

const port = process.env.PORT || 9000;

server.listen(port, err => {
  if (err) {
    console.log(err);
  }
  console.log(`Server running at port: ${port}`);
});
