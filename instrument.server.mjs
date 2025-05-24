import * as Sentry from '@sentry/react-router';

Sentry.init({
  dsn: 'https://b7481ad2af091fb5894c15f83eca136c@o4509380624121856.ingest.us.sentry.io/4509380627398656',

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
  sendDefaultPii: true,
});
