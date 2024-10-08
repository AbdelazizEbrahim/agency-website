import mongoose from "mongoose";
import CoreValues from "../../models/CoreValues";

export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    
    const {coreValue } = await req.json();
    const newCoreValue  = new CoreValues({coreValue})
    newCoreValue.save();
    return Response.json(newCoreValue);
}

export async function GET () {
    mongoose.connect(process.env.MONGO_URL);
    const coreValues = await CoreValues.find();
    return Response.json(coreValues);
}

export async function DELETE (req) {
    mongoose.connect(process.env.MONGO_URL);
    const {_id} = await req.json();
    await CoreValues.findByIdAndDelete(_id);
    return Response.json({message: "Deleted successfully"});
}

