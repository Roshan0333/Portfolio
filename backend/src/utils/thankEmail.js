import { brevo } from "../config/brevo.config.js";

export const thanksEmail = async (email) => {
  try {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Thank You</title>
</head>

<body style="margin:0;padding:0;background-color:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:10px;padding:30px;border:1px solid #e5e7eb;">

<tr>
<td align="center" style="padding-bottom:20px;">
<h2 style="margin:0;color:#111827;">Thank You</h2>
</td>
</tr>

<tr>
<td style="color:#374151;font-size:15px;line-height:1.6;text-align:center;">
Thank you for contacting us. We have received your message and will get back to you shortly.
</td>
</tr>

<tr>
<td style="padding-top:30px;text-align:center;border-top:1px solid #e5e7eb;color:#6b7280;font-size:13px;">
Best Regards,<br>
Roshan Ansari
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;

    const result = await brevo(email, "Thank You Email", htmlContent);

    if (!result) {
      return {
        status: false
      }
    }

    return {
      status: true
    }
  }
  catch (err) {
    return {
      status: false,
      error: err.message
    }
  }
}