import { DIFFICULTY_TYPE } from "../constants.js";
import { HTMLView } from "../htmlView.js";
import { div } from "../libs/html.js";
import { LOCALIZATION } from "../localization.js";


export class DifficultyView extends HTMLView {
    constructor(parentElement, controller) {
        super(parentElement, controller);
        this.className = 'difficulty-view';


        this.container.className ='difficulty-view-container';


        this.lowBtn = div(this.container, { className: 'button', innerHTML: LOCALIZATION.low(), onclick: this.changeScreen.bind(this, DIFFICULTY_TYPE.LOW) });

        this.medBtn = div(this.container, { className: 'button', innerHTML: LOCALIZATION.medium(), onclick: this.changeScreen.bind(this, DIFFICULTY_TYPE.MED) });

        this.highBtn = div(this.container, { className: 'button', innerHTML: LOCALIZATION.high(), onclick: this.changeScreen.bind(this, DIFFICULTY_TYPE.HIGH) });
        this.show();




    }

    changeScreen(difficulty) {
        const event = new CustomEvent('change-difficulty', {
            detail: {
                difficulty: difficulty
            },
            bubbles: true
        });
        this.dispatchEvent(event);
    }
}

customElements.define("difficulty-view", DifficultyView);
