
import { Route, Routes } from 'react-router-dom'
import SideBar from './componenets/SideBar'
import HomePage from './pages/HomePage'
import Favorites from './pages/Faveriouts'
import RecipeDetails from './componenets/RecipeDetails'
import Layout from './componenets/Layout'

function App() {

  return (
    <div className='flex'>
     

        <SideBar />
     
     
      <Routes>
        <Route path='/' element={ <HomePage />}></Route>
        <Route path='/favorites' element={<Favorites />}></Route>
        <Route path='/recipe/:id' element={<RecipeDetails/>}></Route>
       </Routes>
 


    </div>
  )
}

export default App
