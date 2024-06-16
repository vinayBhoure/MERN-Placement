import { BsSearch } from "react-icons/bs"
import Sidebar from "../../components/admin/Sidebar"
import { FaRegBell } from "react-icons/fa"
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi"
import BarChart, { DoughnutChart } from "../../components/admin/Charts"
import { BiMaleFemale } from "react-icons/bi"
import data from '../../assets/data.json'
import DashboardTable from "../../components/admin/DashboardTable"

const avatarUrl = "https://img.freepik.com/premium-photo/memoji-happy-man-white-background-emoji_826801-6838.jpg?size=626&ext=jpg"

function Dashboard() {
  return (
    <div className="grid lg:grid-cols-5 grid-cols-1 gap-8 h-[100vh] bg-[#f7f7f7]">

      {/* Sidebar */}
      <Sidebar />

      {/* /Main */}
      <main className="col-span-4 overflow-y-auto px-4">
        <div className={` h-[4rem] flex items-center py-0 px-1 border-b border-slate-300 gap-1`}
        >
          <BsSearch size={'1.2rem'} opacity={'0.7'} />
          <input type="text" placeholder="Searcg for data, users, docs" className="mr-auto bg-[#f7f7f7] w-full py-4 px-0 " />
          <FaRegBell />
          <img className="w-10 h-10 rounded-full" src={avatarUrl} alt="Rounded avatar" />
        </div>

        <section className="flex lg:justify-between  items-stretch gap-8 lg:py-8 lg:pr-8 p-8 justify-center flex-wrap">
          <WidgetItem percent={40} heading="revenue" value={30000} amount={true} color="blue" />
          <WidgetItem percent={70} heading="revenue" value={30000} amount={true} color="yellow" />
          <WidgetItem percent={95} heading="revenue" value={30000} amount={true} color="red" />
        </section>

        <section className=" flex gap-8 pr-8 pb-8 flex-wrap lg:flex-nowrap justify-center ">
          <div className="bg-white rounded-lg w-full py-4 px-8">
            <h2 className="text-xl text-center mt-4 mb-8 ml-1">Revenue and Transcation</h2>
            {/* <BarChart /> */}
            <BarChart
              data_2={[300, 144, 433, 655, 237, 755, 190]}
              data_1={[200, 444, 343, 556, 778, 455, 990]}
              title_1="Revenue"
              title_2="Transaction"
              bgColor_1="rgb(0,115,255)"
              bgColor_2="rgba(53,162,235,0.8)" />

          </div>
          <div className="bg-white rounded-lg w-full max-w-64 pb-8">
            <h2 className="text-xl text-center mt-6 mb-8 ">Inventory</h2>
            <div className="pl-2 overflow-y-auto">
              {data.categories.map((item, index) => (
                <CategoryItem key={index} color={item.color} heading={item.heading} value={item.value} />
              ))}
            </div>
          </div>

        </section>

        <section className="flex gap-8 lg:pr-8 lg:pb-8 p-8 h-[unset] lg:h-[25rem] flex-wrap lg:flex-nowrap justify-center">
          <div className="bg-white shadow-lg rounded-lg w-full max-w-[20rem] p-4 relative">
            <h2 className="text-center mt-6 mb-8 ">Gender Chart</h2>
            {/* charts donut */}
            <p className="text-lg absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]"><BiMaleFemale /></p>
            <DoughnutChart
              labels={["Female", "Male"]}
              data={[12, 19]}
              backgroundColor={["hsl(340,82%,56%)", "rgba(53,162,235,0.8)"]}
              cutout={90}
            />
          </div>

          {/* Table */}
          <div className="w-full bg-white rounded-lg">
            <DashboardTable data={data.transaction} />
          </div>
        </section>

      </main>
    </div>
  )
}

interface WidgetProps {
  heading: string,
  value: number,
  percent: number,
  color: string,
  amount?: boolean
}

const WidgetItem = ({ heading, value, percent, amount, color }: WidgetProps) => <article className="w-48 bg-white shadow-inner rounded p-2 flex justify-between items-stretch">
  <div className="">
    <p className="text-sm opacity-70">{heading}</p>
    <h3 className="text-2xl">{amount ? `$${value}` : value}</h3>
    {
      percent > 0 ? <span className="text-green-500 flex items-center text-xs"><HiTrendingUp /> +{percent}%</span>
        : <span className="text-red-500"><HiTrendingDown /> {percent}%</span>
    }
  </div>
  <div className="min-w-[4rem] rounded-full grid relative place-items-center " style={{ background: `conic-gradient(${color} ${(percent / 100) * 360}deg, rgb(255,255,255) 0)` }}>
    <div className="rounded-full w-[3.5rem] h-[3.5rem] grid place-items-center absolute bg-white">
      <span className={`text-${color} relative`} style={{ color: `${color}` }}>{percent}%</span>
    </div>
  </div>
</article>

interface CategoryItemProps {
  color: string,
  heading: string,
  value: number
}

const CategoryItem = ({ color, heading, value }: CategoryItemProps) => (
  <div className="w-full flex justify-between items-center gap-1 p-4">
    <h5 className="font-light tracking-wide">{heading}</h5>
    <div className="ml-auto w-24 rounded-2xl h-2 bg-[rgb(217,217,217)]">
      <div style={{ backgroundColor: `${color}`, width: `${value}%` }} className="h-full rounded-2xl"></div>
    </div>
    <span className="font-bold text-sm">{value}%</span>
  </div>
)

const CategoryItemArr = [
  {
    color: 'blue',
    heading: 'Phones',
    value: 30
  },
  {
    color: 'yellow',
    heading: 'Laptops',
    value: 50
  },
  {
    color: 'green',
    heading: 'Tablets',
    value: 70
  }
]

export default Dashboard
