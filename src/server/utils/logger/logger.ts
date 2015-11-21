'use strict';

import { default as base, ILoggerOptions } from './base';
import console from './console';

module Logger {

  export let Base = (tag: string, options?: ILoggerOptions) => new base(tag, options);
  export let Console = (tag: string, options?: ILoggerOptions) => new console(tag, options);

}

export default Logger;