import { ViewStateDataLoggedInUser } from '@MOCK_DB_DATA/view-state-data_loggedInUser';

export function getMockDbBody(url: string): unknown | null {
  const key = url.slice(4);

  const dbData: { [index: string]: unknown } = {
    ViewStateDataLoggedInUser: ViewStateDataLoggedInUser,
  };

  return dbData[key] || null;
}
