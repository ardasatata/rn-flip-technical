import {ApisauceInstance, create, ApiResponse} from 'apisauce';
import {
  GeneralApiProblem,
  getGeneralApiProblem,
} from '@services/api/api-problem';
// import * as Types from './api.types';
import {Api} from '@services/api/api';
import {TransactionItemType} from '@modules/transactions/Type.transactions';

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
  async getTransactions(): Promise<
    {kind: 'ok'; transactions: Array<TransactionItemType>} | GeneralApiProblem
  > {
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
      // console.log(response.data);

      let transactions: Array<TransactionItemType> = [];

      // convert response.data to array form
      for (var key in rawTransactions) {
        console.log(rawTransactions[key]);
        transactions.push(rawTransactions[key]);
      }

      return {kind: 'ok', transactions: transactions};
    } catch {
      return {kind: 'bad-data'};
    }
  }
}
