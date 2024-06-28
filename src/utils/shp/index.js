export const r5g6b5toRGB = (r5g6b5) => {
  return [
    ((r5g6b5 & 0xF800) >> 11) * 255 / 0x1F,
    ((r5g6b5 & 0x07E0) >> 5) * 255 / 0x3F,
    ((r5g6b5 & 0x001F)) * 255 / 0x1F
  ].map(item => Math.floor(item))
}

export const putImageData = (ctx, data, Width, Height) => {
  const imageData = ctx.createImageData(Width, Height)
  imageData.data.forEach((item, index) => {
    imageData.data[index] = data[index]
  })
  ctx.putImageData(imageData, 0, 0)
}

export const createCanvas = (Width, Height) => {
  const { cache } = createCanvas
  if (cache) {
    cache.ctx.clearRect(0, 0, cache.Width, cache.Height)
    cache.canvas.width = Width
    cache.canvas.height = Height
    return createCanvas.cache
  }
  const canvas = document.createElement('canvas')
  canvas.width = Width || 300
  canvas.height = Height || 300
  const ctx = canvas.getContext('2d')
  createCanvas.cache = { canvas, ctx }
  return createCanvas.cache
}

export const getBlobUrl = async (canvas, type = 'image/png') => {
  return new Promise(resolve => {
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob)
      resolve(url)
    }, type)
  })
}

export const parseShp = async (shpfile) => {
  const result = {}
  if (shpfile instanceof ArrayBuffer) {
    let Width
    let Height
    let PosX
    let PosY
    let Line
    let Index
    let Head
    let offset
    let over = 0
    const br = new DataView(shpfile)
    if (shpfile.byteLength > 36) {
      Head = [br.getUint8(0), br.getUint8(1), br.getUint8(2), br.getUint8(3)]
    } else {
      Head = [0, 0, 0, 0]
    }

    if (Head[0] === 84 && Head[1] === 76 && Head[2] === 72 && Head[3] === 83) {
      Index = br.getUint8(13)
      Width = br.getUint16(20, 1)
      Height = br.getUint16(24, 1)
      PosX = br.getUint16(28, 1)
      PosY = br.getUint16(32, 1)
      offset = Index ? 80 : 36
      Line = new Array(Height)
      let lineIndex = 0
      for (let l = 0; l < Line.length; l++) {
        Line[l] = br.getUint16(offset, 1)
        if (l > 0 && lineIndex && lineIndex > Line[l]) {
          over++
          lineIndex = 0
        } else {
          lineIndex = Line[l]
        }
        Line[l] = Line[l] + over * 65536
        offset += 4
      }
      const rows = new Array(Height).fill(0).map(item => new Array(Width).fill([0, 0, 0, 0]))

      for (let l = 0; l < Line.length; l++) {
        if (Index) {
          let offsetIndex = Line[l]
          while (br.getUint16(offsetIndex + 2, 1) !== 65535) {
            const length = br.getUint16(offsetIndex, 1) % (Width + 1)
            const begin = br.getUint16(offsetIndex + 2, 1)
            const colorIndex = br.getUint32(offsetIndex + 4, 1)
            for (let i = begin, num = 0; i < begin + length; i++) {
              const r5g6b5 = br.getUint16(colorIndex + num, 1)
              rows[l][i] = r5g6b5toRGB(r5g6b5).concat(255)
              num += 2
            }
            offsetIndex += 8
          }
        } else {
          let offsetIndex = Line[l]
          while (br.getUint16(offsetIndex, 1) !== 65535) {
            const begin = br.getUint16(offsetIndex, 1)
            const length = br.getUint16(offsetIndex + 2, 1) % (Width + 1)
            offsetIndex += 2
            for (let i = begin; i < begin + length; i++) {
              const r5g6b5 = br.getUint16(offsetIndex, 1)
              rows[l][i] = r5g6b5toRGB(r5g6b5).concat(255)
              offsetIndex += 2
            }
            offsetIndex += 2
          }
        }
      }
      const { ctx, canvas } = createCanvas(Width, Height)
      putImageData(ctx, rows.flat().flat(), Width, Height)
      const url = await getBlobUrl(canvas)
      Object.assign(result, {
        url,
        Width,
        Height,
        PosX,
        PosY
      })
    }
  }
  return result
}
