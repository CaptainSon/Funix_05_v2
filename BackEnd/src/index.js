const express = require('express');
require('./db/mongoose');
const user = require('./routers/user');
const session  = require('./routers/session')
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
app.use(session);
app.use(user);

// app.use(plant);


app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
