import '../App.css'
import Navigation from './Navigation'
import Content from './Content'
import Footer from './Footer'
import { useAuthentication } from '../services/authService.js'

export default function App() {
  const user = useAuthentication();
  return (
    <>
      <Navigation user={user} />
      <Content user={user} />
      <Footer />
    </>
  )
}

