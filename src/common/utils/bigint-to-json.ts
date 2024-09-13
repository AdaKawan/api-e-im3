export function BigIntToJSON(key, value) {
  return typeof value === 'bigint' ? Number(value) : value;
}
