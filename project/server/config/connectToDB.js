// const mongoose = require('mongoose');

// const connectToDB = () => {
//   mongoose
//     .connect(process.env.MONGO_DB, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => {
//       console.log('Connected to MongoDB');
//     })
//     .catch((err) => {
//       throw new Error(`Could not connect to MongoDB: ${err}`);
//     });
// };

// module.exports = connectToDB;

const mongoose = require('mongoose');
const connectToDB = () =>{
mongoose.connect("mongodb+srv://yaksha:292100@cluster0.zxjzegx.mongodb.net/?appName=Cluster0")
.then(()=>{console.log('connected to DB')})
.catch((err)=>{
    console.log(err)
})
}

module.exports = connectToDB;