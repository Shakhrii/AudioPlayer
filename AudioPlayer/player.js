const audio = document.querySelector("#audio");
const btn_play = document.querySelector('.btn-play');
const btn_prev = document.querySelector('.btn-prev');
const btn_next = document.querySelector('.btn-next');
const progressTime = document.querySelector('.current-time');
const progressDuration = document.querySelector('.duration');
const progressBar = document.querySelector("#progress-bar");

var isPlay = false;
var currentTime = 0;
var duration = 0;
var currentTrackId = 0;

const tracks = ["./assets/audio/nervi_nervi.mp3", 
    "./assets/audio/nervi_voroni.mp3",
    "./assets/audio/nervi_cofe_moi_drug.mp3"];

function playAudio(track) {
    audio.src = track;
    audio.currentTime = currentTime;
    audio.onloadeddata = function() {
        duration = audio.duration;
        showDuration(duration);
    }
    if (!isPlay) {
        audio.play();
        audio.addEventListener('timeupdate', (event) => {
            currentTime = Math.floor(audio.currentTime);
            showTime(currentTime);
            showProgress();
        }, false);

    } else {
        audio.pause();
    }

    isPlay = !isPlay;
}

const navigationClick = (currentTrackId) => {
    isPlay = !isPlay;
    audio.pause();
    currentTime = 0;
    playAudio(tracks[currentTrackId]);
}

const showTime = (currentTime) => {
    let progressTimeStr = formatTime(currentTime);
    progressTime.innerText = progressTimeStr;
}

const showDuration = (duration) => {
    let durationStr = '00 : 00';
    if (!isNaN(duration)) {
      durationStr = formatTime(duration);
    }
    progressDuration.innerText = durationStr;
}


const formatTime = (secs) => {
    let minutes = Math.floor(secs / 60);
    let seconds = Math.floor(secs - (minutes * 60));

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    return minutes + ' : ' + seconds;
} 

const showProgress = () => {
    progressBar.value = (currentTime / duration);
}

const clickProgress = (event) => {
    let percent = event.offsetX / progressBar.offsetWidth;
    currentTime = percent * duration;
    audio.currentTime = currentTime;
    progressBar.value = percent / 100;
}

btn_play.addEventListener('click', () => {
    playAudio(tracks[currentTrackId]);
});

btn_prev.addEventListener('click', () => {
    if (!(currentTrackId == 0)) {
        currentTrackId--;
    } else {
        currentTrackId = tracks.length - 1;
    }
    navigationClick(currentTrackId);
});

btn_next.addEventListener('click', () => {
    if (!(currentTrackId == tracks.length - 1)) {
        currentTrackId++;
    } else {
        currentTrackId = 0;
    }
    navigationClick(currentTrackId);
})

progressBar.addEventListener('click', clickProgress);

