const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = `mongodb+srv://fullstack_helsinki:EwD7UT1ZEAVB6Mtd@helsinkicluster.yapoqta.mongodb.net/phonebook?retryWrites=true&w=majority&appName=HelsinkiCluster`

mongoose.connect(url).then(result => {
    console.log('connected to DB phonebook collection');
}).catch(error => {
    console.log('error connecting to DB', error.message);
})

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString(),
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)