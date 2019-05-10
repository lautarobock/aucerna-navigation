const CONFIG_URI = 'api/response.json';
const STYLES_URI = 'css/style.css';
const ASSETS_URI = 'assets';
const PLACEMENT_TOP_RIGTH = 'top-right';
const PLACEMENT_TOP_LEFT = 'top-left';
const PLACEMENT_BOTTOM_RIGTH = 'bottom-right';
const PLACEMENT_BOTTOM_LEFT = 'bottom-left';

class Main {

    menu;
    data;
    context;
    placement;
    
    constructor(context, placement) {
        console.log('window.location.href=',window.location.href);
        if(window.location.href === 'https://portfolio34.z22.web.core.windows.net/'){
            context.current = 'Portfolio';
        }
        console.log('START MENU');
        this.context = context;
        this.placement = placement || PLACEMENT_BOTTOM_RIGTH;
        document.addEventListener('click', () => {
            if (this.menu) {
                this.fadeOut();
            }
        });
    }

    prepareFrame(data) {
        this.data = data;
        const btn = new Button(`${this.context.url}${ASSETS_URI}`, this.placement);
        btn.onClick(event => {
            if (!this.menu) {
                this.fadeIn(event);
            }
        });
        document.body.appendChild(btn.render());
    }

    fadeOut() {
        this.menu.classList.add('removed');
        // remove node after animation ends
        setTimeout(() => {
            this.menu.parentNode.removeChild(this.menu);
            this.menu = null;
        }, 200);
    }

    fadeIn(event) {
        event.stopPropagation();
        this.menu = new Menu(this.data, this.context.current, this.placement).render();
        document.body.appendChild(this.menu);
    }

    addStyleTag(){
        const head = document.head || document.getElementsByTagName('head')[0];
        const style = document.createElement('link');    
        head.appendChild(style);        
        style.rel = 'stylesheet';
        style.href = `${this.context.url}${STYLES_URI}`;
    }

    run() {
        new JsonHttp().get(`${this.context.url}${CONFIG_URI}`)
            .then(response => {
                this.addStyleTag();
                this.prepareFrame(response);
            })
            .catch(err => console.error(err));
    }
}

class JsonHttp {

    get(url) {
        return new Promise((resolve, reject) => {
            try {
                const xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function () {
                    if (this.readyState == 4) {
                        if (this.status == 200) {
                            resolve(JSON.parse(this.responseText));
                        } else {
                            reject({ status: this.status, err: this.statusText });
                        }
                    }
                };
                xmlhttp.open('GET', url, true);
                xmlhttp.send();
            } catch (err) {
                reject(err);
            }
        });
    }
}

class Menu {

    constructor(data, current, placement) {
        this.data = data;
        this.current = current;
        this.placement = placement;
    }

    render() {
        const el = document.createElement('div');
        el.classList.add('menu-wrapper');
        el.classList.add(this.placement);
        el.innerHTML = 
            `
            <ul>
                ${this.data.menu.applications.map(item => new MenuItem(item, item.name === this.current, item.disabled).render()).join('')}
            </ul>`;
        return el;
    }
}

class MenuItem {
    
    constructor(item, selected, disabled) {
        this.item = item;
        this.disabled = disabled;
        this.selected = selected;
    }

    render() {

        if (this.disabled) {
            return `<li class="disabled"><a><img src=${this.item.icon}></a></li>`;
        }
        else if(this.selected){
            return `<li class="selected"><a href="${this.item.link}"><img src=${this.item.icon}></a></li>`;
        } else {
            return `<li><a href="${this.item.link}"><img src=${this.item.icon}></a></li>`;
        }
    }
}

class Button {

    constructor(assetsURL, placement) {
        this.assetsURL = assetsURL;
        this.placement = placement;
    }

    onClickListeners = [];

    render() {
        const el = document.createElement('div');
        el.onclick = event => this.onClickListeners.forEach(listener => listener(event));
        el.classList.add('menu-button');
        el.classList.add(this.placement);
        el.innerHTML = `<img src="${this.assetsURL}/aucernaLogo-trans.png" style="width: 100%"/>`;
        return el;
    }

    onClick(callback) {
        this.onClickListeners.push(callback);
    }
}