// Initializes the `upload` service on path `/upload`
const createService = require('feathers-mongoose');
// const createModel = require('../../models/upload.model');
const hooks = require('./upload.hooks');

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
// const blobStorage = fs('./uploads');
const blobStorage = fs(__dirname + '/uploads');

module.exports = function (app) {
/*
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // const myId = Date.now().toString() + '.' + ${extension(contentType)}
  const myId = Date.now().toString() + '.jpg'

  const options = {
    Model: blobStorage,
    id: 'myCustomId'
  };
*/

  // Initialize our service with any options it requires
  // app.use('/upload', createService(options));
  // app.use('/upload', blobService({ Model: blobStorage}));
  // Upload Service with multipart support
  app.use('/upload',
    // multer parses the file named 'file'.
    // Without extra params the data is
    // temporarely kept in memory
    multipartMiddleware.single('file'),
    // multipartMiddleware.array('file', 5),
    /*
    function(req,res,next){
        console.log(req.body);
        var fileProps = {
            fieldname: req.file.fieldname,
            originalname: req.file.originalname,
            encoding: req.file.encoding,
            mimetype: req.file.mimetype,
            size: req.file.size
        }
        console.log(fileProps);
        
        next();
    },
    */


    // another middleware, this time to
    // transfer the received file to feathers
    function(req,res,next){
        req.feathers.file = req.file;
        next();
    },
/*
    blobService({
      Model: blobStorage,
      id: myId
    })
*/
    // blobService(options)
    blobService({
      Model: blobStorage
    })

  );

  // Initialize our service with any options it requires
  // app.use('/upload', createService(options));
  
  // Get our initialized service so that we can register hooks
  const service = app.service('upload');

  service.hooks(hooks);
};
/*
module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/upload', 
    // multer parses the file named 'file'.
    // Without extra params the data is
    // temporarely kept in memory
    multipartMiddleware.single('file'),
    createService(options)
  );

  // Get our initialized service so that we can register hooks
  const service = app.service('upload');

  service.hooks(hooks);
};
*/
