// Variables initialization
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

let totalBudget = document.querySelector('#totalBudget');
totalBudget.value = localStorage.getItem('totalBudget') || 0;

let people = document.querySelector('#people');
people.value = localStorage.getItem('people') || 1;

populateTable();

// Populate the table
function populateTable() {
    clearTable();

    const expenseTableBody = document.querySelector('#expensesTable tbody');
    let totalBudget = document.querySelector('#totalBudget').value;
    let people = document.querySelector('#people').value;
    let totalCost = 0;

    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = expense.name;
        row.appendChild(nameCell);

        const costCell = document.createElement('td');
        costCell.textContent = expense.cost;
        totalCost += expense.cost;
        row.appendChild(costCell);

        const overallCostCell = document.createElement('td');
        overallCostCell.textContent = expense.cost * people;
        row.appendChild(overallCostCell);

        // Create the delete button cell
        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        editButton.addEventListener('click', () => editRow(index));
        deleteButton.addEventListener('click', () => deleteRow(index));
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        expenseTableBody.appendChild(row);
    });

    const totalTableBody = document.querySelector('#totalTable tbody');

    // Create the total row
    const totalRow = document.createElement('tr');

    const totalCell = document.createElement('th');
    totalCell.textContent = 'Total';
    totalRow.appendChild(totalCell);

    const totalCostCell = document.createElement('th');
    totalCostCell.textContent = totalCost;
    totalRow.appendChild(totalCostCell);

    const totalOverallCostCell = document.createElement('th');
    totalOverallCostCell.textContent = totalCost * people;
    totalRow.appendChild(totalOverallCostCell);

    totalTableBody.appendChild(totalRow);

    // Create the remaining total row
    const remainingTotalRow = document.createElement('tr');

    const remainingCell = document.createElement('td');
    remainingCell.textContent = 'Remaining';
    remainingTotalRow.appendChild(remainingCell);

    const remainingBudget = document.createElement('td');
    remainingBudget.textContent = totalBudget - totalCost;
    remainingTotalRow.appendChild(remainingBudget);

    const remainingOverallBudget = document.createElement('td');
    remainingOverallBudget.textContent = (totalBudget - totalCost) * people;
    remainingTotalRow.appendChild(remainingOverallBudget);

    totalTableBody.appendChild(remainingTotalRow);
}

// Clear all data
const clearAllButton = document.querySelector('#clearAllButton');
clearAllButton.addEventListener('click', () => {
    localStorage.clear();
    window.location.reload();
});

// Update table when the update button is clicked
const updateButton = document.querySelector('#updateButton');
updateButton.addEventListener('click', () => {
    localStorage.setItem('totalBudget', totalBudget.value);
    localStorage.setItem('people', people.value);
    populateTable();
});

function editRow(index) {
    const nameInput = document.querySelector('#expenseName');
    const costInput = document.querySelector('#expenseCost');
    const button = document.querySelector('#addExpenseButton');
    button.textContent = 'Update Expense';
    nameInput.value = expenses[index].name;
    costInput.value = expenses[index].cost;
    edit = true;
}

function deleteRow(index) {
    expenses.splice(index, 1); // Remove the expense at the specified index
    localStorage.setItem('expenses', JSON.stringify(expenses)); // Update local storage
    populateTable(); // Re-populate the table to reflect the changes
}

// Clear the table
function clearTable() {
    const expenseTableBody = document.querySelector('#expensesTable tbody');
    expenseTableBody.innerHTML = '';
    const totalTableBody = document.querySelector('#totalTable tbody');
    totalTableBody.innerHTML = '';
}

const addExpenseButton = document.querySelector('#addExpenseButton');
nameInput = document.querySelector('#expenseName');
costInput = document.querySelector('#expenseCost');

let edit = false;
addExpenseButton.addEventListener('click', () => {
    if (edit) {
        const button = document.querySelector('#addExpenseButton');
        editExpense();
        button.textContent = 'Add Expense';
        edit = false;
    } else {
        addExpense();
    }
});

function addExpense() {
    const name = nameInput.value;
    const cost = parseInt(costInput.value);
    if (name && !isNaN(cost)) {
        expenses.push({ name, cost });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        nameInput.value = '';
        costInput.value = '';
        populateTable();
    }
    populateTable();
}

function editExpense(index) {
    const name = nameInput.value;
    const cost = parseInt(costInput.value);
    if (name && !isNaN(cost)) {
        expenses.splice(index, 1, { name, cost });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        nameInput.value = '';
        costInput.value = '';
        populateTable();
    }
}