document.addEventListener('DOMContentLoaded', function() {
  // Hero video sound button
  const soundButton = document.getElementById('toggle-sound');
  const heroVideo1 = document.getElementById('hero-video-1');
  
  if (soundButton && heroVideo1) {
    soundButton.addEventListener('click', async function() {
      try {
        if (heroVideo1.muted) {
          // Démuter et essayer de jouer avec son
          heroVideo1.muted = false;
          
          // Redémarrer la vidéo pour s'assurer qu'elle joue avec le son
          await heroVideo1.play();
          
          const icon = soundButton.querySelector('i');
          icon.className = 'fas fa-volume-up';
        } else {
          // Muter la vidéo
          heroVideo1.muted = true;
          
          const icon = soundButton.querySelector('i');
          icon.className = 'fas fa-volume-mute';
        }
      } catch (error) {
        console.log('Autoplay with sound blocked by browser:', error);
        // Si l'autoplay avec son est bloqué, on garde la vidéo mutée
        heroVideo1.muted = true;
        const icon = soundButton.querySelector('i');
        icon.className = 'fas fa-volume-mute';
      }
    });
  }

  // Grid videos sound buttons
  const gridSoundButtons = document.querySelectorAll('.grid-sound-button');
  
  gridSoundButtons.forEach(button => {
    button.addEventListener('click', async function() {
      const videoId = this.getAttribute('data-video');
      const video = document.getElementById(videoId);
      
      if (video) {
        try {
          if (video.muted) {
            // Démuter et essayer de jouer avec son
            video.muted = false;
            
            // Redémarrer la vidéo pour s'assurer qu'elle joue avec le son
            await video.play();
            
            const icon = this.querySelector('i');
            icon.className = 'fas fa-volume-up';
          } else {
            // Muter la vidéo
            video.muted = true;
            
            const icon = this.querySelector('i');
            icon.className = 'fas fa-volume-mute';
          }
        } catch (error) {
          console.log('Autoplay with sound blocked by browser:', error);
          // Si l'autoplay avec son est bloqué, on garde la vidéo mutée
          video.muted = true;
          const icon = this.querySelector('i');
          icon.className = 'fas fa-volume-mute';
        }
      }
    });
  });

  // Gestion de l'interaction utilisateur pour permettre l'autoplay
  let userHasInteracted = false;
  
  function enableAutoplay() {
    if (!userHasInteracted) {
      userHasInteracted = true;
      // Essayer de jouer toutes les vidéos après la première interaction
      const allVideos = document.querySelectorAll('video');
      allVideos.forEach(video => {
        if (video.paused) {
          video.play().catch(e => console.log('Video play failed:', e));
        }
      });
    }
  }
  
  // Écouter les premières interactions utilisateur
  document.addEventListener('click', enableAutoplay, { once: true });
  document.addEventListener('touchstart', enableAutoplay, { once: true });
  document.addEventListener('keydown', enableAutoplay, { once: true });
  
  // Optimisations pour mobile
  function isMobile() {
    return window.innerWidth <= 750 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  
  // Améliorer les interactions touch sur mobile
  if (isMobile()) {
    // Désactiver les pop-ups/zoom sur les images et vidéos
    const allMedia = document.querySelectorAll('img, video');
    allMedia.forEach(media => {
      // Empêcher l'ouverture en pop-up
      media.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
      });
      
      // Empêcher le zoom/sélection sur touch
      media.addEventListener('touchstart', function(e) {
        e.preventDefault();
      });
      
      // Désactiver la sélection
      media.style.userSelect = 'none';
      media.style.webkitUserSelect = 'none';
      media.style.mozUserSelect = 'none';
      media.style.msUserSelect = 'none';
      
      // Désactiver le menu contextuel
      media.addEventListener('contextmenu', function(e) {
        e.preventDefault();
      });
    });
    
    // Améliorer la réactivité des boutons sound sur mobile
    const allSoundButtons = document.querySelectorAll('.sound-button, .grid-sound-button');
    allSoundButtons.forEach(button => {
      button.style.opacity = '0.8'; // Plus visible sur mobile
      
      // Ajouter un feedback visuel au touch
      button.addEventListener('touchstart', function(e) {
        e.stopPropagation(); // Empêcher la propagation
        this.style.transform = 'scale(0.95)';
      });
      
      button.addEventListener('touchend', function(e) {
        e.stopPropagation(); // Empêcher la propagation
        this.style.transform = 'scale(1)';
      });
    });
    
    // Optimiser les vidéos pour mobile
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(video => {
      // Réduire la qualité sur mobile pour améliorer les performances
      video.setAttribute('preload', 'metadata');
      
      // Pause automatique quand la vidéo n'est pas visible (économie batterie)
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (video.paused && userHasInteracted) {
              video.play().catch(e => console.log('Video play failed:', e));
            }
          } else {
            // Ne pas pauser la vidéo hero
            if (!video.closest('.hero')) {
              video.pause();
            }
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(video);
    });
  }
}); 