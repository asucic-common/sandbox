//import logo from './logo.svg';
import './App.css';
/*
import { 
  Hellowroldform 
} from './ui-components';
*/
import { 
  Jsonform 
} from './ui-components';

function App() {
  return (
    <div className="App">
<Jsonform
  onSubmit={fields => { /* Handle form submission */}}
/>
    </div>
  );
}

export default App;
