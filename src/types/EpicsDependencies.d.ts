declare type EpicsDependencies = {
  document: Document
  window: typeof window
  setLocalStorage: ((arg0: string, arg1: string) => void)
  getWaveformSvgElement: (() => SVGElement | null)
  getWaveformSvgWidth: (() => number)
  getCurrentTime: (() => number)
  setCurrentTime: ((arg0: number) => void)
  pauseMedia: (() => void)
  toggleMediaPaused: (() => void)
  getMediaMetadata: (
    path: string
  ) => Promise<{
    streams: FfprobeStream[]
    format: FfprobeFormat
    chapters: any[]
  }>
}
