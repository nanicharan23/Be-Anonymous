import './App.css';
import Nav from './Components/Nav'
import Feed from './Components/Feed'
import Form from './Components/Form';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
      <Nav/>
      <div className='container middle'>
        <Form/>
        <Feed/>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
