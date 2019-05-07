# RUN
```bash
npx http-server -p 8080
```

# TODO

* Menu should be closed by clickint outside of menu.

# Embed in a site

Just need to include `index.js` and `style.css`. And call `run()` method of a `Main` instance.

```html
<head>
    <link href="style.css" rel="stylesheet">
    <script type="text/javascript" src='index.js'></script>
    <script>
        // starts on load, but is not mandatory.
        window.onload = () => new Main({}).run();
    </script>
</head>
<body>
    <!-- SITE -->
</body>
```