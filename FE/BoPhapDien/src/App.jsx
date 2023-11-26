import { Route, Router, Routes } from "react-router-dom";
import Home from './pages/Home';
import ContentAlbum from './components/Content-Album/ContentAlbum';
import NotFound from './pages/NotFound';
import QuestionAndAnswer from './pages/QuestionsAndAnswer';
import Login from './pages/Login';
function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path='' element={<ContentAlbum />}></Route>
        </Route>
        <Route path='/q&a' element={<QuestionAndAnswer />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
