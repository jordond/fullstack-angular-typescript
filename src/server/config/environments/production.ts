/**
 * Put production specific configuration here
 */

'use strict';

export default {
  port: process.env.PORT || 80,

  log: {
    level: 'INFO',
    short: true
  }
};