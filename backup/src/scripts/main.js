document.addEventListener('DOMContentLoaded', function() {
  const soundButton = document.getElementById('toggle-sound');
  const heroVideo1 = document.getElementById('hero-video-1');
  
  if (soundButton) {
    soundButton.addEventListener('click', function() {
      heroVideo1.muted = !heroVideo1.muted;
      
      const icon = soundButton.querySelector('i');
      if (heroVideo1.muted) {
        icon.className = 'fas fa-volume-mute';
      } else {
        icon.className = 'fas fa-volume-up';
      }
    });
  }
}); 