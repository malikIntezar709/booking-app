
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './layouts/Layout'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import AddHotel from './pages/AddHotel'
import { useAppContext } from './contexts/AppContext'

function App() {
  const { isLoggedIn }=useAppContext();
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout><p>Home Page</p></Layout>}></Route>
        <Route path='/register' element={<Layout><Register /></Layout>}></Route>
        <Route path='/sign-in' element={<Layout><SignIn /></Layout>}> </Route>
        <Route path='/search' element={<Layout><p>Search Page</p></Layout>}></Route>
        {
          isLoggedIn && <Route path='/add-hotel' element={<Layout><AddHotel /> </Layout>}></Route>
        }
        <Route path='*' element={<Navigate to='/' />}></Route>
      </Routes>
    </Router>
  )
}

export default App
