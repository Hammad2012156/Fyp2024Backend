exports.EmailNotification = async (Emails) => {
  let value;
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  sgMail
    .send(Emails)
    .then(() => {
      value = true;
      console.log("Email sent");
    })
    .catch((error) => {
      value = false;
      console.error("Error sending email:", error);
      if (error.response && error.response.body && error.response.body.errors) {
        const errors = error.response.body.errors;
        console.log("SendGrid API Error Details:");
        errors.forEach((errorItem) => {
          console.log(`- ${errorItem.message}`);
        });
      }
    });
  return value;
};
