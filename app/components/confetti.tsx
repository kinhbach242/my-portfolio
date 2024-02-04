"use client"

import { useState } from "react"
import Fireworks from "react-canvas-confetti/dist/presets/fireworks"
import { TConductorInstance } from "react-canvas-confetti/dist/types"

export default function Confetti() {
  const [conductor, setConductor] = useState<TConductorInstance>()
  const onInit = ({ conductor }: { conductor: TConductorInstance }) => {
    setConductor(conductor)
  }
  const onOnce = () => {
    conductor?.run({
      duration: 10000,
      speed: 1,
      delay: 500,
    })
  }
  return (
    <>
      <button onClick={onOnce}>Press to Happy New Year</button>
      <Fireworks onInit={onInit} />
    </>
  )
}
