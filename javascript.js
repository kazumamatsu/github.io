function update(){
    var now = new Date();
    document.getElementById("year").textContent = now.getFullYear();
    document.getElementById("month").textContent = (now.getMonth()+1);
    document.getElementById("date").textContent = now.getDate();
}

const outputElement = document.getElementById('output_csv');

function getCsvData(dataPath) {
 const request = new XMLHttpRequest();
 request.addEventListener('load', (event) => {
  const response = event.target.responseText;
  outputElement.innerHTML = response;
 });
 request.open('GET', dataPath, true);
 request.send();
}

getCsvData('./data/newsdata.csv');
