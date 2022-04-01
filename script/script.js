const rootElem = document.querySelector("#root");

const imgList   = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg", "06.jpg"];
const mediaPath = "media/";
let imgIndex    = 0;

const sliderContainer     = document.createElement("div");
const sliderMain          = document.createElement("div");
const sliderFilm          = document.createElement("div");
const imgShifter       = document.createElement("div");
const imgShifter_left  = document.createElement("div");
const imgShifter_right = document.createElement("div");

sliderContainer.classList.add("slider_container");
sliderMain.classList.add("slider_main");
sliderFilm.classList.add("slider_film");
imgShifter.classList.add("img_shifter");

imgShifter_left.innerHTML = '<i class="fa fal fa-caret-left"></i>';
imgShifter_right.innerHTML = '<i class="fa fal fa-caret-right"></i>';

sliderMain.append(sliderFilm);
imgShifter.append(imgShifter_left, imgShifter_right);
sliderContainer.append(sliderMain, imgShifter);
rootElem.append(sliderContainer);

let sliderWidth;

/****************************************************************** */
const ulElem = document.createElement("ul");
ulElem.classList.add("img_dots");

ulElem.append(...imgList.map((elem, index) => {
    const liElem = document.createElement("li");
    liElem.innerText = index + 1;

    liElem.addEventListener("click", event => {
        const liElem_active = event.target;
        imgIndex = [...liElem_active.parentNode.children].indexOf(liElem_active);

        render();
    })
    return liElem;
}));

sliderContainer.append(ulElem);
/****************************************************************** */

const sliderFilmElems = imgList.map(img => {
    const imgElem = document.createElement("div");
    imgElem.style.backgroundImage = `url("${mediaPath + img}")`;
    imgElem.style.width = sliderWidth + "px";
    return imgElem;
});

function render() {
    sliderFilm.style.right = sliderWidth * imgIndex + "px";

    /******************************************************** */
    const liList = document.querySelectorAll(".img_dots li");
    liList.forEach(li => li.classList.remove("active"));
    liList[imgIndex].classList.add("active");

    /********************************************************** */
}

function changeSize() {
    sliderWidth = sliderContainer.offsetWidth;
    sliderFilm.style.width = sliderWidth * imgList.length + "px";
    sliderFilmElems.forEach(elem => {
    elem.style.width = sliderWidth + "px";
    })
    render();
}

window.addEventListener("resize", changeSize);
changeSize();

sliderFilm.append(...sliderFilmElems);

imgShifter_left.addEventListener("click", () => {
    if(imgIndex > 0) {
        imgIndex--;
    } else {
        imgIndex = imgList.length - 1;
    }
    render();
});
imgShifter_right.addEventListener("click", () => {
    if(imgList.length - 1 > imgIndex) {
        imgIndex++;
    } else {
        imgIndex = 0;
    }
    render();
});