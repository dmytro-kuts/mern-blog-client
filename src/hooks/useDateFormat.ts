import { useEffect, useState } from 'react';

export const useDateFormat = (dateString: string | undefined) => {
  const [formattedDate, setFormattedDate] = useState<string>('');

  useEffect(() => {
    if (dateString) {
      const date = new Date(dateString);
      const formatted =
        `${date.getDate().toString().padStart(2, '0')}.` +
        `${(date.getMonth() + 1).toString().padStart(2, '0')}.` +
        `${date.getFullYear()} ` +
        `${date.getHours().toString().padStart(2, '0')}:` +
        `${date.getMinutes().toString().padStart(2, '0')}`;

      setFormattedDate(formatted);
    }
  }, [dateString]);

  return formattedDate;
};
