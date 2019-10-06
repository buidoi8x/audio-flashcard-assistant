const elementWidth = element => {
  const boundingClientRect = element.getBoundingClientRect()
  return boundingClientRect.right - boundingClientRect.left
}
const getAudioElement = () => {
  const el = document.getElementById('audioPlayer')
  if (!(el instanceof HTMLAudioElement || el instanceof HTMLVideoElement))
    return null
  return el
}
const getWaveformSvgElement = () => document.getElementById('waveform-svg')

const dependencies = {
  document,
  window,
  setLocalStorage: (key, value) => window.localStorage.setItem(key, value),
  getWaveformSvgElement: () => document.getElementById('waveform-svg'),
  getWaveformSvgWidth: () => {
    const el = getWaveformSvgElement()
    return el ? elementWidth(el) : 0
  },
  setCurrentTime: time => {
    const media = getAudioElement()
    if (media) {
      media.currentTime = time
    }
  },
  getCurrentTime: () => {
    const media = getAudioElement()
    return media ? media.currentTime : 0
  },
  pauseMedia: () => {
    const el = getAudioElement()
    if (el) {
      el.pause()
    }
  },
  toggleMediaPaused: () => {
    const el = document.getElementById('audioPlayer')
    if (!(el instanceof HTMLAudioElement)) return
    if (el.paused) el.play()
    else el.pause()
  },
}
export default dependencies