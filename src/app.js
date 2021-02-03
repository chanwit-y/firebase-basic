const cafeList = document.querySelector("#cafe-list");
const form = document.querySelector("#add-cafe-form");

// create element and render cafe
function renderCafe(doc) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");
  let btnDelete = document.createElement("div");

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  btnDelete.textContent = "x";

  li.setAttribute("data-id", doc.id);
  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(btnDelete);

  cafeList.appendChild(li);

  //deleting data
  btnDelete.addEventListener("click", (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection('cafes').doc(id).delete()
  });
}

// getting data
// db.collection("cafes")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       renderCafe(doc);
//     });
//   });

// getting data where
db.collection("cafes")
  .where("city", "==", "manchester")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      renderCafe(doc);
    });
  });

// saving data
form.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("cafes").add({
    name: form.name.value,
    city: form.city.value,
  });

  form.name.value = "";
  form.city.value = "";
});
