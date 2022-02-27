/*
  Authors : Freelancerstore
  Website : https://freelancerstore.org/
  App Name : FR multi store daily needs App
  Created : 10-Sep-2020
  This App Template Source code is licensed as per the
  terms found in the Website https://freelancerstore.org/license
  Copyright and Good Faith Purchasers © 2020-present initappz.
*/
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseURL: 'https://conjugation.in/api/index.php/',
  mediaURL: 'https://conjugation.in/api/uploads/',
  uservault: 'https://conjugation.in/api/investments/',
  general: {
    symbol: '$',
    code: 'USD',
  },
  authToken: 'scriptcrown',
  gatewayAuthKey:'rzp_live_QxhL6zkgWlxvmh'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
