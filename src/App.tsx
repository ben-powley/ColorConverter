import { useEffect, useState } from 'react'
import { hexToRgb, rgbToHex } from './Helpers/ColorHelper'

type ConvertMode = 'hextorgb' | 'rgbtohex'

function App() {
  const [convertMode, setConvertMode] = useState<ConvertMode>('hextorgb')
  const [colorString, setColorString] = useState('')

  const [rString, setRString] = useState('')
  const [gString, setGString] = useState('')
  const [bString, setBString] = useState('')

  const [convertResult, setConvertResult] = useState('')

  useEffect(() => {
    switch (convertMode) {
      default:
      case 'hextorgb':
        if (colorString.length > 5) {
          const result = hexToRgb(colorString)

          if (result) {
            setConvertResult(`${result.r}, ${result.g}, ${result.b}`)
          }
        }
        break

      case 'rgbtohex':
        if (rString && gString && bString) {
          const result = rgbToHex({ r: parseInt(rString), g: parseInt(gString), b: parseInt(bString) })

          if (result) {
            setConvertResult(`${result}`)
          }
        }

        break
    }
  }, [convertMode, colorString, rString, gString, bString])

  useEffect(() => {
    setConvertResult('')
  }, [convertMode])

  return (
    <div className="my-12 flex flex-col items-center justify-center font-bold">
      <div className="text-4xl">Convert</div>

      <div className="mt-4 flex items-center gap-x-3">
        <select className="h-[36px] rounded-md border-2 border-gray-300 px-2 py-1" onChange={(e) => setConvertMode(e.target.value as ConvertMode)}>
          <option value={'hextorgb'}>HEX -&gt; RGB</option>
          <option value={'rgbtohex'}>RGB -&gt; HEX</option>
        </select>

        <div>
          {convertMode === 'hextorgb' ? (
            <input
              className="h-[36px] rounded-md border-2 border-gray-300 px-2 py-1"
              placeholder="Color"
              onChange={(e) => setColorString(e.target.value)}
            />
          ) : (
            <div className="flex items-center gap-x-2">
              <input
                className="h-[36px] w-[60px] rounded-md border-2 border-gray-300 px-2 py-1"
                placeholder="R"
                onChange={(e) => setRString(e.target.value)}
                maxLength={3}
              />
              <input
                className="h-[36px] w-[60px] rounded-md border-2 border-gray-300 px-2 py-1"
                placeholder="G"
                onChange={(e) => setGString(e.target.value)}
                maxLength={3}
              />
              <input
                className="h-[36px] w-[60px] rounded-md border-2 border-gray-300 px-2 py-1"
                placeholder="B"
                onChange={(e) => setBString(e.target.value)}
                maxLength={3}
              />
            </div>
          )}
        </div>
      </div>

      {convertResult && (
        <div className="mt-12 flex flex-col items-center text-4xl">
          <div className="flex items-center gap-x-4">
            <div
              className="h-16 w-16"
              style={{ backgroundColor: `${convertMode === 'hextorgb' ? `rgb(${convertResult})` : `${convertResult}`}` }}></div>
            <div>{convertResult}</div>
          </div>
          <button className="mt-3 rounded-md bg-gray-200 px-3 py-1 text-base" onClick={() => navigator.clipboard.writeText(convertResult)}>
            Copy
          </button>
        </div>
      )}
    </div>
  )
}

export default App
