import sibApi from "sib-api-v3-sdk";

const brevo = async (email, subject, htmlContent) => {
    try{
        const client = sibApi.ApiClient.instance;

        const apiKey = client.authentications["api-key"];
        apiKey.apiKey = process.env.Brevo_Api_Key;

        const transEmailApi = new sibApi.TransactionalEmailsApi();

        await transEmailApi.sendTransacEmail({
            sender:{
                email: process.env.adminEmail,
                name: "Roshan Ansari"
            },
            to:[{email}],
            subject: subject,
            htmlContent: htmlContent
        })

        return true
    }
    catch(err){
        console.log("Error:", err.message);
        return false;
    }
}

export {brevo}