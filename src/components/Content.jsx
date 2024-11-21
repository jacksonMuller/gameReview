import React from "react";
import Search from "./Search";
import CreateReview from "./CreateReview";

const Content = ({user}) => {
  return (
    <>
      {!user && <div>User is not logged in</div>}
      <div className="flex flex-row justify-between items-center px-5">
        <Search />
        <CreateReview />
      </div>
      
      <div>Content</div>
    </>
  )
}

export default Content;
