const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

// fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random()* 1000000),
    }

    addData(newUser);
}

getRandomUser();



// add new obj to data arr
function addData(obj) {
    data.push(obj);

    // if nothing passed in the parameter, we use the 'data' array by default
    updateDOM();
}



//format number as money: https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}



// update DOM
function updateDOM(providedData = data) {
    // clean main div
    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

    providedData.forEach(function (item) {
        const div = document.createElement('div');
        div.classList.add('person');
        div.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)} `;
        main.appendChild(div);
    }); 
}



// double everyones money
function doubleMoney() {
    // we need to re-assign it to the data array, since map() makes the changes on a new array and give it back
    data = data.map(function (item) {
        return { name: item.name, money: item.money * 2 };
    });
    console.log(data);

    updateDOM();
}



// filter only millionaires
function showMillionaires() {
    // we need to re-assign it to the data array, since filter() makes the changes on a new array and give it back
    data = data.filter(function (item) {
        return item.money > 1000000; 
    });

    updateDOM();
}




// sort users by richest
function sortByRichest() {
    // a, b represent a item/object of the 'data' array, we did not need to re-assign the data since sort() method make the changes on the original array
    data.sort(function (a, b) {
        return b.money - a.money;
    }); 

    updateDOM();
}



// calculate user wealth
function calculateWealth() {
    total = data.reduce(function (accumulator, currentValue) {
        return accumulator += currentValue.money;
    }, 0);

    const div = document.createElement('div');
    div.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(total)}</strong></h3>`;
    main.appendChild(div);
}



// Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);


