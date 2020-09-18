/**
 * Function that prettifies savings number to rounded money-like string
 * @param {number} savings - number of savings(in millions)
 * @returns {string} - rounded string representation of savings
 * 1245.52 -> "$1246M"
 * 55.592  -> "55.6M"
 * 6.29305 -> "6.29M"
 * 0.68958 -> "690k"
 */
function prettifySavings(savings) {
  const absSavings = Math.abs(savings);
  if (absSavings < 1) return `$${absSavings.toFixed(3) * 1000}k`;
  if (absSavings < 10) return `$${absSavings.toFixed(2)}M`;
  if (absSavings < 100) return `$${absSavings.toFixed(1)}M`;

  return `$${Math.round(absSavings)}M`;
}

export default prettifySavings;
