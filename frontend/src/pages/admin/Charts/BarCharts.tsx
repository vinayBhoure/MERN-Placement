import Sidebar from "../../../components/admin/Sidebar"
import BarChart from "../../../components/admin/Charts"

function BarCharts() {
  return (
    <div className="grid grid-cols-5 gap-8 min-h-[100vh] bg-[#f7f7f7]">

      {/* Sidebar */}
      <Sidebar />

      {/* /Main */}
      <main className="col-span-4 p-16 overflow-y-auto bg-white">
        <h2 className="mb-20 ml-8">Prodcuts and Customer</h2>
        <section className="w-[80%] my-16 mx-auto">
          <BarChart
            data_1={[200, 444, 343, 556, 778, 455, 990]}
            data_2={[300, 144, 433, 655, 237, 755, 190]}
            title_1="Products"
            title_2="Users"
            bgColor_1={`hsl(260,50%,30%)`}
            bgColor_2={`hsl(360,90%,90%)`}
          />
          <h2 className="my-8 text-center">Top Selling Products and Top Customers</h2>
        </section>

        <section className="w-[80%] my-16 mx-auto">
          <BarChart
            horizontal={true}
            data_1={[
              200, 444, 343, 556, 778, 455, 990, 444, 122, 334, 890, 909,
            ]}
            data_2={[]}
            title_1="Products"
            title_2=""
            bgColor_1={`hsl(180, 40%, 50%)`}
            bgColor_2=""
            labels={["Janurary", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]}
          />
          <h2 className="my-8 text-center">Orders throughtout the year</h2>
        </section>

      </main>
    </div>
  )
}

export default BarCharts
