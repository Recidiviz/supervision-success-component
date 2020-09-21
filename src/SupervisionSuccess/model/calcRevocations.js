const { exp } = Math;

/**
 * Function that calculates revocations
 * @param {number} month - Integer from 0 to Infinity that represents quantity
 *   of months since the start
 * @param {number} IP - implementationPeriod integer value of months
 * @param {number} RA - revocations A (param from spreadsheet)
 * @param {number} RT - revocations Timescale (param from spreadsheet)
 * @param {number} changeInRevocations - integer value of change percents
 * @const {number} RR - revocation reduction - as we store changeInRevocations
 *   as integer number of percents we need to divide it by 100 and multiple on
 *   -1 to transform  to revocation reduction that is used in calculations
 * @returns {number}
 */
function calcRevocations(month, IP, RA, RT, changeInRevocations) {
  const RR = (changeInRevocations / 100) * -1;

  if (IP === 0) {
    return RA * RT ** 2 * (1 - RR + RR * exp(-month / RT));
  }

  if (month > IP) {
    return (
      (RR * RT ** 2 * RA * exp(-IP / RT) +
        RT ** 2 * RA +
        RR * RT * RA * ((-IP / IP) * RT + RT ** 2 / IP) -
        RR * RT * RA * (RT + RT ** 2 / IP) * exp(-IP / RT)) *
        exp(-(month - IP) / RT) +
      (1 - RR) * RT ** 2 * RA * (1 - exp((-month + IP) / RT))
    );
  }

  return (
    RR * RT ** 2 * RA * exp(-month / RT) +
    RT ** 2 * RA +
    RR * RT * RA * ((-month / IP) * RT + RT ** 2 / IP) -
    RR * RT * RA * (RT + RT ** 2 / IP) * exp(-month / RT)
  );
}

export default calcRevocations;
