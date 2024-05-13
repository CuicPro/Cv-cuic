
var loaderSection = document.getElementById('Loader');
var progressBarInner = document.querySelector('.progress-bar-inner');
var button = document.querySelector('button');
var h2 = document.querySelector('#Loader h2');
var loadingText = document.getElementById('loadingText');

// Définir les étapes de chargement
var steps = [
    { name: 'Chargement des textures', progress: 20 },
    { name: 'Chargement des modèles 3D', progress: 30 },
    { name: 'Initialisation de la scène', progress: 40 },
    { name: 'Chargement des shaders', progress: 50 },
    { name: 'Chargement des données', progress: 60 },
    { name: 'Configuration des paramètres', progress: 70 },
    { name: 'Chargement des scripts', progress: 80 },
    { name: 'Mise en place des contrôles', progress: 90 },
    { name: 'Finalisation du chargement', progress: 100 }
];

// Fonction pour charger les ressources nécessaires pour chaque étape
function loadStep(step, callback) {
    // Simuler le chargement en attendant un court délai
    setTimeout(function() {
        callback(step.progress); // Appeler le callback avec le pourcentage de progression de cette étape
    }, Math.random() * 300 + 100); // Temps aléatoire entre 500ms et 1500ms
}

// Fonction pour mettre à jour la barre de progression
function updateProgressBar(progress) {
    progressBarInner.style.width = progress + '%';
    loadingText.textContent = progress + '%';
}

// Fonction pour charger toutes les étapes de chargement
function loadSteps() {
    // Initialiser l'indice de l'étape actuelle
    var currentStepIndex = 0;

    // Charger la première étape
    loadNextStep();

    // Fonction pour charger la prochaine étape
    function loadNextStep() {
        if (currentStepIndex < steps.length) {
            var step = steps[currentStepIndex];
            loadStep(step, function(stepProgress) {
                // Mettre à jour la barre de progression avec le progrès de cette étape
                updateProgressBar(stepProgress);

                // Passer à la prochaine étape
                currentStepIndex++;
                loadNextStep();
            });
        } else {
            // Toutes les étapes sont terminées
            // loaderSection.style.display = 'none'; // Masquer la section de chargement
            document.getElementById('container').style.display = 'block'; // Afficher le conteneur principal
            button.disabled = false; // Activer le bouton
            button.classList.add('fa-bounce');
            h2.innerHTML = "Chargement Terminer"
            button.addEventListener('click', function(){
                loaderSection.style.display = 'none';
            });
        }
    }
}

// Appeler la fonction pour charger toutes les étapes de chargement
loadSteps();
