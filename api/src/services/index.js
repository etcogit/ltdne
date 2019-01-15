const users = require('./users/users.service.js');
const messages = require('./messages/messages.service.js');
const upload = require('./upload/upload.service.js');
const uploads = require('./uploads/uploads.service.js');
const uploadFiles = require('./upload-files/upload-files.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(messages);
  app.configure(upload);
  app.configure(uploads);
  app.configure(uploadFiles);
};
