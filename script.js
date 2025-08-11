console.log("GlobalTune Loaded");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

// 🎵 Customize your 6 songs here
let songs = [
    { songName: "Garmi", filePath: "songs/1.mp3", coverPath: "covers/1.jpeg", duration: "02:55" },
    { songName: "On and On", filePath: "songs/2.mp3", coverPath: "covers/2.jpeg", duration: "03:28" },
    { songName: "Ku losa", filePath: "songs/3.mp3", coverPath: "covers/3.jpeg", duration: "02:46" },
    { songName: "Sapphire", filePath: "songs/4.mp3", coverPath: "covers/4.jpeg", duration: "03:18" },
    { songName: "Sye ra", filePath: "songs/5.mp3", coverPath: "covers/5.jpeg", duration: "04:10" },
    { songName: "Urike Urike", filePath: "songs/6.mp3", coverPath: "covers/6.jpeg", duration: "03:41" },
];

// Populate UI
songItems.forEach((el, i) => {
    el.getElementsByTagName("img")[0].src = songs[i].coverPath;
    el.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    el.getElementsByClassName("timestamp")[0].innerHTML =
        `${songs[i].duration} <i id="${i}" class="far songItemPlay fa-play-circle"></i>`;
});

// Play/Pause main button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Progress bar update
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Seek bar change
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Convert all icons to play
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach(el => {
        el.classList.replace('fa-pause-circle', 'fa-play-circle');
    });
};

// Play clicked song
Array.from(document.getElementsByClassName('songItemPlay')).forEach(el => {
    el.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.replace('fa-play-circle', 'fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
    });
});

// Next/Previous buttons
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
});
