const express = require('express');
const router = express.Router();
const MessageManager = require('../dao/Message');

// Obtener todos los mensajes
router.get('/', async (req, res) => {
    try {
        const messages = await MessageManager.getAllMessages();
        res.json(messages);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Añadir un nuevo mensaje
router.post('/', async (req, res) => {
    try {
        const { user, message } = req.body;
        const newMessage = await MessageManager.addMessage(user, message);
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;