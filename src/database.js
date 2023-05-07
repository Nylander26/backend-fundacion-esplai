//Connecting to DB
const monngoose = require("mongoose");
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.sdlkg2q.mongodb.net/UsersCollection?retryWrites=true&w=majority`;

monngoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB is connected"))
  .catch((err) => console.log(err));
