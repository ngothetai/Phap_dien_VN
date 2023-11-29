import { Route, Router, Routes } from "react-router-dom";
import Home from './pages/Home';
import ContentAlbum from './components/Content-Album/ContentAlbum';
import NotFound from './pages/NotFound';
import QuestionAndAnswer from './pages/QuestionsAndAnswer';
function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path='' element={<ContentAlbum />}></Route>
        </Route>
        <Route path='/chatbot' element={<QuestionAndAnswer />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
