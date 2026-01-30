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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getMotivationMessage() {
  const messages = [
    "Shivam, this content is blocked to protect you from brain rot. Your attention span is valuable. Focus on other aspects of life that actually move you forward.",

    "Shivam, you’re not being restricted — you’re being protected. Brain rot destroys focus silently. Focus on other aspects of life that truly matter.",

    "Shivam, every scroll weakens your attention span. This block exists to stop that damage. Focus on other aspects of life instead of wasting mental energy here.",

    "Shivam, protect your brain from low-value noise. Attention once damaged is hard to rebuild. Focus on other aspects of life where real progress happens."
  ];

  return messages[Math.floor(Math.random() * messages.length)];
}

async function IGlogout() {
  const aTags = Array.from(document.querySelectorAll('a'));
  const profileTag = aTags.find(
    tag => tag.href.includes('shivamk9.dev')
  );

  if (!profileTag) {
    console.log('User is logged out');
    return;
  }

  profileTag.click();

  await sleep(2000);

  const optionsButton = document.querySelector('[aria-label="Options"]');
  if (!optionsButton) {
    console.log('Options button not found');
    return;
  }

  optionsButton.parentElement.click();

  await sleep(300);

  const buttons = Array.from(document.querySelectorAll('button'));
  const logoutButton = buttons.find(
    btn => btn.textContent.trim() === 'Log Out'
  );

  if (!logoutButton) {
    console.log('Log Out button not found');
    return;
  }

  logoutButton.click();
  console.log('Logged out successfully');
};

async function hideYoutubeRecommendations() {
  await sleep(2000);
  const grid = document.querySelector("ytd-rich-grid-renderer")
  if (grid) {
    grid.innerText = getMotivationMessage()
  }

  const related = document.querySelector("#related")
  if (related) {
    related.innerText = getMotivationMessage()
  }
}

async function blockSites() {
  const currentUrl = window.location.href;

  const sites = ['facebook.com', 'x.com', 'instagram.com', 'snapchat.com']
  for (let i = 0; i < sites.length; i++) {
    let site = sites[i];
    if (currentUrl.includes(site)) {
      if (site === 'instagram.com') {
        await IGlogout()
      }
      document.querySelector('body').innerHTML = getMotivationMessage();
    }
  }

  if (currentUrl.includes('youtube.com/shorts')) document.querySelector('body').innerHTML = getMotivationMessage();
  if (currentUrl.includes('youtube.com')) {
    await hideYoutubeRecommendations();
    const observer = new MutationObserver(blockReelsOrShorts);
    observer.observe(document, { subtree: true, childList: true });
  }
}

function isAllowedNow() {
  let date = new Date()
  const day = date.getDay();   // 0 = Sunday, 5 = Friday, 6 = Saturday
  const hour = date.getHours(); // 0–23

  // Rule 2: Friday or Saturday between 5 PM and 10 PM
  if ((day === 5 || day === 6) && hour >= 17 && hour < 22) {
    return true;
  }

  // Rule 1: Every day between 9 PM and 11 PM
  if (hour >= 20 && hour < 22) {
    return true;
  }

  return false;
}

if (!isAllowedNow()) blockSites();
