exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'e2e/*.js'
  ],

  // capabilities: {
  //     'browserName': 'firefox',
  //     'browserName': 'chrome'
  // },

  multiCapabilities: [
      // {
      //     browserName: 'firefox'
      // },
      {
          browserName: 'chrome'
      }
  ],


  baseUrl: 'http://localhost:8000/app/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
