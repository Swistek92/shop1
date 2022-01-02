import Header from "./components/Header";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {Container} from 'react-bootstrap';
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from './screens/ProductScreen' 
const App= ()=> {
  return (
    <div>

    <Router>
      <Header/>
       <main className="py-3">
         <Container>
            <Routes> 
        <Route path='/' element={<HomeScreen/>}/>
            
        <Route path='/product/:id' element={<ProductScreen/>}/>
             </Routes>

         </Container>

       </main>
      <Footer/>

    </Router>
    </div>
  );
}

export default App;
