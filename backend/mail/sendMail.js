import nodemailer from "nodemailer";

export const sendInterestMail = (
  farmerEmail,
  farmerName,
  cropName,
  interestedUser
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SENDER,
        pass: process.env.PASSKEY,
      },
    });

    const mailOptions = {
      from: `"KishanMitra" <${process.env.SENDER}>`,
      to: farmerEmail,
      subject: `Someone is interested in your crop: ${cropName}`,
      html: `
        <h2>Dear ${farmerName || "Farmer"},</h2>
        <p>Good news! A user has shown interest in your crop <b>${cropName}</b>.</p>
        <h3>Interested User Details:</h3>
        <ul>
          <li><b>Name:</b> ${interestedUser.fullName || "N/A"}</li>
          <li><b>Email:</b> ${interestedUser.email || "N/A"}</li>
          <li><b>Phone:</b> ${interestedUser.phone || "N/A"}</li>
          <li><b>Address:</b> ${
            interestedUser.address?.formattedAddress || "N/A"
          }</li>
        </ul>
        <p>Please contact the interested user to proceed further.</p>
        <p>Best regards,<br/>The KishanMitra Team</p>
      `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Interest notification mail sent to farmer!");
      }
    });
  } catch (error) {
    console.log(error);
  }
};
