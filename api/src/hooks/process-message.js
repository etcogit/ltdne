// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    // The authenticated user
    const user = context.params.user
    // The actual message text
    const text = context.data.text
      // Messages can't be longer than 400 characters
      .substring(0, 400)
      // Do some basic HTML escaping
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    // Override the original data
    context.data = {
      text,
      // Set the user id
      userId: user._id,
      // Add the current time via `getTime`
      createdAt: new Date().getTime()
    }
    // Hooks can either return nothing or a promise
    // that resolves with the `context` object for asynchronous operations
    return context;
  };
};
