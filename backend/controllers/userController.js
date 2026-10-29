import { User } from "../model/userModel.js"
import nodemailer from "nodemailer"
import jwt from 'jsonwebtoken'
const generateOTP = () => {
    let random = Math.random() * 1000000
    if (random < 100000) {
        random = random * 10
    }
    const floor = Math.floor(random)
    return floor
}

const sendOTP = async(m_mail, otp) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'maazibrahim560@gmail.com',
            pass: 'usdxsrdtleexminv'

        }
    })
    const year = new Date().getFullYear();

    //  options
    const Options = {
        from: 'maazibrahim560@gmail.com',
        to: m_mail,
        subject: "OTP for Registration",
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Verification</title>
</head>

<body style="margin:0; padding:0; font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif; background-color:#f4f6f8; -webkit-font-smoothing:antialiased;">

  <!-- Main Wrapper -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
    style="background-color:#f4f6f8; padding:40px 15px;">

    <tr>
      <td align="center">

        <!-- Main Container -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0"
          style="max-width:600px; width:100%; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 8px 30px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td align="center"
              style="background-color:#667eea; background-image:linear-gradient(135deg,#667eea 0%,#764ba2 100%); padding:40px 30px;">

              <h1 style="margin:0; color:#ffffff; font-size:26px; font-weight:600; letter-spacing:0.5px;">
                🔐 Verify Your Email
              </h1>

              <p style="margin:10px 0 0; color:#e8e4ff; font-size:14px;">
                Secure OTP Verification
              </p>

            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 20px;">

              <h2 style="margin:0 0 15px; color:#1a202c; font-size:22px; font-weight:600;">
                Hello,
              </h2>

              <p style="margin:0 0 25px; color:#4a5568; font-size:15px; line-height:1.6;">
                Thank you for signing up! Use the following One-Time Password (OTP)
                to complete your email verification. This code is valid for
                <strong style="color:#667eea;">10 minutes</strong>.
              </p>

              <!-- OTP Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="padding:10px 0 25px;">

                    <table role="presentation" cellspacing="0" cellpadding="0" border="0"
                      style="background-color:#f0f2ff; border:2px dashed #667eea; border-radius:12px;">

                      <tr>
                        <td align="center" style="padding:20px 30px;">

                          <p style="margin:0 0 8px; color:#718096; font-size:12px; text-transform:uppercase; letter-spacing:2px; font-weight:600;">
                            Your OTP Code
                          </p>

                          <p style="margin:0; color:#1a202c; font-size:36px; font-weight:700; letter-spacing:8px; font-family:'Courier New',monospace;">
                            ${otp}
                          </p>

                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

              <!-- Verify Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td align="center" style="padding:0 0 30px;">

                    <a href="http://localhost:5173/OTP-verification/${otp}?email=${encodeURIComponent(m_mail)}"
                      target="_blank"
                      style="display:inline-block; background-color:#667eea; background-image:linear-gradient(135deg,#667eea 0%,#764ba2 100%); color:#ffffff; text-decoration:none; padding:15px 40px; border-radius:8px; font-size:16px; font-weight:600; letter-spacing:0.5px;">
                      Verify Email
                    </a>

                    <p style="margin:15px 0 0; color:#718096; font-size:12px; line-height:1.5;">
                      Click the button above to continue to email verification.
                    </p>

                  </td>
                </tr>
              </table>

              <!-- Security Warning -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
                style="background-color:#fff8e6; border-left:4px solid #f6ad55; border-radius:8px; margin-bottom:25px;">

                <tr>
                  <td style="padding:15px 20px;">

                    <p style="margin:0; color:#744210; font-size:13px; line-height:1.6;">
                      ⚠️ <strong>Security Tip:</strong> Never share this OTP with anyone.
                      Our team will never ask you to share your OTP.
                    </p>

                  </td>
                </tr>
              </table>

              <!-- Ignore Message -->
              <p style="margin:0 0 20px; color:#4a5568; font-size:14px; line-height:1.6;">
                If you didn't request this code, you can safely ignore this email.
                Someone may have entered your email address by mistake.
              </p>

              <!-- Signature -->
              <p style="margin:0; color:#4a5568; font-size:14px; line-height:1.6;">
                Best regards,<br>
                <strong style="color:#1a202c;">Team Instagram</strong>
              </p>

            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 40px;">
              <hr style="border:none; border-top:1px solid #e2e8f0; margin:20px 0;">
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:10px 40px 30px;">

              <p style="margin:0 0 10px; color:#a0aec0; font-size:12px; line-height:1.5;">
                This is an automated message. Please do not reply to this email.
              </p>

              <p style="margin:0; color:#a0aec0; font-size:12px;">
                &copy; ${year} Team Instagram. All rights reserved.
              </p>

            </td>
          </tr>

        </table>
        <!-- End Main Container -->

      </td>
    </tr>
  </table>

</body>
</html>
`

    }
    await transporter.sendMail(Options);

}

export const registerUser = async(req, res) => {
    try {
        const { m_mail, password, name, b_day, username } = req.body
        console.log(req.body)
        if (!m_mail || !password || !name || !b_day || !username) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Email Check
        let checkmail = await User.findOne({ m_mail })
        if (checkmail) {
            return res.status(401).json({ message: "Email already exist" })
        }

        // Username Check
        let checkusername = await User.findOne({ username })
        if (checkusername) {
            return res.status(401).json({ message: "Username already exist" })
        }

        let otp = generateOTP()

        await sendOTP(m_mail, otp)

        // User Create
        const newuser = await User.create({
            m_mail,
            password,
            name,
            b_day,
            username,
            otp
        })

        // ✅ SIRF YEH EK RESPONSE BHEJEIN
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                _id: newuser._id,
                m_mail: newuser.m_mail,
                name: newuser.name,
                b_day: newuser.b_day,
                username: newuser.username,
                token: generateToken(newuser._id)
                    // ❌ password aur otp kabhi frontend ko wapas nahi bhejna chahiye
            }
        });

    } catch (error) {
        console.log("Error aya:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
}

export const verifyotp = async(req, res) => {
    try {
        const { otp, m_mail } = req.body;
        if (!otp || !m_mail) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }

        const finduser = await User.findOne({ m_mail });
        if (!finduser) {
            return res.status(404).json({ message: "User not Found" });
        }

        if (String(finduser.otp) === String(otp)) {
            finduser.otp = null; // ✅ reuse band
            await finduser.save();
            return res.status(200).json({ // ✅ JSON response
                success: true,
                message: "OTP verified successfully",
            });
        }

        return res.status(401).json({ message: "Invalid OTP" });
    } catch (err) {
        console.error("verifyotp:", err);
        return res.status(500).json({ message: "Server Error" });
    }
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}