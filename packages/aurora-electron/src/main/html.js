const path = require("path");

// This some ugly shit
const DRAFT_JS_CSS_PATH = path.resolve(
  __dirname,
  "../",
  "../",
  "../",
  "../",
  "node_modules",
  "draft-js",
  "dist",
  "Draft.css"
);

function htmlDataUri(filepath) {
  const markup = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Hi</title>
            <meta charset="UTF-8">
            <link rel="stylesheet" type="text/css" href="${DRAFT_JS_CSS_PATH}">
          </head>
            <div id="root">
              <!-- React goes here --> 
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
