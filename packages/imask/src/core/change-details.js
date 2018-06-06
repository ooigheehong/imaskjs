// @flow


/**
  Provides details of changing model value
  @param {Object} [details]
  @param {string} [details.inserted] - Inserted symbols
  @param {boolean} [details.overflow] - Is overflowed
  @param {number} [details.removeCount] - Removed symbols count
  @param {number} [details.shift] - Additional offset if any changes occurred before current position
*/
export default
class ChangeDetails {
  /** Inserted symbols */
  inserted: string;
  /** Is overflowed */
  overflow: boolean;
  /** Additional offset if any changes occurred before current position */
  shift: number;
  /** Raw inserted is used by dynamic mask */
  rawInserted: string;

  constructor (details?: {
    inserted?: $PropertyType<ChangeDetails, 'inserted'>,
    rawInserted?: $PropertyType<ChangeDetails, 'rawInserted'>,
    overflow?: $PropertyType<ChangeDetails, 'overflow'>,
    shift?: $PropertyType<ChangeDetails, 'shift'>,
  }) {
    Object.assign(this, {
      inserted: '',
      rawInserted: '',
      overflow: false,
      shift: 0,
    }, details);
  }

  /**
    Aggregate changes
    @returns {ChangeDetails} `this`
  */
  aggregate (details: ChangeDetails): ChangeDetails {
    this.rawInserted += details.rawInserted;
    this.inserted += details.inserted;
    this.shift += details.shift;
    this.overflow = this.overflow || details.overflow;
    return this;
  }

  /** Total offset considering all changes */
  get offset (): number {
    return this.shift + this.inserted.length;
  }

  /** Raw inserted is used by dynamic mask */
  // get rawInserted (): string {
  //   return this._rawInserted != null ?
  //     this._rawInserted :
  //     this.inserted;
  // }

  // set rawInserted (rawInserted: string): void {
  //   this._rawInserted = rawInserted;
  // }
}
