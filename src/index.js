const CONFIG_URL = '/api/response.json';
class Main {

    menu;
    data;
    context;
    
    constructor(context) {
        this.context = context;
    }

    prepareFrame(data) {
        this.data = data;
        const btn = new Button();
        btn.onClick(() => this.buttonClicked());
        document.body.appendChild(btn.render());
    }

    buttonClicked() {
        if (this.menu) {
            this.fadeOut(this.menu);
        } else {
            this.fadeIn(this.data);
        }
    }

    fadeOut() {
        this.menu.classList.add('removed');
        // remove node after animation ends
        setTimeout(() => {
            this.menu.parentNode.removeChild(this.menu);
            this.menu = null;
        }, 200);
    }

    fadeIn() {
        this.menu = new Menu(this.data).render();
        document.body.appendChild(this.menu);
    }

    run() {
        new JsonHttp().get(CONFIG_URL)
            .then(response => this.prepareFrame(response))
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
            <h5>Applications</h5>
            <ul>
                ${this.data.menu.applications.map(item => `<li><a href="${item.link}">${item.name}</a></li>`).join('')}
            </ul>`;
        return el;
    }
}

class Button {

    onClickListeners = [];

    render() {
        const el = document.createElement('div');
        el.onclick = event => this.onClickListeners.forEach(listener => listener(event));
        el.className = 'menu-button';
        el.innerHTML = `<img src="/assets/aucernaLogo-trans.png" style="width: 100%"/>`;
        return el;
    }

    onClick(callback) {
        this.onClickListeners.push(callback);
    }
}