/**
 * v0 by Vercel.
 * @see https://v0.dev/t/gTTwGtbbusb
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { User } from "@/types/types"
import { signOut } from "firebase/auth"
import { auth } from "@/auth/firebase"
import toast from "react-hot-toast"
import { useState } from "react"


type PropsType = {
    user: User | null
}

export default function Component({user}:PropsType) {

    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()


    const logoutHandler = async() => {
        try{
           await signOut(auth);
           user = null
           navigate('/login')
           toast.success('Logged out successfully')
        }catch(error){
            console.error(error)
        }
    }

    return (
        <header className="flex items-center h-16 px-4 md:px-6 bg-background border-b">
            <div className="flex items-center gap-4 md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MenuIcon className="w-6 h-6" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <div className="grid gap-4 p-4">
                            <Link to="#" className="flex items-center gap-2" >
                                <MountainIcon className="w-6 h-6" />
                                <span className="sr-only">Acme Inc</span>
                            </Link>
                            <div className="grid gap-2">
                                <Link to="/" className="text-sm font-medium hover:underline underline-offset-4" >
                                    Home
                                </Link>
                                <Link to="/search" className="text-sm font-medium hover:underline underline-offset-4" >
                                    Search
                                </Link>
                                <Link to="/cart" className="text-sm font-medium hover:underline underline-offset-4" >
                                    Cart
                                </Link>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
                <Link to="#" className="flex items-center gap-2" >
                    <MountainIcon className="w-6 h-6" />
                    <span className="sr-only">Acme Inc</span>
                </Link>
            </div>
            <nav className="hidden md:flex items-center gap-4 md:gap-6 ml-auto">
                <Link to="/" className="text-sm font-medium hover:underline underline-offset-4" >
                    Home
                </Link>
                <Link to="/search" className="text-sm font-medium hover:underline underline-offset-4" >
                    Search
                </Link>
                <Link to="/cart" className="text-sm font-medium hover:underline underline-offset-4" >
                    Cart
                </Link>
            </nav>
            {user?._id ?
                <div className="ml-auto flex items-center gap-4">
                    <Dialog open={isOpen} onOpenChange={setIsOpen} >
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user.photo} />
                                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] max-w-[90vw] w-full">
                            <div className="flex flex-col gap-4 py-6 px-4">
                                <div className="grid gap-2">
                                    <h3 className="text-lg font-bold">{user.name}</h3>
                                    <p className="text-sm text-muted-foreground">{user.email}</p>
                                </div>
                                <Separator />
                                <div className="grid gap-2">
                                    {user.role === 'admin' &&
                                        <Button variant="ghost" asChild onClick={() => setIsOpen(false)}>
                                            <Link to="/admin/dashboard" className="justify-start gap-2" >
                                                <SettingsIcon className="w-4 h-4" />
                                                Dashboard
                                            </Link>
                                        </Button>
                                    }
                                    <Button variant="ghost" asChild onClick={() => setIsOpen(false)}>
                                        <Link to="/orders" className="justify-start gap-2" >
                                            <PackageIcon className="w-4 h-4" />
                                            My Orders
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" asChild onClick={() => setIsOpen(false)}>
                                        <Link to="/profile" className="justify-start gap-2" >
                                            Profile
                                        </Link>
                                    </Button>
                                    <Button onClick={() => {
                                        setIsOpen(false)
                                        logoutHandler()
                                    }} >
                                        <Link to="/login" className=" hover:underline underline-offset-4 flex gap-2 justify-start items-center" >
                                            <LogOutIcon className="w-4 h-4" />
                                            Logout
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
                : <Link to="/login" className="ml-auto text-sm font-medium hover:underline underline-offset-4" >
                    Login
                </Link>}
        </header>
    )
}

function LogOutIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
        </svg>
    )
}


function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    )
}


function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    )
}


function PackageIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
        </svg>
    )
}


function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}