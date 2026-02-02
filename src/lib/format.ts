export function minutesToHours(minutes: number): string {
  if (!minutes) return "0h";
  const hours = minutes / 60;
  return `${hours.toFixed(hours % 1 === 0 ? 0 : 1)}h`;
}

