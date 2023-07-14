var modalData = {
    safeEye: {
        title: 'Safe-Eye',
        date: '15/12/2022',
        tech: 'Python , Keras',
        team: 'Florentin DENIS, Khélian LARVET',
        detail: 'Application for evaluating the visual security of an image and generating confidential versions by applying various obfuscation processes based on this measurement.',
        linkGit: 'https://github.com/Flare00/Safe-Eye',
        linkPdf: 'res/Rapport_SafeEye.pdf',
        imgs: ['safeeye1.png', 'safeeye2.png']
    },
    marchingCloud: {
        title: 'Marching Cloud',
        date: '13/01/2023',
        tech: 'C++ , Qt , CUDA',
        team: 'Sylvain LECLERC, Khélian LARVET',
        detail: 'Interactive Qt application capable of rendering point clouds using the "Ray-Marching" method on GPU.',
        linkGit: 'https://github.com/KhelianL/MarchingCloud',
        linkPdf: 'res/Rapport_MarchingCloud.pdf',
        linkYtb: 'https://www.youtube.com/watch?v=7OSIGtARX7o',
        imgs: ['marchingcloud1.png', 'marchingcloud3.png', 'marchingcloud2.png']
    },
    clayMotion: {
        title: 'Clay Motion',
        date: '06/01/2023',
        tech: 'C# , Unity , LeapMotion',
        team: 'Sylvain LECLERC, Khélian LARVET',
        detail: 'The aim of this project is to create an interactive simulation that lets you manipulate 3D objects with your hands. We initially chose to focus on a pottery simulation where meshes can be generated, sculpted and deformed in real time.',
        linkGit: 'https://github.com/KhelianL/ClayMotion',
        linkPdf: 'res/Rapport_ClayMotion.pdf',
        linkYtb: 'https://www.youtube.com/watch?v=IuxE-PWp5ZE',
        imgs: ['claymotion1.png', 'claymotion3.png', 'claymotion2.png']
    },
    gameEngine: {
        title: 'Game Engine',
        date: '11/05/2022',
        tech: 'C++ , OpenGL',
        team: 'Florentin DENIS, Khélian LARVET',
        detail: 'Creation of a game engine from scratch with the GLEW, GLFW and GLM libraries. The objective of this project was therefore to implement a maximum of software components in order to create a basic game with ease.',
        linkGit: 'https://github.com/Flare00/Moteur-de-jeu',
        linkPdf: 'res/Rapport_GameEngine.pdf',
        linkYtb: 'https://www.youtube.com/watch?v=VLmROi0yyVE&feature=emb_logo&ab_channel=HayaoYoruasai',
        imgs: ['gameengine1.png', 'gameengine3.png', 'gameengine2.png']
    },
    meetingCar: {
        title: 'Meeting Car',
        date: '22/05/2022',
        tech: 'Java , Android',
        team: 'Florentin DENIS, Khélian LARVET',
        detail: 'Creation of an Android application allowing the provision of tools to sell or rent cars with ease. A user will be able to create advertisements for sale or rental, search for specific advertisements, contact a seller with a messaging to find an agreement.',
        linkGit: 'https://github.com/Flare00/MeetingCar',
        linkPdf: 'res/Rapport_MeetingCar.pdf',
        linkYtb: 'https://www.youtube.com/watch?v=x_SkfI725RY&feature=emb_logo',
        imgs: ['meetingcar2.png', 'meetingcar3.png']
    },
    colorHarmony: {
        title: 'Color Harmony',
        date: '26/04/2022',
        tech: 'C++ , GTK',
        team: 'Camille BERNADAS, Khélian LARVET',
        detail: 'Creation of an application giving the ability to a user to import an image in PPM format in order to harmonize it according to several criteria. The resulting image can be exported in PPM format if the user is satisfied.',
        linkGit: 'https://github.com/KhelianL/ColorHarmony',
        linkPdf: 'res/Rapport_ColorHarmony.pdf',
        linkYtb: 'https://www.youtube.com/watch?v=txhLDw4B2kU&ab_channel=CamilleBernadas',
        imgs: ['colorharmony1.png', 'colorharmony2.png', 'colorharmony3.png']
    },
    swing: {
        title: 'Swing',
        date: '02/06/2022',
        tech: 'C# , Unity',
        team: 'Florentin DENIS, Marius JENIN, Benjamin PRE, Khélian LARVET',
        detail: 'Renovation of an old arcade game named "Marble Master 1997" which has never had a serious update until now.',
        linkGit: 'https://m1.flareden.fr/TER/',
        linkPdf: 'res/Rapport_Swing.pdf',
        linkYtb: 'https://m1.flareden.fr/TER/Swing.mp4',
        imgs: ['swing1.png', 'swing3.png', 'swing2.png']
    },
    raytracing: {
        title: 'Raytracing',
        date: '31/12/2021',
        tech: 'C++ , OpenGL',
        team: 'Khélian LARVET',
        detail: 'Creation of an application to reproduce physical phenomena with the aim of creating a computer-generated image close to reality.',
        linkGit: 'https://github.com/KhelianL/Raytracing',
        imgs: ['raytracing1.png', 'raytracing3.png', 'raytracing2.png']
    },
    disastweet: {
        title: 'Disastweet',
        date: '01/06/2021',
        tech: 'Python , Javascript , MongoDB , Spacy , Leaflet',
        team: 'Florentin DENIS, Mathieu LADEUIL, Jean-Charles ALLA, Khélian LARVET',
        detail: 'Creation of an application to locate natural disasters using morphosyntactic heuristics with the Twitter API. All the reports form a heatmap to measure the veracity of the event.',
        linkGit: 'https://github.com/PupsDev/TERL3',
        linkPdf: 'res/Rapport_Disastweet.pdf',
        linkYtb: 'https://www.youtube.com/watch?v=0k0WSHTMLR4&ab_channel=HayaoYoruasai',
        imgs: ['disastweet1.png', 'disastweet2.png', 'disastweet3.png']
    }
};

// Vars
const PATH = 'img/';
var modalAnim = false;
var modal = document.getElementById("myModal");

function createLink(platform, link) {
    if (!link) {
        return;
    }
    var modalLink = document.getElementById('modalLink');
    // CREATE LINK
    var a = document.createElement('a');
    a.setAttribute('href', link);
    a.setAttribute('target', '_blank');
    // CREATE BUTTON
    var btn = document.createElement('button');
    btn.classList.add('modal-btn');
    btn.textContent = platform;
    a.appendChild(btn);
    modalLink.prepend(a);
}

function deleteAllLink() {
    var modalLink = document.getElementById('modalLink');
    while (modalLink.firstChild) {
        modalLink.removeChild(modalLink.lastChild);
    }
}

function createImgDiv(pathImg) {
    var modalImg = document.getElementById('modalImg');
    // CREATE IMG
    var img = document.createElement('img');
    img.src = PATH + pathImg;
    // CREATE DIV
    var div = document.createElement('div');
    div.classList.add('mySlides');
    div.classList.add('fade');
    div.appendChild(img);
    modalImg.prepend(div);
}

function deleteAllImgDiv() {
    const imgs = Array.from(document.getElementsByClassName('mySlides'));

    imgs.forEach(img => {
        img.remove();
    });
}

// Open modal 
function openModal(idModal) {

    // Anim
    if (modalAnim) {
        return;
    }

    // Fill Data
    var modalObj = modalData[idModal];
    document.getElementById('titleModal').innerHTML = modalObj.title;
    document.getElementById('dateModal').textContent = modalObj.date;
    document.getElementById('techModal').textContent = modalObj.tech;
    document.getElementById('descModal').textContent = modalObj.detail;
    var modalImg = document.getElementById('modalImg');

    // Remove old img then Fill new img
    var countImg = modalObj.imgs.length;
    deleteAllImgDiv();
    for (var i = 0; i < countImg; i++) {
        createImgDiv(modalObj.imgs[i]);
    }
    modalImg.style.display = countImg ? 'block' : 'none';
    if (countImg) { showSlides(0); }

    // Remove old link then Fill new links
    deleteAllLink();
    createLink('Youtube', modalObj.linkYtb);
    createLink('Report', modalObj.linkPdf);
    createLink('GitHub', modalObj.linkGit);

    modalAnim = true;
    modal.style.display = "block";

    setTimeout(() => {
        modalAnim = false;
    }, 400)
}

// Modal Anim
function hideModalAnim() {
    var modalContent = document.getElementsByClassName('modal-content')[0];

    if (modalAnim) {
        return;
    }
    modalAnim = true;
    modalContent.style.animationName = 'animatetopreverse';

    setTimeout(() => {
        modal.style.display = "none";
        modalContent.style.animationName = '';
        modalAnim = false;
    }, 400);
}

// Close modal with "X"
document.getElementById("closeModal").onclick = hideModalAnim;

// Close modal if click outside
window.onclick = function (event) {
    if (event.target == modal) {
        hideModalAnim();
    }
}
