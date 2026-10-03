const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const context=vm.createContext({Intl,Date});
for(const file of ['engine.js','calendar.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),context);
const calendar=vm.runInContext('({indiaToday,upcomingEvents,nextEventDate})',context);
const first=date=>calendar.upcomingEvents(date)[0];
assert.equal(first('2026-10-03').event.id,'diwali');
assert.equal(first('2026-10-03').date,'2026-11-08');
assert.equal(first('2026-11-08').event.id,'children'); // strictly after today
assert.equal(first('2026-12-25').date,'2027-01-01'); // year rollover
assert.equal(calendar.nextEventDate('onam','2026-08-26'),'2027-09-12');
assert.equal(calendar.nextEventDate('eid','2027-03-10'),'2028-02-27');
assert.equal(calendar.indiaToday(new Date('2026-10-01T18:29:59Z')),'2026-10-01');
assert.equal(calendar.indiaToday(new Date('2026-10-01T18:30:00Z')),'2026-10-02');
assert.equal(first(calendar.indiaToday(new Date('2026-10-01T18:30:00Z'))).event.id,'diwali');
assert(calendar.upcomingEvents('2032-01-01').every(e=>e.date===null));
console.log('Passed: next event, today excluded, year rollover, variable dates, India midnight, expired calendar.');
