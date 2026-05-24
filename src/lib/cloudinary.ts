import { v2 as cloudinary } from 'cloudinary'
import nodemailer from 'nodemailer'

// ============================================================
// CLOUDINARY CONFIG
// ============================================================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadToCloudinary(
  file: string,
  folder: string = 'rcr-enterprises'
): Promise<{ url: string; publicId: string }> {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: 'auto',
    transformation: [{ quality: 'auto', fetch_format: 'auto' }],
  })
  return { url: result.secure_url, publicId: result.public_id }
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId)
}

export async function uploadBufferToCloudinary(
  buffer: Buffer,
  folder: string = 'rcr-enterprises'
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder, resource_type: 'image' }, (error, result) => {
        if (error || !result) return reject(error)
        resolve({ url: result.secure_url, publicId: result.public_id })
      })
      .end(buffer)
  })
}

// ============================================================
// NODEMAILER CONFIG
// ============================================================
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export interface ContactEmailData {
  fullName: string
  phone: string
  email: string
  serviceRequired: string
  message: string
}

export async function sendContactNotification(data: ContactEmailData): Promise<void> {
  const adminHtml = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><title>New Inquiry - RCR ENTERPRISES</title></head>
    <body style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #1a1a1a 0%, #333 100%); padding: 30px; text-align: center;">
          <h1 style="color: #0ea5e9; margin: 0; font-size: 24px; letter-spacing: 2px;">RCR ENTERPRISES</h1>
          <p style="color: #ccc; margin: 5px 0 0; font-size: 13px;">Quality Work With Commitment</p>
        </div>
        <div style="padding: 30px;">
          <h2 style="color: #1a1a1a; border-bottom: 3px solid #0ea5e9; padding-bottom: 10px;">📩 New Contact Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr><td style="padding: 12px; background: #f9f9f9; font-weight: bold; color: #555; width: 35%;">Name</td><td style="padding: 12px; background: #f9f9f9; color: #1a1a1a;">${data.fullName}</td></tr>
            <tr><td style="padding: 12px; font-weight: bold; color: #555;">Phone</td><td style="padding: 12px; color: #1a1a1a;">${data.phone}</td></tr>
            <tr><td style="padding: 12px; background: #f9f9f9; font-weight: bold; color: #555;">Email</td><td style="padding: 12px; background: #f9f9f9; color: #1a1a1a;">${data.email}</td></tr>
            <tr><td style="padding: 12px; font-weight: bold; color: #555;">Service</td><td style="padding: 12px; color: #0ea5e9; font-weight: bold;">${data.serviceRequired}</td></tr>
            <tr><td style="padding: 12px; background: #f9f9f9; font-weight: bold; color: #555; vertical-align: top;">Message</td><td style="padding: 12px; background: #f9f9f9; color: #1a1a1a;">${data.message}</td></tr>
          </table>
        </div>
        <div style="background: #1a1a1a; padding: 20px; text-align: center;">
          <p style="color: #888; margin: 0; font-size: 12px;">© 2024 RCR ENTERPRISES | rcrenterprises786@gmail.com | 9619439243</p>
        </div>
      </div>
    </body>
    </html>
  `

  const clientHtml = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><title>Thank You - RCR ENTERPRISES</title></head>
    <body style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: #fff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #1a1a1a 0%, #333 100%); padding: 30px; text-align: center;">
          <h1 style="color: #0ea5e9; margin: 0; font-size: 24px; letter-spacing: 2px;">RCR ENTERPRISES</h1>
          <p style="color: #ccc; margin: 5px 0 0; font-size: 13px;">Quality Work With Commitment</p>
        </div>
        <div style="padding: 30px;">
          <h2 style="color: #1a1a1a;">Dear ${data.fullName},</h2>
          <p style="color: #555; line-height: 1.8;">Thank you for reaching out to <strong>RCR ENTERPRISES</strong>. We have received your inquiry regarding <strong>${data.serviceRequired}</strong> and our team will get back to you within <strong>24 hours</strong>.</p>
          <div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 15px 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
            <p style="margin: 0; color: #555;"><strong>📞 For urgent queries, call us at:</strong><br><span style="font-size: 20px; font-weight: bold; color: #1a1a1a;">9619439243</span></p>
          </div>
          <p style="color: #555;">We look forward to working with you!</p>
          <p style="color: #555; margin-top: 20px;">Best Regards,<br><strong style="color: #1a1a1a;">RCR ENTERPRISES Team</strong><br><span style="color: #888; font-size: 13px;">Virar East, Maharashtra</span></p>
        </div>
        <div style="background: #1a1a1a; padding: 20px; text-align: center;">
          <p style="color: #888; margin: 0; font-size: 12px;">© 2024 RCR ENTERPRISES | rcrenterprises786@gmail.com | 9619439243</p>
        </div>
      </div>
    </body>
    </html>
  `

  await Promise.all([
    transporter.sendMail({
      from: `"RCR ENTERPRISES Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `🏗️ New Inquiry from ${data.fullName} - ${data.serviceRequired}`,
      html: adminHtml,
    }),
    transporter.sendMail({
      from: `"RCR ENTERPRISES" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: 'Thank You for Contacting RCR ENTERPRISES',
      html: clientHtml,
    }),
  ])
}
