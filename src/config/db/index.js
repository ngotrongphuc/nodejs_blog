const mongoose = require('mongoose');

async function connect() {
    try {
        // password: WlssVAfkQMqR2DG8
        await mongoose.connect('mongodb+srv://phucngo:WlssVAfkQMqR2DG8@cluster0.rcwgf.mongodb.net/nodejs_blog?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        });
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
        console.log(error)
    }
}

module.exports = { connect };
