PAATA SHAVADZE WEBSITE — SHARE BUTTON UPDATE

Files included:
- index.html
- style.css
- script.js

How to apply:
1. Make a backup of the current project first.
2. Copy these three files into your existing project folder, replacing the files with the same names.
3. Keep admin.html, admin.css, admin.js, the images/ folder, and all other assets unchanged.
4. Refresh the website using VS Code Live Server.

What this update adds:
- Facebook website sharing via Facebook's share dialog.
- A TikTok share button using the device/browser share menu where available.
- If native sharing is unavailable, the button copies the website URL and opens TikTok for manual use.
- Georgian, English, and Russian button text and status messages.

Note:
- The share actions require a public website URL to work for other people. While testing on localhost or from a local file, the site displays a message instead of trying to share an inaccessible address.
- TikTok does not provide a simple, generic Facebook-style share URL for arbitrary website links; the fallback copies the link. Direct posting of video/image content to TikTok requires its developer integration and is not implemented by this button.
