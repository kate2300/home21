import Component from "./Component.js";

export default class Results extends Component {
    constructor(selector, items = []) {
        super(selector);
        this._items = items;
        this._searchResults = items;
        this.render(); // довольно опасно вызывать методы в конструкторе, но если вы уверены в своем коде, то можно
    }

    searchItems(text) {
        this._searchResults = this._items.filter((item) =>
            item.toLowerCase().includes(text)
        );
        this.render();
    }

    get items() {
        return this._items;
    }

    addItem(item) {
        this._items.push(item);
        this._searchResults = this._items;
        this.render();
    }

    deleteItem(item) {
        const index = this._items.indexOf(item);
        this._items.splice(index, 1);
        this._searchResults = this._items;
        this.render()

    }

    addDeleteEvents() {
        this._items.forEach((elem) => {
            const button = document.querySelector(`.${elem}`)
            if (button) {
                button.addEventListener('click', () => {
                    this.deleteItem(elem)
                })
            }
        })
    }


    render() {
        this.$element.innerHTML = this._searchResults.reduce((result, item) => {
            const newElemennt = `<li>
                    <div>${item}</div> <span>
                    <button>&#9998;</button>
            <button class = '${item}'>&#10006;</button>
          </span>
        </li>`;

            result += newElemennt;
            return result;
        }, "");
        this.addDeleteEvents()
    }


}