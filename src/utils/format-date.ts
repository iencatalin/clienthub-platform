export default function formatToday(locale = 'en-US') {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date());
}
