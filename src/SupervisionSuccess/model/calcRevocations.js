const { exp } = Math;

/**
 * Calculates revocations
 * @param month - Month
 * @param IP - implementationPeriod (Interface -> A5)
 * @param RA - revocations A (Parameters -> M)
 * @param RT - revocations Timescale (Parameters -> K)
 * @param changeInRevocations - integer value of revocations change
 * @const RR - revocation reduction (Interface -> A3)
 * @returns {number}
 */
function calcRevocations(month, IP, RA, RT, changeInRevocations) {
  const RR = changeInRevocations * -0.01;

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
