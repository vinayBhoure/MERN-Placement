import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignLanguage, FaSignOutAlt, FaUserAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useState } from "react"

const user = { _id: 1, role: "admin" }

function Header() {

  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const dialogHandler = () => setOpenDialog(!openDialog)

  return (
    <div className="flex justify-end gap-4">
      <Link to="/">Home</Link>
      <Link to="/search"><FaSearch /></Link>
      <Link to="/cart"><FaShoppingBag /></Link>

      {user?._id ?
        <>
          <button onClick={dialogHandler}>
            <FaUserAlt />
            <dialog open={openDialog}>
              {user.role === "admin" && <Link to="/admin/dashboard">Admin</Link>}
              <Link to='/orders'>Orders</Link>
              <Link to='/profile'>Profile</Link>
              <Link to='/logout'>< FaSignOutAlt /></Link>
            </dialog>
          </button>
        </>
        :
        <Link to="/login"><FaSignInAlt /></Link>}
    </div>
  )
}

export default Header
