/* VARIABLES */
const bannerHeroGameSlider = document.querySelectorAll('input[name="header-slider"]');
const trailerCover = document.querySelector('#selectedGameTrailerCover');
let selectedGame = 'diabloIV'

/* HEADER SCRIPTS */
bannerHeroGameSlider.forEach(item => item.addEventListener('change', changeBannerHeroInfo));
function changeBannerHeroInfo() {
    selectedGame = this.id;
    setBannerHeroImages(selectedGame);
    setBannerHeroText(selectedGame);
}

function setBannerHeroText(game) {
    const PLAY_NOW = 'Jogue Agora';
    const PRE_ORDER = 'Reserve agora na pré-venda';
    const gameInfo = {
        diabloIV: {
            header: 'Retorne à escuridão com o game Diablo IV',
            paragraph: 'O retorno de Lilith traz uma era de escuridão e sofrimento',
            button: PLAY_NOW,
        },
        hearthstone: {
            header: 'Novo pacote de Expansão de Hearthstone',
            paragraph: 'A horda e aliança se encontram no vale alterac para lutar',
            button: PRE_ORDER,
        },
        wow: {
            header: 'Desbrave as Terras Sombrias em Shadowlands!',
            paragraph: 'O que jaz além do mundo que você conhece?',
            button: PRE_ORDER,
        },
    };
    const headerText = document.querySelector('#selectedGameHeaderText');
    const paragraphText = document.querySelector('#selectedGameParagraph');
    const buttonText = document.querySelector('#selectGameButtonText')

    headerText.textContent = gameInfo[game].header
    paragraphText.textContent = gameInfo[game].paragraph
    buttonText.textContent = gameInfo[game].button
}

function setBannerHeroImages(game) {
    const background = document.querySelector('.header__background');
    const gameLogo = document.querySelector('.banner-hero__game-logo');

    background.src = `../assets/header/${game}-background.jpg`;
    gameLogo.src = `../assets/header/${game}-logo.png`;
    trailerCover.src = `../assets/header/${game}-trailer-cover.png`;


    destroyMouseListeners(trailerCover, animateTrailer, setTrailerCover);
    trailerCover.addEventListener('mouseover', animateTrailer);
    trailerCover.addEventListener('mouseout', setTrailerCover);
}

function destroyMouseListeners(element, mouseOverHandler, mouseOutHandler) {
    element.removeEventListener('mouseover', mouseOverHandler);
    element.removeEventListener('mouseout', mouseOutHandler);
}

const setTrailerCover = () => {
    trailerCover.src = `../assets/header/${selectedGame}-trailer-cover.png`;
}

const animateTrailer = () => {
    trailerCover.src = `../assets/header/${selectedGame}-trailer-animated.gif`;
}

setBannerHeroImages(selectedGame);
setBannerHeroText(selectedGame);




/* FOOTER SCRIPTS */
function getUserOS() {
    let OS
    if (navigator.userAgent.indexOf("Win") != -1) {
        OS = "windows";
    }
    if (navigator.userAgent.indexOf("Mac") != -1) {
        OS = "mac";
    }
    if (navigator.userAgent.indexOf("Linux") != -1) {
        OS = "linux";
    }
    return OS
}

function updateDownloadButton() {
    OS = getUserOS()
    const logo = document.querySelector('#OSLogo')
    const osName = document.querySelector('#OSName')
    const downloadTo = "Baixar para o "

    if (OS === "mac") {
        logo.style.backgroundImage = `url(../assets/footer/os-mac-icon.svg)`
        osName.textContent = downloadTo + 'MacOS'
    }
    else if (OS === "linux") {
        logo.style.backgroundImage = `url(../assets/footer/os-linux-icon.svg)`
        osName.textContent = downloadTo + 'Linux'
    }
    else {
        logo.style.backgroundImage = `url(../assets/footer/os-windows-icon.svg)`
        osName.textContent = downloadTo + 'Windows'
    }
}  

updateDownloadButton()



/* EXCLUSIVE GAMES SECTION SCRIPTS */

async function getAPI() {

    const response = await fetch('https://api.brchallenges.com/api/blizzard/games');

    let data = await response.json();
    createNewCard(data);
}

getAPI();



function createNewCard (games) {
    const list = document.getElementById('gamesList')

    for (let i = games.length - 1; i >= 0; i--) {
        const newCard = document.createElement('div');
        newCard.className = 'card'
        newCard.innerHTML ='<div class="card__image-container"> <img src="'+games[i].image+'" class="card__game-background"> <img src="'+games[i].logo+'" class="card__game-logo"> </div> <div class="card__text-container"> <h3>'+games[i].name+'</h3> <p>'+games[i].category+'</p> </div> </div> </div>'
        list.insertBefore(newCard, list.firstChild)
}
}
