
const form = document.getElementById('paymentForm');
const tableBody = document.getElementById('recordstbody');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const className = document.getElementById('className').value;
  const studentName = document.getElementById('studentName').value;
  const amountToBePaid = document.getElementById('amountToBePaid').value;
  const amountDeposited = document.getElementById('amountDeposited').value;
  const balance = amountToBePaid - amountDeposited;
 
  const token = localStorage.getItem("token");
  
  fetch('https://skulrecbackendcod.onrender.com/api/records/add', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ className, studentName, amountToBePaid, amountDeposited,balance }),
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
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



function editRecord(id, row) {
  const className = row.cells[0].textContent;
  const studentName = row.cells[1].textContent;
  const amountToBePaid = row.cells[2].textContent;
  const amountDeposited = row.cells[3].textContent;

  document.getElementById('className').value = className;
  document.getElementById('studentName').value = studentName;
  document.getElementById('amountToBePaid').value = amountToBePaid;
  document.getElementById('amountDeposited').value = amountDeposited;

  row.remove();
}

function deleteRecord(id, row) {
  tableBody.remove();
}

  

const getRecords = async () => {
  const token = localStorage.getItem('token');
  const payload = JSON.parse(atob(token.split('.')[1]));
  const userId = payload;
  console.log(userId);
  const {id} = userId;
  const response = await fetch(`https://skulrecbackendcod.onrender.com/api/records/getRecords/${id}`);
  const records = await response.json();
  console.log(records);

  if (Array.isArray(records)) {
    const tableBody = document.getElementById('recordstbody');
    tableBody.innerHTML = '';

    records.forEach((record) => {
      const tableRow = document.createElement('tr');

      const classTd = createTableCell(record.className);
      const nameTd = createTableCell(record.studentName);
      const amountToBePaidTd = createTableCell(record.amountToBePaid);
      const amountDepositedTd = createTableCell(record.amountDeposited);
      const balanceTd = createTableCell(record.balanceAmount);

      const editTd = createEditCell(record._id, tableRow);
      const deleteTd = createDeleteCell(record._id, tableRow);

      tableRow.appendChild(classTd);
      tableRow.appendChild(nameTd);
      tableRow.appendChild(amountToBePaidTd);
      tableRow.appendChild(amountDepositedTd);
      tableRow.appendChild(balanceTd);
      tableRow.appendChild(editTd);
      tableRow.appendChild(deleteTd);

      tableBody.appendChild(tableRow);
    });
  }
};

function createTableCell(textContent) {
  const td = document.createElement('td');
  td.textContent = textContent;
  return td;
}

function createEditCell(recordId, tableRow) {
  const editTd = document.createElement('td');
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => editRecord(recordId, tableRow));
  editTd.appendChild(editButton);
  return editTd;
}

function createDeleteCell(recordId, tableRow) {
  const deleteTd = document.createElement('td');
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => deleteRecord(recordId, tableRow));
  deleteTd.appendChild(deleteButton);
  return deleteTd;
}

document.addEventListener('DOMContentLoaded', getRecords);
getRecords()
  