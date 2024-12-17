function blockReelsOrShorts() {
    const currentUrl = window.location.href;

    if (currentUrl.includes('instagram.com/reels')) {
        document.querySelector('body').innerHTML = '';
    } else if (currentUrl.includes('instagram.com/')) {
        document.querySelector('.x1nhvcw1').innerHTML = ''
    }

    if (currentUrl.includes('youtube.com/shorts')) {
        document.querySelector('body').innerHTML = '';
        // window.location.href = "about:blank";
    }

    if (currentUrl.includes('x.com')) {
        document.querySelector('body').innerHTML = '';
    }

    if (currentUrl.includes('facebook.com/gaming')) {
        document.querySelector('body').innerHTML = '';
    }  else if (currentUrl.includes('facebook.com/')) {
        document.querySelector('.x1unhpq9').innerHTML = ''
    }
}

const observer = new MutationObserver(blockReelsOrShorts);

observer.observe(document, { subtree: true, childList: true });
blockReelsOrShorts();
