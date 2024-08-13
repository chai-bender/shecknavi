const {Schema, model, Types} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        name: {
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

// hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });

// custom method to compare and validate password for logging in
// userSchema.methods.isCorrectPassword = async function (password) {
//     return bcrypt.compare(password, this.password);
//   };
  
//   // when we query a user, we'll also get another field called `bidCount` with the number of bids we have
// userSchema.virtual('bidCount').get(function () {
//     return this.bids.length;
//   });

const Profile = model('Profile', userSchema);

module.exports = Profile;