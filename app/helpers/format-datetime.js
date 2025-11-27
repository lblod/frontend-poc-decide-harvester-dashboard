import { format } from 'date-fns';

export default function formatPlainDate(datetime) {
  if (!(datetime instanceof Date)) return '';

  try {
    return format(datetime, 'dd/MM/yyyy HH:mm:ss');
  } catch (e) {
    console.error(e);
    return '';
  }
}
