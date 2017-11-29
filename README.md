# requirejs-angular-router

Example of Angular 5 with RequireJs

#### To run JIT version start

`npm start`

#### To run AOT version start (two steps build because of ngc [bug](https://github.com/angular/angular/issues/20438))

`npm run build:aot`

#### next edit index.html uncomment

`require.config({ baseUrl: './aot' });`

#### and run

`npm run serve`
