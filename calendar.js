// India calendar. Dates checked 2026-10-03; lunar observances can vary locally.
// Sources: https://www.timeanddate.com/holidays/india/2026
// https://www.timeanddate.com/holidays/india/{onam,holi,eid-ul-fitar,diwali}
const FIXED_DATES={newyear:'01-01',republic:'01-26',earth:'04-22',independence:'08-15',teachers:'09-05',gandhi:'10-02',children:'11-14',christmas:'12-25'};
const MOVING_DATES={
 2026:{holi:'03-04',eid:'03-21',onam:'08-26',diwali:'11-08'},
 2027:{holi:'03-22',eid:'03-10',onam:'09-12',diwali:'10-29'},
 2028:{holi:'03-11',eid:'02-27',onam:'09-01',diwali:'10-17'},
 2029:{holi:'03-01',eid:'02-15',onam:'08-22',diwali:'11-05'},
 2030:{holi:'03-20',eid:'02-05',onam:'09-09',diwali:'10-26'},
 2031:{holi:'03-09',eid:'01-25',onam:'08-30',diwali:'11-14'}
};
function indiaToday(now=new Date()){
 const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
 const part=type=>parts.find(p=>p.type===type).value;
 return `${part('year')}-${part('month')}-${part('day')}`;
}
function nextEventDate(id,today){
 // Do not guess beyond the maintained calendar, or silently ignore moving events.
 for(const year of Object.keys(MOVING_DATES).map(Number).sort((a,b)=>a-b)){
  const monthDay=FIXED_DATES[id]||MOVING_DATES[year][id];
  if(monthDay){const date=`${year}-${monthDay}`;if(date>today)return date;}
 }
 return null;
}
function upcomingEvents(today=indiaToday()){
 return EVENTS.map(event=>({event,date:nextEventDate(event.id,today)}))
  .sort((a,b)=>(a.date||'9999').localeCompare(b.date||'9999')||a.event.name.localeCompare(b.event.name));
}
