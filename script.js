// Function to fetch data from multiple JSON files
async function fetchJsonData(filePaths) {
    try {
        const jsonDataArray = [];
        for (const filePath of filePaths) {
            const response = await fetch(filePath);
            const jsonData = await response.json();
            console.log('JSON Data:', jsonData); // Log the fetched json data
            jsonDataArray.push(jsonData);
        }
        return jsonDataArray;
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        return [];
    }
}

// Function to render json files questions
async function renderJsonFromFiles(filePaths) {
    const questionContainer = document.getElementById('question-container');
    const baseUrl = 'http://127.0.0.1:8080/'; // Replace this with your local server URL
    const absolutePaths = filePaths.map(filePath => baseUrl + filePath);
    const jsonDataArray = await fetchJsonData(absolutePaths);

    console.log('JSON Data Array:', jsonDataArray); // Log the fetched JSON data array

    jsonDataArray.forEach(jsonData => {
        // Check if jsonData and questions array exist
        if (jsonData && jsonData.data && jsonData.data.questions) {
            // Variable to keep track of question number
            let questionNumber = 1;

            jsonData.data.questions.forEach(question => {
                console.log('Question:', question); // Log the current question data

                const questionElement = document.createElement('div');
                questionElement.classList.add('question');

                // Add question number
                const questionNumberElement = document.createElement('p');
                questionNumberElement.innerHTML = "Question " + questionNumber++;
                questionElement.appendChild(questionNumberElement);

                // Create and append question text
                const questionTextElement = document.createElement('p');
                questionTextElement.innerHTML = question.text;
                questionElement.appendChild(questionTextElement);

                // Create and append short description
                if (question.shortDescription) {
                    const shortDescriptionElement = document.createElement('p');
                    shortDescriptionElement.innerHTML = question.shortDescription;
                    questionElement.appendChild(shortDescriptionElement);
                }

                // Create and append choices
                const choicesContainer = document.createElement('div');
                if (question.choices) {
                    question.choices.forEach(choice => {
                        const choiceElement = document.createElement('div');
                        choiceElement.classList.add('choice');
                        choiceElement.innerHTML = choice.text;
                        choicesContainer.appendChild(choiceElement);
                    });
                    questionElement.appendChild(choicesContainer);
                }

                // Create and append solution
                if (question.solution) {
                    const solutionElement = document.createElement('p');
                    solutionElement.innerHTML = "Solution: " + question.solution;
                    questionElement.appendChild(solutionElement);
                }

                // Append the question element to the question container
                questionContainer.appendChild(questionElement);
            });
        } else {
            console.error('JSON data is missing or incorrectly formatted.');
        }
    });
}


const filePaths = ['File1.json', 'File2.json']; // Provide the file paths here
renderJsonFromFiles(filePaths);
