/* eslint-disable no-multi-spaces, max-len */

const makerLink = new MakerLink({
  author: "Cedric Amaya",
  photoURL: "https://pbs.twimg.com/profile_images/1163280199200280576/XVbgYr8I_400x400.jpg",
  redirectURL: "https://cedric.tech",
  brandColor: '#007bff',
  font: 'BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
});

// `copyToClipboard()` courtesy @chalarangelo (Angelos Chalaris)
// refs: https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
const copyToClipboard = (str) => {
  const el = document.createElement('textarea');  // Create a <textarea> element
  el.value = str;                                 // Set its value to the string that you want copied
  el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
  el.style.position = 'absolute';
  el.style.left = '-9999px';                      // Move outside the screen to make it invisible
  document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
  const selected =
    document.getSelection().rangeCount > 0        // Check if there is any content selected previously
      ? document.getSelection().getRangeAt(0)     // Store selection if found
      : false;                                    // Mark as false to know no selection existed before
  el.select();                                    // Select the <textarea> content
  document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
  document.body.removeChild(el);                  // Remove the <textarea> element
  if (selected) {                                 // If a selection existed before copying
    document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
    document.getSelection().addRange(selected);   // Restore the original selection
  }
};

const showCopyNotification = () => {
  const notification = document.querySelector('div.notification.copy-notification');
  notification.classList.remove('is-hidden');
  setTimeout(() => {
    notification.classList.add('is-hidden');
  }, 2000);
};

const installTextCode = document.querySelector('p.install-text code');
const installTextSpan = document.querySelector('p.install-text code span');

const clickableElements = [installTextCode, installTextSpan];

clickableElements.forEach((el) => {
  const npmInstallText = installTextSpan.textContent; // 'npm i -g amo-cli'
  el.addEventListener('click', () => {
    copyToClipboard(npmInstallText);
    showCopyNotification();
  });
});
