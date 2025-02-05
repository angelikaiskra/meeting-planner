export const dateToLocale = (date = new Date()) => {
  const year = date.toLocaleString('default', { year: 'numeric' });
  const month = date.toLocaleString('default', {
    month: '2-digit',
  });
  const day = date.toLocaleString('default', { day: '2-digit' });

  return [year, month, day].join('-');
}

export const generateTimeValues = (incrementValue: number = 30): { label: string; value: string; }[] => {
  const options: { label: string; value: string; }[] = [];
  for (let hours = 0; hours < 24; hours++) {
    for (let minutes = 0; minutes < 60; minutes += incrementValue) {
      const formattedHours = String(hours).padStart(2, '0');
      const formattedMinutes = String(minutes).padStart(2, '0');
      const time = `${formattedHours}:${formattedMinutes}`;
      options.push({ label: time, value: time });
    }
  }
  options.push({ label: "24:00", value: "24:00" }); // Add final 24:00 option
  return options;
}