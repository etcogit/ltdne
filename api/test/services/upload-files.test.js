const assert = require('assert');
const app = require('../../src/app');

describe('\'uploadFiles\' service', () => {
  it('registered the service', () => {
    const service = app.service('upload-files');

    assert.ok(service, 'Registered the service');
  });
});
