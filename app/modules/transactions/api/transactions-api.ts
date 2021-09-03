import {ApisauceInstance, create, ApiResponse} from 'apisauce';
import {getGeneralApiProblem} from '@services/api/api-problem';
// import * as Types from './api.types';
import {Api} from '@services/api/api';

/**
 * Manages all requests to the API.
 */
export class TransactionsApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  /**
   * Gets a list of users.
   */
  async getTransactions() {
    // make the api call
    const response: ApiResponse<any> = await this.api.apisauce.get(
      '/frontend-test',
    );

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) {
        return problem;
      }
    }

    // transform the data into the format we are expecting
    try {
      const rawTransactions = response.data;
      // const resultUsers: Types.User[] = rawUsers.map(convertUser);
      console.log(response.data);

      let transactions = [];

      for (var key in rawTransactions) {
        console.log(rawTransactions[key]); // "User john is #234"
        transactions.push(rawTransactions[key]);
      }

      return {kind: 'ok', transactions: transactions};
    } catch {
      return {kind: 'bad-data'};
    }
  }
}
