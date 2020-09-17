function prettifySavings(savings) {
  const absSavings = Math.abs(savings);
  if (absSavings < 1) return `$${absSavings.toFixed(3) * 1000}k`;
  if (absSavings < 10) return `$${absSavings.toFixed(2)}M`;
  if (absSavings < 100) return `$${absSavings.toFixed(1)}M`;

  return `$${Math.round(absSavings)}M`;
}

export default prettifySavings;
