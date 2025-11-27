'use strict';

module.exports = function (environment) {
  const ENV = {
    modulePrefix: 'frontend-dashboard',
    environment,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {
      EXTEND_PROTOTYPES: false,
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
    },
    'mock-login': {
      // gebruikerfilter could be something like:
      // { achternaam: 'Agentschap Binnenlands Bestuur', }
      gebruikerfilter: '{{GEBRUIKER_FILTER}}',
    },
    routes: {
      login: '{{LOGIN_ROUTE}}',
      disableReports: '{{DISABLE_REPORTS}}',
      disableErrors: '{{DISABLE_ERRORS}}',
      disableJobs: '{{DISABLE_JOBS}}',
    },
    acmidm: {
      clientId: '{{ACMIDM_CLIENT_ID}}',
      baseUrl: '{{ACMIDM_BASE_URL}}',
      redirectUrl: '{{ACMIDM_REDIRECT_URL}}',
      logoutUrl: '{{ACMIDM_LOGOUT_URL}}',
      scope: '{{ACMIDM_SCOPE}}',
    },
    adminRole: '{{ADMIN_ROLE}}',
    useEnglishAccountsModel: '{{ENGLISH_ACCOUNTS_MODEL}}',
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    //ENV.routes.login = 'mock-login';
    ENV.useEnglishAccountsModel = 'true';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
