// Recidiviz - a data platform for criminal justice reform
// Copyright (C) 2020 Recidiviz, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
// =============================================================================
/**
 * Function that prettifies savings number to rounded money-like string
 * @param {number} savings - number of savings(in millions)
 * @returns {string} - rounded string representation of savings
 * 1245.52 -> "$1.25B"
 * 55.592  -> "56M"
 * 6.29305 -> "6M"
 * 0.68958 -> "690k"
 */
function prettifySavings(savings) {
  const absSavings = Math.abs(savings);
  if (absSavings === 0) return `$0`;
  if (absSavings < 1) return `$${absSavings.toFixed(3) * 1000}k`;
  if (absSavings >= 1000) return `$${(absSavings / 1000).toFixed(2)}B`;

  return `$${Math.round(absSavings)}M`;
}

export default prettifySavings;
