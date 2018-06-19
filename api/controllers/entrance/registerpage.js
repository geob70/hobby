module.exports = {


  friendlyName: 'View signup',


  description: 'Display "Signup" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/register',
    },

    redirect: {
      description: 'The requesting user is already logged in.',
      responseType: 'redirect'
    }

  },


  fn: async function (inputs, exits) {


    if (this.req.me) {
      throw {
        redirect: '/'
      };
    }
    console.log('signup');
    return exits.success();
  }
};
