const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const photoButton = document.getElementById('photo-button');
const clearButton = document.getElementById('clear-button');
const photoFilter = document.getElementById('photo-filter');

let width = 700,
  height = 0,
  filter = 'none',
  streaming = false;

async function getUserMedia() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    video.srcObject = stream;
    video.play();
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}

function streamVideo() {
  if (!streaming) {
    // Set video / canvas height
    height = video.videoHeight / (video.videoWidth / width);

    video.setAttribute('width', width);
    video.setAttribute('height', height);
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    streaming = true;
  }
}

function filterVideo(e) {
  filter = e.target.value;
  // Set filter to video
  video.style.filter = filter;
}

function clear() {
  // Clear photos
  photos.innerHTML = '';
  // Change filter back to none
  filter = 'none';
  // Set video filter
  video.style.filter = filter;
  // Reset select list
  photoFilter.selectedIndex = 0;
}

function takePicture() {
  // Create canvas
  const context = canvas.getContext('2d');
  if (width && height) {
    // set canvas props
    canvas.width = width;
    canvas.height = height;
    // Draw an image of the video on the canvas
    context.drawImage(video, 0, 0, width, height);

    // Create image from the canvas
    const imgUrl = canvas.toDataURL('image/png');

    // Create img element
    const img = document.createElement('img');

    // Set img src
    img.setAttribute('src', imgUrl);

    // Set image filter
    img.style.filter = filter;

    // Add image to photos
    photos.appendChild(img);
  }
}

document.addEventListener('DOMContentLoaded', getUserMedia);
video.addEventListener('canplay', streamVideo);
photoButton.addEventListener('click', takePicture);
photoFilter.addEventListener('change', filterVideo);
clearButton.addEventListener('click', clear);
