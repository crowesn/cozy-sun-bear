var json = require('rollup-plugin-json');
var buble = require('rollup-plugin-buble');


// Karma configuration
module.exports = function (config) {

// 	var libSources = require(__dirname + '/../build/build.js').getFiles();

  var files = [
    "src/cozy.js",
    "node_modules/sinon/pkg/sinon.js",
    "node_modules/expect.js/index.js",
		"node_modules/happen/happen.js",
		"node_modules/prosthetic-hand/dist/prosthetic-hand.js",
		"spec/SpecHelper.js",
		"spec/**/*Spec.js"
  ];

	var exclude = [
    "spec/control/*Spec.js",
    "spec/core/BrowserSpec.js",
    "spec/core/BusSpec.js",
    "spec/core/ClassSpec.js",
    "spec/core/EventsSpec.js",
    "spec/dom/*Spec.js",
    "spec/geometry/*Spec.js",
    "spec/reader/*Spec.js"
	];

	config.set({
		// base path, that will be used to resolve files and exclude
		basePath: '',

		plugins: [
			'karma-rollup-plugin',
			'karma-mocha',
			'karma-coverage',
			'karma-coveralls',
			'karma-phantomjs-launcher',
			'karma-chrome-launcher',
			'karma-safari-launcher',
			'karma-firefox-launcher'],

		// frameworks to use
		frameworks: ['mocha'],

		// list of files / patterns to load in the browser
		files: files,
		// proxies: {
		// 	'/base/dist/images/': 'dist/images/'
		// },
		exclude: exclude,

		// Rollup the ES6 Cozy sources into just one file, before tests
		preprocessors: {
			'src/cozy.js': ['rollup', 'coverage']
		},
		rollupPreprocessor: {
			plugins: [
				json(),
				buble()
			],
			format: 'umd',
			moduleName: 'L'
		},

		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: ['dots', 'coverage', 'coveralls'],

		coverageReporter: {
			type: 'lcov',
			dir: 'coverage/'
		},

		// web server port
		port: 9876,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_WARN,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		// browsers: ['PhantomJSCustom'],
		browsers: ['PhantomJS'],

		customLaunchers: {
			'PhantomJSCustom': {
				base: 'PhantomJS',
				flags: ['--load-images=true'],
				options: {
					onCallback: function (data) {
						if (data.render) {
							page.render(data.render);
						}
					}
				}
			}
		},

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 5000,

		// Workaround for PhantomJS random DISCONNECTED error
		browserDisconnectTimeout: 10000, // default 2000
		browserDisconnectTolerance: 1, // default 0

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: true
	});
};