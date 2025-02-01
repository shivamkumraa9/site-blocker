function blockReelsOrShorts() {
  const currentUrl = window.location.href;

  if (currentUrl.includes('instagram.com/reels')) {
      document.querySelector('body').innerHTML = '';
  } else if (currentUrl.includes('instagram.com/') && window.location.pathname === '/') {
      let element = document.querySelector('.x1nhvcw1')
      if (element) element.innerHTML = '';
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
      let element = document.querySelector('.x1unhpq9')
      if (element) element.innerHTML = '';
  }
}

function blockSites() {
  const currentUrl = window.location.href;

  const sites = ['facebook.com', 'x.com', 'youtube.com', 'instagram.com']
  for (let site of sites) {
    if (currentUrl.includes(site)) document.querySelector('body').innerHTML = '';

  }

  if (currentUrl.includes('youtube.com/shorts')) document.querySelector('body').innerHTML = '';
}

const observer = new MutationObserver(blockReelsOrShorts);

observer.observe(document, { subtree: true, childList: true });
blockReelsOrShorts();