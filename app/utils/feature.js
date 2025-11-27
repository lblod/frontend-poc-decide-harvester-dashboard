import ENV from 'frontend-dashboard/config/environment';

export function isReportsRouteEnabled() {
  const disableReports = ENV.routes.disableReports;
  return disableReports.startsWith('{{') || disableReports !== 'true';
}

export function isErrorsRouteEnabled() {
  const disableErrors = ENV.routes.disableErrors;
  return disableErrors.startsWith('{{') || disableErrors !== 'true';
}

export function isJobsRouteEnabled() {
  const disableJobs = ENV.routes.disableJobs;
  return disableJobs.startsWith('{{') || disableJobs !== 'true';
}

function enabledRoutes() {
  return [
    isReportsRouteEnabled(),
    isErrorsRouteEnabled(),
    isJobsRouteEnabled(),
  ].filter(Boolean);
}

export function areMultipleRoutesEnabled() {
  return enabledRoutes().length > 1;
}

export function isEnglishAccountsModelEnabled() {
  const useEnglishAccountsModel = ENV.useEnglishAccountsModel;
  return (
    !useEnglishAccountsModel.startsWith('{{') &&
    useEnglishAccountsModel === 'true'
  );
}
