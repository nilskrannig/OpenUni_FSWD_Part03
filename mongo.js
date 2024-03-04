const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

const url = `mongodb+srv://fullstack_helsinki:${password}@helsinkicluster.yapoqta.mongodb.net/phonebook?
retryWrites=true&w=majority&appName=HelsinkiCluster`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: personName,
    number: personNumber
})

if (process.argv.length < 4) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person);
        })
        mongoose.connection.close()
    })
} else {
    person.save().then(result => {
        console.log(`added ${personName} number ${personNumber} to phonebook`)
        mongoose.connection.close()
    })
}
