
export const Button = ({children, onClick, className}) => {
  return (
    <button 
        onClick={onClick}
        className={`mx-4 px-4 py-2sm:px-8 sm:py-2 rounded-md bg-secondary border-primary text-white font-semiboldsm:font-bold transition duration-200 hover:bg-white hover:text-black border-2 hover:secondary-100 ${className}`}
    >
    {children}
    </button>  
)
}
