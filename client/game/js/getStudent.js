let studentNum = 0;
const studentElem = document.getElementById("student");
const studentImg = document.getElementById("studentImg");
const indicator = document.getElementById("indicator");
let answer;
let url = "https://the-age-game.onrender.com"; //https://the-age-game.onrender.com
loadNewStudent(studentNum);
let selected;
const choices = document.getElementsByClassName("answer-choices");

for (let i = 0; i < choices.length; i++) {
  choices[i].onclick = () => {
      choices[0].style = "background-color: transparent"
      choices[1].style = "background-color: transparent"
      choices[2].style = "background-color: transparent"
      choices[3].style = "background-color: transparent"
      choices[i].style = "background-color: #7b7";
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
    loadNewStudent(studentNum);
    studentNum--;
  }
  studentNum++;
  loadNewStudent(studentNum);
};

loading = "false";

function loadNewStudent(id) {
  fetch(url + "/api/" + id)
    .then((response) => {
      if (!response.ok) {
        window.location =
          "https://docs.google.com/forms/d/e/1FAIpQLSfKbyc9mDi9VnIuHq6cocY-C7ofvw6GSCDqiGgakm7kV-pUhw/viewform?usp=sf_link";

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
  indicator.style.backgroundColor = "green";
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
