import '../css/style.scss'
import * as tf from '@tensorflow/tfjs'
import Stats from 'stats.js'
import Camera from './camera'
import CameraCanvas from './cameracanvas'
import BodyTracking from './bodytracking'
require('@tensorflow/tfjs-backend-webgl')

let
  video,
  cc,
  stats,
  bt

tf.setBackend('webgl').then(() => main())
async function main () {
  video = await Camera()

  stats = new Stats()
  stats.showPanel(0)
  document.body.appendChild(stats.dom)

  // cc = new CameraCanvas(video)
  bt = new BodyTracking()
  await bt.loadModel()

  console.log('animation start')
  renderPrediction()
}

async function renderPrediction () {
  stats.begin()
  // cc.animate()
  await bt.animate(video)
  stats.end()
  requestAnimationFrame(renderPrediction)
}
