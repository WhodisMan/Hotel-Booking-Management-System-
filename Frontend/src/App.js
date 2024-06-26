import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./page/Home";
import Login from "./page/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorPage } from "./page/ErrorPage";
import GlobleCotext from "./contextApi/GlobleContex";
import Register from "./page/Register";
import CategoryPage from "./page/CategoryPage";
import SingleHotelView from "./page/SingleHotelView";

function App() {
  return (
    <>
    <GlobleCotext>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/CategoryPage" element={<CategoryPage/>}/>
          <Route path="/Register" element={<Register/>} component={Register}/>
          <Route path="/Login" element={<Login/>} component={Login}/>
          <Route path="*" element={<ErrorPage/>}/>
          <Route path="/SingleHotelView/:id" element={<SingleHotelView/>}/>
        </Routes>
      </BrowserRouter>
      <Footer />
      </GlobleCotext>
    </>
  );
}

export default App;
