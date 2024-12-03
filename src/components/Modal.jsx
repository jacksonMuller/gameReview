
export const Modal = ({result, setModalOpen}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 w-4/5 h-4/5">
        
            <button className="absolute top-2 right-2" onClick={() => setModalOpen(false)}>Close</button>
            <div>
                {result.name}
                <img src={result.cover.url} />
            </div>
            
        
    </div>
  )
}
