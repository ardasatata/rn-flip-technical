export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function properDate(str: string) {
  let date_temp = str.split(' ');
  date_temp = date_temp[0].split('-');

  const year = date_temp[0];
  const month = date_temp[1];
  const day = date_temp[2];

  return `${parseInt(day)} ${month} ${year}`;
}

export function toIsoFormat(str: string) {
  return str.replace(' ', 'T');
}
