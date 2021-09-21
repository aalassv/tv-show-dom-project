//You can edit ALL of the code here
// global variables
const rootElem = document.getElementById("root");
let inputValue = "";
const allEpisodes = getAllEpisodes();
let filterEpisodes;
let inputSearch = document.querySelector("#search");
let inputSelectDropDown = document.querySelector("#select__search");
// main function to show web content.
function setup() {
  makePageForEpisodes(allEpisodes);

  inputSearch.addEventListener("keyup", readInput);
  selectAnOption(allEpisodes);
  inputSelectDropDown.addEventListener("change", selectAnOption);
}

function atSelectionSearch(episode) {}

// function to filter input search and display the amount of episodes founded.
function readInput(event) {
  inputValue = event.target.value;
  filterEpisodes = allEpisodes.filter(
    (episode) =>
      episode.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      episode.summary.toLowerCase().includes(inputValue.toLowerCase())
  );
  //cleaning the rootElem to update every time
  rootElem.innerHTML = "";
  makePageForEpisodes(filterEpisodes);
  //rendering the amount of episodes founded.
  let displaying = document.querySelector("#displayCounter");
  displaying.innerText = `Displaying ${filterEpisodes.length} / 73 Episodes`;
  displaying.style.color = "red";
}

//load all episodes on the select element and let pick one and show it.
function selectAnOption(event) {
  //p.innerText = `You have selected: ${p.style.color}`; //+ value;
  let option = document.createElement("option");
  inputSelectDropDown.appendChild(option);
  option.innerText = "Select episode";
  //console.log(event);
  event.forEach((episode) => {
    let option1 = document.createElement("option");
    inputSelectDropDown.appendChild(option1);
    option1.innerText = `${zeroPadding(episode)} - ${episode.name}`;
    //console.log(episode.name);
  });
  //option.innerText = `S0${event.season}E0${event.number} - ${event.name}`;
}

// function to take the specific array and pass it true a for each to create every card.
function makePageForEpisodes(currentValue) {
  currentValue.forEach(individualEpisodes);
}
// function to create every element inside the rootElem.
function individualEpisodes(episode) {
  let episodeDiv = document.createElement("div");
  rootElem.appendChild(episodeDiv);

  let episodeName = document.createElement("h2");
  episodeDiv.appendChild(episodeName);
  episodeName.innerText = episode.name;

  let episodeSeason = document.createElement("p");
  episodeDiv.appendChild(episodeSeason);
  episodeSeason.innerText = zeroPadding(episode);

  let episodeImage = document.createElement("img");
  episodeDiv.appendChild(episodeImage);
  episodeImage.src = episode.image.medium;

  let episodeSummary = document.createElement("span");
  episodeDiv.appendChild(episodeSummary);
  episodeSummary.innerHTML = episode.summary;
}
//pull out the 0 if it is needed.
function zeroPadding(episode) {
  if (episode.number < 10) {
    return `S0${episode.season}E0${episode.number}`;
  } else {
    return `S0${episode.season}E${episode.number}`;
  }
}

window.onload = setup;
