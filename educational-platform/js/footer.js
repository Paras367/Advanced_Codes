// footer.js - Footer specific JavaScript
function updateFooterYear() {
    const year = new Date().getFullYear();
    const footerText = $('footer p');
    if (footerText) {
              footerText.innerHTML = `&copy; ${year} PARAS DHIMAN. Not Linked to PW officially. BY SOFTWARELABS (<a href="https://softwarelabs.lovable.app" target="_blank" rel="noopener">softwarelabs.lovable.app</a>)`;
    }
}

document.addEventListener('DOMContentLoaded', updateFooterYear);