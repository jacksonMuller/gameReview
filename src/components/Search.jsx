
const Search = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
        <input className='text-black rounded-md px-4 py-2 w-30%' type='text' placeholder='Search' />
    </form>
  )
}

export default Search