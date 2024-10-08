import mongoose from "mongoose";
import ContactUs from "../../models/Contact";
import User from '../../models/User';
import nodemailer from "nodemailer";

export async function POST(req) {
    await mongoose.connect(process.env.MONGO_URL);

    const { fullname, email, message, phone } = await req.json();
    const newContact = new ContactUs({
        fullName: fullname,  
        email,
        phoneNumber: phone,  
        message
    });

    await newContact.save();
    const admins = await User.find({ isAdmin: true });  
    if (admins.length === 0) {
    } else {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS  
            }
        });

        const emailSubject = `New Contact Form Submission from ${fullname}`;
        const emailBody = `
            You have received a new contact form submission:
            Full Name: ${fullname}
            Email: ${email}
            Phone: ${phone}
            Message: ${message}
        `;

        // Send email to each admin
        for (let admin of admins) {
            try {
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: admin.email, // Sending to each admin's email
                    subject: emailSubject,
                    text: emailBody
                });
            } catch (error) {
                console.error(`Failed to send email to ${admin.email}:`, error);
            }
        }
    }

    // Return the response with status 201 (Created)
    return new Response(JSON.stringify(newContact), { status: 201 });
}
