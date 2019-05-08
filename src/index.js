const CONFIG_URI = 'api/response.json';
const STYLES_URI = 'css/style.css';
const ASSETS_URI = 'assets';

class Main {

    menu;
    data;
    context;
    
    constructor(context) {
        console.log('START MENU');
        this.context = context;
        document.addEventListener('click', () => {
            if (this.menu) {
                this.fadeOut();
            }
        });
    }

    prepareFrame(data) {
        this.data = data;
        const btn = new Button(`${this.context.url}${ASSETS_URI}`)
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
        this.menu = new Menu(this.data).render();
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

    constructor(data) {
        this.data = data;
    }

    render() {
        const el = document.createElement('div');
        el.className = 'menu-wrapper';
        el.innerHTML = 
            `
            <ul>
                ${this.data.menu.applications.map(item => new MenuItem(item).render()).join('')}
            </ul>`;
        return el;
    }
}

class MenuItem {
    
    constructor(item) {
        this.item = item;
    }

    render() {
        return `<li><a href="${this.item.link}"><img src=${this.item.icon}><span>${this.item.name}</span></a></li>`
    }
}

class Button {

    constructor(assetsURL) {
        this.assetsURL = assetsURL;
    }

    onClickListeners = [];

    render() {
        const el = document.createElement('div');
        el.onclick = event => this.onClickListeners.forEach(listener => listener(event));
        el.className = 'menu-button';
        el.innerHTML = `<img src="${this.assetsURL}/aucernaLogo-trans.png" style="width: 100%"/>`;
        return el;
    }

    onClick(callback) {
        this.onClickListeners.push(callback);
    }
}