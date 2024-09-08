chrome.action.onClicked.addListener((tab) => {
  if (tab.url && tab.url.includes('linkedin.com/in/')) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: getProfileData,
    }, (results) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else if (results && results[0]) {
        chrome.storage.local.set({ profileData: results[0].result });
      }
    });
  }
});

function getProfileData() {
  const name = document.querySelector('h1.text-heading-xlarge')?.innerText || '';
  const title = document.querySelector('div.text-body-medium')?.innerText || '';
  const location = document.querySelector('span.text-body-small.inline.t-black--light.break-words')?.innerText || '';
  
  let imageUrl = '';
  const imgElement = document.querySelector('img.pv-top-card-profile-picture__image') || 
                     document.querySelector('img.profile-photo-edit__preview') ||
                     document.querySelector('.pv-top-card__photo img');
  
  if (imgElement && imgElement.src) {
    imageUrl = imgElement.src;
  }

  return { name, title, location, imageUrl };
}