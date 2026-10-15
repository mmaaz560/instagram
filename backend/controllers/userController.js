import { User } from "../model/userModel.js"
import nodemailer from "nodemailer"

const generateOTP = () => {
    let random = Math.random() * 1000000
    if (random < 100000) {
        random = random * 10
    }
    const floor = Math.floor(random)
    return floor
}

export const registerUser = async(req, res) => {
    const { m_mail, password, name, b_day, username } = req.body
    if (!m_mail || !password || !name || !b_day || !username) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }
    // check email/number already exist
    let checkmail = await User.findOne({ m_mail })
    if (checkmail) {
        res.status(401).json({
                message: "Email already exist"
            })
            // throw new Error("Email already exist")
    }
    // check username already exist
    let checkusername = await User.findOne({ username })
    if (checkusername) {
        res.status(401).json({
            message: "Username already exist"
        })
        throw new Error("Username already exist")
    }


    //  send OTP
    const otp = generateOTP()
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'maazibrahim560@gmail.com',
            pass: 'usdxsrdtleexminv'

        }
    })

    const Options = {
        from: 'maazibrahim560@gmail.com',
        to: m_mail,
        subject: "OTP for Registration",
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Verification</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; -webkit-font-smoothing: antialiased;">

  <!-- Wrapper Table -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f6f8; padding: 40px 15px;">
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);">

          <!-- Header with Gradient -->
          <tr>
            <td align="center" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 600; letter-spacing: 0.5px;">
                🔐 Verify Your Email
              </h1>
              <p style="margin: 10px 0 0; color: #e8e4ff; font-size: 14px;">
                Secure OTP Verification
              </p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 40px 40px 20px;">
              <h2 style="margin: 0 0 15px; color: #1a202c; font-size: 22px; font-weight: 600;">
                Hello,
              </h2>
              <p style="margin: 0 0 25px; color: #4a5568; font-size: 15px; line-height: 1.6;">
                Thank you for signing up! Use the following One-Time Password (OTP) to complete your verification. This code is valid for <strong style="color: #667eea;">10 minutes</strong>.
              </p>

              <!-- OTP Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="padding: 10px 0 30px;">
                    <div style="display: inline-block; background: linear-gradient(135deg, #f6f8ff 0%, #eef1ff 100%); border: 2px dashed #667eea; border-radius: 12px; padding: 20px 40px;">
                      <p style="margin: 0 0 5px; color: #718096; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">
                        Your OTP Code
                      </p>
                      <p style="margin: 0; color: #1a202c; font-size: 38px; font-weight: 700; letter-spacing: 12px; font-family: 'Courier New', monospace;">
                        ${otp}
                      </p>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Info Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #fff8e6; border-left: 4px solid #f6ad55; border-radius: 8px; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 15px 20px;">
                    <p style="margin: 0; color: #744210; font-size: 13px; line-height: 1.5;">
                      ⚠️ <strong>Security Tip:</strong> Never share this OTP with anyone. Our team will never ask for your OTP via call, email, or SMS.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 20px; color: #4a5568; font-size: 14px; line-height: 1.6;">
                If you didn't request this code, you can safely ignore this email. Someone may have entered your email address by mistake.
              </p>

              <p style="margin: 0; color: #4a5568; font-size: 14px; line-height: 1.6;">
                Best regards,<br>
                <strong style="color: #1a202c;">Team Instagram</strong>
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 10px 40px 30px;">
              <p style="margin: 0 0 10px; color: #a0aec0; font-size: 12px; line-height: 1.5;">
                This is an automated message, please do not reply to this email.
              </p>
              <p style="margin: 0; color: #a0aec0; font-size: 12px;">
                © {{year}} Team Instagram. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
        <!-- End Main Container -->

      </td>
    </tr>
  </table>

</body>
</html>`
    }

    await transporter.sendMail(Options, async(err, info) => {
        if (err) {
            console.log(`problem ${err}`)
        } else {
            console.log('email sent')
        }
    })

    const newuser = await User.create({
        m_mail,
        password,
        name,
        b_day,
        username,
        otp
    })
    res.send(newuser)

}