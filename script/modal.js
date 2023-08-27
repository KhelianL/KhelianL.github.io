const Team = {
    FLORENTIN_DENIS: { name: 'Florentin', url: 'https://www.flareden.fr/' },
    MATHIEU_LADEUIL: { name: 'Mathieu', url: 'https://pupsdev.github.io/' },
    SYLVAIN_LECLERC: { name: 'Sylvain', url: 'https://achline.fr' },
    CAMILLE_BERNADAS: { name: 'Camille', url: 'https://camillebernadas.com/' },
    MARIUS_JENIN: { name: 'Marius', url: 'https://mariusjenin.github.io/' },
    JEANCHARLES_ALLA: { name: 'JeanCharles', url: '' },
    BENJAMIN_PRE: { name: 'Benjamin', url: '' },
    ELODIE_LABORDE: { name: 'Elodie', url: '' }
};

const PlatformIcons = {
    YOUTUBE: 'icon_youtube',
    GITHUB: 'icon_github',
    REPORT: 'icon_filepdf'
};

const Paths = {
    COVERS: 'data/img-covers/',
    IMGS: 'data/img-projects/',
    REPORTS: 'data/reports/'
};

var modalData = {
    safeEye: {
        title: 'Safe-Eye',
        date: '15/12/2022',
        tech: 'Python , Keras',
        team: [Team.FLORENTIN_DENIS],
        detail: 'This application aims to evaluate and determine whether the content of a given image is visually confidential using various obscuration techniques and CNNs. We use the "HaarPSI" metric, based on the analysis of the amplitudes of Haar wavelet coefficients, as a measure of similarity between the original image and its secure version. We found that most images approaching 0.25 HaarPSI were secure.',
        linkGit: 'https://github.com/Flare00/Safe-Eye',
        linkPdf: 'Rapport_SafeEye.pdf',
        imgs: ['safeeye1.png', 'safeeye2.png', 'safeeye3.png']
    },
    marchingCloud: {
        title: 'Marching Cloud',
        date: '13/01/2023',
        tech: 'C++ , Qt , OpenGL, CUDA',
        team: [Team.SYLVAIN_LECLERC],
        detail: 'Our main objective for this project was to create an interactive application capable of rendering realistic point clouds using the "Ray-Marching" method on a GPU. We implemented various methods enabling a user to create point clouds and modify them. These point clouds are then concatenated into a "Kd-tree" structure for rendering.',
        linkGit: 'https://github.com/KhelianL/MarchingCloud',
        linkPdf: 'Rapport_MarchingCloud.pdf',
        linkYtb: 'https://www.youtube.com/watch?v=7OSIGtARX7o',
        imgs: ['marchingcloud1.png', 'marchingcloud3.png', 'marchingcloud2.png']
    },
    clayMotion: {
        title: 'Clay Motion',
        date: '06/01/2023',
        tech: 'C# , Unity , LeapMotion',
        team: [Team.SYLVAIN_LECLERC],
        detail: 'The aim of this project is to create an interactive simulation that lets you manipulate 3D objects with your hands. We initially chose to focus on a pottery simulation where meshes can be generated, sculpted and deformed in real time.',
        linkGit: 'https://github.com/KhelianL/ClayMotion',
        linkPdf: 'Rapport_ClayMotion.pdf',
        linkYtb: 'https://www.youtube.com/watch?v=IuxE-PWp5ZE',
        imgs: ['claymotion1.png', 'claymotion2.png', 'claymotion3.png', 'claymotion4.png', 'claymotion5.png']
    },
    gameEngine: {
        title: 'Game Engine',
        date: '11/05/2022',
        tech: 'C++ , OpenGL',
        team: [Team.FLORENTIN_DENIS],
        detail: 'Creation of a game engine from scratch with the GLEW, GLFW and GLM libraries. The objective of this project was therefore to implement a maximum of software components in order to create a basic game with ease.',
        linkGit: 'https://github.com/Flare00/Moteur-de-jeu',
        linkPdf: 'Rapport_GameEngine.pdf',
        linkYtb: 'https://www.youtube.com/watch?v=VLmROi0yyVE&feature=emb_logo&ab_channel=HayaoYoruasai',
        imgs: ['gameengine1.png', 'gameengine2.png']
    },
    meetingCar: {
        title: 'Meeting Car',
        date: '22/05/2022',
        tech: 'Java , Android',
        team: [Team.FLORENTIN_DENIS],
        detail: 'Creation of an Android application allowing the provision of tools to sell or rent cars with ease. A user will be able to create advertisements for sale or rental, search for specific advertisements, contact a seller with a messaging to find an agreement.',
        linkGit: 'https://github.com/Flare00/MeetingCar',
        linkPdf: 'Rapport_MeetingCar.pdf',
        linkYtb: 'https://www.youtube.com/watch?v=x_SkfI725RY&feature=emb_logo',
        imgs: ['meetingcar1.png', 'meetingcar2.png', 'meetingcar3.png', 'meetingcar4.png', 'meetingcar5.png']
    },
    colorHarmony: {
        title: 'Color Harmony',
        date: '26/04/2022',
        tech: 'C++ , GTK',
        team: [Team.CAMILLE_BERNADAS],
        detail: 'Creation of an application giving the ability to a user to import an image in PPM format in order to harmonize it according to several criteria. The resulting image can be exported in PPM format if the user is satisfied.',
        linkGit: 'https://github.com/KhelianL/ColorHarmony',
        linkPdf: 'Rapport_ColorHarmony.pdf',
        linkYtb: 'https://www.youtube.com/watch?v=txhLDw4B2kU&ab_channel=CamilleBernadas',
        imgs: ['colorharmony1.png', 'colorharmony2.png', 'colorharmony3.png', 'colorharmony4.png']
    },
    swing: {
        title: 'Swing',
        date: '02/06/2022',
        tech: 'C# , Unity',
        team: [Team.FLORENTIN_DENIS, Team.MARIUS_JENIN, Team.BENJAMIN_PRE],
        detail: 'Renovation of an old arcade game named "Marble Master 1997" which has never had a serious update until now.',
        linkGit: 'https://m1.flareden.fr/TER/',
        linkPdf: 'Rapport_Swing.pdf',
        linkYtb: 'https://m1.flareden.fr/TER/Swing.mp4',
        imgs: ['swing1.png', 'swing2.png', 'swing3.png', 'swing4.png', 'swing5.png']
    },
    raytracing: {
        title: 'Raytracing',
        date: '31/12/2021',
        tech: 'C++ , OpenGL',
        detail: 'Creation of an application to reproduce physical phenomena with the aim of creating a computer-generated image close to reality.',
        linkGit: 'https://github.com/KhelianL/Raytracing',
        imgs: ['raytracing1.png', 'raytracing2.png', 'raytracing3.png']
    },
    disastweet: {
        title: 'Disastweet',
        date: '01/06/2021',
        tech: 'Python , Javascript , MongoDB , Spacy , Leaflet',
        team: [Team.FLORENTIN_DENIS, Team.MATHIEU_LADEUIL, Team.JEANCHARLES_ALLA, Team.ELODIE_LABORDE],
        detail: 'Creation of an application to locate natural disasters using morphosyntactic heuristics with the Twitter API. All the reports form a heatmap to measure the veracity of the event.',
        linkGit: 'https://github.com/PupsDev/TERL3',
        linkPdf: 'Rapport_Disastweet.pdf',
        linkYtb: 'https://www.youtube.com/watch?v=0k0WSHTMLR4&ab_channel=HayaoYoruasai',
        imgs: ['disastweet1.png', 'disastweet2.png', 'disastweet3.png']
    }
};

const modal = document.getElementById('myModal');
const modalLink = document.getElementById('modalLink');
const modalImg = document.getElementById('modalImg');
const modalContent = document.getElementById('modalContent');
const modalCountImg = document.getElementById('modalCountImg');
const slides = document.getElementsByClassName('modal-slideshow');
const projects = document.getElementById('portfolioProject');
let modalAnim = false;
let slideIndex = 0;

/*/////////////////////////////*/
/*/          PROJECTS         /*/
/*/////////////////////////////*/

function createProjects() {

    for (const p in modalData) {

        const projectContainer = document.createElement('div');
        projectContainer.className = 'project-container-card';

        const projectImage = document.createElement('div');
        projectImage.className = 'project-image-display';
        const filename = modalData[p].title.replace(' ', '').replace('-', '');
        projectImage.style = 'background-image: url(' + Paths.COVERS + 'cover_' + filename + '.png);';

        const projectDesc = document.createElement('div');
        projectDesc.className = 'project-desc-display project-desc-text';

        const projectTitle = document.createElement('div');
        projectTitle.className = 'project-desc-title';
        projectTitle.textContent = modalData[p].title;

        const techUsed = document.createElement('div');
        techUsed.className = 'project-desc-techused';
        techUsed.textContent = modalData[p].tech;

        projectDesc.appendChild(projectTitle);
        projectDesc.appendChild(techUsed);

        const learnMoreButton = document.createElement('button');
        learnMoreButton.className = 'project-desc-display project-btn-learnmore';
        learnMoreButton.textContent = 'Learn more';
        learnMoreButton.addEventListener('click', function () {
            openModal(p);
        });

        projectContainer.appendChild(projectImage);
        projectContainer.appendChild(projectDesc);
        projectContainer.appendChild(learnMoreButton);

        projects.appendChild(projectContainer);
    }
}
createProjects();

/*/////////////////////////////*/
/*/       IMG  CAROUSEL       /*/
/*/////////////////////////////*/

function showFirstImage() {
    slides[0].style.display = "flex";
    updateImageCounter();
}

function prevImageModal() {
    toggleSlideVisibility(false);
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    toggleSlideVisibility(true);
    updateImageCounter();
}

function nextImageModal() {
    toggleSlideVisibility(false);
    slideIndex = (slideIndex + 1) % slides.length;
    toggleSlideVisibility(true);
    updateImageCounter();
}

function toggleSlideVisibility(show) {
    slides[slideIndex].style.display = show ? "flex" : "none";
}

function updateImageCounter() {
    modalCountImg.textContent = `${slideIndex + 1} / ${slides.length}`;
}

/*/////////////////////////////*/
/*/           MODAL           /*/
/*/////////////////////////////*/

function createLink(platform, link) {
    if (!link) return;

    if (!PlatformIcons[platform]) {
        console.error('Plateforme non reconnue:', platform);
        return;
    }

    if (platform === 'REPORT') {
        link = Paths.REPORTS + link;
    }

    const button = document.createElement('button');
    button.classList.add('modal-button');

    const icon = document.createElement('div');
    icon.classList.add('icon', PlatformIcons[platform]);

    button.appendChild(icon);

    const a = document.createElement('a');
    a.setAttribute('href', link);
    a.setAttribute('target', '_blank');
    a.appendChild(button);

    modalLink.appendChild(a);
}

function createImgDiv(pathImg) {
    const img = document.createElement('img');
    img.src = Paths.IMGS + pathImg;

    const div = document.createElement('div');
    div.classList.add('modal-slideshow', 'fade');
    div.appendChild(img);

    modalImg.appendChild(div);
}

function createTeamLinks(team) {
    const teamModal = document.getElementById('teamModal');
    teamModal.innerHTML = '';

    const div = document.createElement('div');
    div.classList.add('modal-teammate');
    div.classList.add('active');
    div.textContent = "Khélian";
    teamModal.appendChild(div);

    if (!team) return;

    team.forEach(member => {
        const div = document.createElement('div');
        div.classList.add('modal-teammate');
        div.textContent = member.name;

        if (member.url) {
            const link = document.createElement('a');
            link.href = member.url;
            link.target = '_blank';
            link.appendChild(div);
            teamModal.appendChild(link);
        } else {
            teamModal.appendChild(div);
        }
    });
}

function deleteAllImgDiv() {
    Array.from(document.getElementsByClassName('modal-slideshow')).forEach(img => img.remove());
}

function openModal(idModal) {
    if (modalAnim) return;

    document.body.style.overflow = 'hidden';

    const modalObj = modalData[idModal];
    const modalTitle = document.getElementById('titleModal');
    const modalDate = document.getElementById('dateModal');
    const modalTech = document.getElementById('techModal');
    const modalDesc = document.getElementById('descModal');

    modalTitle.innerHTML = modalObj.title;
    modalDate.textContent = modalObj.date;
    modalTech.textContent = modalObj.tech;
    modalDesc.textContent = modalObj.detail;

    // Img
    const countImg = modalObj.imgs.length;
    deleteAllImgDiv();
    for (let i = 0; i < countImg; i++) {
        createImgDiv(modalObj.imgs[i]);
    }

    slideIndex = 0;
    modalImg.style.display = countImg ? 'flex' : 'none';
    if (countImg) showFirstImage();

    // Links
    modalLink.innerHTML = '';
    createLink('YOUTUBE', modalObj.linkYtb);
    createLink('GITHUB', modalObj.linkGit);
    createLink('REPORT', modalObj.linkPdf);

    // Team
    createTeamLinks(modalObj.team);

    // Anim
    modalAnim = true;
    modal.style.display = 'flex';
    setTimeout(() => {
        modalAnim = false;
    }, 400);
}

function hideModalAnim() {
    if (modalAnim) return;

    document.body.style.overflow = 'auto';

    modalAnim = true;
    modalContent.style.animationName = 'animatetopreverse';

    setTimeout(() => {
        modal.style.display = 'none';
        modalContent.style.animationName = '';
        modalAnim = false;
    }, 400);
}

window.onclick = function (event) {
    if (event.target == modal) hideModalAnim();
};