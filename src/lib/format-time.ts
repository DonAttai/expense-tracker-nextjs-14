export function formatTime(date: Date) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  } as const;

  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
}
