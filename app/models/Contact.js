import {model, models, Schema} from 'mongoose'

const contactSchema = new Schema({
    fullName: String,
    email: String,
    message: String,
    phoneNumber: String,
    createdAt: {type: Date, default: Date.now()}
})

const ContactUs = models.ContactUs || model("ContactUs", contactSchema);
export default ContactUs;