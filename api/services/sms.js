const twilio = require('twilio');


module.exports = (message) => {
  const accountSid = 'AC0d0db08d2bdabf6aa472c42e80094215';
  const authToken = "7a14fcb4aae89526e3ef6d843751c3e0";



  const client = new twilio(accountSid, authToken);

  return client.messages.create({
    body: message,
    to: '+2348182128510',
    from: '+14158437360' 
  });
  
}
