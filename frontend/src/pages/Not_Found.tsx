import { MdError } from "react-icons/md";
import { Link } from "react-router-dom"

function Not_Found() {
  return (
    <div className="flex flex-col justify-center items-center gap-4" style={{minHeight:'calc(100vh - 4rem)'}}>
      <div>
      <MdError size={75} />
      </div>
      <p className="font-bold text-4xl">Page Not Found</p>
      <Link to="/">Go back to <span className="text-purple-500 hover:text-blue-700 hover:underline">Home</span></Link>
    </div>
  )
}

export default Not_Found
