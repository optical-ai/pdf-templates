import Document from './Document'

import { variables } from './constant'
// import pdf from './assets/Payslip.pdf'

const App = () => {
  return (
    <div>
      <Document pdf={variables.base64}/>
    </div>
  )
}

export default App

