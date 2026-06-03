import Contact from '../models/Contact.js';
import { Resend } from 'resend';

export const handleContactSubmit = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // 1. Simple validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required' });
  }

  try {
    // 2. Save message to MongoDB
    const contact = new Contact({ name, email, subject, message });
    const savedContact = await contact.save();

    console.log(`📝 Contact entry saved to MongoDB: ID ${savedContact._id}`);

    // 3. Return response IMMEDIATELY so the user doesn't have to wait for emails to send
    res.status(201).json({
      success: true,
      message: 'Message stored and submitted successfully!',
      data: savedContact,
    });

    // 4. Resend email notification (Runs in the background)
    const hasCredentials = process.env.RESEND_API_KEY;

    if (hasCredentials) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const myEmail = process.env.RECEIVER_EMAIL || process.env.EMAIL_USER;

        // -- EMAIL 1: DEVELOPER NOTIFICATION --
        // Note: Unless you have verified a custom domain on Resend, you MUST use 'onboarding@resend.dev' 
        // as the 'from' address, and you can only send 'to' the email you signed up with.
        const mailOptions = {
          from: 'Portfolio Portal <onboarding@resend.dev>',
          to: myEmail,
          replyTo: email,
          subject: `💼 New Lead: ${subject}`,
          text: `You have received a new message from ${name} (${email}).\nSubject: ${subject}\nMessage:\n${message}`,
          html: `
            <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #030712; border: 1px solid #1f2937; border-radius: 16px; color: #f3f4f6;">
              <div style="text-align: center; border-bottom: 2px solid #312e81; padding-bottom: 25px; margin-bottom: 25px;">
                <div style="display: inline-block; padding: 10px 20px; background-color: #1e1b4b; border: 1px solid #4338ca; border-radius: 30px; color: #818cf8; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">New Contact Lead</div>
                <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.02em;">Incoming Message</h1>
                <p style="color: #9ca3af; margin: 5px 0 0 0; font-size: 14px;">A client submitted a message on your Portfolio Website</p>
              </div>
              
              <div style="background-color: #0f172a; border: 1px solid #1e293b; border-radius: 12px; padding: 20px; margin-bottom: 25px;">
                <h3 style="color: #818cf8; margin-top: 0; margin-bottom: 15px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; border-bottom: 1px solid #1e293b; padding-bottom: 8px;">Client Information</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 6px 0; color: #9ca3af; font-size: 14px; width: 110px; font-weight: 600;">Name:</td>
                    <td style="padding: 6px 0; color: #f3f4f6; font-size: 14px; font-weight: 700;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #9ca3af; font-size: 14px; font-weight: 600;">Email Address:</td>
                    <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #818cf8; text-decoration: none; font-size: 14px; font-weight: 700;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #9ca3af; font-size: 14px; font-weight: 600;">Subject Line:</td>
                    <td style="padding: 6px 0; color: #f3f4f6; font-size: 14px; font-weight: 700;">${subject}</td>
                  </tr>
                </table>
              </div>
              
              <div style="background-color: #0b0f19; border: 1px solid #1e293b; border-left: 4px solid #6366f1; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                <h3 style="color: #6366f1; margin-top: 0; margin-bottom: 10px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700;">Client Message</h3>
                <p style="color: #cbd5e1; margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
              
              <div style="text-align: center; margin-bottom: 25px;">
                <a href="mailto:${email}?subject=Re: ${subject}" style="display: inline-block; padding: 14px 30px; background-image: linear-gradient(135deg, #4f46e5, #6366f1); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 14px; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3); transition: all 0.2s;">Reply Directly to ${name}</a>
              </div>
              
              <div style="text-align: center; border-top: 1px solid #1f2937; padding-top: 20px; font-size: 11px; color: #6b7280; line-height: 1.4;">
                <p style="margin: 0;">This email was automatically generated and sent by your Portfolio Backend.</p>
                <p style="margin: 3px 0 0 0;">ID: ${savedContact._id} | Date: ${new Date().toLocaleString()}</p>
              </div>
            </div>
          `,
        };

        const { error } = await resend.emails.send(mailOptions);
        if (error) {
          console.warn(`⚠️ Failed to send developer alert: ${error.message}`);
        } else {
          console.log(`✉️ Developer alert email sent successfully via Resend to: ${myEmail}`);
        }

        // -- EMAIL 2: CLIENT AUTOMATIC CONFIRMATION REPLY --
        // WARNING: Resend free tier (without a verified custom domain) does NOT allow sending emails 
        // to arbitrary client addresses. It will fail. You must add a domain in Resend to enable this.
        try {
          const autoReplyOptions = {
            from: 'Ashique | Portfolio <onboarding@resend.dev>',
            to: email,
            subject: `✨ Message Confirmed: Thank you, ${name}!`,
            text: `Thank you, ${name}!\n\nYour message has been safely received. I appreciate you taking the time to connect, and I will get back to you within 24 hours.\n\nSubject: ${subject}\n\nBest Regards,\nAshique`,
            html: `
              <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #030712; border: 1px solid #1f2937; border-radius: 16px; color: #f3f4f6;">
                <div style="text-align: center; border-bottom: 2px solid #8b5cf6; padding-bottom: 25px; margin-bottom: 25px;">
                  <div style="display: inline-block; padding: 8px 16px; background-color: #2e1065; border: 1px solid #6d28d9; border-radius: 20px; color: #c084fc; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">Message Confirmed</div>
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em;">Thank you, ${name}!</h1>
                  <p style="color: #a78bfa; margin: 5px 0 0 0; font-size: 14px;">Your message has been safely received</p>
                </div>
                
                <div style="line-height: 1.6; font-size: 15px; color: #d1d5db; margin-bottom: 25px; text-align: center;">
                  <p style="margin-top: 0; font-size: 16px; color: #ffffff; font-weight: 600;">Your message has been safely received.</p>
                  <p>I appreciate you taking the time to connect, and I will get back to you within <strong>24 hours</strong>.</p>
                </div>

                <div style="background-color: #0b0f19; border: 1px solid #1f2937; padding: 18px; border-radius: 10px; margin-bottom: 25px;">
                  <h4 style="color: #a78bfa; margin-top: 0; margin-bottom: 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700;">Inquiry Details</h4>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 4px 0; color: #9ca3af; font-size: 13px; font-weight: 600; width: 80px;">Subject:</td>
                      <td style="padding: 4px 0; color: #f3f4f6; font-size: 13px; font-weight: 700;">${subject}</td>
                    </tr>
                  </table>
                  <div style="margin-top: 10px; border-top: 1px solid #1f2937; padding-top: 10px; color: #cbd5e1; font-size: 13px; line-height: 1.5; font-style: italic; white-space: pre-wrap;">"${message}"</div>
                </div>
                
                <div style="text-align: center; margin-bottom: 30px;">
                  <a href="https://muhd-ashique-portfolio.vercel.app " style="display: inline-block; padding: 14px 30px; background-image: linear-gradient(135deg, #7c3aed, #8b5cf6); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 14px; box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3); transition: all 0.2s;">Visit My Portfolio</a>
                </div>
                
                <div style="border-top: 1px solid #1f2937; padding-top: 20px; text-align: center;">
                  <h4 style="color: #ffffff; margin-top: 0; margin-bottom: 12px; font-size: 13px;">Connect with me:</h4>
                  <div style="margin-bottom: 15px;">
                    <a href="mailto:ashiqueoffl7@gmail.com" style="color: #a78bfa; text-decoration: none; font-size: 13px; margin: 0 10px; font-weight: 600;">📧 Email</a>
                    <a href="tel:+917902857903" style="color: #a78bfa; text-decoration: none; font-size: 13px; margin: 0 10px; font-weight: 600;">📞 Phone</a>
                    <a href="https://github.com/mhmdashique" target="_blank" style="color: #a78bfa; text-decoration: none; font-size: 13px; margin: 0 10px; font-weight: 600;">🌐 GitHub</a>
                  </div>
                  <p style="margin: 0; font-size: 11px; color: #6b7280;">&copy; ${new Date().getFullYear()} Ashique. All rights reserved.</p>
                </div>
              </div>
            `,
          };

          const clientRes = await resend.emails.send(autoReplyOptions);
          if (clientRes.error) {
            console.warn(`⚠️ Failed to send auto-reply to client (requires verified domain): ${clientRes.error.message}`);
          } else {
            console.log(`✉️ Auto-reply confirmation email sent successfully to client: ${email}`);
          }
        } catch (autoReplyErr) {
          console.warn(`⚠️ Failed to send auto-reply to client: ${autoReplyErr.message}`);
        }
      } catch (err) {
        console.warn(`⚠️ Failed to send email alerts: ${err.message}`);
      }
    } else {
      console.log('ℹ️ Resend API Key not configured. Skipping email dispatch.');
    }
  } catch (error) {
    console.error(`❌ Controller Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your request.',
      details: error.message,
    });
  }
};
