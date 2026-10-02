const targetDate = Date.parse('2026-10-07T14:56:30Z');

function isClosed(dateStr) {
    return new Date(dateStr).getTime() >= targetDate;
}

console.assert(targetDate - Date.parse('2026-10-02T14:56:30Z') === 5 * 24 * 60 * 60 * 1000, 'window should be exactly five days');
console.assert(!isClosed('2026-10-07T14:56:29Z'), 'waitlist should remain open one second before cutoff');
console.assert(isClosed('2026-10-07T14:56:30Z'), 'waitlist should close at cutoff');

const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
console.assert(html.includes("const WAITLIST_CLOSES_AT = Date.parse('2026-10-07T14:56:30Z');"), 'page should use the fixed cutoff');
console.assert(html.includes('if (Date.now() < WAITLIST_CLOSES_AT) return;'), 'signup links should work before cutoff');
console.assert(html.includes('const targetDate = WAITLIST_CLOSES_AT;'), 'countdown should use the same cutoff');
console.log('Waitlist window checks passed.');
