// const dauria = require('dauria');
// const processUpload = require('../../hooks/process-upload')

module.exports = {
  before: {
    all: [ /*processUpload ()*/ ],
    find: [],
    get: [],
    create: [
      function(context) {
        // console.log(context)
        console.log('uploads BEFORE ' + context.data.email)
        /*
        if (!context.data.uri && context.params.file){
          const file = context.params.file;
          const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
          // context.data = {uri: uri};
          context.data.uri = uri
        }
        */
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      function(context) {
        // console.log(context)
        console.log('uploads AFTER ' + context.data.email)
        /*
        if (!context.data.uri && context.params.file){
          const file = context.params.file;
          const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
          // context.data = {uri: uri};
          context.data.uri = uri
        }
        */
        return context
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
