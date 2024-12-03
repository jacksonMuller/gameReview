import {useState} from "react";
import Search from "./Search";
import CreateReview from "./CreateReview";
import { Button } from "./ui/Button";
import { Modal } from "./Modal";


const Content = ({user}) => {
  const [results, setResults] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [content, setContent] = useState([]);

  const openModal = (result) => {
    setModalOpen(true);
    setContent(result);
    console.log(result);
  };

  return (
    <>
      {!user && <div>User is not logged in</div>}
      <div className="flex flex-row justify-between items-center px-5">
        <Search setResults={setResults}/>
        <CreateReview/>
      </div>
      
      <div>
        <h1 className="text-4xl font-bold">Results for Game</h1>
        {results.length === 0 ? (
          <p>No results found</p>
        ) : (
          <ul>
            {results.map((result) => (
              <Button key={result.id} className="text-white flex flex-start w-4/5 p-2 m-5" type="button" onClick={(e) => openModal(result)}>
                {result.name}
              </Button>
            ))}
          </ul>
      )}
        {modalOpen && (
          <Modal result={content} setModalOpen={setModalOpen} />
        )}
      </div>
    </>
  )
}

export default Content;
