export function stringToDate(val: string) {
  const y = +val.substring(0, 4);
  const m = +val.substring(4, 6);
  const d = +val.substring(6, 8);
  const h = +val.substring(8, 10);
  const min = +val.substring(10, 12);
  const date = new Date(y, m, d, h, min);
  return date;
}

export function timeDiffCalc(dateFuture: Date, dateNow: Date) {
  let diffInMilliSeconds =
    Math.abs(dateFuture.getTime() - dateNow.getTime()) / 1000;

  // calculate days
  const days = Math.floor(diffInMilliSeconds / 86400);
  diffInMilliSeconds -= days * 86400;

  // calculate hours
  const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
  diffInMilliSeconds -= hours * 3600;

  // calculate minutes
  const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
  diffInMilliSeconds -= minutes * 60;

  let difference = '';
  if (days > 0) {
    difference += days === 1 ? `${days} day, ` : `${days} days, `;
  }

  difference +=
    hours === 0 || hours === 1 ? `${hours} hour, ` : `${hours} hours, `;

  difference +=
    minutes === 0 || hours === 1 ? `${minutes} minutes` : `${minutes} minutes`;

  return difference;
}
