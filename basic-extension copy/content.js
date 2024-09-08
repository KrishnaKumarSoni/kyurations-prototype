function extractProfileData() {
  const name = document.querySelector('h1.text-heading-xlarge')?.innerText || '';
  const title = document.querySelector('div.text-body-medium')?.innerText || '';
  const location = document.querySelector('span.text-body-small.inline.t-black--light.break-words')?.innerText || '';
  
  // More robust image extraction
  let imageUrl = '';
  const imgElements = document.querySelectorAll('img');
  for (let img of imgElements) {
    if (img.alt && (img.alt.includes('profile picture') || img.alt.includes('profile photo'))) {
      imageUrl = img.src;
      break;
    }
  }
  
  // If no image found, try data-delayed-url attribute
  if (!imageUrl) {
    const delayedImg = document.querySelector('img[data-delayed-url]');
    if (delayedImg) {
      imageUrl = delayedImg.getAttribute('data-delayed-url');
    }
  }

  return { name, title, location, imageUrl };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getProfileData") {
    const profileData = extractProfileData();
    sendResponse({ data: profileData });
  }
  return true;  // Indicates that the response will be sent asynchronously
});