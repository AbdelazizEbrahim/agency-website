import User from "../../models/User";
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export async function POST(req) {
    await mongoose.connect(process.env.MONGO_URL);
    const {email, password} = await req.json();


    const existingUser = await User.findOne({email})
    if (existingUser){
        return;
    }

    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
        email,
        password: hashedPassword, 
    });

    return Response.json(user);
}
