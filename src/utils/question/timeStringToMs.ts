export function timeStringToMilliseconds(timeString: string) {
  const [minutes, seconds] = timeString.split(':').map(Number);
  if (isNaN(minutes) || isNaN(seconds)) {
    throw new Error('Invalid time format');
  }
  return minutes * 60 * 1000 + seconds * 1000;
}
