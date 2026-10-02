const targetDate = Date.parse('2026-10-09T14:56:30Z');

function isClosed(dateStr) {
    return new Date(dateStr).getTime() >= targetDate;
}

console.assert(targetDate - Date.parse('2026-10-02T14:56:30Z') === 7 * 24 * 60 * 60 * 1000, 'window should be exactly seven days');
console.assert(!isClosed('2026-10-09T14:56:29Z'), 'waitlist should remain open one second before cutoff');
console.assert(isClosed('2026-10-09T14:56:30Z'), 'waitlist should close at cutoff');

const fs = require('fs');
['index.html', 'assets/index.html'].forEach(file => {
    const html = fs.readFileSync(file, 'utf8');
    console.assert(html.includes("const WAITLIST_CLOSES_AT = Date.parse('2026-10-09T14:56:30Z');"), `${file} should use the fixed cutoff`);
    console.assert(html.includes('if (Date.now() < WAITLIST_CLOSES_AT) return;'), `${file} signup links should work before cutoff`);
    console.assert(html.includes('const targetDate = WAITLIST_CLOSES_AT;'), `${file} countdown should use the same cutoff`);
    console.assert(html.includes('Waitlist Closes October 9th'), `${file} should show the correct deadline`);
    console.assert(html.includes('Closes Oct 9 · Limited Spots'), `${file} badge should match the deadline`);
});
console.log('Waitlist window checks passed.');
