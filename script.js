//=========================
// OFFLINE MUSIC PLAYER
//=========================

const songs = [
    {
        name: "can't feel my face",
        artist: "The Weeknd",
        src: "(41) The Weeknd - Can't Feel My Face.mp3",
        cover: "img/default.jpg"
    },
    {
        name: "one of the girls",
        artist: "The Weeknd",
        src: "(41) The Weeknd, JENNIE & Lily Rose Depp - One Of The Girls.mp3",
        cover: "img/default.jpg"
    },
    {
        name: "blinding lights",    
        articst: "The Weeknd",
        src: "(41) The Weeknd - Blinding Lights.mp3",
        cover: "img/default.jpg"
    }
];

//=========================
// BIẾN
//=========================

let currentSong = 0;
let isRandom = false;
let isRepeat = false;

//=========================
// LẤY THÀNH PHẦN
//=========================

const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const randomBtn = document.getElementById("random");
const repeatBtn = document.getElementById("repeat");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const songName = document.getElementById("songName");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const current = document.getElementById("current");
const duration = document.getElementById("duration");

const playlist = document.getElementById("playlist");

//=========================
// LOAD BÀI HÁT
//=========================

function loadSong(index){

    audio.src = songs[index].src;

    songName.innerHTML = songs[index].name;

    artist.innerHTML = songs[index].artist;

    cover.src = songs[index].cover;

}

loadSong(currentSong);

//=========================
// HIỂN THỊ PLAYLIST
//=========================

function renderPlaylist(){

    playlist.innerHTML="";

    songs.forEach((song,index)=>{

        let li=document.createElement("li");

        li.innerHTML=song.name;

        li.onclick=function(){

            currentSong=index;

            loadSong(currentSong);

            audio.play();

            playBtn.innerHTML="⏸";

        };

        playlist.appendChild(li);

    });

}

renderPlaylist();
//=========================
// PLAY / PAUSE
//=========================

playBtn.onclick = function () {

    if (audio.paused) {

        audio.play();

        playBtn.innerHTML = "⏸";

    } else {

        audio.pause();

        playBtn.innerHTML = "▶";

    }

};

//=========================
// NEXT
//=========================

function nextSong() {

    if (isRandom && songs.length > 1) {

        let randomIndex;

        do {

            randomIndex = Math.floor(Math.random() * songs.length);

        } while (randomIndex === currentSong);

        currentSong = randomIndex;

    } else {

        currentSong++;

        if (currentSong >= songs.length) {

            currentSong = 0;

        }

    }

    loadSong(currentSong);

    audio.play();

    playBtn.innerHTML = "⏸";

}

nextBtn.onclick = nextSong;

//=========================
// PREVIOUS
//=========================

prevBtn.onclick = function () {

    currentSong--;

    if (currentSong < 0) {

        currentSong = songs.length - 1;

    }

    loadSong(currentSong);

    audio.play();

    playBtn.innerHTML = "⏸";

};

//=========================
// RANDOM
//=========================

randomBtn.onclick = function () {

    isRandom = !isRandom;

    if (isRandom) {

        randomBtn.style.background = "#00ff88";

    } else {

        randomBtn.style.background = "";

    }

};

//=========================
// REPEAT
//=========================

repeatBtn.onclick = function () {

    isRepeat = !isRepeat;

    audio.loop = isRepeat;

    if (isRepeat) {

        repeatBtn.style.background = "#00ff88";

    } else {

        repeatBtn.style.background = "";

    }

};
//=========================
// THANH TIẾN TRÌNH
//=========================

audio.addEventListener("timeupdate", function () {

    if (!audio.duration) return;

    progress.value = (audio.currentTime / audio.duration) * 100;

    current.innerHTML =
        Math.floor(audio.currentTime / 60) + ":" +
        String(Math.floor(audio.currentTime % 60)).padStart(2, "0");

});

//=========================
// HIỂN THỊ THỜI LƯỢNG
//=========================

audio.addEventListener("loadedmetadata", function () {

    duration.innerHTML =
        Math.floor(audio.duration / 60) + ":" +
        String(Math.floor(audio.duration % 60)).padStart(2, "0");

});

//=========================
// KÉO THANH TUA
//=========================

progress.addEventListener("input", function () {

    if (!audio.duration) return;

    audio.currentTime = (progress.value / 100) * audio.duration;

});

//=========================
// ÂM LƯỢNG
//=========================

volume.value = 100;

audio.volume = 1;

volume.addEventListener("input", function () {

    audio.volume = volume.value / 100;

});
//=========================
// TỰ CHUYỂN BÀI
//=========================

audio.addEventListener("ended", function () {

    if (!isRepeat) {

        nextSong();

    }

});

//=========================
// PHÍM SPACE
//=========================

document.addEventListener("keydown", function (e) {

    if (e.code === "Space") {

        e.preventDefault();

        playBtn.click();

    }

});
//=========================
// THÊM NHẠC
//=========================

const addMusic = document.getElementById("addMusic");
const filePicker = document.getElementById("filePicker");

addMusic.onclick = function () {

    filePicker.click();

}

filePicker.onchange = function () {

    const files = [...this.files];

    files.forEach(file=>{

        songs.push({

            name:file.name.replace(/\.(mp3|mp4)$/i, ""),

            artist:"Unknown",

            src:URL.createObjectURL(file),

            cover:"img/default.jpg"

        });

    });

    renderPlaylist();

}