const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../src/app')
const User = require('../src/db/model/userModel')
const mongoose = require('mongoose')

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'test',
    email: 'test@gmail.com',
    password: 'test12345!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}


beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test('should signup a user', async () => {
    const response = await request(app).post('/users/signup')
        .send({
            name: 'test1',
            email: 'test1@gmail.com',
            "mobile": "1100228800",
            password: 'test1234!'
        }).expect(201)

    expect(response.body.user).not.toBeNull()
})

test('should login a user', async () => {
    await request(app).post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        }).expect(200)
})

test('Should fail login a user', async () => {
    await request(app).post('/users/login')
        .send({
            email: userOne.email,
            password: 'tets'
        }).expect(400)
})


test('Should get user profile', async () => {
    await request(app).get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get user profile for unauthenticate user', async () => {
    await request(app).get('/users/me')
        .send()
        .expect(401)
})

test('Should upload user profile', async () => {
    await request(app).post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar','tests/fixtures/rrr.jpg')
        .expect(200)
})

test('Should delete user', async () => {
    await request(app).delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not delete user for unauthorized user', async () => {
    await request(app).delete('/users/me')
        .send()
        .expect(401)
})


