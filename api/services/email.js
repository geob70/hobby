const api_key = 'c48e7a059980c8b68822453f6a784c58-0470a1f7-a3cf82e7';
const domain = "sandbox34dc6b7a0bad47089399c0d01c129e33.mailgun.org";
const gun = require('mailgun-js')({
  apiKey: api_key,
  domain: domain
});


module.exports = (message) => {


  return gun.messages().send({
    from: 'Mailgun Sandbox <postmaster@sandbox34dc6b7a0bad47089399c0d01c129e33.mailgun.org>',
    to: 'George Olamide <geoslyman57@gmail.com>', // Text this number
    subject: 'Hello George Olamide',
    text: message
  });

}
