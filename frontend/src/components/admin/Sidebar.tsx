import { Link, useLocation } from "react-router-dom";
import { RiDashboardFill, RiShoppingBag3Fill } from "react-icons/ri";
import { AiFillFileText } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { FaChartBar, FaChartLine, FaChartPie } from "react-icons/fa";
import { RiCoupon2Fill } from "react-icons/ri";

const Dashboard = [{
    title: "Dashboard",
    icon: <RiDashboardFill size={17} />,
    path: "/admin/dashboard"
},
{
    title: "Products",
    icon: <RiShoppingBag3Fill size={17} />,
    path: "/admin/products"
},
{
    title: "Transactions",
    icon: <AiFillFileText size={17} />,
    path: "/admin/transactions"
},
{
    title: "Customers",
    icon: <IoIosPeople size={17} />,
    path: "/admin/customers"
}
]

const Charts = [{
    title: "Bar",
    icon: <FaChartBar size={17} />,
    path: "/admin/charts/bar"
},
{
    title: "Line",
    icon: <FaChartLine size={17} />,
    path: "/admin/charts/line"
},
{
    title: "Pie",
    icon: <FaChartPie size={17} />,
    path: "/admin/charts/pie"
}
]

interface LiProps {
    title: string;
    icon: JSX.Element;
    path: string;
}

function Sidebar() {

    const location = useLocation();

    return (
        <aside className="w-[100%] bg-white p-4 z-10 overflow-y-auto  ">
            <div className=" mx-4">
                <h5 className="opacity-50 uppercase text-base font-bold mx-4 my-2">Dashboard</h5>
                <ul className="flex flex-col gap-2 xl:pl-6">
                    {Dashboard.map((item: LiProps, index: number) => {

                        return <li key={index} className={`py-2 px-1 rounded-lg ${location.pathname.includes(item.path) ? "bg-blue-200" : "hover:bg-blue-100"} `}>
                            <Link to={item.path} className="flex flex-row items-center gap-4">
                                {item.icon}
                                {item.title}
                            </Link>
                        </li>
                    })}

                </ul>
            </div>
            <div className="my-8 mx-4">
                <h5 className="opacity-50 uppercase text-base font-bold mx-4">Charts</h5>
                <ul className="flex flex-col gap-2 pl-6">
                    {Charts.map((item: LiProps, index: number) => {

                        return <li key={index} className={`py-2 px-1 rounded-lg ${location.pathname.includes(item.path) ? "bg-blue-200" : "hover:bg-blue-100"} `}>
                            <Link to={item.path} className="flex flex-row items-center gap-4">
                                {item.icon}
                                {item.title}
                            </Link>
                        </li>
                    })}

                </ul>
            </div>
            <div className="my-8 mx-4">
                <h5 className="opacity-50 uppercase text-base font-bold mx-4">Others</h5>
                <ul className="flex flex-col gap-2 pl-6">
                    <li className={`py-2 px-1 rounded-lg ${location.pathname.includes("coupon") ? "bg-blue-200" : "hover:bg-blue-100"} `}>
                        <Link to={'/admin/coupons'} className="flex flex-row items-center gap-4">
                        <RiCoupon2Fill size={17} />
                            Coupon
                        </Link>
                    </li>


                </ul>
            </div>
        </aside>
    )
}

export default Sidebar
