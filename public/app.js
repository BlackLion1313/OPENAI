"use strict";
const form = document.getElementById("form");

const onSubmit = (e) => {
  e.preventDefault();
  const typeQuery = form.elements["type"].value;
  const message = form.elements["message"].value;

  const data = {
    type: typeQuery,
    message,
  };


  fetch("/", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    const data = await res.json();
    if (typeQuery === "text") {

      const { text } = data;

      if (text) {
        const answer = document.createElement("div");

        const blocks = text
          .split("\n")
          .map((b) => `<div>${b}</div>`)
          .join("\n");

        answer.innerHTML = blocks;
        answer.className = "answer";
        document.getElementById("result").appendChild(answer);
      }

    } else {
      const { images } = data;
      if (images) {
        images.forEach(({ image }) => {
          const answer = document.createElement("div");
          const imageEl = document.createElement("img");

          imageEl.src = image;
          imageEl.alt = "image";
          imageEl.style.width = "100%";
          answer.appendChild(imageEl);
          answer.className = "answer";
          document.getElementById("result").appendChild(answer);
        });
      }
    }
  });
};

form.addEventListener("submit", onSubmit);

