window.onload = function() {
    var menu;
    function prepareFrame() {
        console.log('prepareFrame() document: ', document);
        var widgetDiv = document.createElement("div");       

        var logoWrapper = document.createElement("div");
        logoWrapper.style.borderRadius  = '50%';
        logoWrapper.style.border  = '1px solid #ddd';
        logoWrapper.style.overflow  = 'hidden';
        logoWrapper.style.boxShadow   = '1px 1px #ccc';
        logoWrapper.style.boxShadowposition = 'absolute';

        logoWrapper.style.width  = '80px';
        logoWrapper.style.height  = '80px';
        logoWrapper.style.cursor  = 'pointer';
        logoWrapper.style.zIndex  = 999999;

        widgetDiv.style.position = 'absolute';
        widgetDiv.style.bottom = '10px';
        widgetDiv.style.right = '80px';        

        var logoButton = document.createElement("img");
        logoButton.setAttribute("src", "/some-https-endpoint/aucernaLogo-trans.png");
        logoButton.style.width = '100%';
        logoButton.onclick = buttonClicked;

        logoWrapper.appendChild(logoButton);
        widgetDiv.appendChild(logoWrapper);
        
        menu = document.createElement("div");
        menu.style.position = 'fixed';
        menu.style.width='200px';
        menu.style.height='200px';
        menu.style.bottom='110px';
        menu.style.right='25px';
        menu.style.backgroundColor ='pink';


        widgetDiv.appendChild(menu);

        document.body.appendChild(widgetDiv);

    }

    function buttonClicked(){
        console.log("buttonClicked");

        if (window.getComputedStyle(menu).display === 'block'){
            fade(menu);                      
        }
        else{
            show(menu);                       
        }
        
    }

    function fade(element) {
        console.log("fade");
        var op = 1;  // initial opacity
        var timer = setInterval(function () {
            if (op <= 0.2){
                clearInterval(timer);
                op = 0.2;
                element.style.display = 'none';
            }
            op -= 0.2;
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";            
        }, 50);
    }

    function show(element) {
        console.log("show");
        element.style.display = 'block';
        var op = 0;  // initial opacity
        var timer2 = setInterval(function () {
            if (op >= 0.8){
                clearInterval(timer2);
                element.style.display = 'block';
                op = 0.8;
            }
            op += 0.2;            
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";            
        }, 50);
    }

    prepareFrame();
}