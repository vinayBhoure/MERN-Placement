import { RootState, server } from "@/redux/store";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function MyProfile() {

    const { user, loading } = useSelector((state: RootState) => state.userReducer);

    const date = new Date(user?.dob!)
    const dob = `${date.getDay()}-${date.getMonth() + 1}-${date.getFullYear()}`

    return (
        <div className="pb-20">
            {
                loading ? <Loader /> :
                    <div className="px-4">
                        <div className="flex flex-col items-center md:flex-row md:justify-center gap-10 mt-10">
                            <div className="flex items-start">
                                <img
                                    src={`${user?.photo}`}
                                    alt={`${user?.name}'s picture`}
                                    className="h-20 w-20 rounded-full"
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <h1 className="font-semibold" >{user?.name}</h1>
                                <p>{user?.email}</p>
                                <p>{dob}</p>
                                <p>{user?.gender}</p>

                            </div>
                        </div>
                        <div className="flex items-start sm:items-center flex-col mt-16 gap-6">
                            <p className="text-xl" >To check your orders click {" "}
                                <span className="text-blue-700 font-medium hover:underline">
                                    <Link to={"/orders"}>
                                        here
                                    </Link>
                                </span>
                            </p>
                            <p className="text-xl" >Check out our latest product {" "}
                                <span className="text-blue-700 font-medium hover:underline">
                                    <Link to={"/"}>
                                        here
                                    </Link>
                                </span>
                            </p>
                        </div>
                    </div>

            }
        </div>
    )
}

export default MyProfile
