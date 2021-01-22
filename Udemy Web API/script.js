const url = "https://dummyapi.io/data/api/user?limit=10";

// FETCH
// fetch(url, { headers: { "app-id": "600ae2e27dff4c0c80425c7b" } })
//   .then((res) => {
//     return res.json();
//   })
//   .then((res) => console.log(res.data));

// XMLHTTPREQUEST
// let xhr = new XMLHttpRequest();
// xhr.open("GET", url);
// xhr.setRequestHeader("app-id", "600ae2e27dff4c0c80425c7b");
// xhr.responseType = "json";
// xhr.onload = function () {
//   console.log(xhr.response);
// };

// xhr.send();
// console.log(xhr);

fetch(url, { headers: { "app-id": "600ae2e27dff4c0c80425c7b" } })
  .then((res) => res.json())
  .then((datas) => {
    const allData = datas.data;
    console.log(allData);
    allData.forEach((data) => {
      console.log(data.email);
    });
  });
