const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
        title: {
            type: String,
            // required:true
        },
        author:{
            type:String,
            require:true
        },
        description:{
            type:String
        },
        timeCreated:{
            type:Date,
            default: () => new Date()
        },
        img: {
            type: String,
            default: "placeholder.jpg"
        }
    },
    {
        versionKey:false
    }
)

module.exports = mongoose.model('Blog', blogSchema)