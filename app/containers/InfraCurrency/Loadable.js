/**
 *
 * Asynchronously loads the component for InfraCurrency
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
