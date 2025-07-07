export const generateOTPEmail = (otp: string, userName: string) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Your OTP Code</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: Arial, sans-serif;">
    <div style="width: 100%; background-color: #f3f4f6; padding: 40px 0;">
      <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <tr>
          <td align="center" style="background-color: #4f46e5; padding: 20px;">
            <h1 style="color: white; font-size: 24px; margin: 0;">Welcome to MyApp</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px;">
            <p style="font-size: 16px; color: #333;">Hi <strong>${userName}</strong>,</p>
            <p style="font-size: 16px; color: #333;">
              Here is your One-Time Password (OTP). It is valid for the next <strong>10 minutes</strong>.
            </p>

            <div style="text-align: center; margin: 30px 0;">
              <div style="display: inline-block; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #4f46e5;">
                ${otp}
              </div>
            </div>

            <p style="font-size: 14px; color: #666;">
              If you did not request this, you can safely ignore this email. 
            </p>
            <p style="font-size: 14px; color: #666;">
              Thanks,<br />The MyApp Team
            </p>
          </td>
        </tr>
        <tr>
          <td align="center" style="background-color: #e5e7eb; padding: 20px; font-size: 12px; color: #999;">
            &copy; ${new Date().getFullYear()} MyApp. All rights reserved.
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
`;
