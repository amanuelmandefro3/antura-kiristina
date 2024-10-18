import {
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    VERIFICATION_EMAIL_TEMPLATE,
    WELCOME_EMAIL_TEMPLATE
  } from "./emailTemplates.js";
  import { emailerTransporter } from "./email.config.js";
  
  export const sendVerificationEmail = async (email, verificationToken) => {
  
    try {

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace(
                "{verificationCode}",
                verificationToken
              ),
          };
      
          const response = await emailerTransporter.sendMail(mailOptions);

    //   const response = await mailtrapClient.send({
    //     from: sender,
    //     to: recipient,
    //     subject: "Verify your email",
    //     html: VERIFICATION_EMAIL_TEMPLATE.replace(
    //       "{verificationCode}",
    //       verificationToken
    //     ),
    //     category: "Email Verification",
    //   });
  
      console.log("Email sent successfully");
    } catch (error) {
      console.error(`Error sending verification`, error);
  
      throw new Error(`Error sending verification email: ${error}`);
    }
  };
  
  export const sendWelcomeEmail = async (email, name) => {
  
    try {

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Welcome To Antura Christian",
            html: WELCOME_EMAIL_TEMPLATE.replace(
                "{userName}",
                name
              ),
          };
      
          const response = await emailerTransporter.sendMail(mailOptions);  
    //   const response = await mailtrapClient.send({
    //     from: sender,
    //     to: recipient,
    //     template_uuid: "9cf4b940-f3aa-420f-bf07-a3a18c67e0e2",
    //     template_variables: {
    //       company_info_name: "Antura christian",
    //       name: name,
    //       company_info_address: "123 Main Street",
    //       company_info_city: "Addis Ababa",
    //       company_info_zip_code: "1000",
    //       company_info_country: "Ethiopia",
    //     },
    //   });
  
      console.log("Welcome email sent successfully", response);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to send welcome email");
    }
  };
  
  export const sendPasswordResetEmail = async (email, resetURL) => {

  
    try {

        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Password Reset",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
          };
      
        const response = await emailerTransporter.sendMail(mailOptions);    
    //   const response = await mailtrapClient.send({
    //     from: sender,
    //     to: recipient,
    //     subject: "Password Reset",
    //     html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    //     category: "Password Reset",
    //   });
  
      console.log("Password reset email sent successfully");
    } catch (error) {
      console.error(error);
      throw new Error("Failed to send password reset email");
    }
  };
  
  export const sendPasswordResetSuccessEmail = async (email) => {

    try {
      
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Password Reset Success",
            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
          };
      
        const response = await emailerTransporter.sendMail(mailOptions);  
    //   const response = await mailtrapClient.send({
    //     from: sender,
    //     to: recipient,
    //     subject: "Password Reset Success",
    //     html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    //     category: "Password Reset",
    //   });
  
      console.log("Password reset success email sent successfully");
    } catch (error) {
      console.error(error);
      throw new Error("Failed to send password reset success email");
    }
  };
  