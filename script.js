// Variables initialization
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

let totalBudget = document.querySelector('#totalBudget');
totalBudget.value = localStorage.getItem('totalBudget') || 1000;

let people = document.querySelector('#people');
people.value = localStorage.getItem('people') || 1;
let selectedIndex = 0;

// if (expenses.length > 0) {
//     populateTable();
// }
populateTable();

// Populate the table
function populateTable() {
    clearTable();

    const expenseTable = document.querySelector('#expensesTable');
    if (expenses.length === 0) {
        expenseTable.style = 'display: none';
    } else {
        expenseTable.style.removeProperty('display');
    }

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

        // Create the action buttons cell
        const actionCell = document.createElement('td');
        const actionDiv = document.createElement('div');
        actionDiv.className = 'actions';
        const editButton = document.createElement('button');
        editButton.className = 'actionButton';
        editButton.innerHTML = '<ion-icon name="pencil-sharp"></ion-icon>';
        const deleteButton = document.createElement('button');
        deleteButton.className = 'actionButton';
        deleteButton.innerHTML = '<ion-icon name="trash-sharp"></ion-icon>';
        editButton.addEventListener('click', () => editRow(index));
        deleteButton.addEventListener('click', () => deleteRow(index));
        actionDiv.appendChild(editButton);
        actionDiv.appendChild(deleteButton);
        actionCell.appendChild(actionDiv);
        row.appendChild(actionCell);

        expenseTableBody.appendChild(row);
    });

    const totalTableBody = document.querySelector('#totalTable tbody');

    // Create the total row
    const totalRow = document.createElement('tr');

    const totalCell = document.createElement('td');
    totalCell.textContent = 'Outstanding';
    totalRow.appendChild(totalCell);

    const totalCostCell = document.createElement('td');
    totalCostCell.textContent = totalCost;
    totalRow.appendChild(totalCostCell);

    const totalOverallCostCell = document.createElement('td');
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
    selectedIndex = index;
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

function editExpense() {
    const name = nameInput.value;
    const cost = parseInt(costInput.value);
    if (name && !isNaN(cost)) {
        expenses.splice(selectedIndex, 1, { name, cost });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        nameInput.value = '';
        costInput.value = '';
        populateTable();
    }
}
