const calendarId = "";
const uniqueEventSuffix = "-ماشین";
const dataRange = "B2:G83";

function AddLoanPaymentDatesToCalendar() {

  var spreadsheet = SpreadsheetApp.getActiveSheet();

  //var eventCal = CalendarApp.getCalendarById(calendarId);

  var rawEvents = spreadsheet.getRange(dataRange).getValues();
  
  //خالی ها را فیلتر کرده و ما بقی را برمیگرداند.
  var events = rawEvents.filter(function(r){
    return r.join("").length > 0;
  });
  
  for (var event of events) {
    const taskLists = Tasks.Tasklists.list();
    
    let date =  new Date(event[5]);
    const lineBreak = "\r\n";
    let name = `قسط ${event[0]} بانک ${event[1]}`;
    let detail = `مبلغ ${event[3]} ${lineBreak}تسهیلات: ${event[2]}`;

    let taskTitle = `${name} ${uniqueEventSuffix}`;
    let tDescription = `${detail}`;

    let t = {
      due : date.toISOString(),
      title : taskTitle,
      notes : tDescription,
    };
    Tasks.Tasks.insert(t,taskLists.items[0].id);

    /*var newEvent = eventCal.createAllDayEvent(eventTitle, date, {
      description: eventDescription,
      location: 'Up in the sky',
    });*/
  }
}
