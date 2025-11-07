// === Lucide Icons Initialization ===
lucide.createIcons(); // Activates icons

// === App Config ===
const APP_ID = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// === Audio Player Elements ===
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const cover = document.getElementById('cover');
const title = document.getElementById('song-title');
const artist = document.getElementById('artist-name');

// === Mock Playlist ===
const mockPlaylist = [
  {
    id: 1,
    title: "Crazy Story",
    artist: "King Von",
    album: "Crazy Story",
    filename: "crazystory",
    cover: "assets/images/crazystory.png"
  }
];

let currentTrackIndex = 0;

// === Load Track ===
function loadTrack(track) {
  audioPlayer.src = `assets/songs/${track.filename}.mp3`;
  cover.src = track.cover;
  title.textContent = track.title;
  artist.textContent = track.artist;
}

// === Play / Pause Controls ===
playBtn.addEventListener('click', () => {
  audioPlayer.play();
  playBtn.style.display = 'none';
  pauseBtn.style.display = 'inline';
});

pauseBtn.addEventListener('click', () => {
  audioPlayer.pause();
  pauseBtn.style.display = 'none';
  playBtn.style.display = 'inline';
});

// === Update Progress Bar ===
audioPlayer.addEventListener('timeupdate', () => {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.value = progress || 0;

  currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
  durationEl.textContent = formatTime(audioPlayer.duration);
});

// === Seek Functionality ===
progressBar.addEventListener('input', () => {
  const seekTime = (progressBar.value / 100) * audioPlayer.duration;
  audioPlayer.currentTime = seekTime;
});

// === Format Time Helper ===
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// === Init ===
window.addEventListener('DOMContentLoaded', () => {
  loadTrack(mockPlaylist[currentTrackIndex]);
});
