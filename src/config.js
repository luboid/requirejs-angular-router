var require = {
  baseUrl: './',
  waitSeconds: 60, //enforceDefine: true,
  //urlArgs: 'bust=' + new Date().getTime(),
  deps: [],
  paths: {
    nmText: '/node_modules/text',
    nmRJsPlugins: '/node_modules/requirejs-plugins/src',
    tslib: '/node_modules/tslib/tslib',
    nm: '/node_modules',
    ss: '/scripts',
    rxjs: '/scripts/rxjs/rxjs',
    '@angular/core': '/node_modules/@angular/core/bundles/core.umd',
    '@angular/common': '/node_modules/@angular/common/bundles/common.umd',
    '@angular/common/http':
      '/node_modules/@angular/common/bundles/common-http.umd',
    '@angular/compiler': '/node_modules/@angular/compiler/bundles/compiler.umd',
    '@angular/platform-browser':
      '/node_modules/@angular/platform-browser/bundles/platform-browser.umd',
    '@angular/platform-browser/animations':
      '/node_modules/@angular/platform-browser/bundles/platform-browser-animations.umd',
    '@angular/platform-browser-dynamic':
      '/node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd',
    '@angular/http': '/node_modules/@angular/http/bundles/http.umd',
    '@angular/router': '/node_modules/@angular/router/bundles/router.umd',
    '@angular/forms': '/node_modules/@angular/forms/bundles/forms.umd',
    '@angular/animations':
      '/node_modules/@angular/animations/bundles/animations.umd',
    '@angular/animations/browser':
      '/node_modules/@angular/animations/bundles/animations-browser.umd'
  },
  packages: [
    //{
    //  name: 'loader',
    //  location: 'loader',
    //  main: 'index'
    //}
  ],
  bundles: {
    rxjs: ['rxjs/*']
  },
  shim: {},
  map: {
    '*': {
      'angular-in-memory-web-api':
        'nm/angular-in-memory-web-api/bundles/in-memory-web-api.umd',
      text: 'nmText/text',
      json: 'nmRJsPlugins/json'
    }
  },
  config: {
    'nmText/text': {
      onXhr: function(xhr, url) {
        //Called after the XHR has been created and after the
        //xhr.open() call, but before the xhr.send() call.
        //Useful time to set headers.
        //xhr: the xhr object
        //url: the url that is being used with the xhr object.
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      }
    }
  }
};
