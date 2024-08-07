const {Schema, model, Types} = require('mongoose');

const user = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email address.']
        },
        password: {
            type: String,
            required: true
        },
        bids: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Bid'
            }
        ],
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

const User = model('User', user);

module.exports = User;