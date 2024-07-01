import React from "react";
import * as d3 from 'd3'

interface Textract {
  BlockType: string
  Confidence: number
  Text: string
  Geometry: {
    BoundingBox: {
      Width: number
      Height: number
      Left: number
      Top: number
    }
    Polygon: { X: number; Y: number }[]
  }
}

const Viewer = ({ pdf }: { pdf: string }) => {

  const imageRef = React.useRef(null)

  const textractResponse = {
    "invoice": {
        "BlockType": "LINE",
        "Confidence": 99.88423156738281,
        "Text": "INVOICE",
        "Geometry": {
            "BoundingBox": {
                "Width": 0.15801125764846802,
                "Height": 0.011669513769447803,
                "Left": .09820880740880966,
                "Top": 0.3165741264820099
            },
            "Polygon": [
                {"X": 0.09820880740880966, "Y": 0.3165741264820099},
                {"X": 0.2562142610549927, "Y": 0.3165951371192932},
                {"X": 0.2562200725078583, "Y": 0.3282436430454254},
                {"X": 0.09821387380361557, "Y": 0.3282226026058197}
            ]
        }
    },
    "documentId": {
        "BlockType": "WORD",
        "Confidence": 99.66859436035156,
        "Text": "#1024",
        "TextType": "PRINTED",
        "Geometry": {
            "BoundingBox": {
                "Width": 0.061641059815883636,
                "Height": 0.011103957891464233,
                "Left": 0.8380616903305054,
                "Top": 0.14300741255283356
            },
            "Polygon": [
                {"X": 0.8380616903305054, "Y": 0.14300741255283356},
                {"X": 0.8996943831443787, "Y": 0.14301548898220062},
                {"X": 0.8997027277946472, "Y": 0.1541113704442978},
                {"X": 0.83806973695755, "Y": 0.15410327911376953}
            ]
        }
    },
    "content-Type":{
      "BlockType": "WORD",
      "Confidence": 99.66859436035156,
      "Text": "Content type",
      "TextType": "PRINTED",
      "Geometry":{
        "BoundingBox": {
            "Width": 0.12774381041526794,
            "Height": 0.011639556847512722,
            "Left": 0.09977535158395767,
            "Top": 0.4632842242717743
        },
        "Polygon": [
            {
                "X": 0.09977535158395767,
                "Y": 0.4632842242717743
            },
            {
                "X": 0.22751350700855255,
                "Y": 0.463301420211792
            },
            {
                "X": 0.22751915454864502,
                "Y": 0.4749237895011902
            },
            {
                "X": 0.09978041052818298,
                "Y": 0.4749065637588501
            }
        ]
    }
    }
};

  const drawBoundingBox = (block:Textract) => {
    const svg = d3.select('svg')
    const polygon = block.Geometry.Polygon
    const points = polygon.map(p => `${p.X * 1500},${p.Y * 1605}`).join(' ')
    svg.append('polygon')
      .attr('points', points)
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', 2)
  }

  const drawText = (block:Textract) => {
    const svg = d3.select('svg')
    const polygon = block.Geometry.Polygon
    const text = block.Text
    const x = polygon[0].X * 1500
    const y = polygon[0].Y * 1605
    svg.append('text')
      .attr('x', x)
      .attr('y', y)
      .attr('fill', 'black')
      .attr('font-size', 20)
      .classed('text', true)
      .text(text)
  }

  const drawBlock = (block:Textract) => {
      drawBoundingBox(block)
      drawText(block)
  }

  const drawBlocks = (blocks:Textract[]) => {
    blocks.forEach(block => drawBlock(block))
  }

  React.useEffect(() => {
    const blocks = textractResponse["content-Type"]
    drawBlocks([blocks])
  }, [imageRef])

  return (
    <svg
      x="100"
      y="100"
      width="1240"
      height="1605"
      viewBox="0 0 1240 1605"
      preserveAspectRatio="xMidYMid meet"
      scale={0.1}
      className="svg"
      cursor={"crosshair"}
    >
      <image ref={imageRef} href={pdf} width="1240" height="1605" className="image" />
    </svg>
  );
};

export default Viewer;
