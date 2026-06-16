const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://admin:Mahesh12345@cluster0.jinw279.mongodb.net/ecommerce?retryWrites=true&w=majority"
)
.then(() => {
  console.log("CONNECTED SUCCESSFULLY");
  process.exit(0);
})
.catch((err) => {
  console.error("ERROR:", err);
  process.exit(1);
});