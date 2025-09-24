require('dotenv').config();

const app=require("./src/app");
const PORT=process.env.PORT;
require("./src/config/dbconn");

app.listen(PORT);