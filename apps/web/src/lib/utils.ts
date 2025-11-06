import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number in Indian currency format with appropriate suffix
 * - Above 1,000: Uses "K" (e.g., 1,500 → 1.5K)
 * - Above 100,000: Uses "L" (e.g., 120,000 → 1.2L, 981,000 → 9.81L)
 * - Above 10,000,000: Uses "Cr" (e.g., 10,000,000 → 1 Cr, 13,000,000 → 1.3 Cr)
 */
export function formatINRShort(value: number): string {
  if (value >= 10_000_000) {
    const cr = value / 10_000_000;
    return cr % 1 === 0 ? `${cr} Cr` : `${cr.toFixed(1)} Cr`;
  }
  if (value >= 100_000) {
    const l = value / 100_000;
    return l % 1 === 0 ? `${l}L` : `${l.toFixed(1)}L`;
  }
  if (value >= 1_000) {
    const k = value / 1_000;
    return k % 1 === 0 ? `${k}K` : `${k.toFixed(1)}K`;
  }
  return String(value);
}

/**
 * Formats a budget range with Indian currency format
 * @param min - Minimum budget value
 * @param max - Maximum budget value (optional)
 * @returns Formatted string like "₹1.2L - ₹2.5L" or "₹1.2L"
 */
export function formatBudgetRange(min: number, max?: number): string {
  const minFormatted = formatINRShort(min);
  
  if (max && max !== min) {
    const maxFormatted = formatINRShort(max);
    return `₹${minFormatted} - ₹${maxFormatted}`;
  }
  
  return `₹${minFormatted}`;
}
