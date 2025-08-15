const uniqueEventSuffix = "-ماشین";
// Fixed column letters
const startColLetter = "B";
const endColLetter = "K";
const payedCheckBoxLetter = "H";
const taskCreatedLetter = "K";

function AddLoanPaymentDatesToTask() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const lastRow = sheet.getLastRow();
  // Build the range dynamically from row 2 to the last row in columns B to K.
  const rangeNotation = `${startColLetter}2:${endColLetter}${lastRow}`;
  const rawEvents = sheet.getRange(rangeNotation).getValues();
  
  // Convert column letters to numbers.
  const startCol = letterToColumn(startColLetter);        // e.g., B => 2
  const payedColumn = letterToColumn(payedCheckBoxLetter);  // e.g., H => 8
  const taskCreatedColumn = letterToColumn(taskCreatedLetter);// K => 11
  
  // Compute the relative indices in the rawEvents array (0-based).
  const payedIndex = payedColumn - startCol;        // 8 - 2 = 6
  const taskCreatedIndex = taskCreatedColumn - startCol;// 11 - 2 = 9
  
  // Loop over each row in the data.
  for (let i = 0; i < rawEvents.length; i++) {
    const event = rawEvents[i];
    
    // Skip completely empty rows.
    if (event.join("").trim().length === 0) continue;
    
    // Only proceed if the "payed" checkbox (column H) is unchecked and task not yet created.
    if (event[payedIndex] || event[taskCreatedIndex]) continue;
    
    // Prepare task details.
    // Note: event[0] corresponds to column B, event[1] to column C, etc.
    // Here, event[5] (i.e. column G) is used as the due date—adjust if necessary.
    const dueDate = new Date(event[5]);
    const lineBreak = "\r\n";
    const name = `قسط ${event[0]} بانک ${event[1]}`;
    const detail = `مبلغ ${event[3]} ${lineBreak}تسهیلات: ${event[2]}`;
    const taskTitle = `${name} ${uniqueEventSuffix}`;
    
    const taskData = {
      due: dueDate.toISOString(),
      title: taskTitle,
      notes: detail,
    };
    
    // Use the first task list (this example assumes at least one exists).
    const taskLists = Tasks.Tasklists.list();
    if (!taskLists.items || taskLists.items.length === 0) {
      Logger.log("No task list found.");
      continue;
    }
    Tasks.Tasks.insert(taskData, taskLists.items[0].id);
    
    // Update the corresponding task-created checkbox cell (in column K).
    // rawEvents row index i corresponds to sheet row (i + 2) because our data range begins at row 2.
    sheet.getRange(i + 2, taskCreatedColumn).setValue(true);
  }
}

// Helper function: Converts a column letter (or letters) to its numeric index (A => 1, B => 2, etc.)
function letterToColumn(letter) {
  let col = 0;
  for (let i = 0; i < letter.length; i++) {
    col = col * 26 + (letter.charCodeAt(i) - 'A'.charCodeAt(0) + 1);
  }
  return col;
}

function GregorianToShamsi(dt) {
  return new Date(dt).toLocaleDateString('fa-IR');
}