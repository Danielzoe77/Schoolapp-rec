// const form = document.getElementById('paymentForm');
// const tableBody = document.getElementById('recordstbody');

// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const className = document.getElementById('className').value;
//   const studentName = document.getElementById('studentName').value;
//   const amountToBePaid = document.getElementById('amountToBePaid').value;
//   const amountDeposited = document.getElementById('amountDeposited').value;
//   const balance = amountToBePaid - amountDeposited;

//   const tableRow = document.createElement('tr');
//   const classTd = document.createElement('td');
//   const nameTd = document.createElement('td');
//   const amountToBePaidTd = document.createElement('td');
//   const amountDepositedTd = document.createElement('td');
//   const balanceTd = document.createElement('td');
//   const editTd = document.createElement('td');
//   const deleteTd = document.createElement('td');

//   classTd.textContent = className;
//   nameTd.textContent = studentName;
//   amountToBePaidTd.textContent = amountToBePaid;
//   amountDepositedTd.textContent = amountDeposited;
//   balanceTd.textContent = balance;

//   const editButton = document.createElement('button');
//   editButton.textContent = 'Edit';
//   editButton.addEventListener('click', () => editRecord(tableRow));
//   const deleteButton = document.createElement('button');
//   deleteButton.textContent = 'Delete';
//   deleteButton.addEventListener('click', () => deleteRecord(tableRow));

//   editTd.appendChild(editButton);
//   deleteTd.appendChild(deleteButton);

//   tableRow.appendChild(classTd);
//   tableRow.appendChild(nameTd);
//   tableRow.appendChild(amountToBePaidTd);
//   tableRow.appendChild(amountDepositedTd);
//   tableRow.appendChild(balanceTd);
//   tableRow.appendChild(editTd);
//   tableRow.appendChild(deleteTd);

//   tableBody.appendChild(tableRow);

//   form.reset();
// });

// function editRecord(row) {
//   const className = row.cells[0].textContent;
//   const studentName = row.cells[1].textContent;
//   const amountToBePaid = row.cells[2].textContent;
//   const amountDeposited = row.cells[3].textContent;

//   document.getElementById('className').value = className;
//   document.getElementById('studentName').value = studentName;
//   document.getElementById('amountToBePaid').value = amountToBePaid;
//   document.getElementById('amountDeposited').value = amountDeposited;

//   row.remove();
// }

// function deleteRecord(row) {
//   row.remove();
// }




const form = document.getElementById('paymentForm');
const tableBody = document.getElementById('recordstbody');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const className = document.getElementById('className').value;

  const studentName = document.getElementById('studentName').value;
  const amountToBePaid = document.getElementById('amountToBePaid').value;
  const amountDeposited = document.getElementById('amountDeposited').value;
  const balance = amountToBePaid - amountDeposited;

  fetch('https://skulrecbackendcod.onrender.com/api/records/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ className, studentName, amountToBePaid, amountDeposited, balance }),
  })
    .then((response) => response.json())
    .then((data) => {
      const tableRow = createTableRow(className, studentName, amountToBePaid, amountDeposited, balance, data._id);
      tableBody.appendChild(tableRow);
     
    })
  
    .catch((error) => console.error('Error:', error));
 
  form.reset();
 
});
function createTableRow(className, studentName, amountToBePaid, amountDeposited, balance, id) {
  const tableRow = document.createElement('tr');
  const classTd = document.createElement('td');
  const nameTd = document.createElement('td');
  const amountToBePaidTd = document.createElement('td');
  const amountDepositedTd = document.createElement('td');
  const balanceTd = document.createElement('td');
  const editTd = document.createElement('td');
  const deleteTd = document.createElement('td');

  classTd.textContent = className;
  nameTd.textContent = studentName;
  amountToBePaidTd.textContent = amountToBePaid;
  amountDepositedTd.textContent = amountDeposited;
  balanceTd.textContent = balance.toFixed(2);

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => editRecord(id, tableRow));

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => deleteRecord(id, tableRow));

  editTd.appendChild(editButton);
  deleteTd.appendChild(deleteButton);

  tableRow.appendChild(classTd);
  tableRow.appendChild(nameTd);
  tableRow.appendChild(amountToBePaidTd);
  tableRow.appendChild(amountDepositedTd);
  tableRow.appendChild(balanceTd);
  tableRow.appendChild(editTd);
  tableRow.appendChild(deleteTd);

  document.getElementById('recordstbody').appendChild(tableRow);

  return tableRow;
}



// function editRecord(id, row) {
//   const className = row.cells[0].textContent;
//   const studentName = row.cells[1].textContent;
//   const amountToBePaid = row.cells[2].textContent;
//   const amountDeposited = row.cells[3].textContent;

//   document.getElementById('className').value = className;
//   document.getElementById('studentName').value = studentName;
//   document.getElementById('amountToBePaid').value = amountToBePaid;
//   document.getElementById('amountDeposited').value = amountDeposited;

//   row.remove();

  

//   fetch(`http://localhost:3000/api/records/updateRecord/${id}`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       className,
//       studentName,
//       amountToBePaid,
//       amountDeposited
//     })
//   })
//   .then((response) => response.json())
  
//   .then((data) => {
//     console.log('Record edited successfully:', data);
//   })
//   .catch((error) => console.error('Error:', error));
// }

// function deleteRecord(id, row) {
//   fetch(`/api/records/${id}`, {
//     method: 'DELETE'
//   })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log('Record deleted successfully:', data);
//     row.remove();
//   })
//   .catch((error) => console.error('Error:', error));
// }

// const getRecords = async () => {
    
//     const response = await fetch('http://localhost:3000/api/records/getRecords');
//     const records = await response.json();
//     records.forEach((record) => {
//       const tableRow = document.createElement('tr');
//       const classTd = document.createElement('td');
//       const nameTd = document.createElement('td');
//       const amountToBePaidTd = document.createElement('td');
//       const amountDepositedTd = document.createElement('td');
//       const balanceTd = document.createElement('td');
//       const editTd = document.createElement('td');
//       const deleteTd = document.createElement('td');
//       classTd.textContent = record.className;
//       nameTd.textContent = record.studentName;
//       amountToBePaidTd.textContent = record.amountToBePaid;
//       amountDepositedTd.textContent = record.amountDeposited;
//       balanceTd.textContent = record.balance;
//       const editButton = document.createElement('button');
//       editButton.textContent = 'Edit';
//       editButton.addEventListener('click', () => editRecord(record._id, tableRow));
//       const deleteButton = document.createElement('button');
//       deleteButton.textContent = 'Delete';
//       deleteButton.addEventListener('click', () => deleteRecord(record._id, tableRow));
//       editTd.appendChild(editButton);
//       deleteTd.appendChild(deleteButton);
//       tableRow.appendChild(classTd);
//       tableRow.appendChild(nameTd);
//       tableRow.appendChild(amountToBePaidTd);
//       tableRow.appendChild(amountDepositedTd);
//       tableRow.appendChild(balanceTd);
//       tableRow.appendChild(editTd);
//       tableRow.appendChild(deleteTd);
//       tableBody.appendChild(tableRow);
//     });
   
//   };

// const getRecords = async (userId) => {
//    // Replace with the actual user ID
// const objectId = mongoose.Types.ObjectId(userId);
//   // console.log('UserId:', userId); // Check if userId is defined
//   // console.log('User logged in:', userId ? true : false); // Check if user is logged in
   
//    const response = await fetch('http://localhost:3000/api/records/getRecords/${objectId}');
  
//   console.log('Records:', response);
//     const records = await response.json();
//     console.log('Records:', records);
//     if (Array.isArray(records)) {
//     const tableBody = document.getElementById('recordstbody');
//     tableBody.innerHTML = '';
//     records.forEach((record) => {
//       const tableRow = document.createElement('tr');
//       const classTd = document.createElement('td');
//       const nameTd = document.createElement('td');
//       const amountToBePaidTd = document.createElement('td');
//       const amountDepositedTd = document.createElement('td');
//       const balanceTd = document.createElement('td');
//       classTd.textContent = record.className;
//       nameTd.textContent = record.studentName;
//       amountToBePaidTd.textContent = record.amountToBePaid;
//       amountDepositedTd.textContent = record.amountDeposited;
//       balanceTd.textContent = record.balanceAmount; // display balance in table
//       const editTd = document.createElement('td');
//       const deleteTd = document.createElement('td');
//       const editButton = document.createElement('button');
//       editButton.textContent = 'Edit';
//       editButton.addEventListener('click', () => editRecord(record._id, tableRow));
//       const deleteButton = document.createElement('button');
//       deleteButton.textContent = 'Delete';
//       deleteButton.addEventListener('click', () => deleteRecord(record._id, tableRow));
//       editTd.appendChild(editButton);
//       deleteTd.appendChild(deleteButton);
//       tableRow.appendChild(classTd);
//       tableRow.appendChild(nameTd);
//       tableRow.appendChild(amountToBePaidTd);
//       tableRow.appendChild(amountDepositedTd);
//       tableRow.appendChild(balanceTd);
//       tableRow.appendChild(editTd);
//       tableRow.appendChild(deleteTd);
//       tableBody.appendChild(tableRow);  

//     })
    
//   }
//   };
  
//   // call the function when the page loads
//   document.addEventListener('DOMContentLoaded', getRecords);
//   getRecords();
  