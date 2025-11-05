export function assertValue<T>(
  value: T | undefined | null,
  errorMessage: string
): T {
  if (value === undefined || value === null) {
    throw new Error(errorMessage);
  }

  return value;
}

