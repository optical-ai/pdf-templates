import Document from './Document'

import { variables } from './constant'

import coords from './data.json'

const App = () => {

  return (
    <div>
      <Document pdf={variables.base64v1}/>
    </div>
  )
}

export default App

