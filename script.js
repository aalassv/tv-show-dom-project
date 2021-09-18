//You can edit ALL of the code here
// global variables
const rootElem = document.getElementById("root");
let inputValue = "";
const allEpisodes = getAllEpisodes();
let filterEpisodes;
let inputSearch = document.querySelector("#search");

function setup() {
  makePageForEpisodes(allEpisodes);

  inputSearch.addEventListener("keyup", readInput);
}

function readInput(event) {
  inputValue = event.target.value;
  console.log(inputValue);
  filterEpisodes = allEpisodes.filter(
    (episode) =>
      episode.name.toLowerCase().includes(inputValue) ||
      episode.summary.toLowerCase().includes(inputValue)
  );
  rootElem.innerHTML = "";
  makePageForEpisodes(filterEpisodes);

  let displaying = document.querySelector("#displayCounter");
  displaying.innerText = `Displaying ${filterEpisodes.length} / 73 Episodes`;
  displaying.style.color = "red";
}

function makePageForEpisodes(currentValue) {
  currentValue.forEach(individualEpisodes);
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
  episodeSeason.innerText = zeroPadding();

  function zeroPadding() {
    if (episode.number < 10) {
      return `S0${episode.season}E0${episode.number}`;
    } else {
      return `S0${episode.season}E${episode.number}`;
    }
  }

  let episodeImage = document.createElement("img");
  episodeDiv.appendChild(episodeImage);
  episodeImage.src = episode.image.medium;

  let episodeSummary = document.createElement("span");
  episodeDiv.appendChild(episodeSummary);
  episodeSummary.innerHTML = episode.summary;
}

window.onload = setup;
