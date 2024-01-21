

// Asinxron tərcümə funksiyası
async function translateText() {
    const fromText = document.querySelector('.from-text');
    const toText = document.querySelector('.to-text');
    const selectTags = document.querySelectorAll('select');
    const translateBtn = document.querySelector('button');
    const exchangeIcon = document.querySelector('.exchange');
    const icnons = document.querySelectorAll('.row i');
  
    // Seçimlərə ölkələr əlavə edən funksiya
    function addCountriesToSelect() {
      selectTags.forEach((selectTag, index) => {
        for (const country_code in countries) {
          let selected =
            (index === 0 && country_code === 'en-GB') ||
            (index === 1 && country_code === 'az-AZ')
              ? 'selected'
              : '';
          let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
          selectTag.insertAdjacentHTML('beforeend', option);
        }
      });
    }
  
    // Dil dəyişikliyi ikonasına kliklədikdə işləyəcək funksiya
    function exchangeLanguages() {
      let tempText = fromText.value;
      tempLang = selectTags[0].value;
      selectTags[0].value = selectTags[1].value;
      fromText.value = toText.value;
      toText.value = tempText;
      selectTags[1].value = tempLang;
    }
  
    // Mətni tərcümə edən və interfeysi yeniləyən funksiya
    async function translateAndDisplay() {
      let text = fromText.value;
      let translateFrom = selectTags[0].value;
      let translateTo = selectTags[1].value;
      if (!text) return;
      toText.setAttribute('placeholder', 'Translating....');
      let apiUrl = `https://api.mymemory.translated.net/get?q=${text}!&langpair=${translateFrom}|${translateTo}`;
  
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        toText.value = data.responseData.translatedText;
        toText.setAttribute('placeholder', 'Translation');
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
  
    // iconlara kliklədikdə işləyəcək funksiya
    function handleIconClick({ target }) {
      if (target.classList.contains('fa-copy')) {
        if (target.id == 'from') {
          navigator.clipboard.writeText(fromText.value);
        } else {
          navigator.clipboard.writeText(toText.value);
        }
      } else {
        let utterance;
        if (target.id == 'from') {
          utterance = new SpeechSynthesisUtterance(fromText.value);
          utterance.lang = selectTags[0].value;
        } else {
          utterance = new SpeechSynthesisUtterance(toText.value);
          utterance.lang = selectTags[1].value;
        }
  
        window.speechSynthesis.speak(utterance);
      }
    }
  
    // Seçimlərə ölkələr əlavə edin
    addCountriesToSelect();
  
    
    exchangeIcon.addEventListener('click', exchangeLanguages);
    translateBtn.addEventListener('click', translateAndDisplay);
    icnons.forEach((icon) => {
      icon.addEventListener('click', handleIconClick);
    });
  }
  
  // Səhifə yükləndikdə tərcümə proseslərinə başlayın
  document.addEventListener('DOMContentLoaded', translateText);
  