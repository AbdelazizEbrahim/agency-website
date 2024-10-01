import User from "../../models/User";
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export async function POST(req) {
    await mongoose.connect(process.env.MONGO_URL);
    const { email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return new Response(JSON.stringify({ error: "User already exists" }), { status: 409 }); // Conflict
    }

    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
        email,
        password: hashedPassword, 
    });

    return new Response(JSON.stringify(user), { status: 201 }); // Created
}

export async function GET(request) {
    await mongoose.connect(process.env.MONGO_URL);
    
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email"); 
  
    let users;
    if (email) {
        users = await User.findOne({ email });
    } else {
        users = await User.find();
    }
  
    return new Response(JSON.stringify(users), { status: 200 }); 
  }
  
  export async function PUT(req) {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      const { _id, isAdmin } = await req.json();
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        { isAdmin },
        { new: true } 
      );
  
       return Response.json(updatedUser);
    } catch (error) {
      console.error('Error updating hero text:', error);
      return Response.json({ error: 'Internal server error' });
    }
  }


