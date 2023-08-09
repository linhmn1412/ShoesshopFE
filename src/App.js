
import { ToastContainer } from 'react-toastify';
import RoutesConfig from './routes/RoutesConfig';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  console.log(1)
  return (
    <div className="App">
      <RoutesConfig/>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar closeOnClick pauseOnHover draggable={false}/>
    </div>
  );
}

export default App;
