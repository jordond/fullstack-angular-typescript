'use strict';

/**
 * Class to calculate the execution time of a block
 * of code.  Gets start time on `new` instance, or can
 * be reset with {this.reset()}.
 */
export class ExecutionTimer {
  private _start: number[];

  /**
   * Start the timer
   */
  constructor() {
    this._start = process.hrtime();
  }

  /**
   * Reset the execution timer to test a new block of code
   */
  reset(): void {
    this._start = process.hrtime();
  }

  /**
   * Get the elapsed execution time
   * @returns {number[]} Array containing the seconds and milliseconds since start
   */
  getElapsed(): number[] {
    return process.hrtime(this._start);
  }

  /**
   * Get the elapsed execution time as a string of
   * seconds and milliseconds.
   * @param {boolean} percise True to not round off the decimal places
   * @returns {string} Formatted string of elapsed time
   */
  toString(percise?: boolean): string {
    let end = process.hrtime(this._start);
    let seconds = end[0];
    let milliseconds = end[1] / 1000000;

    if (percise) {
      return seconds + 's ' + milliseconds + 'ms';
    }
    return seconds + 's ' + milliseconds.toFixed(3) + 'ms';
  }
}