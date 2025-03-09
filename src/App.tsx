import './App.css'

import ProductList from './components/ProductList'
import ProductProvider from './context/ProductProvider'
import TopBar from './components/TopBar'

function App() {

  return (
    <>
      <TopBar />
      <ProductProvider>
        <ProductList />
      </ProductProvider>
    </>
  )
}

export default App
