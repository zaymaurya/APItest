let apiData = await getApiData();

let questionsList = apiData.problemsetQuestionList.questions;

populateTable(questionsList);

console.log(sortQuestionsByAcceptanceRate(questionsList));

let acceptanceHeaderElement = document.querySelector(
  "#questions-table > thead > tr > th:nth-child(2)"
);

acceptanceHeaderElement.addEventListener("click", function () {
  let sortedArray = sortQuestionsByAcceptanceRate(questionsList);
  populateTable(sortedArray);
});

async function getApiData() {
  let res = await fetch(
    "https://run.mocky.io/v3/511fa794-6bfb-4c9f-9adb-9e18d62d7003"
  );

  let data = await res.json();

  return data;
}

function populateTable(questionsList) {
  let tBodyElement = document.getElementById("table-body");
  tBodyElement.innerHTML = "";

  questionsList.forEach((question) => {
    let { title, acRate, difficulty } = question;

    acRate = acRate.toFixed(1);

    let tRowElement = getTableRow(title, acRate, difficulty);

    tBodyElement.append(tRowElement);
  });
}

function getTableRow(title, acRate, difficulty) {
  let tRow = document.createElement("tr");

  tRow.innerHTML = `
        <td>${title}</td>
        <td>${acRate}</td>
        <td>${difficulty}</td>
    `;

  return tRow;
}

function sortQuestionsByAcceptanceRate(questionsList) {
  let sortedArray = questionsList.sort((q1, q2) => q2.acRate - q1.acRate);
  return sortedArray;
}
