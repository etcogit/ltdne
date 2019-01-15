// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    console.log('HOOK context.data: ' + JSON.stringify(context.data))
    // The authenticated user
    const user = context.params.user
    // The actual message text
    const text = context.data.text
    // Override the original data
    context.data = {
      text,
      // Add the current time via `getTime`
      createdAt: new Date().getTime()
    }
    // console.log(context.data)
    // Hooks can either return nothing or a promise
    // that resolves with the `context` object for asynchronous operations
    return context;
  };
};
