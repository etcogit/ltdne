// Initializes the `uploadFiles` service on path `/upload-files`
const createService = require('./upload-files.class.js');
const hooks = require('./upload-files.hooks');

const multer = require('multer');
const multipartMiddleware = multer();

/* le code ci-dessous est tiré de https://docs.feathersjs.com/guides/advanced/file-uploading.html#feathers-blob-with-multipart-support */
// feathers-blob service
const blobService = require('feathers-blob');
// Here we initialize a FileSystem storage,
// but you can use feathers-blob with any other
// storage service like AWS or Google Drive.
const fs = require('fs-blob-store');


// File storage location. Folder must be created before upload.
// Example: './uploads' will be located under feathers app top level.
const blobStorage = fs(__dirname + '/uploads');

module.exports = function (app) {
/*
  const paginate = app.get('paginate');

  const options = {
    paginate
  };
*/
  // Initialize our service with any options it requires
  app.use('/upload-files', 
    // multer parses the file named 'file'.
    // Without extra params the data is
    // temporarely kept in memory
    multipartMiddleware.single('file'),
    // another middleware, this time to
    // transfer the received file to feathers
    function(req,res,next){
      req.feathers.file = req.file;
      next();
    },
    blobService({
      Model: blobStorage
    })
  )
    // createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('upload-files');

  service.hooks(hooks);
};
