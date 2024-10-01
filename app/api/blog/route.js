import mongoose from "mongoose";
import Blog from "../../models/Blog";

export async function POST(req) {
    await mongoose.connect(process.env.MONGO_URL);
    const { title, content, image, author } = await req.json();
    const newBlog = await new Blog({title, content, author, image});
    await newBlog.save();
    return Response.json(newBlog);
}

export async function GET() {
    await mongoose.connect(process.env.MONGO_URL);
    const blogs = await Blog.find();
    return Response.json(blogs);
}

export async function PUT(req) {
    await mongoose.connect(process.env.MONGO_URL);
    const { _id, title, content, image, author } = await req.json();
    const updatedBlog = await Blog.findByIdAndUpdate(_id, {title, content, image, author}, {new: true});
    return Response.json(updatedBlog);
}

export async function DELETE(req) {
    await mongoose.connect(process.env.MONGO_URL);
    const {_id} = await req.json();
    await Blog.findByIdAndDelete(_id);
    return Response.json({message: "Text Deleted"});
}