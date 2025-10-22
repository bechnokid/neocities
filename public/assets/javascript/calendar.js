const monthData = [
   { name: 'January', numOfDays: 31 },
   { name: 'February', numOfDays: 28 },
   { name: 'March', numOfDays: 31 },
   { name: 'April', numOfDays: 30 },
   { name: 'May', numOfDays: 31 },
   { name: 'June', numOfDays: 30 },
   { name: 'July', numOfDays: 31 },
   { name: 'August', numOfDays: 31 },
   { name: 'September', numOfDays: 30 },
   { name: 'October', numOfDays: 31 },
   { name: 'November', numOfDays: 30 },
   { name: 'December', numOfDays: 31 },
]
const dayNamesData = [
  "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"
]

let todayDate = new Date();
let thisDay = todayDate.getDay();
let thisMonth = todayDate.getMonth();
let thisDate = todayDate.getDate();
let thisYear = todayDate.getYear() % 100;
thisYear = ((thisYear < 50) ? (2000 + thisYear) : (1900 + thisYear));
if (((thisYear % 4 == 0) && (thisYear % 100 != 0)) || (thisYear % 400 == 0)) {
   monthData[1].numOfDays = 29;
}
let startSpaces = thisDate;
while (startSpaces > 7) startSpaces -= 7;
startSpaces = thisDay - startSpaces + 1;
if (startSpaces < 0) startSpaces += 7;

let tableContent = ['<tr>'];
for (let i = 0; i < startSpaces; i++) {
   tableContent.push("<td class='blank'> </td>");
}
let count = 1;
while (count <= monthData[thisMonth].numOfDays) {
   if (startSpaces == 0) tableContent.push('</tr><tr>')
   for (let i = startSpaces; i < 7; i++) {
      let dayText = (count <= monthData[thisMonth].numOfDays) ? count : "";
      if (count == thisDate) dayText = `<span class='today'>${dayText}</span>`;
      tableContent.push(`<td${(dayText == '') ? " class='blank'" : ""}>${dayText}</td>`);
      count++;
   }
   tableContent.push('</tr>');
   startSpaces = 0;
}

let daysContent = [];
for (let i = 0; i < dayNamesData.length; i++) {
   daysContent.push(`<td>${dayNamesData[i]}</td>`)
}

let calendar = `
<table>
  <thead>
    <tr class='month'><td colspan="7">${monthData[thisMonth].name} ${thisYear}</td></tr>
    <tr class='days'>${daysContent.join('')}</tr>
  </thead>
  <tbody>${tableContent.join('')}</tbody>
</table>
`;

document.addEventListener("DOMContentLoaded", () => {
   const calendarWidget = document.querySelector('div#widget-calendar');
   if (calendarWidget) calendarWidget.innerHTML = calendar;
})