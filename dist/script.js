const bannerHeroGameSlider = document.querySelectorAll('input[name="header-slider"]');
const trailerCover = document.querySelector('#selectedGameTrailerCover');
let selectedGame = 'diabloIV'

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