function prettifySavings(savings) {
  const savedSign = savings < 0 ? -1 : 1;
  if (Math.abs(savings) < 10) return Number(savings.toFixed(2) * savedSign);
  if (Math.abs(savings) < 100) return Number(savings.toFixed(1) * savedSign);
  return Math.round(savings);
}

export default prettifySavings;
