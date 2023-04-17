// Получение элемента формы с идентификатором "form"
const form = document.getElementById("form");

// Обработчик события отправки формы
const onSubmit = (e) => {
  // Отмена стандартного действия при отправке формы
  e.preventDefault();
  // Получение значения поля "type" из формы
  const typeQuery = form.elements["type"].value;
  // Получение значения поля "message" из формы
  const message = form.elements["message"].value;
  
  // Формирование объекта с данными для отправки на сервер
  const data = {
    type: typeQuery,
    message,
  };

  // Отправка данных на сервер в формате JSON с помощью функции fetch
  fetch("/", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    // Обработка ответа сервера в формате JSON
    const data = await res.json();
    // Если запрос был на текст
    if (typeQuery === "text") {
      // Получение ответа текстового формата
      const { text } = data;
      // Если ответ есть
      if (text) {
        // Создание элемента div для отображения ответа
        const answer = document.createElement("div");
        // Разбиение текста ответа на блоки и добавление их в созданный элемент
        const blocks = text
          .split("\n")
          .map((b) => `<div>${b}</div>`)
          .join("\n");
        answer.innerHTML = blocks;
        // Установка класса для элемента
        answer.className = "answer";
        // Добавление элемента с ответом на страницу
        document.getElementById("result").appendChild(answer);
      }
    } else {
      // Получение ответа в формате изображения
      const { images } = data;
      // Если ответ есть
      if (images) {
        // Добавление каждого изображения в отдельный элемент div
        images.forEach(({ image }) => {
          const answer = document.createElement("div");
          const imageEl = document.createElement("img");
          // Установка атрибутов изображения
          imageEl.src = image;
          imageEl.alt = "image";
          imageEl.style.width = "100%";
          answer.appendChild(imageEl);
          // Установка класса для элемента
          answer.className = "answer";
          // Добавление элемента с изображением на страницу
          document.getElementById("result").appendChild(answer);
        });
      }
    }
  });
};

// Добавление обработчика события отправки формы
form.addEventListener("submit", onSubmit);

