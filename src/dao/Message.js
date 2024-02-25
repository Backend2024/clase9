const Message = require('../models/Message');

class MessageManager {
    async addMessage(user, message) {
        return await Message.create({ user, message });
    }

    async getAllMessages() {
        return await Message.find().sort({ timestamp: 1 });
    }
}

module.exports = new MessageManager();