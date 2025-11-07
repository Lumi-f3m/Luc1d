document.addEventListener("DOMContentLoaded", () => {
  // === Lucide Icons ===
  lucide.createIcons();

  // === Elements ===
  const audioPlayer = document.getElementById("audio-player");
  const playBtn = document.getElementById("play-btn");
  const pauseBtn = document.getElementById("pause-btn");
  const progressBar = document.getElementById("progress-bar");
  const currentTimeEl = document.getElementById("current-time");
  const durationEl = document.getElementById("duration");
  const cover = document.getElementById("cover");
  const title = document.getElementById("song-title");
  const artist = document.getElementById("artist-name");

  // === Playlist ===
  const playlist = [
    {
      id: 1,
      title: "Crazy Story",
      artist: "King Von",
      filename: "crazystory",
      cover: "assets/images/crazystory.png"
    },
    {
      id: 2,
      title: "Like Him",
      artist: "King Von",
      filename: "likehim",
      cover: "assets/images/likehim.png"
    }
  ];

  let currentTrackIndex = 0;
  let isLooping = true; // enable looping

  // === Load Track ===
  function loadTrack(index) {
    const track = playlist[index];
    if (!track) return;

    audioPlayer.src = `assets/songs/${track.filename}.mp3`;
    cover.src = track.cover;
    title.textContent = track.title;
    artist.textContent = track.artist;
  }

  // === Play / Pause ===
  function playTrack() {
    audioPlayer.play();
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline";
  }

  function pauseTrack() {
    audioPlayer.pause();
    pauseBtn.style.display = "none";
    playBtn.style.display = "inline";
  }

  playBtn.addEventListener("click", playTrack);
  pauseBtn.addEventListener("click", pauseTrack);

  // === Skip Forward / Backward ===
  function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
    playTrack();
  }

  function prevTrack() {
    currentTrackIndex =
      (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
    playTrack();
  }

  // === Progress + Time ===
  audioPlayer.addEventListener("timeupdate", () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress || 0;
    currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    durationEl.textContent = formatTime(audioPlayer.duration);
  });

  progressBar.addEventListener("input", () => {
    const seekTime = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = seekTime;
  });

  function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }

  // === Auto Play Next / Loop ===
  audioPlayer.addEventListener("ended", () => {
    if (isLooping) {
      nextTrack(); // automatically plays the next song
    } else {
      pauseTrack();
    }
  });

  // === Init ===
  loadTrack(currentTrackIndex);

  // === Optional: Keyboard Shortcuts ===
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      audioPlayer.paused ? playTrack() : pauseTrack();
    } else if (e.code === "ArrowRight") {
      nextTrack();
    } else if (e.code === "ArrowLeft") {
      prevTrack();
    }
  });
});

// === Skip Buttons ===
document.getElementById("next-btn").addEventListener("click", nextTrack);
document.getElementById("prev-btn").addEventListener("click", prevTrack);
