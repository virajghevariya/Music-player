const currentTimeEl = document.getElementById('current-time');
const durationTimeEl =document.getElementById('duration');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
let songs = [
    {
        name : "p1",
        displayName : "vd-1",
        artist : "VD",
    },
    {
        name : "p2",
        displayName : "vd-2",
        artist : "VD/J",
    },
    {
        name : "p3",
        displayName : "vd-3",
        artist : "VD/H",
    },
    {
        name : "p4",
        displayName : "metric-1",
        artist : "VD/A",
    },
];

let isPlay = false;
// Play Music
function playMusic() {
    isPlay = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    music.play();
}

// Pause Music
function pauseMusic() {
    isPlay = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    music.pause();
}

playBtn.addEventListener('click', () => (isPlay ? pauseMusic() : playMusic()));

// Display song in DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.displayName}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Index for Song Change
let songIndex = 0;

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length-1;
    }
    loadSong(songs[songIndex]);
    playMusic();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length-1) {
        songIndex = 0;
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playMusic();
}

// Progress Bar Update
function progressBarUpdate(e) {
    if(isPlay) {
        const { currentTime, duration} = e.srcElement;
        const progressBar = (currentTime / duration) * 100;
        progress.style.width = `${progressBar}%`;

        // Duration Time Update
        const durationMinute = Math.floor(duration / 60);
        let durationSecond = Math.floor(duration % 60);
        
        if(durationSecond < 10) {
            durationSecond = `0${durationSecond}`;
        }
        // Delay Switching Duration Element to avoid NaN
        if(durationSecond) {
            durationTimeEl.textContent = `${durationMinute} : ${durationSecond}`;
        }

        // Current Time Update
        const currentMinute = Math.floor(currentTime / 60);
        let currentSecond = Math.floor(currentTime % 60);
        
        if(currentSecond < 10) {
            currentSecond = `0${currentSecond}`;
        }

        currentTimeEl.textContent = `${currentMinute} : ${currentSecond}`;
    }   
}

function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}
// On Load Songs
loadSong(songs[songIndex]);

// Event listener for Previous and Next song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', progressBarUpdate);
progressContainer.addEventListener('click', setProgressBar);