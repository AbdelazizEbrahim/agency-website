import mongoose from 'mongoose';
import HeroText from '../../models/HeroText';

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const heroText = await HeroText.findOne();
    if (!heroText) {
      return Response.json({ message: 'Hero text not found' });
    }

    return Response.json(heroText);
  } catch (error) {
    console.error('Error fetching hero text:', error);
    return Response.json({ error: 'Internal server error' });
  }
}

export async function PUT(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const { _id, image, title, text } = await req.json();
    const updatedHeroText = await HeroText.findByIdAndUpdate(
      _id,
      { image, title, text },
      { new: true, upsert: true } 
    );

     return Response.json(updatedHeroText);
  } catch (error) {
    console.error('Error updating hero text:', error);
    return Response.json({ error: 'Internal server error' });
  }
}

export async function POST(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const {image, title, text } = await req.json();
    const newHeroText = new HeroText({image, title, text });
    await newHeroText.save();

    return Response.json(newHeroText);
  } catch (error) {
    console.error('Error creating hero text:', error);
    return Response.json({ error: 'Internal server error' });
  }
}
