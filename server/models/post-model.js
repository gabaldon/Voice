const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema(
    
    { type: String, 
    longitude: Number,
    latitude: Number,
    description: String,
    audio: String,
    color: String
    }
, {
        timestamps: true
    })

const Post = mongoose.model('Post', postSchema)
module.exports = Post

// { type: String,

//     features: [{ 
       
//         type: String,
//         geometry: {
//            type: String, 
//            coordinates: String
//        },

//        properties: {
//            description: String,
//            audio: String,
//            color: String
//        }

//      }]
// }