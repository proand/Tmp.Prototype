import { ViewStateDataLoggedInUserAlice } from '@MOCK_DB_DATA/view-state-data_loggedInUserAlice';
import { ViewStateDataLoggedInUserBob } from '@MOCK_DB_DATA/view-state-data_loggedInUserBob';

export function getMockDbBody(url: string): unknown | null {
  const key = url.slice(4);

  const dbData: { [index: string]: unknown } = {
    ViewStateDataLoggedInUserAlice: ViewStateDataLoggedInUserAlice,
    ViewStateDataLoggedInUserBob: ViewStateDataLoggedInUserBob,
  };

  return dbData[key] || null;
}
