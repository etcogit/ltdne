const dauria = require('dauria');
const processUpload = require('../../hooks/process-upload')
const fs = require('fs')


module.exports = {
  before: {
    all: [ processUpload () ],
    find: [],
    get: [],
    create: [
      function(context) {
        // console.log(context)
        console.log('upload BEFORE ')
        if (!context.data.uri && context.params.file){
          const file = context.params.file;
          const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
          // context.data = {uri: uri};
          context.data.uri = uri
        }
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
        // Je rassemble toutes des variables dans "context" pour qu'elles soient accessibles pour la suite
        context.data.originalFilename = context.params.file.originalname,
        context.data.encoding = context.params.file.encoding,
        context.data.mimetype = context.params.file.mimetype,
        context.data.size = context.params.file.size,
        context.data.filename = context.result.id, // c'est le nom de fichier donné par blobservice que je récupère afin de pouvoir le stocker en DB
        context.data.extension = context.data.originalFilename.split('.').pop() // je récupère l'extension du fichier
        delete context.result.uri // je supprime de 'result' (donc de la réponse envoyée au client) le binaire du fichier pcq ce n'est pas nécessaire de le renvoyer au client

        console.log('upload AFTER :')
        // console.log(context.data)

        // J'appelle la méthode "create" du service '/uploads' pour enregistrer toutes les infos en DB
        return context.app.service('/uploads').create({
          originalFilename: context.data.originalFilename,
          encoding: context.data.encoding,
          mimetype: context.data.mimetype,
          size: context.data.size,
          filename: context.data.filename,
          extension: context.data.extension
        }).then(result => {
          console.log("uploads DONE ");
          // console.log(result);
          // Je récupère l'id du document dans la DB
          context.data._id = result._id
          // Je renomme le fichier sur le stockage
          var newFilename = context.data._id + '.' + context.data.extension
          fs.rename(__dirname + '/uploads/' + context.data.filename, (__dirname + '/uploads/' + newFilename), function (err) {
            if (err) console.log('Erreur de renommage du fichier dans upload.hooks.js')
            console.log('Fichier renommé -> uploads.hooks.js')
            return context.app.service('/uploads').patch(context.data._id, {
              filename: newFilename
            }).then(result => {
              console.log('filename in database updated -> upload.hooks.js')
              // console.log(context)
              // context.result.titi = 'my custom response'
              return context
            })
          })
          // return context;
        });
        // return context
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
