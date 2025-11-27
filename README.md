# frontend-dashboard

### Getting started

To include in a semantic.works stack, include the following in docker-compose.yml:

```
  dashboard:
    image: lblod/frontend-dashboard
    links:
      - identifier:backend
    restart: always
```

### Features

#### Disable pages

The dashboard has support for displaying reports, errors and jobs and these features are enabled by default. However, some projects only want to use _some_ of the features.

For those apps we also support disabling them by configuring the corresponding environment variable.

```yml
dashboard:
  #...
  environment:
    EMBER_DISABLE_REPORTS: "true"
    EMBER_DISABLE_ERRORS: "true"
    EMBER_DISABLE_JOBS: "true"
```

> Note: At least one feature needs to stay enabled, otherwise an error will be thrown

#### Account data model

The dashboard supports both Dutch and English versions of the ["accounts" data model](https://github.com/lblod/acmidm-login-service/tree/master?tab=readme-ov-file#data-model). However, it defaults to Dutch. If your application uses the English version you can configure the dashboard to use that as well.

```yml
dashboard:
  #...
  environment:
    EMBER_ENGLISH_ACCOUNTS_MODEL: "true"
```

### Authentication methods

The dashboard supports different methods of authentication. The default login route can be configured by setting the `EMBER_LOGIN_ROUTE` environment variable.

#### `login` (default)

This is the default method, so the `EMBER_LOGIN_ROUTE` variable doesn't need to be set.

In order to be able to log in with mu-login in the dashboard, you should include the [mu-login-service](https://github.com/mu-semtech/login-service) in your docker-compose.yml:

```
  login:
    image: semtech/mu-login-service:2.9.1
    links:
      - database:database
```

dispatcher.ex should contain the following rule in order to get ember-mu-login working:

```
match "/sessions/*path", %{ accept: %{json: true} } do
    Proxy.forward conn, path, "http://login/sessions/"
end
```

### `mock-login`

The `mock-login` route needs the [mock-login-service](`https://github.com/lblod/mock-login-service`). Follow the instructions in the readme.

```yml
dashboard:
  #...
  environment:
    EMBER_LOGIN_ROUTE: "mock-login"
```

### `acmidm-login`

The `acmidm-login` route needs the [acmidm-login-service](https://github.com/lblod/acmidm-login-service). Follow the instructions in the readme.

It also requires some extra environment variables in the frontend:

> The code snippet contains example values, adjust these based on your environment

```yml
dashboard:
  #...
  environment:
    EMBER_LOGIN_ROUTE: "acmidm-login"
    EMBER_ACMIDM_CLIENT_ID: "client-id"
    EMBER_ACMIDM_BASE_URL: "https://authenticatie.vlaanderen.be/op/v1/auth"
    EMBER_ACMIDM_REDIRECT_URL: "https://your-dashboard-domein/authorization/callback"
    EMBER_ACMIDM_LOGOUT_URL: "https://authenticatie.vlaanderen.be/op/v1/logout"
    EMBER_ACMIDM_SCOPE: "openid rrn vo profile"
```

## User impersonations

The dashboard makes it possible for admin users to impersonate different user accounts so things can be verified without having to change accounts.

To enable this you need to configure the `EMBER_ADMIN_ROLE` environment variable and set up the impersonation service in your backend app.
