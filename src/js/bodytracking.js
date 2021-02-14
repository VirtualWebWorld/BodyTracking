import '@tensorflow/tfjs'
import * as bodyPix from '@tensorflow-models/body-pix'

export default class BodyTracking {
  constructor () {
    this.bodyPixNet = null
    this.canvas = document.getElementById('bodyCanvas')
    this.foregroundColor = {
      r: 0,
      g: 0,
      b: 0,
      a: 255
    }
    this.backgroundColor = {
      r: 255,
      g: 255,
      b: 255,
      a: 255
    }
    this.opacity = 1
    this.maskBlurAmount = 0
    this.flipHorizontal = true
    this.count = 0
  }

  async loadModel () {
    const multiplier = 0.75 // 0 ~ 1
    this.bodyPixNet = await bodyPix.load({
      multiplier,
      segmentationThreshold: 1,
      quantBytes: 4
    })
    console.log('bodyPix ready')
  }

  async animate (video) {
    if (this.count % 20 === 0) {
      const a = this.foregroundColor
      this.foregroundColor = this.backgroundColor
      this.backgroundColor = a
    }
    const partSegmentation = await this.bodyPixNet.segmentPerson(video, {
      internalResolution: 'medium',
      segmentationThreshold: 0.7,
      maxDetections: 1
    })
    const coloredPartImage = bodyPix.toMask(partSegmentation, this.foregroundColor, this.backgroundColor)
    bodyPix.drawMask(this.canvas, video, coloredPartImage, this.opacity, this.maskBlurAmount, this.flipHorizontal)
    this.count++
  }
}
