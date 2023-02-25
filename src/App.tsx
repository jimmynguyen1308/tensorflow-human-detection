import React, { useRef, useState } from "react"
import "@tensorflow/tfjs-backend-cpu"
import * as cocoSsd from "@tensorflow-models/coco-ssd"
import { PredictionTypes, ImgSizeTypes } from "./types"
import {
  AppContainer,
  HumanDetectorContainer,
  ImageContainer,
  TargetImg,
  FileLoader,
  SelectButton,
  TargetBox,
  HumanTargetBox,
} from "./styles"

export default function App() {
  const fileInputRef = useRef<any>()
  const imageRef = useRef<any>()
  const [imgData, setImgData] = useState<any>(null)
  const [predictions, setPredictions] = useState<Array<PredictionTypes>>([])
  const [isLoading, setLoading] = useState<boolean>(false)

  const isEmptyPredictions = !predictions || predictions.length === 0

  const openFilePicker = () => {
    if (fileInputRef.current) fileInputRef.current.click()
  }

  const normalizePredictions = (
    predictions: Array<PredictionTypes>,
    imgSize: ImgSizeTypes
  ) => {
    if (!predictions || !imgSize || !imageRef) return predictions || []
    return predictions.map((prediction: PredictionTypes) => {
      const { bbox } = prediction
      const oldX = bbox[0]
      const oldY = bbox[1]
      const oldWidth = bbox[2]
      const oldHeight = bbox[3]

      const imgWidth = imageRef.current.width
      const imgHeight = imageRef.current.height

      const x = (oldX * imgWidth) / imgSize.width
      const y = (oldY * imgHeight) / imgSize.height
      const width = (oldWidth * imgWidth) / imgSize.width
      const height = (oldHeight * imgHeight) / imgSize.height

      return { ...prediction, bbox: [x, y, width, height] }
    })
  }

  const detectObjectsOnImage = async (
    imageElement: any,
    imgSize: ImgSizeTypes
  ) => {
    const model = await cocoSsd.load({})
    const predictions = await model.detect(imageElement, 6)
    const normalizedPredictions: Array<PredictionTypes> = normalizePredictions(
      predictions,
      imgSize
    )
    setPredictions(normalizedPredictions)
  }

  const readImage = (file: File) => {
    return new Promise((rs, rj) => {
      const fileReader = new FileReader()
      fileReader.onload = () => rs(fileReader.result)
      fileReader.onerror = () => rj(fileReader.error)
      fileReader.readAsDataURL(file)
    })
  }

  const onSelectImage = async (e: any) => {
    setPredictions([])
    setLoading(true)

    const file = e.target.files[0]
    const imgData = await readImage(file)
    setImgData(imgData)

    const imageElement = document.createElement("img") as any
    imageElement.src = imgData

    imageElement.onload = async () => {
      const imgSize = {
        width: imageElement.width,
        height: imageElement.height,
      }
      await detectObjectsOnImage(imageElement, imgSize)
      setLoading(false)
    }
  }
  return (
    <AppContainer>
      <HumanDetectorContainer>
        <ImageContainer>
          {imgData && (
            <TargetImg
              src={imgData}
              ref={imageRef}
              style={{ width: "min(90vw,100%)", maxHeight: "700px" }}
            />
          )}
          {!isEmptyPredictions && (
            <>
              {predictions.map((prediction, idx) => {
                if (prediction.class !== "person")
                  return (
                    <TargetBox
                      key={idx}
                      x={prediction.bbox[0]}
                      y={prediction.bbox[1]}
                      width={prediction.bbox[2]}
                      height={prediction.bbox[3]}
                      classType={prediction.class}
                      score={prediction.score * 100}
                    />
                  )
              })}
              {predictions.map((prediction, idx) => {
                if (prediction.class === "person")
                  return (
                    <HumanTargetBox
                      key={idx}
                      x={prediction.bbox[0]}
                      y={prediction.bbox[1]}
                      width={prediction.bbox[2]}
                      height={prediction.bbox[3]}
                      classType={prediction.class}
                      score={prediction.score * 100}
                    />
                  )
              })}
            </>
          )}
        </ImageContainer>
        <FileLoader type="file" ref={fileInputRef} onChange={onSelectImage} />
        <SelectButton onClick={openFilePicker}>
          {isLoading ? "Analysing..." : "Select Image"}
        </SelectButton>
      </HumanDetectorContainer>
    </AppContainer>
  )
}
