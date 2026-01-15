# tulfa_web_developer_test

## How to run the project
1. Open `index.html` in any modern web browser.
2. Navigate to the Services page to view the 3D model and Iframe integration.
3. Ensure `iframe.html` is in the same directory as `index.html`.

## Iframe Communication Strategy
- **Parent to Iframe:** Uses `window.postMessage` to send a `CONFIG_UPDATE` object.
- **Iframe to Parent:** The iframe listens via `window.addEventListener("message")`, updates its background-color, and sends a confirmation object back using `event.source.postMessage`.
- **Security Note:** Target origin `*` is used to facilitate local file testing, as `file://` origins are null. In production, this would be restricted to the specific domain.