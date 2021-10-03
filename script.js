//You can edit ALL of the code here
// global variables
const rootElem = document.getElementById("root");
let inputSelectDropDown = document.querySelector("#select__search");

function setup() {
  //makePageForEpisodes(allEpisodes); // load all episodes
  fetch("https://api.tvmaze.com/shows/1632/episodes")
    .then((response) => response.json())
    .then((episodeList) => {
      makePageForEpisodes(episodeList);
      keyUpEventListener(episodeList);
      clickRefreshPage(episodeList);
      dropDownEventListener(episodeList);
      loadSelectElement(episodeList);
      //refreshEpisodes(episodeList);
    });
}

//select a different Show
function showSelector(show) {
  let select = document.getElementById("show__selector");
  let option = document.createElement("option");
  option.value = show.name;
  option.innerText = show.name;
  select.appendChild(option);
}

function showDropDownList(episodes) {
  episodes.forEach(showSelector);
  eventListenerShowDropDown(episodes);
}

let allShows = getAllShows();
showDropDownList(allShows);

function eventListenerShowDropDown(shows) {
  let selected = document.getElementById("show__selector");
  selected.addEventListener("change", function () {
    let optionElement = document.querySelectorAll("option");
    let names = [];
    optionElement.forEach((option) => names.push(option.value));
    let selectedName = names.filter((name) => selected.value === name);
    let getOneShow = shows.filter((show) => show.name == selectedName);
    let showId = getOneShow[0].id;
    async function catchId(id) {
      fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
        .then((response) => response.json())
        .then((episodeList) => {
          makePageForEpisodes(episodeList);
          keyUpEventListener(episodeList);
          clickRefreshPage(episodeList);
          dropDownEventListener(episodeList);
          loadSelectElement(episodeList);
        });
    }
    catchId(showId);
  });
}

//Dropdown list for episodes
function dropDownEventListener(episodes) {
  let selectId = document.getElementById("select__search");
  selectId.addEventListener("change", function () {
    let optionsElements = document.querySelectorAll("option");
    let names = [];
    optionsElements.forEach((option) => names.push(option.value));
    let selectedName = names.filter((name) => selectId.value === name);
    let oneEpisode = episodes.filter((episode) => episode.name == selectedName);
    let displaying = document.querySelector("#displayCounter");
    if (oneEpisode.length === 1) {
      makePageForEpisodes(oneEpisode);
      displaying.innerText = `Displaying ${oneEpisode.length} / ${optionsElements.length} Episodes`;
      displaying.style.color = "red";
    } else {
      makePageForEpisodes(episodes);
      displaying.innerText = `Displaying ${episodes.length} / ${episodes.length} Episodes`;
      displaying.style.color = "red";
    }
  });
}

//Refresh page
function clickRefreshPage(episodes) {
  let buttonRefresh = document.querySelector("#reset__episodes");
  buttonRefresh.addEventListener("click", refreshEpisodes);
  function refreshEpisodes() {
    rootElem.innerHTML = "";
    makePageForEpisodes(episodes);

    let displaying = document.querySelector("#displayCounter");
    displaying.innerText = `Displaying ${episodes.length} / ${episodes.length} Episodes`;
    displaying.style.color = "red";
  }
}

//Input-Search
function keyUpEventListener(episodes) {
  let inputSearch = document.querySelector("#search");
  inputSearch.addEventListener("keyup", readInput);
  function readInput(event) {
    let inputValue = event.target.value;
    let filterEpisodes = episodes.filter(
      (episode) =>
        episode.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        episode.summary.toLowerCase().includes(inputValue.toLowerCase())
    );
    rootElem.innerHTML = "";
    makePageForEpisodes(filterEpisodes);
    //console.log("Hello Bunny ears");
    let displaying = document.querySelector("#displayCounter");
    displaying.innerText = `Displaying ${filterEpisodes.length} / ${filterEpisodes.length} Episodes`;
    displaying.style.color = "red";
  }
}

function loadSelectElement(episodes) {
  let refresh = document.getElementById("select__search");
  refresh.replaceChildren([]);
  let createOption = document.createElement("option");
  createOption.value = "non-option";
  createOption.innerText = "All episodes";
  refresh.appendChild(createOption);
  //p.innerText = `You have selected: ${p.style.color}`; //+ value;
  // let option = document.createElement("option");
  // inputSelectDropDown.appendChild(option);
  // option.innerText = "Select episode";
  //console.log(event);
  episodes.forEach((episode) => {
    let option1 = document.createElement("option");
    inputSelectDropDown.appendChild(option1);
    option1.innerText = `${zeroPadding(episode)} - ${episode.name}`;
    option1.value = episode.name;
  });
}

// function to take the specific array and pass it true a for each to create every card.
function makePageForEpisodes(currentValue) {
  rootElem.replaceChildren([]);
  currentValue.forEach(individualEpisodes);
}
// function to create every element inside the rootElem.
function individualEpisodes(episode) {
  let episodeDiv = document.createElement("div");
  rootElem.appendChild(episodeDiv);
  episodeDiv.classList.add("card__class");

  let episodeName = document.createElement("h2");
  episodeDiv.appendChild(episodeName);
  episodeName.innerText = episode.name;

  let seasonNum = episode.season.toString();
  if (seasonNum.length === 1) {
    seasonNum = "0" + seasonNum;
  }

  let episodeNum = episode.number.toString();
  if (episodeNum.length === 1) {
    episodeNum = "0" + episodeNum;
  }
  //newOption.innerText =
  // "S" + seasonNum + "E" + episodeNum + " - " + episode.name;

  let episodeSeason = document.createElement("p");
  episodeDiv.appendChild(episodeSeason);
  episodeSeason.innerText =
    "S" + seasonNum + "E" + episodeNum + " - " + episode.name;

  let episodeImage = document.createElement("img");
  episodeDiv.appendChild(episodeImage);
  episodeImage.src = episode.image.medium;

  let episodeSummary = document.createElement("div");
  episodeDiv.appendChild(episodeSummary);
  episodeSummary.innerHTML = episode.summary;
  episodeSummary.classList.add("div__class");
}
//pull out the 0 if it is needed.
function zeroPadding(episode) {
  //episode = episodeListFetch;
  if (episode.number < 10) {
    return `S0${episode.season}E0${episode.number}`;
  } else {
    return `S0${episode.season}E${episode.number}`;
  }
}

window.onload = setup;
