import Header from "./component/header";
import { useStore } from "./store";

function App() {
 const {access_token} = useStore()
  return (
    <div className="min-h-screen flex flex-col">
     <Header />
      <div className='flex flex-1'>
        <div>sidebar</div>
        <div>{access_token}</div>
        </div>
    </div>
  );
}

export default App;
