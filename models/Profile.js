const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    githubusername: {
        type: String,
    },
    skills: {
        type: [String],
        required: true
    },
    experience: [{
        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date,
            required: true
        },
        current: {
            type: Boolean,
            default: false
        }, description: {
            type: String,
            required: true
        }
    }]
    ,

    education: [{
        school: {
            type: String,
            required: true
        },
        degree: {
            type: String,
            required: true
        },
        fieldofstudy: {
            type: String,
            required: true
        },

        from: {
            type: Date,
            required: true
        },
        to: {
            type: Date,
            required: true
        },
        current: {
            type: Boolean,
            default: false
        }, description: {
            type: String,
            required: true
        }

    }
    ],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }


    },
    date:{
        type:Date,
        deafult:Date.now
    }

});



module.exports = mongoose.model('profile', ProfileSchema);