import Document from './Document'

import pdf from './assets/ArunSinghCV.pdf'

const App = () => {
  return (
    <div>
      <Document coordinates={[
         { x: 100, y: 150, width: 200, height: 50 },
         { x: 300, y: 400, width: 150, height: 100 },
      ]} pdf={pdf}/>
    </div>
  )
}

export default App