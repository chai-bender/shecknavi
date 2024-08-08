const {Schema, model, Types} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/.+@.+\..+/, 'Please enter a valid email address.']
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

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
  
  // when we query a user, we'll also get another field called `bidCount` with the number of bids we have
userSchema.virtual('bidCount').get(function () {
    return this.bids.length;
  });

const User = model('User', userSchema);

module.exports = User;