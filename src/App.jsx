
import { Route, Routes } from 'react-router-dom'
import SideBar from './componenets/SideBar'
import Favorites from './pages/Faveriouts'
import RecipeDetails from './componenets/RecipeDetails'
import SearchPage from './pages/SearchPage'
import HomePage from './pages/HomePage'
import { useState } from 'react'
function App() {

  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // State to manage sidebar visibility

  return (
    <div className='flex'>
     

      
       {isSidebarVisible && <SideBar/>}
     
      <Routes>
        <Route path='/' element={<HomePage   setIsSidebarVisible={setIsSidebarVisible}/>}></Route>
        <Route path='/Search' element={ <SearchPage />}></Route>
        <Route path='/favorites' element={<Favorites />}></Route>
        <Route path='/recipe/:id' element={<RecipeDetails/>}></Route>
       </Routes>
 


    </div>
  )
}

export default App
