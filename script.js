//You can edit ALL of the code here
// global variables
const rootElem = document.getElementById("root");
let inputValue = "";
const allEpisodes = getAllEpisodes();
let inputSearch = document.querySelector("#search");

function setup() {
  makePageForEpisodes(allEpisodes);

  console.log(inputSearch.value);
  inputSearch.addEventListener("keyup", readInput);
}

function readInput(event) {
  if (event.key === "Enter") {
    let filterEpisodes = allEpisodes.filter(
      (value) =>
        value.name.toLowerCase().includes(inputValue) ||
        value.summary.toLowerCase().includes(inputValue)
    );
    console.log(inputValue);
    //console.log(filterEpisodes);
    rootElem.innerHTML = "";
    makePageForEpisodes(filterEpisodes);
    inputValue = "";
    inputSearch.value = "";
  }
  //console.log(event)
  if (event.key === "Backspace") {
    inputValue = inputValue.substring(0, inputValue.length - 1);
  } else if (event.which >= 48 && event.which <= 90) {
    inputValue += event.key.toLowerCase();
  }
  console.log(inputValue);
}

function makePageForEpisodes(curr) {
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  curr.forEach(individualEpisodes);
}

function individualEpisodes(episode) {
  //console.log(episode.name, episode.image.medium);
  let episodeDiv = document.createElement("div");
  rootElem.appendChild(episodeDiv);

  let episodeName = document.createElement("h2");
  episodeDiv.appendChild(episodeName);
  episodeName.innerText = episode.name;

  let episodeSeason = document.createElement("p");
  episodeDiv.appendChild(episodeSeason);
  episodeSeason.innerText = `S0${episode.season}E0${episode.number}`;

  let episodeImage = document.createElement("img");
  episodeDiv.appendChild(episodeImage);
  episodeImage.src = episode.image.medium;

  let episodeSummary = document.createElement("span");
  episodeDiv.appendChild(episodeSummary);
  episodeSummary.innerHTML = episode.summary;
}

window.onload = setup;
