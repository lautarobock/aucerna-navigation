# RUN
```bash
npx http-server -p 8080 --cors
```

# TODO

* Menu should be closed by clickint outside of menu.

# Embed in a site

Just need to include `index.js` and `style.css`. And call `run()` method of a `Main` instance.

```html
<head>
    <link href="https://lautarobock.github.io/aucerna-navigation/css/style.css" rel="stylesheet">
    <script type="text/javascript" src='https://lautarobock.github.io/aucerna-navigation/src/index.js'></script>
    <script>
        // starts on load, but is not mandatory.
        window.onload = () => new Main({
            // this URL is just for testing purposes, has assets and a mock configuration
            url: 'https://lautarobock.github.io/aucerna-navigation/'
        }).run();
    </script>
</head>
<body>
    <!-- SITE -->
</body>
```