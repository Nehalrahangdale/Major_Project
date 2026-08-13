// const mongoose = require("mongoose");
// const User = require("./model/user");

// mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
// .then(async () => {
//     let user = await User.findOne({ username: "demo1" });

//     await user.setPassword("123");
//     await user.save();

//     console.log("Password updated");
//     mongoose.connection.close();
// });