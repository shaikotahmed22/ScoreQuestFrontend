export function getDateDifference(date1, date2) {
  if (date1 - date2 <= 0) {
    return { minutes: 0, seconds: 0 };
  } else {
    const diffInMs = Math.abs(date2 - date1);

    const totalSeconds = Math.floor(diffInMs / 1000);

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return { minutes, seconds };
  }
}
