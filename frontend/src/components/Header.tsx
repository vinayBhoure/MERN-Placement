import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUserAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
import { ReactElement, useState } from "react"

const user = { _id: 1, role: "admin" }

function Header() {

  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const dialogHandler = () => setOpenDialog(!openDialog)

  return (
    <div className="flex justify-end items-center gap-4 p-4">
      <LinkTo func={dialogHandler} path="/">Home</LinkTo>
      <LinkTo func={dialogHandler} path="/search"><FaSearch /></LinkTo>
      <LinkTo func={dialogHandler} path="/cart"><FaShoppingBag /></LinkTo>

      {user?._id ?
        <>
          <button className="pointer bg-[transparent] hover:text-[#006A88] text-lg border-none " onClick={dialogHandler}>
            <FaUserAlt />
            <dialog className=""
              open={openDialog}>
              {user.role === "admin" && <LinkTo path="/admin/dashboard">Admin</LinkTo>}
              <LinkTo path='/orders'>Orders</LinkTo>
              <LinkTo path='/profile'>Profile</LinkTo>
              <LinkTo path='/logout'>< FaSignOutAlt /></LinkTo>
            </dialog>
          </button>
        </>
        :
        <LinkTo path="/login"><FaSignInAlt /></LinkTo>}
    </div>
  )
}

interface LinkToProps {
  path: string,
  children: ReactElement | string
  func?: () => void
}

const LinkTo = ({ path, children, func }: LinkToProps) => {
  return (
    <Link className="text-[#2E2E2E] hover:text-[#006A88] text-lg tracking-wide" onClick={func} to={path}>{children}</Link>
  )
}

export default Header
