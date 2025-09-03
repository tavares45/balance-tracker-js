/**
 * CalculateBalance
 * Calculates the remaining balance of users based on their limits and spends.
 * Demonstrates use of classes, private fields, getters/setters, and validations.
 */
class CalculateBalance {
  // Private fields
  #limits;
  #spends;
  #balance;

  /**
   * @param {Object} limits - Total limit of each user {user1: 100, user2: 200}
   * @param {Object} spends - Spends of each user {user1: 50, user2: 150}
   * @param {number} balance - Expected total balance
   */
  constructor(limits, spends, balance) {
    this.#limits = limits;
    this.#spends = spends;
    this.#balance = balance;
  }

  // Getter and setter for balance
  get balance() {
    return this.#balance;
  }

  set balance(value) {
    if (typeof value !== 'number' || value < 0) {
      throw new Error('Invalid balance: must be a positive number.');
    }
    this.#balance = value;
  }

  // Validate that all users exist in both limits and spends
  #hasSameUsers() {
    const limitUsers = Object.keys(this.#limits).sort();
    const spendUsers = Object.keys(this.#spends).sort();

    if (JSON.stringify(limitUsers) !== JSON.stringify(spendUsers)) {
      throw new Error("Users in limits and spends do not match!");
    }
  }

  // Validate input parameters
  #validateInputs() {
    if (!this.#limits || !this.#spends || typeof this.#balance !== 'number') {
      throw new Error('Invalid parameters: limits, spends, and balance are required.');
    }
  }

  // Return list of users
  #getUsers() {
    return Object.keys(this.#limits);
  }

  // Validate that sum of limits matches the total balance
  #validateLimits() {
    const receivedLimit = Object.values(this.#limits).reduce((acc, value) => acc + value, 0);

    if (receivedLimit !== this.#balance) {
      throw new Error('Sum of limits does not match the total balance.');
    }
  }

  // Calculate remaining balance per user
  #calculateRemaining() {
    const total = {};

    for (let user of this.#getUsers()) {
      const limit = this.#limits[user];
      const spend = this.#spends[user];

      total[user] = Number((Math.abs(limit - spend)).toFixed(2));
    }

    return total;
  }

  /**
   * Executes the main logic
   * @returns {string} - JSON with remaining balance per user
   */
  run() {
    this.#validateInputs();
    this.#hasSameUsers();
    this.#validateLimits();

    const remaining = this.#calculateRemaining();
    return JSON.stringify(remaining, null, 2); // formatted JSON
  }
}

// Example usage
let limits = { user1: 294, user2: 630 };
let spends = { user1: 132.95, user2: 326.47 };
let balance = 924;

const calculate = new CalculateBalance(limits, spends, balance);
console.log(calculate.run());

