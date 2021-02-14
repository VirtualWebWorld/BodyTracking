const camera = async () => {
  document.getElementById('video').width = window.innerWidth
  document.getElementById('video').height = window.innerHeight
  const video = await setupCamera()
  video.play()
  return video
}

async function setupCamera () {
  const video = document.getElementById('video')
  const videoWidth = video.width
  const videoHeight = video.height

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      facingMode: 'user',
      width: videoWidth,
      height: videoHeight
    }
  })
  video.srcObject = stream

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video)
    }
  })
}

export default camera
