// uploads-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const uploads = new Schema({
    filename: {type: String}, //, required: true
    originalFilename: {type: String},
    emailUploader: {type: String},
    nom: {type: String},
    prenom: {type: String},
    emailOwner: {type: String},
    tel: {type: String},
    agreedTerms: {type: Boolean},
    encoding: {type: String},
    extension: {type: String},
    mimetype: {type: String},
    size: {type: Number}
  }, {
    timestamps: true
  });

  return mongooseClient.model('uploads', uploads);
};
