import AddBook from "./components/AddBook";
import BookList from "./components/BookList";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import EditBook from "./components/EditBook";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<BookList/>}></Route>
      <Route path="add" element={<AddBook/>}></Route>
      <Route path= "edit/:id"element={<EditBook/>}></Route>
    </Routes>
    
    </BrowserRouter>
  )
}

export default App