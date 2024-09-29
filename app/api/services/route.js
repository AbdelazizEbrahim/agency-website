import mongoose from "mongoose";
import Service from '../../models/Service'

export async function POST(req) {
    await mongoose.connect(process.env.MONGO_URL);
    
    const { image, title, description } = await req.json();

    // Log the incoming request data
    console.log('Received data:', { image, title, description });

    const newService = new Service({ image, title, description }); 
    await newService.save();

    return Response.json(newService);
}

export async function GET() {
    await mongoose.connect(process.env.MONGO_URL);

    const services = await Service.find();
    return Response.json(services);
}

export async function DELETE (req) {
    await mongoose.connect(process.env.MONGO_URL);

    const {_id} = await req.json();
    await Service.findByIdAndDelete(_id);
    return Response.json({message: "Deleted"});
}

export async function PUT(req) {
    console.log("Received PUT request"); // Log when the request is received

    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB"); 

    const { _id, image, title, description } = await req.json();
    console.log("Parsed data from request:", { _id, image, title, description }); 

    const updatedService = await Service.findByIdAndUpdate(_id, { image, title, description }, { new: true });
    
    if (updatedService) {
        console.log("Service updated successfully:", updatedService); 
    } else {
        console.error("Service not found for ID:", _id);
    }
    
    return Response.json(updatedService);
}
