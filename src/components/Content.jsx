import React from "react";

const Content = (user) => {
  console.log(user);
  return (
    <>
      {user && <div>User is logged in</div>}
      <div>Content</div>
    </>
  )
}

export default Content;
