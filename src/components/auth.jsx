import { login, logout, loggedInUserDisplayName } from "../services/authService.js"
import { Button } from "./ui/Button"

export function SignIn() {
  return <Button onClick={login}>Sign In</Button>
}

export function SignOut() {
  return (
    <div>
      Hello, {loggedInUserDisplayName()}  
      <Button onClick={logout}>Sign Out</Button>
    </div>
  )
}

