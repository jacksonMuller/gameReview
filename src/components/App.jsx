import '../App.css'
import Navigation from './Navigation'
import Content from './Content'
import Footer from './Footer'
import FetchTopGames from './fetchTopGames'
import { useAuthentication } from '../services/authService.js'
import { useState } from 'react';

export default function App() {
  const user = useAuthentication();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (game) => {
    setModalOpen(true);
    setModalContent(game);
  };

  return (
    <>
      <Navigation user={user} />
      <Content user={user} modalOpen={modalOpen} modalContent={modalContent} setModalOpen={setModalOpen} openModal={openModal}/>
      <Footer />
    </>
  )
}
