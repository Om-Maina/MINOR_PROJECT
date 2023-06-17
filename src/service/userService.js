const userModel = require('../db/model/userModel');
const sharp = require('sharp');
const { sendWelcomeEmail, sendCancelEmail } = require('../emails/accounts')

exports.createUsers = async (req, res) => {
    let user = new userModel(req.body)
    try {
        const token = await user.generateAuthToken();
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.login = async (req, res) => {
    try {
        const user = await userModel.findByCredencials(req.body.email, req.body.password)
        const token = await user.generateAuthToken();
        res.status(200).send({ user, token })
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.status(200).send()
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.logoutAll = async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.status(200).send()
    } catch (e) {
        res.status(500).send(e);
    }
}


exports.getMyprofile = async (req, res) => {
    res.status(200).send(req.user)
}


exports.getUsers = async (req, res) => {
    try {
        const users = await userModel.find({})
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send(e)
    }
}

exports.getUserById = async (req, res) => {
    const _id = req.params.id;
    try {
        let user = await userModel.findById(_id)
        if (!user) {
            return res.status(404).send('User id not found in database ' + _id);
        }
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.updateUser = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdates = ['name', 'email', 'mobile', 'age'];
    const isvalidOperation = updates.every((update) => allowUpdates.includes(update))

    if (!isvalidOperation) {
        return res.status(400).send({ error: 'Invalid body params' });
    }
    console.log(req.body)
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()

        res.status(200).send(req.user)
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await req.user.remove();
        sendCancelEmail(req.user.email, req.user.name)
        res.status(200).send(req.user);
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.uploadProfileImage = async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ height: 250, width: 250 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save();
    res.status(200).send();
}

exports.getProfileImage = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.status(200).send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
}

exports.deleteProfileImage = async (req, res) => {
    req.user.avatar = undefined
    await req.user.save();
    res.status(200).send();
} 
