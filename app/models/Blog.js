import {model, models, Schema} from "mongoose";

const blogSchema = new Schema({
    image: String,
    title: String,
    content: String,
    author: {type: String, default: "Abdu"},
    date:{type: Date, default:Date.now()},
}, {timeStamp: false})

const Blog = models.Blog || model("Blog", blogSchema);

export default Blog;