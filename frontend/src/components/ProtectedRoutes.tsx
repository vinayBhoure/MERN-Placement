import { ReactElement } from "react"
import { Navigate, Outlet } from "react-router"

type PropsType = {
    children?: ReactElement,
    isLoggedIn: boolean,
    adminOnly?: boolean,
    admin?: boolean,
    redirectPath?: string
}


function ProtectedRoutes({
    children,
    isLoggedIn,
    adminOnly,
    admin,
    redirectPath = "/"
}: PropsType) {

    if(!isLoggedIn) return <Navigate to={redirectPath} />

    if(adminOnly && !admin) return <Navigate to={redirectPath} />

    return (
         children ? children : <Outlet />
    )
}
export default ProtectedRoutes
