let studentNum = 0;
const studentElem = document.getElementById("student");
const studentImg = document.getElementById("studentImg");
const indicator = document.getElementById("indicator");
let answer;
let url = "https://the-age-game.onrender.com";
loadNewStudent(studentNum);
let selected;
const choices = document.getElementsByClassName("answer-choices");

for (let i = 0; i < choices.length; i++) {
  choices[i].onclick = () => {
    selected = i;
  };
}

studentElem.onclick = () => {
  if (selected == 0 && answer == "9") {
    correct();
  } else if (selected == 1 && answer == "10") {
    correct();
  } else if (selected == 2 && answer == "11") {
    correct();
  } else if (selected == 3 && answer == "12") {
    correct();
  } else {
    incorrect();
  }
  studentNum++;
  loadNewStudent(studentNum);
};

loading = "false";

function loadNewStudent(id) {
  fetch(url + "/api/" + id)
    .then((response) => {
      if (!response.ok) {
        alert(
          "You have exhausted our list of students 😅. \n Please add more students to this list: https://docs.google.com/spreadsheets/d/1VP6qbS5aN7p9ffNe3-yUo2puLxeFXA1rMKXKtIq8cX0/edit?usp=sharing"
        );
        throw new Error("Network response was not ok");
      }
      return response.text(); // Assuming the API returns JSON
    })
    .then((data) => {
      return data; // Assuming the API returns
    })
    .then((data) => {
      console.log("API call successful"); // Do something with the data
      answer = data.split("\n")[1];
      store(data.split("\n")[0]);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function store(item) {
  console.log("image changed");
  studentImg.src = item;
}

function correct() {
  indicator.style.zIndex = "100";
  indicator.style.animation = "indicate 0.5s ease-in-out";
  setTimeout(() => {
    indicator.style.animation = "";
    indicator.style.zIndex = "-1";
  }, 1000);
}

function incorrect() {
  indicator.style.zIndex = "100";
  indicator.style.backgroundColor = "red";
  indicator.style.animation = "indicate 0.3s ease-in-out";
  setTimeout(() => {
    indicator.style.animation = "";
    indicator.style.zIndex = "-1";
  }, 1000);
}
