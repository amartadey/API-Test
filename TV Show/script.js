const main = document.querySelector("#main");
const header = document.querySelector("#header");
const API_URL = "http://api.tvmaze.com/";
const input = document.querySelector("#search");

const localQuery = localStorage.getItem("query");
if (localQuery) searchNow(localQuery);

input.addEventListener("keypress", (e) => {
  if (e.charCode == 13) {
    searchNow(e.target.value);
    localStorage.setItem("query", e.target.value);
    input.value = "";
    input.focus();
  }
});

function searchNow(value) {
  main.innerHTML = "";
  console.log(value);
  header.classList.add("results-show");
  axios.get(API_URL + `search/shows?q=${value}`).then((res) => {
    console.log(res.data);
    createCards(res.data);
  });
}

function createCards(datas) {
  datas.forEach((data) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<img
                src="${
                  data.show.image
                    ? data.show.image.original
                    : `https://via.placeholder.com/960x1440/050446/ffffff?text=${data.show.name
                        .split(" ")
                        .join("+")}`
                }"
                alt=""
                />
                <div class="text-section">
                <h3>${data.show.name}</h3>
                <div class="details">
                <small
                    ><i class="fas fa-globe-asia"></i>: ${
                      data.show.language
                    }<br /><i
                    class="fas fa-running"
                    ></i
                    >: ${data.show.status}</small
                >
                <p class="${ratingClass(data.show.rating.average)}">${
      data.show.rating.average
    }</p>
                </div></div>`;
    main.appendChild(card);
  });
}

function ratingClass(rating) {
  let classname = "noname";
  if (rating > 0 && rating < 5) {
    classname = "red";
  } else if (rating > 0 && rating < 8) {
    classname = "yellow";
  } else if (rating > 0 && rating < 10) {
    classname = "green";
  }
  return classname;
}
