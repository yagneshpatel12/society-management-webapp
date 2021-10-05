require('dotenv').config();
const express = require('express');
const app = express();
const DbConnect = require('./database');
const router = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

app.use(cookieParser());
const corsOption = {
    credentials: true,
    origin: ['http://localhost:3000'],
};
app.use(cors(corsOption));
app.use('/storage', express.static('storage'));
app.use(express.json({ limit: '8mb' }));
app.use(router);

const PORT = process.env.PORT || 5501;
DbConnect();   

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
    // don't serve api routes to react app
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
}
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
