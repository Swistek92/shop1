import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/' element={<HomeScreen />} />

              <Route path='/product/:id' element={<ProductScreen />} />
              <Route path='/product/' element={<ProductScreen />} />
              <Route path='/cart/:id' element={<CartScreen />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
