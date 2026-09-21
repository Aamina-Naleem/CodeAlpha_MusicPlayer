const audioPlayer = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

const songTitle = document.getElementById("songTitle");
const artistName = document.getElementById("artistName");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const progressBar = document.getElementById("progressBar");
const volumeBar = document.getElementById("volumeBar");

const playlistItems = document.querySelectorAll(".playlist-item");
const albumImage = document.getElementById("albumImage");

const songs = [
    {
        title: "Treat You Better",
        artist: "Shawn Mendes",
        src: "music/Shawn Mendes - Treat You Better (Lyrics).mp3",
        image: "images/Song1.jpg"
    },
    {
        title: "Ore Piya",
        artist: "Rahat Fateh Ali Khan",
        src: "music/O Re Piya Full Song Aaja Nachle Madhuri Dixit Rahat Fateh Ali Khan Salim-Sulaiman, Jaideep.mp3",
        image: "images/Song2.jpg"
    },
    {
        title: "I Like Me Better",
        artist: "Lauv",
        src: "music/Lauv - I Like Me Better [Official Video].mp3",
        image: "images/Song3.jpg"
    },
    {
        title: "Scars to Your Beautiful",
        artist: "Alessia Cara",
        src: "music/Alessia Cara - Scars To Your Beautiful (Lyrics).mp3",
        image: "images/Song4.jpg"
    }
];

let currentSong = 0;

function loadSong(index) {
    currentSong = index;

    audioPlayer.src = songs[index].src;
    songTitle.textContent = songs[index].title;
    artistName.textContent = songs[index].artist;
    albumImage.src = songs[index].image;

    playlistItems.forEach((item, i) => {
        item.classList.toggle("active", i === index);
    });

    audioPlayer.load();
}

playBtn.addEventListener("click", () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playBtn.innerHTML = '<i class="ri-pause-fill"></i>';
    } else {
        audioPlayer.pause();
        playBtn.innerHTML = '<i class="ri-play-fill"></i>';
    }
});

nextBtn.addEventListener("click", () => {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    audioPlayer.play();
    playBtn.innerHTML = '<i class="ri-pause-fill"></i>';
});

previousBtn.addEventListener("click", () => {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    audioPlayer.play();
    playBtn.innerHTML = '<i class="ri-pause-fill"></i>';
});

playlistItems.forEach((item) => {
    item.addEventListener("click", () => {
        const index = Number(item.dataset.index);

        loadSong(index);
        audioPlayer.play();

        playBtn.innerHTML = '<i class="ri-pause-fill"></i>';
    });
});

audioPlayer.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audioPlayer.duration);
    progressBar.max = audioPlayer.duration;
});

audioPlayer.addEventListener("timeupdate", () => {
    currentTime.textContent = formatTime(audioPlayer.currentTime);
    progressBar.value = audioPlayer.currentTime;
});

progressBar.addEventListener("input", () => {
    audioPlayer.currentTime = progressBar.value;
});

volumeBar.addEventListener("input", () => {
    audioPlayer.volume = volumeBar.value;
});

audioPlayer.addEventListener("ended", () => {
    currentSong = (currentSong + 1) % songs.length;

    loadSong(currentSong);
    audioPlayer.play();

    playBtn.innerHTML = '<i class="ri-pause-fill"></i>';
});

function formatTime(time) {
    if (isNaN(time)) {
        return "00:00";
    }

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
}

audioPlayer.volume = 0.7;

loadSong(currentSong);