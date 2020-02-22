const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const projectUserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
        // need to enforce uniqueness with projects
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    lastLoggedIn: {
        type: Date
    }
});

// projectUserSchema.plugin(uniqueValidator);

projectUserSchema.pre('save', async function (next) {
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    next();
});

module.exports = mongoose.model('ProjectUser', projectUserSchema);
