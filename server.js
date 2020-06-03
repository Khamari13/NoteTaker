const express = reuire("express");
const app = express();
const path = require('path');

const PORT = process.env.PORT || 8080;

app.use(express.urlencode({ extended: true }));
app.use(express.json());



