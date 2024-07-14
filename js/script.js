"use strict";

const $ = document;
const cover = $.querySelector('.cover');
const songsList = $.getElementById('song-list');
const playingBanner = $.querySelector('.cover .now-playing-banner');
const background = $.getElementById('background');
const nowPlayingImg = $.querySelector('.now-playing-img');
const nowPlayingTitle = $.querySelector('.now-playing-title');
const bigPlayBtn = $.querySelector('.big-play-button');
const smallPlayBtn = $.getElementById('small-play-button');
const prevBtn = $.getElementById("prev");
const nextBtn = $.getElementById("next");
const audio = $.getElementById('audio');
const currentTimeEl = $.getElementById("current-time");
const durationEl = $.getElementById("duration");
const progress = $.getElementById("progress");
const progressContainer = $.getElementById("progress-container");
const nowPlaying = document.querySelector(".now-playing-wrapper");

function loadAlbum() {
  const albumSelect = $.getElementById('album-select');
  const selectedAlbum = albumSelect.value;

  // Filtrer les chansons basées sur l'album sélectionné
  const filteredSongs = songs.filter(song => song.album === selectedAlbum);

  // Charger les chansons filtrées
  loadSongs(filteredSongs);
}

function loadSongs(songList) {
  // Mettre à jour la variable songs
  songs = songList;

  // Mettre  à jour le lecteur 
  songIndex = 0;
  loadSong(songIndex);
}




// Musiques liste
const songs = [
  {path: "audio/Streets of Paradise/01.mp3", displayName: "Benvenuti In Paradiso", artist: "Iceferno", cover: "images/streets.jpg", duration:'1:44', album:"Streets of paradise"},
  {path: "audio/Streets of Paradise/02.mp3", displayName: "Linate Aeroporto M4", artist: "Iceferno", cover: "images/streets.jpg", duration:'1:23', album:"Streets of paradise"},
  {path: "audio/Streets of Paradise/03.mp3", displayName: "Passaggio Verso La Città", artist: "Iceferno", cover: "images/streets.jpg", duration:'4:43', album:"Streets of paradise"},
  {path: "audio/Streets of Paradise/04.mp3", displayName: "Cammina Con Me (Gli Alberi Di Susa)", artist:"Iceferno" , cover:"images/streets.jpg" , duration:'5:58', album:"Streets of paradise"},
  {path:"audio/Streets of Paradise/05.mp3" , displayName:"Percorsi Poco Chiari" , artist:"Iceferno" , cover:"images/streets.jpg" , duration:'6:06', album:"Streets of paradise"},
  {path:"audio/Streets of Paradise/06.mp3" , displayName:"Tunnel Verde" , artist:"Iceferno" , cover:"images/streets.jpg" , duration:'6:03', album:"Streets of paradise"},
  {path:"audio/Streets of Paradise/07.mp3" , displayName:"Navigli" , artist:"Iceferno" , cover:"images/streets.jpg" , duration:'4:00', album:"Streets of paradise"},
  {path:"audio/Streets of Paradise/08.mp3" , displayName:"Sondrio M3 / Signora Tramonto" , artist :"Iceferno ",cover :"images/streets.jpg", duration :'10:54', album:"Streets of paradise"},
  {path: "audio/Streets of Paradise/09.mp3", displayName: "Viola", artist: "Iceferno", cover: "images/streets.jpg", duration: '8:28', album:"Streets of paradise"},
  {path: "audio/Streets of Paradise/10.mp3", displayName: "Sole Basso", artist: "Iceferno", cover: "images/streets.jpg", duration: '7:45', album:"Streets of paradise"},
  {path: "audio/Streets of Paradise/11.mp3", displayName: "Una Serata In Stazione Centrale", artist: "Iceferno", cover: "images/streets.jpg", duration: '10:10', album:"Streets of paradise"},
  {path: "audio/Streets of Paradise/12.mp3", displayName: "Di Notte", artist: "Iceferno", cover: "images/streets.jpg", duration: '5:44', album:"Streets of paradise"},
  {path: "audio/Streets of Paradise/13.mp3", displayName: "Buona Notte", artist: "Iceferno", cover: "images/streets.jpg", duration: '2:20', album:"Streets of paradise"},
];






// Index musique en lecture
let songIndex = 0;
// Check if Playing
let isPlaying = false;


// Lecture
const playSong = () => {
  isPlaying = true;
  bigPlayBtn.firstElementChild.classList.replace("fa-play", "fa-pause");
  smallPlayBtn.classList.replace("fa-play", "fa-pause");
  audio.play();
}


// Pause
const pauseSong = () => {
  isPlaying = false;
  bigPlayBtn.firstElementChild.classList.replace("fa-pause", "fa-play");
  smallPlayBtn.classList.replace("fa-pause", "fa-play");
  audio.pause();
}


// Musique précédente
const prevSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}


// Titre suivant
const nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}


// Mettre a jour le système DOM (Directory of Master)
const loadSong = song => {
  cover.style.backgroundImage = `url("${song.cover}")`;
  playingBanner.innerHTML = '';
  playingBanner.insertAdjacentHTML('beforeend', `<p1><b>${song.displayName}</b>- ${song.artist}</p1>`);
  background.src = song.cover;
  nowPlayingImg.style.backgroundImage = `url("${song.cover}")`;
  nowPlayingTitle.innerHTML = '';
  nowPlayingTitle.insertAdjacentHTML('beforeend', `<h>${song.displayName}</h><p>${song.artist}</p>`);
  audio.src = song.path;
};


// Selectionner les informations du titre actuel 
const setSong = songName => {
  let selected_song_index = songs.findIndex(function(item){
    return item.displayName == songName
  });
  songIndex = selected_song_index;
  loadSong(songs[songIndex]);
  playSong();
  hideShow();
} 


// Mettre a jour la barre de progression 
const updateProgressBar = e => {
  if (isPlaying) {
    const duration = e.srcElement.duration;
    const currentTime = e.srcElement.currentTime;
    // barre longueur selon temps 
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = progressPercent + "%";
    // Calculer la longeur selon la durée du morceau 
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    // Elements de switch pour une duration Non défini (erreur)
    if (durationSeconds) {
      durationEl.textContent = durationMinutes + ":" + durationSeconds;
    }
    // Calculer selon variable currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    currentTimeEl.textContent = currentMinutes + ":" + currentSeconds;
  }
}


// Set Progress Bar : variable d'initialisation 
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}


const hideShow = () => {
  if (cover.style.display === "none" && songsList.style.display === "none") {
    cover.style.display = "";
    songsList.style.display = "";
    nowPlaying.style.display = "none";
  }else {
    cover.style.display = "none";
    songsList.style.display = "none";
    nowPlaying.style.display = "";
  }
}
  

songs.forEach(function(song){
  songsList.insertAdjacentHTML('beforeend', `<div class="song-row" onclick="setSong('${song.displayName}')"><h1>${song.displayName}</h1> <span>${song.duration}</span></div>`)
});


$.addEventListener('onload', loadSong(songs[songIndex]));
$.addEventListener('keypress', event => {
  if (event.keyCode == 32){
    if (isPlaying){
      pauseSong()
    }
    else{
      playSong()
    }
  }
});
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("ended", nextSong);
audio.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
// Play ou mettre en Pause, ajout d'un Event Listener
bigPlayBtn.addEventListener('click', () => {
  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
    hideShow()
  }
});
// Event listener : si le morceau est en cours de lecture 
smallPlayBtn.addEventListener('click', () => {
  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
});
  