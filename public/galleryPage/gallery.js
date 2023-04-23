"use strict";

let slideIndex = 0;
slideshow();

function slideshow() {

  let images = document.querySelectorAll('#slideshow-container img');
  for (let i = 0; i < images.length; i++) {
    images[i].classList.remove('active');
  }
  slideIndex++;
  if (slideIndex > images.length) { slideIndex = 1 }
  images[slideIndex - 1].classList.add('active');
  setTimeout(slideshow, 4000);
}

function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
    moreText.style.color = "white";
  }
}
