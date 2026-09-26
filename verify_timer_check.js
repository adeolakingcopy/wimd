function getTargetDate(dateStr) {
  const now = new Date(dateStr);
  return new Date(now.getFullYear(), 8, 25, 23, 59, 59).getTime();
}

function isLiveSoon(dateStr) {
  const now = new Date(dateStr).getTime();
  const targetDate = getTargetDate(dateStr);
  return Math.max(0, targetDate - now) === 0;
}

console.log('expired-on-sept-26:', isLiveSoon('2026-09-26T00:00:00Z'));
console.log('not-expired-before-sept-25:', isLiveSoon('2026-09-24T00:00:00Z'));

const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
console.log('has-live-soon-text:', html.includes('Going Live Soon'));
console.log('has-fixed-target-date:', html.includes('new Date(new Date().getFullYear(), 8, 25, 23, 59, 59).getTime()'));
