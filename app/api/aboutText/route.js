import mongoose from "mongoose";
import AboutText from "../../models/AboutText";

export async function POST (req) {
    mongoose.connect(process.env.MONGO_URL);
    console.log("connected");

    const {title, description, orderNumber} = await req.json();
    console.log("received data: ", title, orderNumber, description);
    const newAboutText = new AboutText({title, description, orderNumber});
    newAboutText.save();
    console.log("new about text: ", newAboutText);
    return Response.json(newAboutText);
}

export async function GET (){
    mongoose.connect(process.env.MONGO_URL);

    const aboutTexts = await AboutText.find();
    return Response.json(aboutTexts);
}

export async function PUT (req) {
    mongoose.connect(process.env.MONGO_URL);

    const { _id, title, description, orderNumber} = await req.json();
    console.log("received data: ", _id, title, description)
    const updatedText = await AboutText.findByIdAndUpdate(_id, {title, description, orderNumber}, {new: true});
    return Response.json(updatedText);
}

export async function DELETE (req) {
    mongoose.connect(process.env.MONGO_URL);

    const {_id} = await req.json();
    await AboutText.findByIdAndDelete(_id);
    return Response.json({message: "Text Deleted"});
}


