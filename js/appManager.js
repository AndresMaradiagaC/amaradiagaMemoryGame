import { DIFFICULTY_TYPE, GOTO_EVENT_TYPE, LANGUAGE_TYPE } from "./constants.js";
import { DifficultyController } from "./difficultyController/difficultyController.js";
import { LOCALIZATION } from "./localization.js";
import { MenuController } from "./menuController/menuController.js";
import { ThemesController } from "./themesController/themesController.js";
import { LocalizationController } from "./localizationController/localizationController.js";
import { LoadingController } from "./loadingController/loadingController.js";
import { PlayController } from "./playController/playController.js";
import { LoginController } from "./loginController/loginController.js";
import { ScoresController } from "./scoresController/scoresController.js";


export class AppManager {
    constructor() {


        if (!localStorage.getItem('language')) {
            localStorage.setItem('language', LANGUAGE_TYPE.EN);
        }

        if (!localStorage.getItem('difficulty')) {
            localStorage.setItem('difficulty', DIFFICULTY_TYPE.MED);
        }

        if (!localStorage.getItem('username')) {
            localStorage.setItem('username', 'none:');
        }



        const navbarContainer = document.getElementById('navbarContainer');
        this.contentContainer = document.getElementById('contentContainer');
        this.backBtn = document.getElementById('backBtn');

        this.backBtn.onclick = this.onBackBtn.bind(this);
        this.backBtn.classList.add('hidden');

        this.navbarTitle = document.getElementById('navbarTitle');

        this.menuController = new MenuController(this.contentContainer);
        this.currentController = new LoadingController(this.contentContainer);

        window.addEventListener('goto', (event) => {
            this.changeScreen(event.detail.eventType);
        });

        window.addEventListener('Save-username', (event) => {
            localStorage.setItem('username', event.detail.username);
            this.changeScreen(GOTO_EVENT_TYPE.MENU);
        });

        window.addEventListener('change-difficulty', (event) => {
            console.log(event);
            localStorage.setItem('difficulty', event.detail.difficulty);
        });

        window.addEventListener('change-theme', (event) => {
            console.log(event);
            localStorage.setItem('theme', event.detail.theme);
        });


        //REMOVE LATER
       // window.setTimeout(() => {
       // this.changeScreen(GOTO_EVENT_TYPE.MENU);
       // }, 100);//
    }


    onBackBtn() {
        this.changeScreen(GOTO_EVENT_TYPE.MENU);
    }

    changeScreen(eventType) {
        switch (eventType) {
            case GOTO_EVENT_TYPE.LOGIN:
                this.backBtn.classList.remove('hidden');
                this.navbarTitle.innerHTML = LOCALIZATION.login();
                this.currentController = new LoginController(this.contentContainer);
                break;
            case GOTO_EVENT_TYPE.PLAY:
                this.backBtn.classList.remove('hidden');
                this.navbarTitle.innerHTML = LOCALIZATION.play();
                this.currentController = new PlayController(this.contentContainer);

                break;
            case GOTO_EVENT_TYPE.SCORES:
                this.backBtn.classList.remove('hidden');
                this.navbarTitle.innerHTML = LOCALIZATION.scores();
                this.currentController = new ScoresController(this.contentContainer);
                break;
            case GOTO_EVENT_TYPE.DIFFICULTY:
                this.backBtn.classList.remove('hidden');
                this.navbarTitle.innerHTML = LOCALIZATION.difficulty();
                this.currentController = new DifficultyController(this.contentContainer);
                break;
            case GOTO_EVENT_TYPE.THEMES:
                this.backBtn.classList.remove('hidden');
                this.navbarTitle.innerHTML = LOCALIZATION.themes();
                this.currentController = new ThemesController(this.contentContainer);

                break;
            case GOTO_EVENT_TYPE.CREDITS:
                this.navbarTitle.innerHTML = 'Credits';

                break;
            case GOTO_EVENT_TYPE.MENU:
                this.navbarTitle.innerHTML = LOCALIZATION.menu();
                this.menuController.updateLanguage();
                this.backBtn.classList.add('hidden');
                this.currentController.remove();
                this.currentController = null;
                break;
            case GOTO_EVENT_TYPE.LOCALIZATION:
                this.backBtn.classList.remove('hidden');
                this.navbarTitle.innerHTML = LOCALIZATION.language;
                this.currentController = new LocalizationController(this.contentContainer);
                break;
            default:
                break;
        }
    }
}
