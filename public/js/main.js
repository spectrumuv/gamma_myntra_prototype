import * as posenet from '@tensorflow-models/posenet';
import * as tf from '@tensorflow/tfjs';

const videoElement = document.createElement('video');
videoElement.width = 640;
videoElement.height = 480;
document.body.appendChild(videoElement);

async function setupCamera() {
  videoElement.srcObject = await navigator.mediaDevices.getUserMedia({
    video: true
  });
  return new Promise((resolve) => {
    videoElement.onloadedmetadata = () => {
      resolve(videoElement);
    };
  });
}

async function loadPoseNet() {
  return await posenet.load();
}

async function detectPose(video, net) {
  const pose = await net.estimateSinglePose(video, {
    flipHorizontal: false
  });
  console.log(pose);
  requestAnimationFrame(() => detectPose(video, net));
}

async function init() {
  await setupCamera();
  const net = await loadPoseNet();
  detectPose(videoElement, net);
}

init();
