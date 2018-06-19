/**
 * HobbyController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const sendSms = require('../services/sms');
 
module.exports = {
  addhobby: function (req, res) {
    const hobby = req.body.user.hobby;
    const email = req.body.user.email;
    const message = req.body.user.message;
    console.log(hobby);
    console.log(email);
    Hobby.create({
      hobby,
      email:req.body.user.email,
      description: req.body.user.description
    }).exec((err, hobby) => {
      if (err) {
        return res.send({
          sucess: false,
          status: "Error",
          message: "Missing email"
        });
      }
      console.log(message);
      console.log(req.body);
      res.send({
        message: "Hobby created",
        success: true
      });
    });
    // sendSms(message).then((err,res) =>{
    //     if(err){
    //       console.log(err);
    //     }
    //     else{
    //       console.log('sent');
    //     }
    // })
  },

  'showHobbies': async (req,res)=>{

        // const dd = req.session.email;
        // console.log(dd);
        const f = req.body.body.email;
        console.log(f);

        var Hobb = await Hobby.find({
          where:{email: f},
          select:['hobby','description']
        });
        console.log(Hobb);
            //console.log(Hobb);
            return res.send({
              hobby:Hobb
            });
            
  },

  delhobby: async (req,res) =>{
    const f = req.body.body.userid;
        console.log(f);
        var del = await Hobby.destroy({
              id:f
        },(err,res)=>{
          if(err){
            console.log('ella');
          }
          // else{
          //   console.log(req.body.user.message);
          // }
        });
        
sendSms(req.body.body.message);
  },

  




};



