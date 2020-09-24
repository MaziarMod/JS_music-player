const image = document.querySelector('img');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const music = document.querySelector('audio');

const progressContainer = document.querySelector('#progress-container');
const progress = document.querySelector('#progress');
const currentTimeElement = document.querySelector('#current-time');
const durationElement = document.querySelector('#duration');

const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');


// Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Maziar'
    },
    {
        name: 'jacinto-2',
        displayName: '7 Nation Army',
        artist: 'Maziar Design'
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnigh, Disco Queen',
        artist: 'Maziar'
    },
    {
        name: 'metric-1',
        displayName: 'Front Row',
        artist: 'Maziar Developer'
    }
]

// Check if Playing
let isPlaying = false;

// Play
const playSong = () => {
    isPlaying = true;
    playBtn.classList.replace('fa-play-circle', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
const pauseSong = () => {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play-circle');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}
// Controls functionality
playBtn.addEventListener('click', () => isPlaying? pauseSong() : playSong());

//Current song index
let songIndex = 0;

// Update DOM
const loadSong = (button = 'none') => {
    if (button === 'prev' && songIndex > 0) {
        songIndex--;
    } else if (button === 'prev' && songIndex == 0) {
        songIndex = songs.length - 1;
    } else if (button === 'next' && songIndex < songs.length - 1) {
        songIndex++;
    } else if (button === 'next' && songIndex == songs.length - 1) {
        songIndex = 0;
    } 

    title.textContent = songs[songIndex].displayName;
    artist.textContent = songs[songIndex].artist;
    music.src = `music/${songs[songIndex].name}.mp3`;
    image.src = `img/${songs[songIndex].name}.jpg`;
    playSong();
}

// Onload the page
loadSong();

// Update Progress Bar & Time
function updateProgressBar(e) {
    const {duration, currentTime} = e.srcElement;
    if (isPlaying && duration) {

        //Update progress bar width
        const progressPercent =(currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Calculate display for duration
        const durationMins = Math.floor(duration / 60);
        const durationSecs = Math.floor(duration % 60);
        durationElement.textContent = `${durationMins}:${(durationSecs < 10) ? '0'+ durationSecs : durationSecs}`;


        // Calculate display for Current
        const currentMins = Math.floor(currentTime / 60);
        const currentSecs = Math.floor(currentTime % 60);
        currentTimeElement.textContent = `${currentMins}:${(currentSecs < 10) ? '0'+ currentSecs : currentSecs}`;

    }
}

// Set Progress Bar
function setProgressBar(e) {

    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;

}

// Event Listeners
prevBtn.addEventListener('click', () => loadSong('prev'));
nextBtn.addEventListener('click', () => loadSong('next'));
music.addEventListener('ended', () => loadSong('next'));
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);


