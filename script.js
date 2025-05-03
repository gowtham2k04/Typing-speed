const quotes = [
    "The sun rises in the east and sets in the west. Every day starts with light and ends with night.",
    "I like to read books when I have free time. A good book can take you to a new world.",
    "She walks to school with her best friend. They talk, laugh, and learn new things each day.",
    "He plays games after he finishes his homework. It helps him relax and have fun at home.",
    "The dog runs fast and jumps over the wall. It loves to play outside in the sun.",
    "We eat lunch at noon and dinner in the evening. Food brings people together around the table.",
    "They sing songs and dance during the party. Music makes everyone smile and feel alive.",
    "You can learn more when you ask questions. Always stay curious and ready to explore.",
    "Time goes by quickly when you are happy. Moments turn into memories before you know it.",
    "Water is clear, cold, and good for health. Drink more water every single day."
  ];
  
  let quote = "";
  let startTime;
  let timerStarted = false;
  
  const quoteDisplay = document.getElementById("quoteDisplay");
  const quoteInput = document.getElementById("quoteInput");
  const wpmDisplay = document.getElementById("wpm");
  const accuracyDisplay = document.getElementById("accuracy");
  const errorsDisplay = document.getElementById("errors");
  
  function renderQuote() {
    quote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteDisplay.innerHTML = "";
    quote.split("").forEach(char => {
      const span = document.createElement("span");
      span.innerText = char;
      quoteDisplay.appendChild(span);
    });
  }
  
  quoteInput.addEventListener("input", () => {
    const arrayQuote = quote.split("");
    const arrayInput = quoteInput.value.split("");
    let correct = 0;
    let errors = 0;
  
    if (!timerStarted) {
      startTime = new Date();
      timerStarted = true;
    }
  
    quoteDisplay.querySelectorAll("span").forEach((span, index) => {
      const char = arrayInput[index];
  
      if (char == null) {
        span.classList.remove("correct", "incorrect");
      } else if (char === arrayQuote[index]) {
        span.classList.add("correct");
        span.classList.remove("incorrect");
        correct++;
      } else {
        span.classList.add("incorrect");
        span.classList.remove("correct");
        errors++;
      }
    });
  
    const timeElapsed = (new Date() - startTime) / 1000 / 60;
    const wordsTyped = arrayInput.length / 5;
    const wpm = Math.round(wordsTyped / timeElapsed);
    const accuracy = Math.round((correct / arrayInput.length) * 100);
  
    wpmDisplay.innerText = isNaN(wpm) ? 0 : wpm;
    accuracyDisplay.innerText = isNaN(accuracy) ? 0 : accuracy;
    errorsDisplay.innerText = errors;
  
    if (arrayInput.length === arrayQuote.length) {
      quoteInput.disabled = true;
    }
  });
  
  function startNewTest() {
    renderQuote();
    quoteInput.value = "";
    quoteInput.disabled = false;
    timerStarted = false;
    wpmDisplay.innerText = 0;
    accuracyDisplay.innerText = 0;
    errorsDisplay.innerText = 0;
    quoteInput.focus();
  }
  
  // Start on load
  startNewTest();
  