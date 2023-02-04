const bannerHeroGameSlider = document.querySelectorAll('input[name="header-slider"]');

bannerHeroGameSlider.forEach(item => item.addEventListener('change', changeBannerHeroInfo));


function changeBannerHeroInfo () {
    let selectedGame = this.id;
    setBannerHeroImages(selectedGame);
    setBannerHeroText(selectedGame);
}

const trailerCover = document.querySelector('#selectedGameTrailerCover');

function setBannerHeroImages (game) {
    const background = document.querySelector('.header__background');
    const gameLogo = document.querySelector('.banner-hero__game-logo');
    
    //const trailerAnimated = document.querySelector('#selectedGameTrailerAnimated');;
    const trailerWrapper = document.querySelector('.banner-hero__trailer-wrapper');

    background.src = `../assets/header/${game}-background.jpg`;
    gameLogo.src = `../assets/header/${game}-logo.png`;
    trailerCover.src = `../assets/header/${game}-trailer-cover.png`;
    //trailerAnimated.src = `../assets/header/${game}-trailer-animated.gif`;
    
    destroyMouseListeners(trailerWrapper, animateTrailer, setTrailerCover);
    trailerWrapper.addEventListener('mouseover', animateTrailer);
    trailerWrapper.addEventListener('mouseout', setTrailerCover);
    
}

const setTrailerCover = () => {
    trailerCover.src = `../assets/header/wow-trailer-cover.png`;
    console.log('sai');
}

const animateTrailer = () => {
    trailerCover.src = `../assets/header/wow-trailer-animated.gif`;
    console.log('entrei');
}

function destroyMouseListeners (element, mouseOverHandler, mouseOutHandler) {
    element.removeEventListener('mouseover', mouseOverHandler);
    element.removeEventListener('mouseout', mouseOutHandler);
}




function setBannerHeroText (game) {
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