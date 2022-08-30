import './App.css';
import Nav from './Components/Nav'
import Feed from './Components/Feed'
import Form from './Components/Form';


function App() {
  return (
    <div className="App">
      <Nav/>
      <div className='container middle'>
        <Form/>
        <Feed/>
      </div>
    </div>
  );
}

export default App;
