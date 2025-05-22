const startDate = new Date('2025-05-12T00:00:00');
const endDate = Date.now();
const timeDifferenceMS = endDate - startDate;
const timeDifferenceDays = Math.floor(timeDifferenceMS / 86400000);
$(".timer-days").html(timeDifferenceDays)