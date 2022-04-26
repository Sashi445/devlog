const app = require("./server");
const mongoose = require("mongoose");

const DB_PASSWORD = "DXChgAMDD1BSzTbw"

mongoose.connect(`mongodb+srv://devlog:${DB_PASSWORD}@cluster0.l5pc9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`).then(() => {
  console.log("Connected to DB Successfully!!");
}).catch(e => {
  console.log(e.message);
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});