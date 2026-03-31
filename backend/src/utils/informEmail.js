import { brevo } from "../config/brevo.config.js";

export const informEmail = async (name, email, contact, message) => {
    try {
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Inquiry Received</title>
</head>

<body style="margin:0;padding:0;background-color:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:10px;padding:30px;border:1px solid #e5e7eb;">

<tr>
<td align="center" style="padding-bottom:20px;">
<h2 style="margin:0;color:#111827;">New Contact Inquiry</h2>
</td>
</tr>

<tr>
<td style="color:#374151;font-size:15px;line-height:1.6;text-align:center;">
You have received a new inquiry from your website.
</td>
</tr>

<tr>
<td style="padding:25px 0;">
<table width="100%" cellpadding="10" cellspacing="0" style="background:#f9fafb;border-radius:8px;">

<tr>
<td style="color:#111827;font-size:14px;"><b>Name:</b></td>
<td style="color:#374151;font-size:14px;">${name}</td>
</tr>

<tr>
<td style="color:#111827;font-size:14px;"><b>Email:</b></td>
<td style="color:#374151;font-size:14px;">${email}</td>
</tr>

<tr>
<td style="color:#111827;font-size:14px;"><b>Contact:</b></td>
<td style="color:#374151;font-size:14px;">${contact}</td>
</tr>
<tr>
<td style="color:#111827;font-size:14px;"><b>Message:</b></td>
<td style="color:#374151;font-size:14px;">
${message ? message : "No message provided"}
</td>
</tr>

</table>
</td>
</tr>

<tr>
<td style="text-align:center;color:#6b7280;font-size:14px;">
Please respond to this inquiry as soon as possible.
</td>
</tr>

<tr>
<td style="padding-top:30px;text-align:center;border-top:1px solid #e5e7eb;color:#6b7280;font-size:13px;">
Portfolio System Notification<br>
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

        const result = await brevo("ra786roshanansari@gmail.com", "Inform Email", htmlContent);

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