import { Schema, model, models} from 'mongoose';

const ServiceSchema = new Schema({
  image: String,
  title: String,
  description:String,
}, { timestamps: true });

const Service = models.Service || model('Service', ServiceSchema);
export default Service;