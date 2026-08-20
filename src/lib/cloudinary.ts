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
  const brandRed = '#C01E2E';
  const brandNavy = '#0f172a'; // Slate 900
  const brandLight = '#f8fafc'; // Slate 50
  
  const adminHtml = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><title>New Inquiry - RCR ENTERPRISES</title></head>
    <body style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 40px 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background-color: ${brandNavy}; padding: 40px 30px; text-align: center; border-bottom: 5px solid ${brandRed};">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 2px; text-transform: uppercase;">RCR ENTERPRISES</h1>
          <p style="color: #94a3b8; margin: 8px 0 0; font-size: 14px; letter-spacing: 1px;">QUALITY WORK WITH COMMITMENT</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
          <h2 style="color: ${brandNavy}; margin: 0 0 25px 0; font-size: 22px; display: flex; align-items: center;">
            <span style="display: inline-block; background: ${brandRed}; color: white; padding: 5px 12px; border-radius: 6px; font-size: 14px; margin-right: 15px; vertical-align: middle;">NEW INQUIRY</span>
            Lead Details
          </h2>
          
          <table style="width: 100%; border-collapse: separate; border-spacing: 0; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
            <tr>
              <td style="padding: 16px 20px; background: ${brandLight}; font-weight: 600; color: #475569; width: 35%; border-bottom: 1px solid #e2e8f0;">Name</td>
              <td style="padding: 16px 20px; background: #ffffff; color: #1e293b; border-bottom: 1px solid #e2e8f0; font-weight: 500;">${data.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 16px 20px; background: ${brandLight}; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Phone</td>
              <td style="padding: 16px 20px; background: #ffffff; color: #1e293b; border-bottom: 1px solid #e2e8f0;">
                <a href="tel:${data.phone}" style="color: ${brandRed}; text-decoration: none; font-weight: 600;">${data.phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 16px 20px; background: ${brandLight}; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Email</td>
              <td style="padding: 16px 20px; background: #ffffff; color: #1e293b; border-bottom: 1px solid #e2e8f0;">
                <a href="mailto:${data.email}" style="color: ${brandNavy}; text-decoration: none;">${data.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 16px 20px; background: ${brandLight}; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0;">Service</td>
              <td style="padding: 16px 20px; background: #ffffff; color: ${brandRed}; font-weight: 700; border-bottom: 1px solid #e2e8f0;">${data.serviceRequired}</td>
            </tr>
            <tr>
              <td style="padding: 16px 20px; background: ${brandLight}; font-weight: 600; color: #475569; vertical-align: top;">Message</td>
              <td style="padding: 16px 20px; background: #ffffff; color: #334155; line-height: 1.6;">${data.message}</td>
            </tr>
          </table>
          
          <div style="margin-top: 30px; text-align: center;">
            <a href="mailto:${data.email}" style="display: inline-block; background-color: ${brandNavy}; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: 600; font-size: 15px;">Reply to Client</a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px; text-align: center;">
          <p style="color: #64748b; margin: 0; font-size: 13px;">© ${new Date().getFullYear()} RCR ENTERPRISES | rcrenterprises786@gmail.com | 9619439243</p>
        </div>
      </div>
    </body>
    </html>
  `

  const clientHtml = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><title>Thank You - RCR ENTERPRISES</title></head>
    <body style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 40px 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background-color: ${brandNavy}; padding: 40px 30px; text-align: center; border-bottom: 5px solid ${brandRed};">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 2px; text-transform: uppercase;">RCR ENTERPRISES</h1>
          <p style="color: #94a3b8; margin: 8px 0 0; font-size: 14px; letter-spacing: 1px;">QUALITY WORK WITH COMMITMENT</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
          <h2 style="color: ${brandNavy}; margin: 0 0 20px 0; font-size: 24px;">Dear ${data.fullName},</h2>
          
          <p style="color: #334155; line-height: 1.7; font-size: 16px; margin-bottom: 25px;">
            Thank you for reaching out to <strong style="color: ${brandNavy};">RCR ENTERPRISES</strong>. We have successfully received your inquiry regarding <strong style="color: ${brandRed};">${data.serviceRequired}</strong>.
          </p>
          
          <div style="background-color: #fef2f2; border-left: 4px solid ${brandRed}; padding: 20px; border-radius: 0 8px 8px 0; margin-bottom: 25px;">
            <p style="color: #991b1b; margin: 0 0 10px 0; font-weight: 600; font-size: 15px;">What happens next?</p>
            <p style="color: #7f1d1d; margin: 0; line-height: 1.6; font-size: 15px;">
              Our team of experts will review your requirements and get back to you within <strong>24 hours</strong> with the best possible solutions and next steps.
            </p>
          </div>
          
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 30px;">
            <p style="margin: 0 0 8px 0; color: #475569; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">For Urgent Queries</p>
            <a href="tel:9619439243" style="display: block; color: ${brandNavy}; text-decoration: none; font-size: 24px; font-weight: 800; letter-spacing: 1px;">9619439243</a>
          </div>
          
          <p style="color: #334155; line-height: 1.7; font-size: 16px; margin-bottom: 10px;">We look forward to building something great together!</p>
          
          <p style="color: #334155; line-height: 1.7; font-size: 16px; margin: 0;">
            Best Regards,<br>
            <strong style="color: ${brandNavy}; font-size: 18px; display: inline-block; margin-top: 5px;">The RCR Team</strong><br>
            <span style="color: #64748b; font-size: 14px;">Virar East, Maharashtra</span>
          </p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px; text-align: center;">
          <p style="color: #64748b; margin: 0; font-size: 13px;">© ${new Date().getFullYear()} RCR ENTERPRISES | <a href="mailto:rcrenterprises786@gmail.com" style="color: ${brandRed}; text-decoration: none;">rcrenterprises786@gmail.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `

  await Promise.all([
    transporter.sendMail({
      from: `"RCR ENTERPRISES Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: `🚨 New Lead: ${data.fullName} - ${data.serviceRequired}`,
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
