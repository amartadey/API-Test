const API_KEY = "https://api.tvmaze.com/";
let query = "";
let data = "";

checkLocal();

function checkLocal() {
  const local = localStorage.getItem("data");
  if (!local || local == '""') {
    getData();
  } else {
    data = JSON.parse(local);
  }
}

function getData() {
  let query = "shows";
  axios
    .get(API_KEY + query)
    .then((res) => {
      localStorage.setItem("data", JSON.stringify(res.data));
      data = res.data;
      console.log("New request");
    })
    .catch((err) => console.log(err));
}

createBanners(data);

function createBanners(datas) {
  const bannerSlider = document.querySelector("#banner-slider");
  datas.sort(function (a, b) {
    var keyA = a.premiered,
      keyB = b.premiered;
    // Compare the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
  const min = minNum();
  datas.slice(min, min + 5).forEach((data) => {
    const owlitem = document.createElement("div");
    owlitem.className = "owl-items";
    owlitem.innerHTML = `<div
                    class="banner-wrap justify-content-between align-items-center"
                  >
                    <div class="left-wrap">
                      <span class="rnd">IMDb ${data.rating.average}</span>
                      <h2>${data.name.substring(0, 20)}</h2>
                      <span class="tag"><b>${data.language}</b></span>
                      <span class="tag">${data.premiered.substring(0, 4)}</span>
                      ${
                        data.network.country
                          ? `<span class="tag"><b>${data.network.country.code}</b></span>`
                          : ""
                      }
                      
                      <span class="tag"><b>${data.genres[0]}</b></span>
                      <span class="tag">${data.network.name}</span>
                      ${data.summary.substring(0, 150)}...</p>
                      ${
                        data.officialSite
                          ? ` <a href="${data.officialSite}" class="btn btn-lg" target="_blank"
                        ><img src="images/play.png" alt="icn" />Watch now</a
                      >`
                          : ""
                      }
                     
                    </div>
                    <div
                      class="right-wrap"
                      style="background-image: url(${data.image.original})"
                    ></div>
                  </div>`;
    bannerSlider.appendChild(owlitem);
  });
  function minNum() {
    return Math.floor(Math.random() * (data.length - 10) + 5);
  }
}

function currentEpisode() {
  var m = new Date();
  var dateString =
    m.getUTCFullYear() +
    "-" +
    ("0" + m.getUTCMonth() + 1).slice(-2) +
    "-" +
    m.getUTCDate();
  console.log(dateString);
  query = "schedule?date=" + dateString;

  axios
    .get(API_KEY + query)
    .then((res) => {
      const latestContainer = document.querySelector("#latest-container");
      const slider = document.createElement("div");
      slider.classList.add("slide-slider", "owl-carousel", "owl-theme");

      res.data.slice(-10).forEach((latest) => {
        console.log(latest);
        const owlitem = document.createElement("div");
        owlitem.className = "owl-items";
        owlitem.innerHTML = `
                  <a class="slide-one" href="season.html">
                    <div class="slide-image">
                      <img src="${latest.show.image.original}" alt="image" />
                    </div>
                    <div class="slide-content">
                      <h2>
                        ${latest.show.name}
                        <img
                          src="images/plus.png"
                          alt="icon"
                          class="add-wishlist"
                        />
                      </h2>
                      <p>${
                        latest.show.summary
                          ? latest.show.summary.substr(0, 50)
                          : ""
                      }</p>
                      
                      <span class="tag">2 h 20 min</span>
                      <span class="tag">${latest.airdate}</span>
                      <span class="tag"><b>HD</b></span>
                      <span class="tag"><b>16+</b></span>
                    </div>
                  </a>
                `;
        slider.appendChild(owlitem);
      });
      latestContainer.appendChild(slider);
      runSlider();
    })
    .catch((err) => console.log(err));
}
currentEpisode();

function runSlider() {
  $(".slide-slider").owlCarousel({
    loop: true,
    margin: 15,
    nav: true,
    autoplay: false,
    dots: false,
    items: 4,
    navText: [
      '<img src="images/left.png" alt="icon" />',
      '<img src="images/right.png" alt="icon" />',
    ],
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  });

  $(".banner-slider").owlCarousel({
    loop: true,
    margin: 15,
    nav: false,
    autoplay: true,
    dots: true,
    items: 1,
  });
}
