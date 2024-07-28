export const formatDate = (isoString: string) => {
  const date = new Date(isoString);

  const padZero = (num: number) => (num < 10 ? '0' + num : num);

  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
};
