'use strict'
// Setup Speech Recognition
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.lang = 'en-GB'
recognition.interimResults = false
recognition.maxAlternatives = 1

const outputYou = document.querySelector('.output-you')
document.querySelector('.playlist').style.visibility = 'hidden'

// Add event listener - start recognition
document.querySelector('button').addEventListener('click', () => {
  recognition.start()
})

recognition.addEventListener('speechstart', () => {
  console.log('Speech has been detected.')
})

recognition.addEventListener('result', (e) => {
  console.log('Result has been detected.')

  // Obtain text from result
  let last = e.results.length - 1
  // Get text from results
  let text = e.results[last][0].transcript
  outputYou.textContent = text
  console.log('Speech recognition confidence: ' + e.results[0][0].confidence)

  // Call emotion detection API
  const getEmotion = fetch(
    'https://emotion-detection-api-c7aaatrzsq-ew.a.run.app/predict?text=' +
      text,
  )

  getEmotion
    .then((response) => response.json())
    .then((data) => {
      // Log the emotion
      const emotion = data['label']
      console.log('Emotion :' + emotion)
      const score = data['score']
      console.log('Emotion score: ' + score)
      // Display playlists
      switch(emotion) {
        case 'joy':
       document.querySelector('.playlist').src="https://open.spotify.com/embed/playlist/66F0QrPzMPE9zCj8S1JZ1q?utm_source=generator";
          break;
        case 'love':
          document.querySelector('.playlist').src="https://open.spotify.com/playlist/64v2LytooaaE1b5ogu0uMo?si=Us6lSynkRm2Nkr31FqWySA";
          break;
        case 'anger':
          document.querySelector('.playlist').src="https://open.spotify.com/playlist/64v2LytooaaE1b5ogu0uMo?si=Us6lSynkRm2Nkr31FqWySA";
          break;
        case 'fear':
          document.querySelector('.playlist').src="https://open.spotify.com/playlist/31xXPz9MHntnxHvTQ7SYdu?si=5cf15114362b4f1e";
          break;
        case 'surprise':
          document.querySelector('.playlist').src="https://open.spotify.com/embed/playlist/3CkJH2FzvJciO8UmkzHCMU?utm_source=generator";
          break;
      }
   
      document.querySelector('.playlist').style.visibility = "visible";
   
    })
    .catch((error) => {
      console.error(error)
    })
})

recognition.addEventListener('speechend', () => {
  recognition.stop()
})

recognition.addEventListener('error', (e) => {
  console.log('Error: ' + e.error)
})
