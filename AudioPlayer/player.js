const audio = document.querySelector("#audio");
const btn_play = document.querySelector('.btn-play');
const btn_prev = document.querySelector('.btn-prev');
const btn_next = document.querySelector('.btn-next');
const progressTime = document.querySelector('.current-time');
const progressDuration = document.querySelector('.duration');
const progressBar = document.querySelector("#progress-bar");
const overlay = document.querySelector('.overlay');
const cover = document.querySelector('.cover');
const song = document.querySelector('.song');
const artist = document.querySelector('.artist');

var isPlay = true;
var currentTime = 0;
var duration = 0;
var currentTrackId = 0;

const tracks = [{artist: 'Нервы', song: 'Нервы', link: './assets/audio/nervi_nervi.mp3', picture: './assets/image/nervi.jpeg'},
    {artist: 'Слот', song: 'Бой', link: './assets/audio/slot_boi.mp3', picture: './assets/image/slot.jpeg'},
    {artist: 'Lumen', song: 'Электричество', link: './assets/audio/lumen_electrichestvo.mp3', picture: './assets/image/lumen.jpeg'}];

function playAudio(track) {
    audio.src = track.link;
    audio.currentTime = currentTime;
    audio.onloadeddata = function() {
        duration = audio.duration;
        showDuration(duration);
    }
    overlay.style.backgroundImage = 'url(' + track.picture + ')';
    cover.style.backgroundImage = 'url(' + track.picture + ')';
    song.innerText = track.song;
    artist.innerText = track.artist;
    if (!isPlay) {
        btn_play.classList.add('played');
        audio.play();
        audio.addEventListener('timeupdate', (event) => {
            currentTime = Math.floor(audio.currentTime);
            if (audio.currentTime == duration) {
                nextClick();
                
            } else {
            showTime(currentTime);
            showProgress();
            }
        }, false);

    } else {
        btn_play.classList.remove('played');
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

const nextClick = () => {
    if (!(currentTrackId == tracks.length - 1)) {
        currentTrackId++;
    } else {
        currentTrackId = 0;
    }
    navigationClick(currentTrackId);
}
btn_next.addEventListener('click', nextClick);

progressBar.addEventListener('click', clickProgress);
playAudio(tracks[0]);

