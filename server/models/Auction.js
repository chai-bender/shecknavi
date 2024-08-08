const {Schema, model, Types} = require('mongoose');

const bid = new Schema(
    {
        bidId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        bidAmount: {
            type: Number,
            required: true,
            maxlength: 7
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type:Date,
            default: Date.now
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

const auction = new Schema(
    {
        auctionName: {
            type: String,
            required: true,
            maxlength: 200,
            minlength: 1
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true
        },
        bids: [
            bid
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

auction.virtual('bidCount')
.get(function () {
    return this.bids.length;
});

const Auction = model('Auction', auction);

module.exports = Auction;