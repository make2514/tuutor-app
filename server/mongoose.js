const mongoose = require('mongoose');

class Database {
    constructor() {
        this.connect();
    }
    connect() {
        let dbUri;
        if (process.env.NODE_ENV === 'production') {
            dbUri = process.env.MONGODB_URI;
        } else {
            dbUri = 'mongodb://localhost/tuutor';
        }
        mongoose.connect(dbUri)
            .then(() => console.log('Connected to database'));
        this.db = mongoose.connection;
        this.db.on('error', console.error.bind(console, 'Connection error:'));
        this.db.once('open', () => {
            console.log('Connection to MongoDB server');
        });
    }
}
module.exports = new Database();
