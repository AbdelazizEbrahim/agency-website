import { model, models, Schema } from "mongoose";

const CoreValueSchema = new Schema({
    coreValue: String,
}, {timeStamp: true})

const CoreValues = models.CoreValues || model("CoreValues", CoreValueSchema);

export default CoreValues;






