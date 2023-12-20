import mongoose from "mongoose"

const { Schema }  = mongoose

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    tags: {
        type: Array
    },
    content: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String
    }
}, {timestamps: true})

export default mongoose.models.Post || mongoose.model("Post", postSchema)