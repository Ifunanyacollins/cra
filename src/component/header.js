
import { Menu } from 'lucide-react'
import Login from './login'



export default function Header() {


  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Menu/>
          <Login  />
        </div>
      </div>
    </header>
  )
}

