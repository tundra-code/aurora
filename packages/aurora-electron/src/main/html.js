function htmlDataUri(filepath) {
  const markup = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Hi</title>
            <meta charset="UTF-8">
          </head>
            <div id="root">

            </div>
          <footer>
            <script> 
            const render = require("${filepath}").default;
            render();
            </script>
          </footer>
        </html>
      `;

  return "data:text/html;charset=UTF-8," + encodeURIComponent(markup);
}

module.exports = htmlDataUri;
