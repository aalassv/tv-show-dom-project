//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

const rootElem = document.getElementById("root");

function makePageForEpisodes(episodeList) {
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  episodeList.forEach(createdFromList);
}


function createdFromList(episode) {
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

function searchElement () {
  let episodeInfo = getAllEpisodes();
  
}

  
window.onload = setup;
