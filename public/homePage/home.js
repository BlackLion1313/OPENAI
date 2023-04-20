"use strict";
const apiUrl = 'https://swapi.dev/api/';

let selectedGender = '';
async function fetchEntities(entity) {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'block'; // show the spinner
  let allResults = [];
  let nextUrl = apiUrl + entity + (selectedGender ? `?gender=${selectedGender}` : '');
  while (nextUrl) {
    try {
      const response = await fetch(nextUrl);
      const data = await response.json();
      allResults = allResults.concat(data.results);
      nextUrl = data.next;
    } catch (error) {
      console.log(error);
      break;
    }
  }
  spinner.style.display = 'none'; // hide the spinner
  return allResults;
}


function renderList(list, entity, category) {
  const listContainer = document.getElementById('list-container');
  listContainer.innerHTML = '';
  list.forEach(item => {
    if (entity === category && (!selectedGender || item.gender.toLowerCase() === selectedGender)) {
      const listItem = document.createElement('div');
      listItem.classList.add('list-item');
      listItem.textContent = item.name;
      listItem.addEventListener('click', () => {
        renderDetails(item, entity);
        window.scrollTo(0, document.body.scrollHeight);
      });
      listContainer.appendChild(listItem);
    } else if (entity !== category) {
      const listItem = document.createElement('div');
      listItem.classList.add('list-item');
      listItem.textContent = item.name;
      listItem.addEventListener('click', () => {
        renderDetails(item, entity);
        window.scrollTo(0, document.body.scrollHeight);
      });
      listContainer.appendChild(listItem);
    }
  });
}

function renderDetails(item, entity) {
  const detailsContainer = document.getElementById('details-container');
  detailsContainer.innerHTML = '';
  const title = document.createElement('h2');
  title.textContent = item.name;
  detailsContainer.appendChild(title);
  const properties = Object.entries(item);
  for (let i = 0; i < 8 && i < properties.length; i++) {
    const detailItem = document.createElement('div');
    detailItem.classList.add('detail-item');
    detailItem.innerHTML = `<strong>${properties[i][0]}:</strong> ${properties[i][1]}`;
    detailsContainer.appendChild(detailItem);
  }
}

const charactersBtn = document.getElementById('characters-btn');
const planetsBtn = document.getElementById('planets-btn');
const vehiclesBtn = document.getElementById('vehicles-btn');

charactersBtn.addEventListener('click', async () => {
  try {
    const people = await fetchEntities('people');
    renderList(people, 'people');
    charactersBtn.classList.add('active');
    planetsBtn.classList.remove('active');
    vehiclesBtn.classList.remove('active');
  } catch (error) {
    console.log(error);
  }
});

planetsBtn.addEventListener('click', async () => {
  try {
    const planets = await fetchEntities('planets');
    renderList(planets, 'planets');
    planetsBtn.classList.add('active');
    charactersBtn.classList.remove('active');
    vehiclesBtn.classList.remove('active');
  } catch (error) {
    console.log(error);
  }
});

vehiclesBtn.addEventListener('click', async () => {
  try {
    const vehicles = await fetchEntities('vehicles');
    renderList(vehicles, 'vehicles');
    vehiclesBtn.classList.add('active');
    charactersBtn.classList.remove('active');
    planetsBtn.classList.remove('active');
  } catch (error) {
    console.log(error);
  }
});


const filterInput = document.getElementById('input');

filterInput.addEventListener('input', () => {
  const filterValue = filterInput.value.toLowerCase();
  const listItems = document.querySelectorAll('.list-item');
  listItems.forEach(item => {
    const itemValue = item.textContent.toLowerCase();
    if (itemValue.includes(filterValue)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
});

const maleCheckbox = document.getElementById('male-checkbox');
const femaleCheckbox = document.getElementById('female-checkbox');

maleCheckbox.addEventListener('change', () => {
  if (maleCheckbox.checked) {
    selectedGender = 'male';
    femaleCheckbox.checked = false;
  } else {
    selectedGender = '';
  }
  if (document.getElementById('characters-btn').classList.contains('active')) {
    fetchEntities('people')
      .then(people => renderList(people, 'people', 'characters'));
  } else if (document.getElementById('planets-btn').classList.contains('active')) {
    fetchEntities('planets')
      .then(planets => renderList(planets, 'planets', 'planets'));
  } else if (document.getElementById('vehicles-btn').classList.contains('active')) {
    fetchEntities('vehicles')
      .then(vehicles => renderList(vehicles, 'vehicles', 'vehicles'));
  }
});

femaleCheckbox.addEventListener('change', () => {
  if (femaleCheckbox.checked) {
    selectedGender = 'female';
    maleCheckbox.checked = false;
  } else {
    selectedGender = '';
  }
  if (document.getElementById('characters-btn').classList.contains('active')) {
    fetchEntities('people')
      .then(people => renderList(people, 'people', 'characters'));
  } else if (document.getElementById('planets-btn').classList.contains('active')) {
    fetchEntities('planets')
      .then(planets => renderList(planets, 'planets', 'planets'));
  } else if (document.getElementById('vehicles-btn').classList.contains('active')) {
    fetchEntities('vehicles')
      .then(vehicles => renderList(vehicles, 'vehicles', 'vehicles'));
  }
});

function init() {
  fetchEntities('people')
    .then(people => renderList(people, 'people'));
}
charactersBtn.classList.add('active');
init();