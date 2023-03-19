export interface VisionTextDetection {
  pages: {
    blocks: {
      lines: {
        words: {
          text: string
        }[]
      }[]
    }[]
  }[]
}

export interface VisionResults {
  textDetection: VisionTextDetection
}

export interface VisionResponse {
  results: {
    results: VisionResults[]
  }[]
}
