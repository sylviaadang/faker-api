const express = require('express');
const app = express();
const port = 8000;


const { faker }  = require('@faker-js/faker');

app.use(express.json())
app.use( express.urlencoded({extended: true }))


const createUser = () => {
    const newUser = {
        password: faker.internet.password(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        lastName: faker.person.lastName(),
        firstName: faker.person.firstName(),
        _id: faker.database.mongodbObjectId()
    }
    return newUser;
}

const createCompany = () => {
    const newCompany = {
        _id: faker.commerce.id(),
        name: faker.commerce.name(),
        address: [
            {street: faker.commerce.street()},
            {city: faker.commerce.city()},
            {state: faker.commerce.state()},
            {zipcode: faker.commerce.zipcode()},
            {country: faker.commerce.country()}
        ]
    }
    return newCompany;
}

app.get('/api/users/new', (req, res) => {
    res.json({user: createUser()});
})

app.get('/api/company/new', (req, res) => {
    res.json({company: createCompany()});
})

app.get('/api/user/company', (req, res) => {
    res.json({
        user: createUser(),
        comapny: createCompany(),
    });
});

app.listen( port, () => console.log(">>SERVER ONLINE"))
