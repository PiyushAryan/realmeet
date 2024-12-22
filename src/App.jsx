import './App.css'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Editor from './pages/Editor'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Toaster } from 'react-hot-toast'



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/editor/:roomId" element={<Editor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster position='top:right'/>
    </>

  )
}

export default App
