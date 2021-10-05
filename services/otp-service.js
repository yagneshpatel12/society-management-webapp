const hashService = require('./hash-service');
const nodemailer = require("nodemailer");
require('dotenv').config();
const GmailHTMl = (otp)=>{
return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP | digital Society</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

</head>
<body style="font-family: 'Poppins', sans-serif;
            color: #141414b9;">
    <div style=" 
            padding: 20px;
            text-align: center;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
            border: 1px solid rgb(238, 238, 238);
            margin: auto;
            width: 100%;">
        <div style=" width: 100%;
            display: block !important;">
            <h1 style=" color: #1069ff;"> Digital Society</h1>
        </div>
        <div style="border-top: 1px solid rgb(238, 238, 238);
            text-align: center;
            width: 100%;
            display: block !important;
            padding: 40px 0;">
            <p style=" margin: 0;
            font-weight: 500;
            margin-bottom: 15px;">Here's your one time password (OTP).</p>
             <button style=" padding: 10px 0;
            width: 200px;
            cursor: pointer;
            border-radius: 3px;
            background: #1069ff;
            color: white;
            outline: none;
            border: none;
            font-weight: 500;
            font-size: 18px;
            letter-spacing: 2px;">${otp}</button>
        </div>
        <div style="text-align: center;
            padding: 20px 0;
            font-size: 14px;
            display: block !important;
            background: rgb(230, 230, 230);
            width: 100%;
            font-weight: 500;">
            <p style="font-size: 12px;">copyright@2021*digitalsociety*, All rights reserved.</p>
            <p>our mailing address is: <br> digitalsociety2@gmail.com</p>
        </div>
    </div>
</body>
</html>`
}
class OtpService {

    async sendOtpByGmail(email) {
        const otp = Math.floor(1000 + Math.random() * 9000);
        try{
            // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: process.env.GMAIL_APP_USERNAME, // generated ethereal user
            pass: process.env.GMAIL_APP_PASSWORD, // generated ethereal password
            },
        });
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"digitalsociety" <digitalsociety2@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "OTP For Register family", // Subject line
            html: GmailHTMl(otp), // html body
        });
        return otp;
        }catch(err){
            console.log(err)
        }
       
    }

    verifyOtp(hashedOtp, data) {
        let computedHash = hashService.hashData(data);
        return computedHash === hashedOtp;
    }
}

module.exports = new OtpService();
