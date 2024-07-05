/**
 * v0 by Vercel.
 * @see https://v0.dev/t/o5fqm8ukhQx
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-12">
      <div className="container max-w-7xl grid grid-cols- place-content-center sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-4">
          <Link to="#" className="flex items-center gap-2" >
            <MountainIcon className="h-6 w-6" />
            <span className="font-bold text-lg">Acme Inc.</span>
          </Link>
          <div className="flex flex-col gap-2">
            <p>123 Main Street</p>
            <p>Anytown, USA 12345</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: info@acme.com</p>
          </div>
          <div className="flex gap-4">
            <Link to="#" className="text-muted-foreground hover:text-primary" >
              <TwitterIcon className="h-6 w-6" />
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-primary" >
              <FacebookIcon className="h-6 w-6" />
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-primary" >
              <InstagramIcon className="h-6 w-6" />
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-primary" >
              <LinkedinIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-lg">Navigation</h3>
          <nav className="flex flex-col gap-2">
            <Link to="#" className="hover:text-primary" >
              Home
            </Link>
            <Link to="#" className="hover:text-primary" >
              About
            </Link>
            <Link to="#" className="hover:text-primary" >
              Contact
            </Link>
            <Link to="#" className="hover:text-primary" >
              Help
            </Link>
            <Link to="#" className="hover:text-primary" >
              FAQ
            </Link>
          </nav>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-lg">Resources</h3>
          <nav className="flex flex-col gap-2">
            <Link to="#" className="hover:text-primary" >
              Blog
            </Link>
            <Link to="#" className="hover:text-primary" >
              Documentation
            </Link>
            <Link to="#" className="hover:text-primary" >
              Support
            </Link>
            <Link to="#" className="hover:text-primary" >
              Legal
            </Link>
          </nav>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-lg">Subscribe</h3>
          <p>Sign up for our newsletter to stay up-to-date on the latest news and updates.</p>
          <form className="flex gap-2">
            <Input type="email" placeholder="Enter your email" className="flex-1" />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>
      <div className="container max-w-7xl mt-8 flex items-center justify-between">
        <p className="text-xs">&copy; 2024 Acme Inc.</p>
        <nav className="flex gap-4">
          <Link to="#" className="text-xs hover:text-primary" >
            Terms of Service
          </Link>
          <Link to="#" className="text-xs hover:text-primary" >
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  )
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}


function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}


function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
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


function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}