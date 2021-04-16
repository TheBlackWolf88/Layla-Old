const mongoose = require("mongoose");
const mongoPath = 'mongodb+srv://TheBlackWolf88:dani2004@rylia.z2kne.mongodb.net/ryliaDB?retryWrites=true&w=majority'

module.exports = async() => {
    await mongoose.connect(mongoPath, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    return mongoose
}