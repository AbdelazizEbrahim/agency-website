import {model, models, Schema} from 'mongoose';

const heroTextSchema = new Schema({
    title:String,
    text: String
}, {timestamps: true});

const HeroText = models.HeroText || model('HeroText', heroTextSchema);
export default HeroText;