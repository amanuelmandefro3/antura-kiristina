import {MailtrapClient} from "mailtrap";

const TOKEN = "4a5d8bd6ace5f39106712f3dc297a974";

export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Antura Christian",
};
const recipients = [
  {
    email: "amanuelmandefrow@gmail.com",
  }
];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);