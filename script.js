
// 要素取得
const video = document.getElementById('myVideo');
const ctaButtons = document.querySelectorAll('.cta-buttons-overlay-bottom button');
const fullscreenButton = document.getElementById('btn-fullscreen');
const fullscreenTarget = document.querySelector('.video-wrapper');

/* =====================================
   CTAボタンの表示タイミング
===================================== */
const ctaTimings = {
  'btn-start':    { start: 10,  end: 20 },
  'btn-contents': { start: 10,  end: 20 },
  'btn-end':      { start: 10,  end: 20 }
};

function updateButtonState() {
  const currentTime = video.currentTime;

  ctaButtons.forEach(button => {
    const timing = ctaTimings[button.id];
    if (!timing) return;

    button.disabled = !(currentTime >= timing.start && currentTime < timing.end);
  });
}

function handleCtaClick(e) {
  const button = e.currentTarget;
  if (button.disabled) return;

  const url = button.dataset.url;
  if (url) {
    window.open(url, '_blank');
  }
}

/* =====================================
   全画面制御
===================================== */
function toggleFullscreen() {
  const isFullscreen =
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement;

  if (isFullscreen) {
    document.exitFullscreen?.();
    document.webkitExitFullscreen?.();
    document.mozCancelFullScreen?.();
  } else {
    fullscreenTarget.requestFullscreen?.();
    fullscreenTarget.webkitRequestFullscreen?.();
    fullscreenTarget.mozRequestFullScreen?.();
  }
}

function handleFullscreenChange() {
  const isFullscreen =
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement;

  fullscreenButton.textContent = isFullscreen ? '全画面解除' : '全画面1';
}

/* =====================================
   イベント
===================================== */
video.addEventListener('timeupdate', updateButtonState);
video.addEventListener('loadedmetadata', updateButtonState);

ctaButtons.forEach(btn => {
  btn.addEventListener('click', handleCtaClick);
});

fullscreenButton.addEventListener('click', toggleFullscreen);
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
