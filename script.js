const displayButton = (window.innerWidth / 2) - 50;

const video_title = document.querySelector("#video_title");
const startButton = document.querySelector('#startButton');

var currentVideo = null;

document.addEventListener("DOMContentLoaded", () => {
    if (startButton) {
        startButton.style.left = displayButton + 'px';
    }

    // Fonction pour afficher le bouton et démarrer la vidéo
    function showButtonAndPlay(videoElement) {
        startButton.style.display = 'block';
        currentVideo = videoElement;
        setTimeout(() => {
            startButton.style.opacity = '1';
        }, 10);
    }

    // Cacher le bouton après avoir démarré la vidéo avec le son
    if (startButton) {
        startButton.addEventListener('click', function () {
            if (currentVideo) {
                currentVideo.play().catch(function () {
                    console.log('Impossible de lire la vidéo avec son');
                });
                setTimeout(() => {
                    startButton.style.opacity = '0'; // Cacher le bouton après le clic
                }, 0);
                startButton.style.display = 'none'; // Cacher le bouton après le clic
            }
        });
    }

    // Fonction générique pour la gestion des événements de cibles
    function setupTargetEvents(targetElement, videoElement) {
        if (!targetElement || !videoElement) {
            console.error('Élément manquant pour le target:', targetElement, 'ou vidéo:', videoElement);
            return;
        }

        targetElement.addEventListener('targetFound', function () {
            console.log('Image détectée pour ' + videoElement.id);
            showButtonAndPlay(videoElement);
        });
        targetElement.addEventListener('targetLost', function () {
            console.log('Image perdue pour ' + videoElement.id);
            if (!videoElement.paused) {
                videoElement.pause();  // Arrêter la vidéo si l'image n'est plus détectée
                videoElement.currentTime = 0;  // Remettre la vidéo au début
            }
            startButton.style.display = 'none'; // Cacher le bouton
        });
    }

    // Initialisation des vidéos et cibles
    var videos = {
        'targetDance': document.getElementById('danceVideo'),
        'targetOneMoreTime': document.getElementById('oneMoreTimeVideo'),
        'targetHereComesTheSun': document.getElementById('hereComesTheSunVideo'),
        'targetSoundOfSilence': document.getElementById('soundOfSilenceVideo'),
        'targetGetLucky': document.getElementById('getLuckyVideo'),
        'targetPoinconneurLilas': document.getElementById('poinconneurLilasVideo'),
        'targetWatchTower': document.getElementById('watchTowerVideo'),
        'targetDelta': document.getElementById('deltaVideo'),
        'targetSharkInTheAir': document.getElementById('sharkInTheAirVideo'),
        'targetLeTempsEstBon': document.getElementById('leTempsEstBonVideo'),
        'target00': document.getElementById('00Video'),
        'targetSundayBloodySunday': document.getElementById('SundayBloodySundayVideo')
    };

    // Associer chaque cible à sa vidéo correspondante
    Object.keys(videos).forEach(function (targetId) {
        var targetElement = document.getElementById(targetId);
        var videoElement = videos[targetId];
        setupTargetEvents(targetElement, videoElement);
    });

    // Animation de titre
    setTimeout(() => {
        if (video_title) {
            video_title.style.opacity = 0;
        }
    }, 1500);
});
