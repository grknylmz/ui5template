'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deploy = exports.build = undefined;

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};

exports.testDist = testDist;
exports.downloadOpenUI5 = downloadOpenUI5;
exports.buildOpenUI5 = buildOpenUI5;
exports.copyUi5LibraryThemes = copyUi5LibraryThemes;
exports.loadDependencies = loadDependencies;

var _package = require('./package.json');

var _package2 = _interopRequireDefault(_package);

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _gulpIf = require('gulp-if');

var _gulpIf2 = _interopRequireDefault(_gulpIf);

var _gulpRename = require('gulp-rename');

var _gulpRename2 = _interopRequireDefault(_gulpRename);

var _gulpPlumber = require('gulp-plumber');

var _gulpPlumber2 = _interopRequireDefault(_gulpPlumber);

var _gulpBabel = require('gulp-babel');

var _gulpBabel2 = _interopRequireDefault(_gulpBabel);

var _gulpUglify = require('gulp-uglify');

var _gulpUglify2 = _interopRequireDefault(_gulpUglify);

var _gulpHtmlmin = require('gulp-htmlmin');

var _gulpHtmlmin2 = _interopRequireDefault(_gulpHtmlmin);

var _gulpPrettyData = require('gulp-pretty-data');

var _gulpPrettyData2 = _interopRequireDefault(_gulpPrettyData);

var _gulpImagemin = require('gulp-imagemin');

var _gulpImagemin2 = _interopRequireDefault(_gulpImagemin);

var _gulpCleanCss = require('gulp-clean-css');

var _gulpCleanCss2 = _interopRequireDefault(_gulpCleanCss);

var _gulpLess = require('gulp-less');

var _gulpLess2 = _interopRequireDefault(_gulpLess);

var _gulpTap = require('gulp-tap');

var _gulpTap2 = _interopRequireDefault(_gulpTap);

var _gulpOrder = require('gulp-order');

var _gulpOrder2 = _interopRequireDefault(_gulpOrder);

var _gulpTouchCmd = require('gulp-touch-cmd');

var _gulpTouchCmd2 = _interopRequireDefault(_gulpTouchCmd);

var _gulpSourcemaps = require('gulp-sourcemaps');

var _gulpSourcemaps2 = _interopRequireDefault(_gulpSourcemaps);

var _gulpUi5Preload = require('gulp-ui5-preload');

var _gulpUi5Preload2 = _interopRequireDefault(_gulpUi5Preload);

var _gulpMainNpmFiles = require('gulp-main-npm-files');

var _gulpMainNpmFiles2 = _interopRequireDefault(_gulpMainNpmFiles);

var _ui5CacheBuster = require('ui5-cache-buster');

var _ui5CacheBuster2 = _interopRequireDefault(_ui5CacheBuster);

var _ui5LibUtil = require('ui5-lib-util');

var _gulpNwabapUi5uploader = require('gulp-nwabap-ui5uploader');

var _gulpNwabapUi5uploader2 = _interopRequireDefault(_gulpNwabapUi5uploader);

var _browserify = require('browserify');

var _browserify2 = _interopRequireDefault(_browserify);

var _vinylSourceStream = require('vinyl-source-stream');

var _vinylSourceStream2 = _interopRequireDefault(_vinylSourceStream);

var _vinylBuffer = require('vinyl-buffer');

var _vinylBuffer2 = _interopRequireDefault(_vinylBuffer);

var _babelify = require('babelify');

var _babelify2 = _interopRequireDefault(_babelify);

var _lessPluginAutoprefix = require('less-plugin-autoprefix');

var _lessPluginAutoprefix2 = _interopRequireDefault(_lessPluginAutoprefix);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _browserSync = require('browser-sync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var _gulpHandlebarsHtml = require('gulp-handlebars-html');

var _gulpHandlebarsHtml2 = _interopRequireDefault(_gulpHandlebarsHtml);

var _gulpFavicons = require('gulp-favicons');

var _gulpFavicons2 = _interopRequireDefault(_gulpFavicons);

var _gulpGzip = require('gulp-gzip');

var _gulpGzip2 = _interopRequireDefault(_gulpGzip);

var _gulpBrotli = require('gulp-brotli');

var _gulpBrotli2 = _interopRequireDefault(_gulpBrotli);

var _connectGzipStatic = require('connect-gzip-static');

var _connectGzipStatic2 = _interopRequireDefault(_connectGzipStatic);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

// TODO: because build script becomes so feature rich it should be split into sub modules

/*
 * SETUP SCRIPT RUNTIME ENVIRONMENT
 */

// parse program commands
_commander2.default.version(_package2.default.version).option('--silent').parse(process.argv);

var hdlbars = (0, _gulpHandlebarsHtml2.default)(_handlebars2.default);
var spinner = (0, _ora2.default)();

// register handlebars helper function
_handlebars2.default.registerHelper('secure', function (str) {
  return new _handlebars2.default.SafeString(str);
});

// switch between gulp log and custom log
spinner.enabled = _commander2.default.silent;
spinner.print = function (sText) {
  return spinner.stopAndPersist({
    text: sText
  });
};

/*
 * CONFIGURATION
 */

var IS_DEV_MODE = process.env.NODE_ENV === 'development';

// path to source directory
var SRC = 'src';
// path to development directory
var DEV = '.tmp';
// path to ditribution directory
var DIST = 'dist';
// path to ui5 repository
var UI5 = IS_DEV_MODE ? 'ui5' : DIST + '/ui5';

// create unique hash for current favicon image
var isFaviconDefined = _package2.default.favicon && _package2.default.favicon.src.length > 0 && _fs2.default.existsSync(_package2.default.favicon.src);
var FAVICON_HASH = isFaviconDefined ? require('loader-utils').getHashDigest(Buffer.concat([_fs2.default.readFileSync(_package2.default.favicon.src)]), 'sha512', 'base62', 8).toLowerCase() : '';

// read build settings
var BUILD = {
  cacheBuster: _package2.default.ui5.build && _package2.default.ui5.build.cacheBuster === true,
  compression: _package2.default.ui5.build && _package2.default.ui5.build.compression !== false,
  compressionGzip: _package2.default.ui5.build && (_package2.default.ui5.build.compression === true || [].concat(_package2.default.ui5.build.compression).includes('gzip')),
  compressionBrotli: _package2.default.ui5.build && (_package2.default.ui5.build.compression === true || [].concat(_package2.default.ui5.build.compression).includes('brotli'))

  // helper array function
};
var noPrebuild = function noPrebuild(oModule) {
  return oModule.prebuild !== true;
};
var mapExternalModulePath = function mapExternalModulePath(oModule) {
  return _extends({}, oModule, {
    path: oModule.path.replace(/^\/?node_modules/, SRC + '/node_modules')
  });
};

// read modules
var UI5_APPS = (_package2.default.ui5.apps || []).map(mapExternalModulePath);
var UI5_LIBS = (_package2.default.ui5.libraries || []).map(mapExternalModulePath);
var UI5_THEMES = (_package2.default.ui5.themes || []).map(mapExternalModulePath);
var NON_UI5_ASSETS = (_package2.default.ui5.assets || []).map(mapExternalModulePath);
var UI5_ROOTS = [].concat(UI5_APPS).concat(UI5_THEMES).concat(UI5_LIBS).concat(NON_UI5_ASSETS);

// target directory of plain npm dependencies
var NPM_MODULES_TARGET = _package2.default.ui5.vendor || {
  name: '',
  path: ''

  // identify ui5 modules loaded as devDependency
};
var NPM_UI5_LIBS = (_package2.default.ui5.libraries || []).filter(function (oModule) {
  return oModule.path.startsWith('node_modules');
});
var NPM_UI5_MODULES = [].concat(_package2.default.ui5.apps || []).concat(_package2.default.ui5.themes || []).concat(_package2.default.ui5.libraries || []).concat(_package2.default.ui5.assets || []).filter(function (oModule) {
  return oModule.path.startsWith('node_modules');
});

var TARGET_THEME = _package2.default.ui5.theme || 'sap_belize';

// paths used in our app
var paths = {
  entry: {
    src: [_package2.default.main]
  },
  assets: {
    src: UI5_ROOTS.filter(noPrebuild).reduce(function (aSrc, oModule) {
        return aSrc.concat([oModule.path + '/**/*.properties', oModule.path + '/**/*.json', oModule.path + '/**/*.{xml,html}', oModule.path + '/**/*.css', oModule.path + '/**/*.{jpg,jpeg,png,svg,ico}']);
      }, [])
      // take into account .js files only for asset roots
      // TODO: create path automatically based on pkg.main
      .concat(NON_UI5_ASSETS.map(function (oAsset) {
        return oAsset.path + '/**/*.js';
      }))
  },
  scripts: {
    src: UI5_APPS.filter(noPrebuild).concat(UI5_LIBS).map(function (oModule) {
      return oModule.path + '/**/*.js';
    })
  },
  appStyles: {
    src: UI5_APPS.concat(NON_UI5_ASSETS).map(function (oModule) {
      return oModule.path + '/**/*.less';
    })
  },
  libStyles: {
    src: UI5_LIBS.filter(noPrebuild).map(function (oLibrary) {
      return oLibrary.path + '/**/*.less';
    })
  },
  themeStyles: {
    src: UI5_THEMES.filter(noPrebuild).map(function (oTheme) {
      return oTheme.path + '/**/*.less';
    })
  },
  htmlEntries: {
    // this should be the result file of task 'entryDist'
    src: [DIST + '/index.html']
  }

  /**
   * Gulp 'start' task (development mode).
   * @description Call update and start file watcher.
   * @public
   */
};
var start = _gulp2.default.series(logStart, clean, favicon, _gulp2.default.parallel(_gulp2.default.series(downloadOpenUI5, buildOpenUI5), loadDependencies), _gulp2.default.parallel(copyUi5Theme, copyUi5LibraryThemes), _gulp2.default.parallel(entry, assets, scripts, ui5AppStyles, ui5LibStyles, ui5ThemeStyles), _gulp2.default.parallel(logStats), watch);

// log start message and start spinner
function logStart(done) {
  spinner.print(' ');
  spinner.start('Start development server...');
  done();
}

// log common statistics
function logStatsCommons() {
  var sSourceID = _package2.default.ui5.src;
  var oSource = _package2.default.ui5.srcLinks[sSourceID];
  var sUI5Version = oSource.version;
  var sOnlineUI5State = !oSource.isArchive && oSource.isPrebuild ? '(remote)' : '';
  var sUI5Details = !oSource.isPrebuild ? '(custom build)' : sOnlineUI5State;

  var iApps = UI5_APPS.length;
  var iThemes = UI5_THEMES.length;
  var iLibs = UI5_LIBS.length;

  var sVendorLibsPath = NPM_MODULES_TARGET.path;
  var aVendorLibs = (0, _gulpMainNpmFiles2.default)();

  if (aVendorLibs.length > 0) {
    spinner.print(' ');
    spinner.succeed('Dependencies (vendor libraries) loaded into: ' + sVendorLibsPath);

    aVendorLibs.forEach(function (sEntry) {
      var sModuleName = sEntry.split('/node_modules/')[1].split('/')[0];
      spinner.print('\u2022 ' + sModuleName + ' as ' + getExposedModuleName(sModuleName));
    });
  }

  // print success message
  spinner.print(' ');
  spinner.succeed('UI5 Version: ' + sUI5Version + ' ' + sUI5Details).print(' ');
  spinner.succeed('UI5 assets created:').print('\u2022 ' + iApps + ' app' + (iApps !== 1 ? 's' : '')).print('\u2022 ' + iThemes + ' theme' + (iThemes !== 1 ? 's' : '')).print('\u2022 ' + iLibs + ' librar' + (iLibs !== 1 ? 'ies' : 'y')).print(' ');
}

// log start statistics and stop spinner
function logStats(done) {
  // print success message
  spinner.succeed('Development server started, use Ctrl+C to stop and go back to the console...');
  logStatsCommons();
  done();
}
exports.default = start;

/**
 * Gulp 'build' task (distribution mode).
 * @description Build the complete app to run in production environment.
 * @public
 */

var build = _gulp2.default.series(logStartDist, cleanDist, favicon, _gulp2.default.parallel(_gulp2.default.series(downloadOpenUI5, buildOpenUI5), loadDependenciesDist), _gulp2.default.parallel(copyUi5Theme, copyUi5LibraryThemes), _gulp2.default.parallel(entryDist, assetsDist, scriptsDist, ui5AppStylesDist, ui5LibStylesDist, ui5ThemeStylesDist), _gulp2.default.parallel(ui5preloads, ui5LibPreloads), _gulp2.default.parallel(ui5cacheBust), _gulp2.default.parallel(preCompressionGzip, preCompressionBrotli), logStatsDist);
var buildErrorHandler = {
  errorHandler: function errorHandler(error) {
    // print error
    spinner.fail(error);
    // exit gulp
    throw error;
  }

  // log start build message and start spinner
};

function logStartDist(done) {
  spinner.print(' ');
  spinner.start('Build start...');
  done();
}

// log build statistics and stop spinner
function logStatsDist(done) {
  // print success message
  spinner.succeed('Build successfull.').print(' ').print('Build entry:  ' + _package2.default.main).print('Build output: ' + _path2.default.resolve(__dirname, DIST));
  logStatsCommons();
  done();
}
exports.build = build;

/**
 * Gulp 'deploy' task (distribution mode).
 * @description Deploy the complete app to run in production environment.
 * @public
 */

var deploy = _gulp2.default.series(logStartDeploy,
  // TODO: add test task to run qunit and opa5 tests
  build, ui5Upload, logStatsDeploy);

// log start deploy message and start spinner
function logStartDeploy(done) {
  spinner.print(' ');
  spinner.start('Deployment start...');
  done();
}

// log deploy statistics and stop spinner
function logStatsDeploy(done) {
  var sSourceID = _package2.default.ui5.src;
  var oSource = _package2.default.ui5.srcLinks[sSourceID];
  var sUI5Version = oSource.version;
  var sBackendServer = _package2.default.ui5.nwabapUpload.conn.server;
  var sOnlineUI5State = !oSource.isArchive && oSource.isPrebuild ? '(remote)' : '';
  var sUI5Details = !oSource.isPrebuild ? '(custom build)' : sOnlineUI5State;

  var aApps = _package2.default.ui5.apps || [];
  var iApps = aApps.length;
  var iThemes = (_package2.default.ui5.themes || []).length;
  var iLibs = (_package2.default.ui5.libraries || []).length;

  // print success message
  spinner.succeed('Deployment successfull.').print(' ').print('Deployed entry:    ' + _package2.default.main).print('ABAP Server:       ' + sBackendServer).print(' ').print('Apps uploaded:').print(' ');

  aApps.forEach(function (oApp) {
    var sDevPackage = oApp.nwabapDestination.package;
    var sBspContainer = oApp.nwabapDestination.bspcontainer;
    var sBspContainerText = oApp.nwabapDestination.bspcontainer_text;
    var sTransportNo = oApp.nwabapDestination.transportno;

    spinner.print('App name:          ' + oApp.name).print('ABAP Package:      ' + sDevPackage).print('BSP Container:     ' + sBspContainer).print('BSP Description:   ' + sBspContainerText).print('Transport Request: ' + sTransportNo).print(' ');
  });

  spinner.print('UI5 Version: ' + sUI5Version + ' ' + sUI5Details).print(' ').print('UI5 assets created:').print('\u25FB  ' + iApps + ' app' + (iApps !== 1 ? 's' : '')).print('\u25FB  ' + iThemes + ' theme' + (iThemes !== 1 ? 's' : '')).print('\u25FB  ' + iLibs + ' librar' + (iLibs !== 1 ? 'ies' : 'y')).print(' ');
  done();
}
exports.deploy = deploy;

/* ----------------------------------------------------------- *
 * watch files for changes
 * ----------------------------------------------------------- */

// [development build]

function watch() {
  var sSuccessMessage = '\uD83D\uDE4C  (Server started, use Ctrl+C to stop and go back to the console...)';

  // start watchers
  _gulp2.default.watch(paths.entry.src, _gulp2.default.series(entry, reload));
  _gulp2.default.watch(paths.assets.src, _gulp2.default.series(assets, reload));
  _gulp2.default.watch(paths.scripts.src, _gulp2.default.series(scripts, reload));
  _gulp2.default.watch(paths.appStyles.src, _gulp2.default.series(ui5AppStyles, reload));
  _gulp2.default.watch(paths.libStyles.src, _gulp2.default.series(ui5LibStyles, reload));
  _gulp2.default.watch(paths.themeStyles.src, _gulp2.default.series(ui5ThemeStyles, reload));

  // start HTTP server
  // learn more about the powerful options (proxy, middleware, etc.) here:
  // https://www.browsersync.io/docs/options
  _browserSync2.default.init({
    // open the browser automatically
    open: true,
    // use port defined in package.json
    port: parseInt(process.env.DEV_PORT || 3000, 10),
    // TODO: create path automatically based on pkg.main
    startPath: 'index.html',
    server: {
      baseDir: './' + DEV,
      index: 'index.html',
      routes: {
        '/ui5': './' + UI5
      }
    }
  });

  // log success message
  _gulpUtil2.default.log(_gulpUtil2.default.colors.green(sSuccessMessage));
}

// [production build]
function testDist() {
  var sSuccessMessage = '\uD83D\uDE4C  (Server started, use Ctrl+C to stop and go back to the console...)';

  // start HTTP server
  // learn more about the powerful options (proxy, middleware, etc.) here:
  // https://www.browsersync.io/docs/options
  _browserSync2.default.init({
    // open the browser automatically
    open: true,
    // use port defined in package.json
    port: parseInt(process.env.DEV_PORT || 3000, 10),
    // TODO: create path automatically based on pkg.main
    startPath: 'index.html',
    server: {
      baseDir: './' + DIST,
      index: 'index.html',
      routes: {
        '/ui5': './' + UI5
      }
    },
    callbacks: {
      ready: function ready(err, bs) {
        // gzip/brotli static middleware - serves compressed files if they exist
        bs.addMiddleware('*', (0, _connectGzipStatic2.default)('./' + DIST), {
          override: true
        });

        // only serve ui5 assets if not fetched from remote
        if (_fs2.default.existsSync('./' + UI5)) {
          bs.addMiddleware('/ui5', (0, _connectGzipStatic2.default)('./' + UI5), {
            override: true
          });
        }
      }
    }
  });

  // log success message
  _gulpUtil2.default.log(_gulpUtil2.default.colors.green(sSuccessMessage));
}

/* ----------------------------------------------------------- *
 * reload browser
 * ----------------------------------------------------------- */

// [development build]
function reload(done) {
  _browserSync2.default.reload();
  _gulpUtil2.default.log('Change completed, ready for reload...');
  spinner.print('\uD83D\uDC35  update completed.');
  done();
}

/* ----------------------------------------------------------- *
 * if required: download and build OpenUI5 library
 * ----------------------------------------------------------- */

// [development & production build]
function downloadOpenUI5() {
  try {
    var sSourceID = _package2.default.ui5.src;
    var oSource = _package2.default.ui5.srcLinks[sSourceID];
    var sUI5Version = oSource.version;
    var sCompiledURL = _handlebars2.default.compile(oSource.url)(oSource);
    var isRemoteLink = sCompiledURL.startsWith('http');

    // if UI5 download link is marked as prebuild,
    // we can extract it directly into '/ui5' target directory
    var sDownloadPath = !oSource.isPrebuild ? _path2.default.resolve(__dirname, './.download') : _path2.default.resolve(__dirname, './' + UI5);
    var isDownloadRequired = oSource.isArchive && isRemoteLink && !_fs2.default.existsSync(sDownloadPath + '/' + sUI5Version);
    var oDownloadOptions = {
      onProgress: function onProgress(iStep, iTotalSteps, oStepDetails) {
        // update spinner state
        spinner.text = 'Downloading UI5... [' + iStep + '/' + iTotalSteps + '] ' + Math.round(oStepDetails.progress || 0) + '% (' + oStepDetails.name + ')';
      }
    };

    if (isDownloadRequired) {
      // update spinner state
      spinner.text = 'Downloading UI5... (this task can take several minutes, please be patient)';
    }

    // return promise
    return isDownloadRequired ? (0, _ui5LibUtil.ui5Download)(sCompiledURL, sDownloadPath, sUI5Version, oDownloadOptions).then(function (sSuccessMessage) {
      spinner.succeed(sSuccessMessage);
      spinner.start('');
    }).catch(function (sErrorMessage) {
      spinner.fail(sErrorMessage);
      spinner.start('');
    }) : Promise.resolve();
  } catch (error) {
    spinner.fail(error);
  }
}

// [development & production build]
function buildOpenUI5() {
  try {
    var sSourceID = _package2.default.ui5.src;
    var oSource = _package2.default.ui5.srcLinks[sSourceID];
    var sUI5Version = oSource.version;

    var sDownloadPath = _path2.default.resolve(__dirname, './.download');
    var sUI5TargetPath = _path2.default.resolve(__dirname, './' + UI5 + '/' + sUI5Version);
    var isBuildRequired = oSource.isPrebuild === false && !_fs2.default.existsSync(sUI5TargetPath);
    var oBuildOptions = {
      onProgress: function onProgress(iStep, iTotalSteps, oStepDetails) {
        // update spinner state
        spinner.text = 'Build UI5... [' + iStep + '/' + iTotalSteps + '] (' + oStepDetails.name + ')';
      }
    };

    if (isBuildRequired) {
      // update spinner state
      spinner.text = 'Build UI5... (this task can take several minutes, please be patient)';
    }

    // define build Promise
    return isBuildRequired ? (0, _ui5LibUtil.ui5Build)(sDownloadPath + '/' + sUI5Version, sUI5TargetPath, sUI5Version, oBuildOptions).then(function (sSuccessMessage) {
      spinner.succeed(sSuccessMessage);
      spinner.start('');
    }).catch(function (sErrorMessage) {
      spinner.fail(sErrorMessage);
      spinner.start('');
    }) : Promise.resolve();
  } catch (error) {
    spinner.fail(error);
  }
}

/* ----------------------------------------------------------- *
 * clean development directory
 * ----------------------------------------------------------- */

// [development build]
function clean() {
  var VENDOR_SRC = _package2.default.ui5.vendor ? _package2.default.ui5.vendor.path + '/**/*' : '';
  return (0, _del2.default)([DEV + '/**/*', '!' + UI5 + '/**/*', '!' + DEV + '/' + FAVICON_HASH].concat(VENDOR_SRC));
}

// [production build]
function cleanDist() {
  var VENDOR_SRC = _package2.default.ui5.vendor ? _package2.default.ui5.vendor.path + '/**/*' : '';
  return (0, _del2.default)([DIST + '/**/*', '!' + UI5 + '/**/*', '!' + DIST + '/' + FAVICON_HASH].concat(VENDOR_SRC));
}

/* ----------------------------------------------------------- *
 * generate favicons (long runner ~ 100-200 sec)
 * ----------------------------------------------------------- */

// [production & development build]
function favicon() {
  var targetPath = IS_DEV_MODE ? DEV : DIST;
  var isFaviconsDirCached = _fs2.default.existsSync(targetPath + '/' + FAVICON_HASH + '/results.html');
  // use content hash of master image as directory name and cashe assets in dev mode
  return isFaviconsDirCached || !isFaviconDefined ? Promise.resolve() : _gulp2.default.src(_package2.default.favicon.src).pipe((0, _gulpPlumber2.default)(buildErrorHandler)).pipe((0, _gulpFavicons2.default)({
    appName: _package2.default.ui5.indexTitle,
    appDescription: _package2.default.description,
    developerName: _package2.default.author,
    version: _package2.default.version,
    background: '#fefefe',
    theme_color: '#fefefe',
    path: './' + FAVICON_HASH,
    html: 'results.html',
    online: false,
    preferOnline: false,
    pipeHTML: true
  })).pipe(_gulp2.default.dest(targetPath + '/' + FAVICON_HASH));
}

/* ----------------------------------------------------------- *
 * optimize and compile app entry (src/index.handlebars)
 * ----------------------------------------------------------- */

// [helper function]
function getHandlebarsProps(sEntryHTMLPath) {
  var aResourceRootsSrc = [].concat(UI5_APPS).concat(UI5_LIBS).concat(NON_UI5_ASSETS).concat([NPM_MODULES_TARGET]);

  return {
    indexTitle: _package2.default.ui5.indexTitle,
    src: getRelativeUI5SrcURL(sEntryHTMLPath),
    theme: TARGET_THEME,
    // create resource roots string
    resourceroots: JSON.stringify(aResourceRootsSrc.reduce(function (oResult, oModule) {
      var sModulePath = oModule.path.replace(new RegExp('^' + SRC), IS_DEV_MODE ? DEV : DIST);
      // create path to theme relative to entry HTML
      return Object.assign(oResult, _defineProperty({}, oModule.name, _path2.default.relative(_path2.default.parse(sEntryHTMLPath).dir, sModulePath)));
    }, {})),
    // create custom theme roots string
    themeroots: JSON.stringify(UI5_THEMES.reduce(function (oResult, oTheme) {
      var sThemePath = oTheme.path.replace(new RegExp('^' + SRC), IS_DEV_MODE ? DEV : DIST);
      // create path to theme relative to entry HTML
      return Object.assign(oResult, _defineProperty({}, oTheme.name, _path2.default.relative(_path2.default.parse(sEntryHTMLPath).dir, sThemePath + '/UI5')));
    }, {})),
    // create favicons
    favicons: isFaviconDefined ? _fs2.default.readFileSync((IS_DEV_MODE ? DEV : DIST) + '/' + FAVICON_HASH + '/results.html', 'utf8') : ''
  };
}

// [helper function]
function getRelativeUI5SrcURL(sEntryHTMLPath) {
  var sEntryPath = _path2.default.dirname(sEntryHTMLPath);
  var sSourceID = _package2.default.ui5.src;
  var oSource = _package2.default.ui5.srcLinks[sSourceID];
  var sCompiledURL = _handlebars2.default.compile(oSource.url)(oSource);
  var isRemoteLink = sCompiledURL.startsWith('http');

  var sOpenUI5PathNaked = _path2.default.resolve(__dirname, UI5 + '/' + oSource.version + '/sap-ui-core.js');
  var sOpenUI5PathWrapped = _path2.default.resolve(__dirname, UI5 + '/' + oSource.version + '/resources/sap-ui-core.js');

  var sRelativeUI5Path = '';

  if (oSource.isArchive && isRemoteLink && !oSource.isPrebuild) {
    // ui5/version/sap-ui-core.js
    sRelativeUI5Path = _path2.default.relative(sEntryPath, sOpenUI5PathNaked);
  } else if (oSource.isArchive && isRemoteLink && oSource.isPrebuild) {
    // ui5/version/resources/sap-ui-core.js (wrapped) OR ui5/version/sap-ui-core.js (naked)
    sRelativeUI5Path = _path2.default.relative(sEntryPath, _fs2.default.existsSync(sOpenUI5PathWrapped) ? sOpenUI5PathWrapped : sOpenUI5PathNaked);
  } else if (!oSource.isArchive && isRemoteLink) {
    // direct remote link
    sRelativeUI5Path = sCompiledURL;
  } else if (!isRemoteLink) {
    // direct local link
    sRelativeUI5Path = _path2.default.relative(sEntryPath, sCompiledURL);
  }

  return sRelativeUI5Path;
}

// [development build]
function entry() {
  try {
    // update spinner state
    spinner.text = 'Compiling project resources...';

    var aEntries = paths.entry.src.map(function (sEntry) {
      return new Promise(function (resolve, reject) {
        return _gulp2.default.src([sEntry],
            // filter out unchanged files between runs
            {
              base: SRC,
              since: _gulp2.default.lastRun(entry)
            })
          // don't exit the running watcher task on errors
          .pipe((0, _gulpPlumber2.default)())
          // compile handlebars to HTML
          .pipe(hdlbars(getHandlebarsProps(_path2.default.resolve(__dirname, sEntry.replace(new RegExp('^' + SRC), DEV))))).pipe((0, _gulpRename2.default)({
            extname: '.html'
          })).pipe(_gulp2.default.dest(DEV)).on('error', reject).on('end', resolve);
      });
    });

    return Promise.all(aEntries);
  } catch (error) {
    spinner.fail(error);
  }
}

// [production build]
function entryDist() {
  try {
    // update spinner state
    spinner.text = 'Compiling project resources...';

    var aEntries = paths.entry.src.map(function (sEntry) {
      return new Promise(function (resolve, reject) {
        return _gulp2.default.src([sEntry],
            // filter out unchanged files between runs
            {
              base: SRC,
              since: _gulp2.default.lastRun(entry)
            }).pipe((0, _gulpPlumber2.default)(buildErrorHandler))
          // compile handlebars to HTML
          .pipe(hdlbars(getHandlebarsProps(_path2.default.resolve(__dirname, sEntry.replace(new RegExp('^' + SRC), DIST)))))
          // minify HTML (disabled, cause data-sap-ui-theme-roots gets removed)
          // .pipe(htmlmin())
          .pipe((0, _gulpRename2.default)({
            extname: '.html'
          })).pipe(_gulp2.default.dest(DIST)).on('error', reject).on('end', resolve).pipe((0, _gulpTouchCmd2.default)());
      });
    });

    return Promise.all(aEntries);
  } catch (error) {
    spinner.fail(error);
  }
}

/* ----------------------------------------------------------- *
 * copy assets to destination folder (.png, .jpg, .json, ...)
 * ----------------------------------------------------------- */

// [development build]
function assets() {
  try {
    return paths.assets.src.length === 0 ? Promise.resolve() : _gulp2.default.src(paths.assets.src,
        // filter out unchanged files between runs
        {
          base: SRC,
          since: _gulp2.default.lastRun(assets)
        })
      // don't exit the running watcher task on errors
      .pipe((0, _gulpPlumber2.default)())
      // do not optimize size and quality of images in dev mode

      // transpile JS: babel will run with the settings defined in `.babelrc` file
      .pipe((0, _gulpIf2.default)(/.*\.js$/, _gulpSourcemaps2.default.init())).pipe((0, _gulpIf2.default)(/.*\.js$/, (0, _gulpBabel2.default)())).pipe((0, _gulpIf2.default)(/.*\.js$/, _gulpSourcemaps2.default.write('../.maps'))).pipe(_gulp2.default.dest(DEV));
  } catch (error) {
    spinner.fail(error);
  }
}

// [production build]
function assetsDist() {
  try {
    return paths.assets.src.length === 0 ? Promise.resolve() : _gulp2.default.src(paths.assets.src, {
        base: SRC
      }).pipe((0, _gulpPlumber2.default)(buildErrorHandler))
      // optimize size and quality of images
      .pipe((0, _gulpIf2.default)(/.*\.(jpg|jpeg|png)$/, (0, _gulpImagemin2.default)({
        progressive: true,
        interlaced: true
      })))
      // minify XML, SVG and JSON
      .pipe((0, _gulpIf2.default)(/.*\.(xml|json|svg)$/, (0, _gulpPrettyData2.default)({
        type: 'minify',
        extensions: {
          svg: 'xml'
        }
      })))
      // rename i18n_*.dist.properties into i18n_*.properties
      .pipe((0, _gulpIf2.default)(/.*\.dist.properties$/, (0, _gulpRename2.default)(function (path) {
        path.basename = path.basename.replace(/\.dist$/g, '');
      })))
      // minify HTML
      .pipe((0, _gulpIf2.default)(/.*\.html$/, (0, _gulpHtmlmin2.default)()))
      // minify CSS
      .pipe((0, _gulpIf2.default)(/.*\.css$/, (0, _gulpCleanCss2.default)({
        // do not resolve inline imports of assets
        inline: false,
        level: 2
      })))
      // transpile JS: babel will run with the settings defined in `.babelrc` file
      .pipe((0, _gulpIf2.default)(/.*\.js$/, (0, _gulpBabel2.default)()))
      // minify JS
      .pipe((0, _gulpIf2.default)(/.*\.js$/, (0, _gulpUglify2.default)())).pipe(_gulp2.default.dest(DIST));
  } catch (error) {
    spinner.fail(error);
  }
}

/* ----------------------------------------------------------- *
 * process scripts and transpiles ES2015 code to ES5 (.js, ...)
 * ----------------------------------------------------------- */

// [development build]
function scripts() {
  try {
    return paths.scripts.src.length === 0 ? Promise.resolve() : _gulp2.default.src(paths.scripts.src,
        // filter out unchanged files between runs
        {
          base: SRC,
          since: _gulp2.default.lastRun(scripts)
        })
      // don't exit the running watcher task on errors
      .pipe((0, _gulpPlumber2.default)()).pipe(_gulpSourcemaps2.default.init())
      // babel will run with the settings defined in `.babelrc` file
      .pipe((0, _gulpBabel2.default)()).pipe(_gulpSourcemaps2.default.write('../.maps')).pipe(_gulp2.default.dest(DEV));
  } catch (error) {
    spinner.fail(error);
  }
}

// [production build]
function scriptsDist() {
  try {
    return paths.scripts.src.length === 0 ? Promise.resolve() : _gulp2.default.src(paths.scripts.src, {
        base: SRC
      }).pipe((0, _gulpPlumber2.default)(buildErrorHandler))
      // babel will run with the settings defined in `.babelrc` file
      .pipe((0, _gulpBabel2.default)())
      // save non-minified copies with debug suffix
      .pipe((0, _gulpRename2.default)(function (path) {
        path.basename = /\.controller$/.test(path.basename) ? path.basename.replace(/\.controller$/, '-dbg.controller') : path.basename + '-dbg';
      })).pipe(_gulp2.default.dest(DIST))
      // process copies without suffix
      .pipe((0, _gulpRename2.default)(function (path) {
        path.basename = /\.controller$/.test(path.basename) ? path.basename.replace(/-dbg\.controller$/, '.controller') : path.basename.replace(/-dbg$/, '');
      }))
      // minify scripts
      .pipe((0, _gulpUglify2.default)()).pipe(_gulp2.default.dest(DIST));
  } catch (error) {
    spinner.fail(error);
  }
}

/* ----------------------------------------------------------- *
 * compile and automatically prefix stylesheets (.less, ...)
 * ----------------------------------------------------------- */

// [development build]
function ui5AppStyles() {
  try {
    var autoprefix = new _lessPluginAutoprefix2.default({
      browsers: ['last 2 versions']
    });
    return paths.appStyles.src.length === 0 ? Promise.resolve() : _gulp2.default.src(paths.appStyles.src,
        // filter out unchanged files between runs
        {
          base: SRC,
          since: _gulp2.default.lastRun(ui5AppStyles)
        })
      // don't exit the running watcher task on errors
      .pipe((0, _gulpPlumber2.default)()).pipe(_gulpSourcemaps2.default.init())
      // compile LESS to CSS
      .pipe((0, _gulpLess2.default)({
        plugins: [autoprefix]
      })).pipe(_gulpSourcemaps2.default.write('../.maps')).pipe(_gulp2.default.dest(DEV));
  } catch (error) {
    spinner.fail(error);
  }
}

// [production build]
function ui5AppStylesDist() {
  try {
    var autoprefix = new _lessPluginAutoprefix2.default({
      browsers: ['last 2 versions']
    });
    return paths.appStyles.src.length === 0 ? Promise.resolve() : _gulp2.default.src(paths.appStyles.src, {
        base: SRC
      }).pipe((0, _gulpPlumber2.default)(buildErrorHandler))
      // compile LESS to CSS
      .pipe((0, _gulpLess2.default)({
        plugins: [autoprefix]
      }))
      // minify CSS
      .pipe((0, _gulpCleanCss2.default)({
        level: 2
      })).pipe(_gulp2.default.dest(DIST));
  } catch (error) {
    spinner.fail(error);
  }
}

/* ----------------------------------------------------------- *
 * bundle app resources in Component-preload.js file
 * ----------------------------------------------------------- */

// [production build]
function ui5preloads() {
  try {
    // update spinner state
    spinner.text = 'Bundling modules...';

    var aPreloadPromise = UI5_APPS.filter(noPrebuild).map(function (oApp) {
      var sDistAppPath = oApp.path.replace(new RegExp('^' + SRC), DIST);
      return new Promise(function (resolve, reject) {
        _gulp2.default.src([
          // bundle all app resources supported by OpenUI5
          sDistAppPath + '/**/*.js', sDistAppPath + '/**/*.view.xml', sDistAppPath + '/**/*.fragment.xml', sDistAppPath + '/**/manifest.json',
          // don't bundle debug resources
          '!' + sDistAppPath + '/**/*-dbg.js', '!' + sDistAppPath + '/**/*-dbg.controller.js'
        ]).pipe((0, _gulpPlumber2.default)(buildErrorHandler)).pipe((0, _gulpOrder2.default)()).pipe((0, _gulpUi5Preload2.default)({
          base: sDistAppPath,
          namespace: oApp.name,
          isLibrary: false
        })).pipe(_gulp2.default.dest(sDistAppPath)).on('error', reject).on('end', resolve);
      });
    });
    return Promise.all(aPreloadPromise);
  } catch (error) {
    spinner.fail(error);
  }
}

/* ----------------------------------------------------------- *
 * bundle library resources in library-preload.js file
 * ----------------------------------------------------------- */

// [production build]
function ui5LibPreloads() {
  try {
    var aPreloadPromise = UI5_LIBS.filter(noPrebuild).map(function (oLibrary) {
      var sDistLibraryPath = oLibrary.path.replace(new RegExp('^' + SRC), DIST);
      return new Promise(function (resolve, reject) {
        _gulp2.default.src([
            // bundle all library resources
            sDistLibraryPath + '/**/*.js', sDistLibraryPath + '/**/*.json',
            // don't bundle debug or peload resources
            '!' + sDistLibraryPath + '/**/*-dbg.js', '!' + sDistLibraryPath + '/**/*-dbg.controller.js', '!' + sDistLibraryPath + '/**/*-preload.js'
          ]).pipe((0, _gulpPlumber2.default)(buildErrorHandler)).pipe((0, _gulpOrder2.default)()).pipe((0, _gulpUi5Preload2.default)({
            base: sDistLibraryPath,
            namespace: oLibrary.name,
            // if set to true a library-preload.json file is emitted
            isLibrary: true
          }))
          // transform all library-preload.json files into library-preload.js (mandatory since OpenUI5 1.40)
          .pipe((0, _gulpIf2.default)('**/library-preload.json', (0, _gulpTap2.default)(function (oFile) {
            var oJSONRaw = oFile.contents.toString('utf8');
            oFile.contents = new Buffer('jQuery.sap.registerPreloadedModules(' + oJSONRaw + ');');
            return oFile;
          }))).pipe((0, _gulpIf2.default)('**/library-preload.json', (0, _gulpRename2.default)({
            extname: '.js'
          }))).pipe(_gulp2.default.dest(sDistLibraryPath)).on('error', reject).on('end', resolve);
      });
    });
    return Promise.all(aPreloadPromise);
  } catch (error) {
    spinner.fail(error);
  }
}

/* ----------------------------------------------------------- *
 * bundle theme styles in library.css file
 * ----------------------------------------------------------- */

// [development build]
function ui5LibStyles() {
  try {
    var mapPathToDev = function mapPathToDev(sPath) {
      return sPath.replace(new RegExp('^' + SRC), DEV);
    };
    var aSelectLibrarySources = UI5_LIBS.filter(noPrebuild).map(function (oLibrary) {
      return mapPathToDev(oLibrary.path) + '/**/library.source.less';
    });

    return paths.libStyles.src.length === 0 ? Promise.resolve() : new Promise(function (resolve, reject) {
      // 1. copy theme resources (assets) to DEV
      _gulp2.default.src(paths.libStyles.src, {
          base: SRC,
          // filter out unchanged files between runs
          since: _gulp2.default.lastRun(ui5LibStyles)
        })
        // don't exit the running watcher task on errors
        .pipe((0, _gulpPlumber2.default)()).pipe(_gulp2.default.dest(DEV)).on('error', reject).on('end', resolve);
    }).then(function () {
      return new Promise(function (resolve, reject) {
        // 2. compile library.css
        _gulp2.default.src(aSelectLibrarySources, {
            base: DEV,
            read: true
          })
          // don't exit the running watcher task on errors
          .pipe((0, _gulpPlumber2.default)()).pipe((0, _gulpTap2.default)(function (oFile) {
            (0, _ui5LibUtil.ui5CompileLessLib)(oFile);
          })).pipe(_gulp2.default.dest(DEV)).on('error', reject).on('end', resolve);
      });
    });
  } catch (error) {
    spinner.fail(error);
  }
}

// [production build]
function ui5LibStylesDist() {
  try {
    var mapPathToDist = function mapPathToDist(sPath) {
      return sPath.replace(new RegExp('^' + SRC), DIST);
    };
    var aSelectLibrarySources = UI5_LIBS.filter(noPrebuild).map(function (oLibrary) {
      return mapPathToDist(oLibrary.path) + '/**/library.source.less';
    });
    var aSelectLibraryBundles = UI5_LIBS.filter(noPrebuild).reduce(function (aBundles, oLibrary) {
      return aBundles.concat([mapPathToDist(oLibrary.path) + '/**/library.css', mapPathToDist(oLibrary.path) + '/**/library-RTL.css']);
    }, []);

    return paths.libStyles.src.length === 0 ? Promise.resolve() : new Promise(function (resolve, reject) {
      // 1. copy theme resources (assets) to DEV
      _gulp2.default.src(paths.libStyles.src, {
        base: SRC
      }).pipe((0, _gulpPlumber2.default)(buildErrorHandler)).pipe(_gulp2.default.dest(DIST)).on('error', reject).on('end', resolve);
    }).then(function () {
      return new Promise(function (resolve, reject) {
        // 2. compile library.css
        _gulp2.default.src(aSelectLibrarySources, {
          read: true,
          base: DIST
        }).pipe((0, _gulpPlumber2.default)(buildErrorHandler)).pipe((0, _gulpTap2.default)(function (oFile) {
          (0, _ui5LibUtil.ui5CompileLessLib)(oFile);
        })).pipe(_gulp2.default.dest(DIST)).on('error', reject).on('end', resolve);
      });
    }).then(function () {
      return new Promise(function (resolve, reject) {
        return (
          // 3. minify css after creation
          _gulp2.default.src(aSelectLibraryBundles, {
            base: DIST
          }).pipe((0, _gulpPlumber2.default)(buildErrorHandler))
          // minify CSS
          .pipe((0, _gulpCleanCss2.default)({
            level: 2
          })).pipe(_gulp2.default.dest(DIST)).on('error', reject).on('end', resolve)
        );
      });
    });
  } catch (error) {
    spinner.fail(error);
  }
}

/* ----------------------------------------------------------- *
 * bundle theme styles in library.css file
 * ----------------------------------------------------------- */

// [development & production build]
function copyUi5Theme() {
  try {
    var sSourceID = _package2.default.ui5.src;
    var oSource = _package2.default.ui5.srcLinks[sSourceID];
    var sUI5Version = oSource.version;
    var sCompiledURL = _handlebars2.default.compile(oSource.url)(oSource);
    var isPrebuild = oSource.isPrebuild;
    var isArchive = oSource.isArchive;
    var isRemoteLibrary = sCompiledURL.startsWith('http') && !isArchive && isPrebuild;

    var sOpenUI5PathNaked = UI5 + '/' + sUI5Version + '/sap-ui-core.js';
    var sOpenUI5PathWrapped = UI5 + '/' + sUI5Version + '/resources/sap-ui-core.js';

    var sUI5Path = _fs2.default.existsSync(_path2.default.resolve(__dirname, sOpenUI5PathWrapped)) ? sOpenUI5PathWrapped.replace(/\/sap-ui-core\.js$/, '') : sOpenUI5PathNaked.replace(/\/sap-ui-core\.js$/, '');

    if (UI5_THEMES.length === 0) {
      return Promise.resolve();
    }

    if (isRemoteLibrary) {
      throw 'Custom UI5 theme build can only be used with a local UI5 library (remote UI5 libs are not supported).';
    }

    // copy UI5 theme resources to path/to/my/theme/UI5 [one-time after building ui5]
    var aThemeUpdates = UI5_THEMES.filter(noPrebuild).map(function (oTheme) {
      return new Promise(function (resolve, reject) {
        return _gulp2.default.src([sUI5Path + '/**/*.css', sUI5Path + '/**/themes/**/*', '!' + sUI5Path + '/**/themes/**/library.css', '!' + sUI5Path + '/**/themes/**/library-*.css', '!' + sUI5Path + '/**/themes/**/*.json'], {
          base: '' + sUI5Path
        }).pipe((0, _gulpPlumber2.default)(buildErrorHandler)).pipe(_gulp2.default.dest(oTheme.path + '/UI5')).on('error', reject).on('end', resolve);
      });
    });

    return Promise.all(aThemeUpdates);
  } catch (error) {
    spinner.fail(error);
  }
}

// [development & production build]
function copyUi5LibraryThemes() {
  try {
    // copy UI5 theme resources to path/to/my/theme/UI5 [one-time after building ui5]
    var aThemeUpdates = UI5_THEMES.filter(noPrebuild).reduce(function (aUpdateList, oTheme) {
      var sThemeTargetPath = oTheme.path.replace(new RegExp('^' + SRC), IS_DEV_MODE ? DEV : DIST);

      var aNpmUi5Lib = NPM_UI5_LIBS.map(function (oLib) {
        var sNpmUi5BasePath = oLib.path.replace(new RegExp(oLib.name.replace('.', '/') + '$'), '');
        return new Promise(function (resolve, reject) {
          return _gulp2.default.src([oLib.path + '/**/*.css', oLib.path + '/**/themes/**/*', '!' + oLib.path + '/**/themes/**/library.css', '!' + oLib.path + '/**/themes/**/library-*.css', '!' + oLib.path + '/**/themes/**/*.json'], {
            base: sNpmUi5BasePath
          }).pipe((0, _gulpPlumber2.default)(buildErrorHandler)).pipe(_gulp2.default.dest(sThemeTargetPath + '/UI5')).on('error', reject).on('end', resolve);
        });
      });
      return aUpdateList.concat(aNpmUi5Lib);
    }, []);

    return Promise.all(aThemeUpdates);
  } catch (error) {
    spinner.fail(error);
  }
}

// [development build]
function ui5ThemeStyles() {
  try {
    var mapPathToDev = function mapPathToDev(sPath) {
      return sPath.replace(new RegExp('^' + SRC), DEV);
    };
    var aSelectLibrarySources = UI5_THEMES.filter(noPrebuild).map(function (oTheme) {
      return mapPathToDev(oTheme.path) + '/**/themes/' + TARGET_THEME + '/library.source.less';
    });

    return paths.themeStyles.src.length === 0 ? Promise.resolve() : new Promise(function (resolve, reject) {
      // 1. copy theme resources (assets) to DEV
      _gulp2.default.src(paths.themeStyles.src, {
          base: SRC,
          // filter out unchanged files between runs
          since: _gulp2.default.lastRun(ui5ThemeStyles)
        })
        // don't exit the running watcher task on errors
        .pipe((0, _gulpPlumber2.default)()).pipe(_gulp2.default.dest(DEV)).on('error', reject).on('end', resolve);
    }).then(function () {
      return new Promise(function (resolve, reject) {
        // 2. compile library.css
        _gulp2.default.src(aSelectLibrarySources, {
            base: DEV,
            read: true
          })
          // don't exit the running watcher task on errors
          .pipe((0, _gulpPlumber2.default)()).pipe((0, _gulpTap2.default)(function (oFile) {
            (0, _ui5LibUtil.ui5CompileLessLib)(oFile);
          })).pipe(_gulp2.default.dest(DEV)).on('error', reject).on('end', resolve);
      });
    });
  } catch (error) {
    spinner.fail(error);
  }
}

// [production build]
function ui5ThemeStylesDist() {
  try {
    var mapPathToDist = function mapPathToDist(sPath) {
      return sPath.replace(new RegExp('^' + SRC), DIST);
    };
    var aSelectLibrarySources = UI5_THEMES.filter(noPrebuild).map(function (oTheme) {
      return mapPathToDist(oTheme.path) + '/**/themes/' + TARGET_THEME + '/library.source.less';
    });
    var aSelectLibraryBundles = UI5_THEMES.filter(noPrebuild).reduce(function (aBundles, oTheme) {
      return aBundles.concat([mapPathToDist(oTheme.path) + '/**/themes/' + TARGET_THEME + '/library.css', mapPathToDist(oTheme.path) + '/**/themes/' + TARGET_THEME + '/library-RTL.css']);
    }, []);

    return paths.themeStyles.src.length === 0 ? Promise.resolve() : new Promise(function (resolve, reject) {
      // 1. copy theme resources (assets) to DEV
      _gulp2.default.src(paths.themeStyles.src, {
        base: SRC
      }).pipe((0, _gulpPlumber2.default)(buildErrorHandler)).pipe(_gulp2.default.dest(DIST)).on('error', reject).on('end', resolve);
    }).then(function () {
      return new Promise(function (resolve, reject) {
        // 2. compile library.css
        _gulp2.default.src(aSelectLibrarySources, {
          read: true,
          base: DIST
        }).pipe((0, _gulpPlumber2.default)(buildErrorHandler)).pipe((0, _gulpTap2.default)(function (oFile) {
          (0, _ui5LibUtil.ui5CompileLessLib)(oFile);
        })).pipe(_gulp2.default.dest(DIST)).on('error', reject).on('end', resolve);
      });
    }).then(function () {
      return new Promise(function (resolve, reject) {
        return (
          // 3. minify css after creation
          _gulp2.default.src(aSelectLibraryBundles, {
            base: DIST
          }).pipe((0, _gulpPlumber2.default)(buildErrorHandler))
          // minify CSS
          .pipe((0, _gulpCleanCss2.default)({
            level: 2
          })).pipe(_gulp2.default.dest(DIST)).on('error', reject).on('end', resolve)
        );
      });
    });
  } catch (error) {
    spinner.fail(error);
  }
}

/* ----------------------------------------------------------- *
 * load dependencies
 * ----------------------------------------------------------- */

// [helper function]
function getExposedModuleName(sModule) {
  switch (sModule) {
    // define exceptions here, e.g.:
    // case 'lodash':
    //   return '_'
    default:
      // turn to camel case (e.g. "ok js", "ok-js", "ok_js" become all "okJs")
      return sModule.replace(/[\s-_.](.)/g, function ($1) {
        return $1.toUpperCase();
      }).replace(/[\s-_.]/g, '').replace(/^(.)/, function ($1) {
        return $1.toLowerCase();
      });
  }
}

// [development build]
function loadDependencies() {
  try {
    if (!NPM_MODULES_TARGET.path || NPM_MODULES_TARGET.path.length === 0) {
      return Promise.resolve();
    }

    var aDependencies = (0, _gulpMainNpmFiles2.default)();
    var sVendorLibsPathSrc = _package2.default.ui5.vendor ? _package2.default.ui5.vendor.path : '';
    var sVendorLibsPathDev = sVendorLibsPathSrc.replace(new RegExp('^' + SRC), DEV);

    var aEntryBuilds = aDependencies.map(function (sEntry) {
      return new Promise(function (resolve, reject) {
        var sModuleName = sEntry.split('/node_modules/')[1].split('/')[0];
        var sGlobalName = getExposedModuleName(sModuleName);
        return (0, _browserify2.default)({
            entries: sEntry,
            // global name will never be exposed, cause we wrap the module in an ui5 define statement
            standalone: sGlobalName
          })
          // babel will run with the settings defined in `.babelrc` file
          .transform(_babelify2.default).bundle().pipe((0, _vinylSourceStream2.default)(sModuleName + '.js')).pipe((0, _vinylBuffer2.default)())
          // wrap complete module to be compatible with ui5 loading system
          .pipe((0, _gulpTap2.default)(function (file) {
            file.contents = Buffer.concat([new Buffer('sap.ui.define([/* no dependencies */], function(){\n                      var exports = {};\n                      var module = { exports: null };'), file.contents, new Buffer('return module.exports; });')]);
          })).pipe(_gulp2.default.dest(sVendorLibsPathSrc)).pipe(_gulp2.default.dest(sVendorLibsPathDev)).on('error', reject).on('end', resolve);
      });
    });
    var aStyleCopy = aDependencies.map(function (sEntry) {
      return new Promise(function (resolve, reject) {
        var sStylesheetName = sEntry.replace(/\.js$/, '.css');
        return _fs2.default.existsSync(_path2.default.resolve(__dirname, sStylesheetName)) ? _gulp2.default.src([sStylesheetName]).pipe(_gulp2.default.dest(sVendorLibsPathSrc)).pipe(_gulp2.default.dest(sVendorLibsPathDev)).on('error', reject).on('end', resolve) : resolve();
      });
    });

    var oExternalModuleCopy = new Promise(function (resolve, reject) {
      return NPM_UI5_MODULES.length > 0 ? _gulp2.default.src(NPM_UI5_MODULES.map(function (oModule) {
        return oModule.path + '/**/*';
      }), {
        base: './'
      }).pipe(_gulp2.default.dest(DEV)).on('error', reject).on('end', resolve) : resolve();
    });

    // execute all at once
    return Promise.all([].concat(aEntryBuilds).concat(aStyleCopy).concat(oExternalModuleCopy));
  } catch (error) {
    spinner.fail(error);
  }
}

// [production build]
function loadDependenciesDist() {
  try {
    if (!NPM_MODULES_TARGET.path || NPM_MODULES_TARGET.path.length === 0) {
      return Promise.resolve();
    }

    var aDependencies = (0, _gulpMainNpmFiles2.default)();
    var sVendorLibsPathSrc = _package2.default.ui5.vendor ? _package2.default.ui5.vendor.path : '';
    var sVendorLibsPathDist = NPM_MODULES_TARGET.path.replace(new RegExp('^' + SRC), DIST);

    var aEntryBuilds = aDependencies.map(function (sEntry) {
      return new Promise(function (resolve, reject) {
        var sModuleName = sEntry.split('/node_modules/')[1].split('/')[0];
        var sGlobalName = getExposedModuleName(sModuleName);
        return (0, _browserify2.default)({
            entries: sEntry,
            // global name will never be exposed, cause we wrap the module in an ui5 define statement
            standalone: sGlobalName
          })
          // babel will run with the settings defined in `.babelrc` file
          .transform(_babelify2.default).bundle().pipe((0, _gulpPlumber2.default)(buildErrorHandler)).pipe((0, _vinylSourceStream2.default)(sModuleName + '.js')).pipe((0, _vinylBuffer2.default)())
          // wrap complete module to be compatible with ui5 loading system
          .pipe((0, _gulpTap2.default)(function (file) {
            file.contents = Buffer.concat([new Buffer('sap.ui.define([/* no dependencies */], function(){\n                      var exports = {};\n                      var module = { exports: null };'), file.contents, new Buffer('return module.exports; });')]);
          })).pipe(_gulp2.default.dest(sVendorLibsPathSrc))
          // save non-minified copies with debug suffix
          .pipe((0, _gulpRename2.default)({
            suffix: '-dbg'
          })).pipe(_gulp2.default.dest(sVendorLibsPathDist))
          // process copies without suffix
          .pipe((0, _gulpRename2.default)(function (path) {
            path.basename = path.basename.replace(/-dbg$/, '');
          }))
          // minify scripts
          .pipe((0, _gulpUglify2.default)()).pipe(_gulp2.default.dest(sVendorLibsPathDist)).on('error', reject).on('end', resolve);
      });
    });

    var aStyleCopy = aDependencies.map(function (sEntry) {
      return new Promise(function (resolve, reject) {
        var sStylesheetName = sEntry.replace(/\.js$/, '.css');
        return _fs2.default.existsSync(_path2.default.resolve(__dirname, sStylesheetName)) ? _gulp2.default.src([sStylesheetName])
          // minify CSS
          .pipe((0, _gulpCleanCss2.default)({
            level: 2
          })).pipe(_gulp2.default.dest(sVendorLibsPathSrc)).pipe(_gulp2.default.dest(sVendorLibsPathDist)).on('error', reject).on('end', resolve) : resolve();
      });
    });

    var oExternalModuleCopy = new Promise(function (resolve, reject) {
      return NPM_UI5_MODULES.length > 0 ? _gulp2.default.src(NPM_UI5_MODULES.map(function (oModule) {
        return oModule.path + '/**/*';
      }), {
        base: './'
      }).pipe(_gulp2.default.dest(DIST)).on('error', reject).on('end', resolve) : resolve();
    });

    // execute all at once
    return Promise.all([].concat(aEntryBuilds).concat(aStyleCopy).concat(oExternalModuleCopy));
  } catch (error) {
    spinner.fail(error);
  }
}

/* ----------------------------------------------------------- *
 * hash module paths (content based) to enable cache buster
 * ----------------------------------------------------------- */

// [production build]
function ui5cacheBust() {
  try {
    // update spinner state
    spinner.text = 'Run cache buster...';

    if (BUILD.cacheBuster === false) {
      return Promise.resolve('Cache buster is deactivated.');
    }

    return paths.htmlEntries.src.length === 0 ? Promise.resolve() : _gulp2.default.src(paths.htmlEntries.src).pipe((0, _gulpPlumber2.default)(buildErrorHandler))
      // rename UI5 module (app component) paths and update index.html
      .pipe((0, _gulpTap2.default)(function (oFile) {
        return (0, _ui5CacheBuster2.default)(oFile);
      })).pipe(_gulp2.default.dest(DIST));
  } catch (error) {
    spinner.fail(error);
  }
}

/* ----------------------------------------------------------- *
 * precompress files with gzip and brotli
 * ----------------------------------------------------------- */

// [production build]
function preCompressionGzip() {
  // update spinner state
  spinner.text = 'Run pre compression...';

  if (!BUILD.compression || !BUILD.compressionGzip) {
    return Promise.resolve();
  }

  return _gulp2.default.src([DIST + '/**/*.{js,css,html,svg,xml,json,txt,properties}', UI5 + '/**/*.{js,css,html,svg,xml,json,txt,properties}'])
    // create .gz (gzip) files
    .pipe((0, _gulpGzip2.default)({
      skipGrowingFiles: true
    })).pipe(_gulp2.default.dest(DIST));
}

// [production build]
function preCompressionBrotli() {
  // update spinner state
  spinner.text = 'Run pre compression...';

  if (!BUILD.compression || !BUILD.compressionBrotli) {
    return Promise.resolve();
  }

  return _gulp2.default.src([DIST + '/**/*.{js,css,html,svg,xml,json,txt,properties}', UI5 + '/**/*.{js,css,html,svg,xml,json,txt,properties}'])
    // create .br (brotli) files
    .pipe(_gulpBrotli2.default.compress({
      extension: 'br',
      skipLarger: true
    })).pipe(_gulp2.default.dest(DIST));
}

/* ----------------------------------------------------------- *
 * SAP NetWeaver ABAP System UI5 app upload
 * ----------------------------------------------------------- */

// [production build]
function ui5Upload() {
  try {
    // update spinner state
    spinner.text = 'Uploading to SAP NetWeaver ABAP System...';

    // check if cache buster is deactivated
    if (_package2.default.ui5.cacheBuster === true) {
      return Promise.reject('Cache buster is not supported in combination with nwabap upload, yet.');
    }

    // check if nwabap config is maintained
    if (!_package2.default.ui5.nwabapUpload) {
      return Promise.reject('Option \'ui5.nwabapUpload\' config was not found in package.json');
    }

    var mapPathToDist = function mapPathToDist(sPath) {
      return sPath.replace(new RegExp('^' + SRC), DIST);
    };
    var aDeployPromise = _package2.default.ui5.apps.map(function (oApp) {
      // check if nwabap config is maintained
      if (!oApp.nwabapDestination) {
        return Promise.reject('Option \'nwabapDestination\' config was not found for app ' + oApp.name + ' in package.json');
      }
      var sAppDistPath = mapPathToDist(oApp.path);

      return new Promise(function (resolve, reject) {
        _gulp2.default.src([sAppDistPath + '/**']).pipe((0, _gulpNwabapUi5uploader2.default)(_extends({
          root: sAppDistPath
        }, _package2.default.ui5.nwabapUpload, {
          // pass nwabap bsp destination
          ui5: oApp.nwabapDestination
        }))).pipe(_gulp2.default.dest(sAppDistPath)).on('error', reject).on('end', resolve);
      });
    });
    return Promise.all(aDeployPromise);
  } catch (error) {
    spinner.fail(error);
  }
}