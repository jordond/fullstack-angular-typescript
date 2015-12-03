'use strict';

/**
 * Default amount of decimal places for milliseconds
 */
const DEFAULT_PERCISION = 3;

/**
 * Class to calculate the execution time of a block
 * of code.  Gets start time on `new` instance, or can
 * be reset with {this.reset()}.
 */
export class ExecutionTimer {
  private _start: number[];
  private _percision: number;

  /**
   * Start the timer and set output percision
   * @param {number}  percision (optional) Number of decimal places to output
   */
  constructor(percision?: number) {
    this._start = process.hrtime();
    this._percision = percision || DEFAULT_PERCISION;
  }

  /**
   * Set a new percision
   * @param {number}  percision Number of decimal places to output
   */
  set percision(percision: number) {
    this._percision = percision;
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

    let formatted = seconds + 's ';
    if (percise) {
      return formatted + milliseconds + 'ms';
    }
    return formatted + milliseconds.toFixed(this._percision) + 'ms';
  }
}