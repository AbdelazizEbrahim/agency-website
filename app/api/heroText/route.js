import mongoose from 'mongoose';
import HeroText from '../../models/HeroText';

export async function GET(req, res) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("finding...:");
    const heroText = await HeroText.findOne();
    console.log("hero te:");
    if (!heroText) {
      return res.json({ message: 'Hero text not found' });
    }

    console.log("hero text:", heroText);
    return Response.json(heroText);
  } catch (error) {
    console.error('Error fetching hero text:', error);
    return res.json({ error: 'Internal server error' });
  }
}

export async function PUT(req, res) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const { _id, title, text } = await req.json();
    const updatedHeroText = await HeroText.findByIdAndUpdate(
      _id,
      { title, text },
      { new: true, upsert: true } 
    );

     return res.json(updatedHeroText);
  } catch (error) {
    console.error('Error updating hero text:', error);
    return res.json({ error: 'Internal server error' });
  }
}

export async function POST(req, res) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const { title, text } = await req.json();
    const newHeroText = new HeroText({ title, text });
    await newHeroText.save();

    return res.json(newHeroText);
  } catch (error) {
    console.error('Error creating hero text:', error);
    return res.json({ error: 'Internal server error' });
  }
}
