import { HTMLView } from "../htmlView.js";

export class CardView extends HTMLView {
    constructor(parentElement, controller, card) {
        super(parentElement, controller);
        this.card = card;
        this.card.isSelected = false;
        this.className = 'card-view';
        this.innerHTML = '';

        this.onclick = this.onCardClick.bind(this);

    
    }

    onCardClick() {
        if(this.card.isSelected || this.card.isDiscovered) return;
        const event = new CustomEvent('on-card-click', {
            detail: {
                card: this
            },
            bubbles: true
        });
        this.dispatchEvent(event);
    }

    showSelected() {
        this.card.isSelected = true;
        this.innerHTML = this.card.icon;
    }

    hideSelected() {
        this.card.isSelected = false;

        this.innerHTML = '';
    }

    showDiscovered(){
        this.classList.add('card-view-discovered');
    }
}

customElements.define("card-view", CardView);
