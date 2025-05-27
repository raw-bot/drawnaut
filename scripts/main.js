document.addEventListener('DOMContentLoaded', function() {
  // Hero video sound button
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

  // Grid videos sound buttons
  const gridSoundButtons = document.querySelectorAll('.grid-sound-button');
  
  gridSoundButtons.forEach(button => {
    button.addEventListener('click', function() {
      const videoId = this.getAttribute('data-video');
      const video = document.getElementById(videoId);
      
      if (video) {
        video.muted = !video.muted;
        
        const icon = this.querySelector('i');
        if (video.muted) {
          icon.className = 'fas fa-volume-mute';
        } else {
          icon.className = 'fas fa-volume-up';
        }
      }
    });
  });
}); 