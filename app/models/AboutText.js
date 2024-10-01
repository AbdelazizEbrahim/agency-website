import { model, models, Schema } from "mongoose";

const AboutTextSchema = new Schema({
    title: String,
    description: String,
}, {timeStamp: true})

const AboutText = models.AboutText || model("AboutText", AboutTextSchema);

export default AboutText;






