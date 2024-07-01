import Document from './Document'

import { variables } from './constant'

import coords from './data.json'

const App = () => {

  console.log(coords.filter((coord) => coord.BlockType === "LINE"))

  return (
    <div>
      <Document pdf={variables.base64v1}/>
    </div>
  )
}

export default App

