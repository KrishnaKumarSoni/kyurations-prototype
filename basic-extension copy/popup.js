document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const currentTab = tabs[0];
    if (currentTab && currentTab.url && currentTab.url.includes('linkedin.com/in/')) {
      chrome.scripting.executeScript({
        target: { tabId: currentTab.id },
        function: getProfileData,
      }, (results) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
        } else if (results && results[0]) {
          displayProfileData(results[0].result);
        }
      });
    } else {
      document.getElementById('profile-preview').innerHTML = '<p>Please navigate to a LinkedIn profile page.</p>';
    }
  });
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

function displayProfileData(profileData) {
  const previewElement = document.getElementById('profile-preview');
  if (profileData && Object.keys(profileData).length > 0) {
    const previewHtml = `
      <img src="${profileData.imageUrl}" alt="${profileData.name}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;">
      <h2>${profileData.name}</h2>
      <p>${profileData.title}</p>
      <p>${profileData.location}</p>
    `;
    previewElement.innerHTML = previewHtml;
  } else {
    previewElement.innerHTML = '<p>No profile data available. Please refresh the LinkedIn profile page.</p>';
  }
}