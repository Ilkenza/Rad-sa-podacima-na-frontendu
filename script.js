(async () => {
    try {
      let response = await fetch("quiz.json");
      if (!response.ok) {
        throw new Error("Error while reading file.");
      }
      let quiz = await response.json();
      let quizContainer = document.getElementById('quiz-container');
      let questionNumber = 1;
  
      for (let key in quiz) {
        let questionElement = document.createElement('h2');
        questionElement.textContent = `Question ${questionNumber}: ${quiz[key].question}`;
        quizContainer.appendChild(questionElement);
  
        let optionsContainer = document.createElement('div');
        optionsContainer.classList.add('options-container');
  
        for (let option of quiz[key].options) {
          let optionWrapper = document.createElement('div');
          optionWrapper.classList.add('option-wrapper');
  
          let radioInput = document.createElement('input');
          radioInput.type = 'radio';
          radioInput.name = `question-${questionNumber}`;
          radioInput.value = option; 
          optionWrapper.appendChild(radioInput);
  
          let optionText = document.createElement('p');
          optionText.textContent = option;
          optionWrapper.appendChild(optionText);
  
          optionsContainer.appendChild(optionWrapper);
        }
  
        quizContainer.appendChild(optionsContainer);
  
        questionNumber++;
      }
      for (let i = 1; i <= questionNumber; i++) {
        let selectedAnswer = localStorage.getItem(`question-${i}`);
        if (selectedAnswer) {
          let radioInput = document.querySelector(`input[name="question-${i}"][value="${selectedAnswer}"]`);
          if (radioInput) {
            radioInput.checked = true;
          }
        }
      }

      let radioButtons = document.querySelectorAll('input[type="radio"]');
      radioButtons.forEach((radio) => {
        radio.addEventListener('change', (event) => {
          let selectedAnswer = event.target.value;
          let questionNumber = event.target.name.split('-')[1];
          localStorage.setItem(`question-${questionNumber}`, selectedAnswer);
        });
      });
    } catch (err) {
      console.log('Fetch problem: ' + err.message);
    }
  })();
  