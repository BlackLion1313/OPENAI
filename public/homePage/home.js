"use strict";

// Функция фильтрации массива по заданному свойству и значению
function filter(arr, prop, value) {
  let result = [];
  let copy = [...arr];

  for (const item of copy) {
    if (String(item[prop]).includes(value) == true) result.push(item)
  }
  return result;
}

// Функция отображения отфильтрованного массива пользователей в виде списка
function render(arr) {
  const list = document.querySelector('.users-list');
  list.innerHTML = "users";

  const nameVal = document.getElementById('inp-name').value,
    heightVal = document.getElementById('inp-height').value

  let newArr = [...arr]
  if (nameVal !== '') newArr = filter(newArr, 'name', nameVal)
  if (heightVal !== '') newArr = filter(newArr, 'height', heightVal)
  
  for (const user of newArr) {
    const li = document.createElement('li');
    li.textContent = user.name + ', Height: ' + user.height;
    list.append(li)
  }
}

// Добавление обработчика событий на форму фильтрации
document.getElementById('filter-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Предотвращение отправки формы
  render(users); // Отображение отфильтрованного списка пользователей
});

function addParagraph(element, text) {
  let p = document.createElement("p");
  p.innerText = text;
  element.appendChild(p);
}

function addPeople() {
  const humansDiv = document.querySelector('.humans');

  for (let i = 0; i < users.length; i++) {
    let person = users[i];
    let personDiv = document.createElement("div");

    addParagraph(personDiv, `Name: ${person.name}`);
    addParagraph(personDiv, `Height: ${person.height}`);
    addParagraph(personDiv, `Mass: ${person.mass}`);
    addParagraph(personDiv, `Skin Color: ${person.skin_color}`);
    addParagraph(personDiv, `Eye Color: ${person.eye_color}`);
    addParagraph(personDiv, `Birth Year: ${person.birth_year}`);
    addParagraph(personDiv, `Gender: ${person.gender}`);

    humansDiv.appendChild(personDiv);
  }
}



function addVehicles() {
  const vehiclesDiv = document.querySelector('.transport');

  for (let j = 0; j < vehicles.length; j++) {
    let vehicle = vehicles[j];
    let vehicleDiv = document.createElement("div");

    let name = document.createElement("p");
    name.innerHTML = `Name: ${vehicle.name}`;

    let model = document.createElement("p");
    model.innerHTML = `Height: ${vehicle.model}`;

    let manufacturer = document.createElement("p");
    manufacturer.innerHTML = `Manufacturer: ${vehicle.manufacturer}`;

    let cost_in_credits = document.createElement("p");
    cost_in_credits.innerHTML = `Cost in credits: ${vehicle.cost_in_credits}`;

    let length = document.createElement("p");
    length.innerHTML = `Length: ${vehicle.length}`;

    let max_atmosphering_speed = document.createElement("p");
    max_atmosphering_speed.innerHTML = `Max atmosphering speed: ${vehicle.max_atmosphering_speed}`;

    let crew = document.createElement("p");
    crew.innerHTML = `Crew: ${vehicle.crew}`;

    let passengers = document.createElement("p");
    passengers.innerHTML = `Passengers: ${vehicle.passengers}`;

    let cargo_capacity = document.createElement("p");
    cargo_capacity.innerHTML = `Cargo capacity: ${vehicle.cargo_capacity}`;

    vehicleDiv.appendChild(name);
    vehicleDiv.appendChild(model);
    vehicleDiv.appendChild(manufacturer);
    vehicleDiv.appendChild(cost_in_credits);
    vehicleDiv.appendChild(length);
    vehicleDiv.appendChild(max_atmosphering_speed);
    vehicleDiv.appendChild(crew);
    vehicleDiv.appendChild(passengers);
    vehicleDiv.appendChild(cargo_capacity);
    vehiclesDiv.appendChild(vehicleDiv);
  }
}


const showAfterClickPeople = () => {
  let humansDiv = document.querySelector('.humans');
  humansDiv.classList.add('humans--visible');
}
document.getElementById('people-btn').addEventListener('click', addPeople);
document.getElementById('people-btn').addEventListener('click', showAfterClickPeople);



const showAfterClickVehicles = () => {
  let vehiclesDiv = document.querySelector('.transport');
  vehiclesDiv.classList.add('transport--visible');
}
document.getElementById('vehicles-btn').addEventListener('click', addVehicles);
document.getElementById('vehicles-btn').addEventListener('click', showAfterClickVehicles);