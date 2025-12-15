const mongoose = require('mongoose');

const serviceRequestSchema = mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    technician: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    serviceType: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'in-progress', 'completed', 'cancelled'],
        default: 'pending',
    },
    scheduledDate: {
        type: Date,
    },
    location: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);
module.exports = ServiceRequest;
