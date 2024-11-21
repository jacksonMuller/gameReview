import {SignIn, SignOut} from "./auth"

const Navigation = ({user}) => {
  console.log(user);
  return (
    <nav className="flex justify-between flex-row border-solid border-b-2 p-5 items-center">
      <h1 className="text-4xl font-bold">Game Review</h1>
      {!user ? <SignIn /> : <SignOut />}
    </nav>
  );
};

export default Navigation;
