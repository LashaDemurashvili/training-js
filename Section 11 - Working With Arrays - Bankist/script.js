'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account0 = {
    owner: 'Lasha Demurashvili',
    movements: [10000, 250, -270, 30, -150, -1130, -270, -100, 1000, 2000, 3000, 70],
    username: 'ldem',
    interestRate: 1.2, // %
    pin: 3,
};

const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account0, account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

const displayMovements = function (movements, sort = false) {
    containerMovements.innerHTML = '';  // for clear old html data

    // using slice() for copying entire array
    const newMovements = sort ? movements.slice().sort((a, b) => a - b) : movements;

    newMovements.forEach(function (mov, index) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';

        const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${index + 1} ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
        `;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};
// displayMovements(account0.movements);


// side effects, 'do some work without returning anything.'
// using forEach, because we need to modified current object
const createUserName = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner
            .toLowerCase()
            .split(' ')
            .map(word => word[0])
            .join('');
    });
};
createUserName(accounts);

const createAccsOwnName = function (accounts) {
    accounts.forEach(function (acc) {
        acc.owner_name = acc.owner.split(' ')[0].toUpperCase();
    });
};
createAccsOwnName(accounts);

const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
    labelBalance.textContent = `${acc.balance}€`;
};

// calcDisplayBalance(account1);

const calcDisplaySummary = function (acc) {
    const incomes = acc.movements
        .filter(x => x > 0)
        .reduce((acc, cur) => acc + cur, 0);
    labelSumIn.textContent = `${incomes}💶`;

    const out = acc.movements
        .filter(x => x < 0)
        .reduce((acc, cur) => acc + cur, 0);
    labelSumOut.textContent = `${Math.abs(out)}💶`;

    const interest = acc.movements
        .filter(x => x > 0)
        .map(deposits => (deposits * acc.interestRate) / 100)
        .filter((int, i, arr) => {
            return int >= 1;
        })
        .reduce((acc, cur) => acc + cur, 0);

    labelSumInterest.textContent = `${interest.toFixed(2)}💶`;
};
// calcDisplaySummary(account0);


const updateUI = function (acc) {
    // Display movements
    displayMovements(acc.movements);

    // Display balance
    calcDisplayBalance(acc);

    // Display summary
    calcDisplaySummary(acc);
};


// submit button
let currentAccount;
btnLogin.addEventListener('click', function (e) {
    // Prevent form from submit
    // using preventDefault() to STOP auto refresh page(when we use 'form' in html, page automatically refreshed after submit button)
    // (when we click ENTER, this same as click button, in 'form')
    e.preventDefault();

    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
    // console.log(currentAccount);

    // optional chaining method
    // currentAccount? - this mean, if currentAccount exist
    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        labelWelcome.textContent = `Welcome, ${currentAccount.owner_name}`;
        containerApp.style.opacity = 100;

        // clear form
        inputLoginUsername.value = inputLoginPin.value = '';

        updateUI(currentAccount);
    } else {
        alert("Wrong username or password");
    }
});

// transfer button
btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();

    const amount = Number(inputTransferAmount.value);
    const receiverAccount = accounts.find(acc => acc.username === inputTransferTo.value);

    inputTransferAmount.value = inputTransferTo.value = '';
    if (amount > 0 && amount <= currentAccount.balance && receiverAccount && receiverAccount.username !== currentAccount.username) {
        currentAccount.movements.push(-amount);
        receiverAccount.movements.push(amount);

        updateUI(currentAccount);

        // console.log(receiverAccount);
        // console.log('valid');
    } else {
        // console.log('Not valid');
    }
});

// delete account
btnClose.addEventListener('click', function (e) {
    e.preventDefault();

    if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
        const indexOfAccount = accounts.findIndex(account => account.username === currentAccount.username);

        // delete account on this position
        accounts.splice(indexOfAccount, 1);

        // hide app
        containerApp.style.opacity = 0;
    }
    inputCloseUsername.value = inputClosePin.value = '';
});


btnLoan.addEventListener('click', function (e) {
    e.preventDefault();

    const amount = Number(inputLoanAmount.value);

    // if any number is more than 10% of requested loan
    if (amount > 0 && currentAccount.movements.some((x) => x >= amount * 0.1)) {
        currentAccount.movements.push(amount);

        updateUI(currentAccount);
    }
    inputLoanAmount.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovements(currentAccount.movements, !sorted);

    // toggle
    sorted = !sorted;
});

console.log(sorted);




