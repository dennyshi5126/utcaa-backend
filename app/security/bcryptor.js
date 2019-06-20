import bcrypt from 'bcryptjs';

/**
 * Generate a hash with 12 bit salt.
 * @param {String} The data to be hashed.
 * @returns {String} The hashed data.
 */
export function hash(content) {
  return bcrypt.hashSync(content, bcrypt.genSaltSync(12));
}

/**
 * Compare the content with hashed record
 * @param {String} content The original unprocessed data.
 * @param {String} record The data that has been hashed.
 */
export function compare(content, record) {
  return bcrypt.compareSync(content, record);
}
