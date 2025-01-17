let menuList = document.getElementById("menuList");

function toggleMenu() {
  menuList.style.maxHeight =
    menuList.style.maxHeight === "0px" ? "300px" : "0px"; 
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 600) {
    menuList.style.maxHeight = "0px";
  }
}); 

const text = document.querySelectorAll("label");
text.forEach((label) => {
  label.innerHTML = label.textContent
    .split("")
    .map((text, landing) => {
      return `<span style="transition-delay: ${landing * 37}ms">${text}</span>`;
    })
    .join("");
});

let scrolling = document.getElementById("scrolling");
let nav = document.getElementById("nav");
let landing = document.getElementById("home");
let aboutus = document.getElementById("about-us");

if (screen.width > 1300) {
  window.onload = () => {
    removeOpacity();
    setTimeout(() => {
      removeAnimation();
    }, 3500);
  };
} else {
  window.onload = () => {
    scrolling.style.opacity = "1";
    nav.style.opacity = "1";
    landing.style.opacity = "1";
    aboutus.style.opacity = "1";
  };
}

function removeOpacity() {
  scrolling.style.opacity = "0.1";
  nav.style.opacity = "0.1";
  landing.style.opacity = "0.1";
  aboutus.style.opacity = "0.1";
}

function removeAnimation() {
  let bat = document.querySelector(".bat");
  console.log(bat);
  let ball = document.querySelector(".ball");
  console.log(ball);
  scrolling.style.opacity = "1";
  nav.style.opacity = "1";
  landing.style.opacity = "1";
  aboutus.style.opacity = "1";

  bat.style.display = "none";
  ball.style.display = "none";
  
  let bails1 = document.querySelector(".bails-1");
  let bails2 = document.querySelector(".bails-2");
  let stumps1 = document.querySelector(".stumps-1");
  let stumps2 = document.querySelector(".stumps-2");
  let stumps3 = document.querySelector(".stumps-3");

  bails1.style.display = "none";
  bails2.style.display = "none";
  stumps1.style.display = "none";
  stumps2.style.display = "none";
  stumps3.style.display = "none";
}

const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - sectionHeight / 3) {  
      current = section.getAttribute('id');  
    }
  });

  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.classList.remove('active');  
    if (anchor.getAttribute('href').substring(1) === current) {
      anchor.classList.add('active');  
    }
  });
});

