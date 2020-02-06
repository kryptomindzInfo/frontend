import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the infraCurrency state domain
 */

const selectInfraCurrencyDomain = state => state.infraCurrency || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by InfraCurrency
 */

const makeSelectInfraCurrency = () =>
  createSelector(
    selectInfraCurrencyDomain,
    substate => substate,
  );

export default makeSelectInfraCurrency;
export { selectInfraCurrencyDomain };
