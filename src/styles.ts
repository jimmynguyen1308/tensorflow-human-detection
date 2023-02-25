import styled from "styled-components"

export const AppContainer = styled("div")`
  width: calc(100% + 16px);
  height: 100%;
  min-height: 100vh;
  margin: -8px;
  background-color: #1c2127;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
`

export const HumanDetectorContainer = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const ImageContainer = styled("div")`
  min-width: 200px;
  max-width: 90vw;
  max-height: 700px;
  border: 3px solid #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::before {
    content: "Human Detection";
    background-color: #fff;
    padding: 2px;
    margin-top: -5px;
    margin-left: 5px;
    color: black;
    font-weight: 500;
    font-size: 17px;
    position: absolute;
    top: -1.5em;
    left: -5px;
  }
`

export const TargetImg = styled("img")`
  height: 100%;
`

export const FileLoader = styled("input")`
  display: none;
`

export const SelectButton = styled("button")`
  padding: 7px 10px;
  border: 2px solid transparent;
  background-color: #fff;
  color: #0a0f22;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  margin-top: 2em;
  cursor: pointer;
  transition: all 260ms ease-in-out;

  &:hover {
    background-color: transparent;
    border: 2px solid #fff;
    color: #fff;
  }
`

export const TargetBox = styled("div")<{
  x: number
  y: number
  width: number
  height: number
  classType: string
  score: number
}>`
  position: absolute;
  left: ${({ x }) => x + "px"};
  top: ${({ y }) => y + "px"};
  width: ${({ width }) => width + "px"};
  height: ${({ height }) => height + "px"};

  border: 4px solid #e3e3dc;
  background-color: transparent;
  z-index: 20;

  &::before {
    content: "${({ classType, score }) => `${classType} ${score.toFixed(1)}%`}";
    background-color: #e3e3dc;
    padding: 2px;
    margin-top: -5px;
    color: black;
    font-weight: 500;
    font-size: 17px;
    position: absolute;
    top: -1.5em;
    left: -5px;
  }
`

export const HumanTargetBox = styled("div")<{
  x: number
  y: number
  width: number
  height: number
  classType: string
  score: number
}>`
  position: absolute;

  left: ${({ x }) => x + "px"};
  top: ${({ y }) => y + "px"};
  width: ${({ width }) => width + "px"};
  height: ${({ height }) => height + "px"};

  border: 4px solid #1ac71a;
  background-color: transparent;
  z-index: 20;

  &::before {
    content: "${({ classType, score }) => `${classType} ${score.toFixed(1)}%`}";
    background-color: #1ac71a;
    padding: 2px;
    margin-top: -5px;
    color: white;
    font-weight: 500;
    font-size: 17px;
    position: absolute;
    top: -1.5em;
    left: -5px;
  }
`
