
import Sidebar from "../../../components/admin/Sidebar"
import {LineChart} from '../../../components/admin/Charts'

function LineCharts() {
  return (
    <div className="grid grid-cols-5 gap-8 min-h-[100vh] bg-[#f7f7f7]">

      {/* Sidebar */}
      <Sidebar />

      {/* /Main */}
      <main className="col-span-4 bg-white p-16 overflow-y-auto">
        <h1 className='mb-20 ml-8'>Line Charts</h1>
        <section className="w-[80%] my-16 mx-auto" >
          <LineChart
            data={[
              200, 444, 444, 556, 778, 455, 990, 1444, 256, 447, 1000, 1200,
            ]}
            label="Users"
            borderColor="rgb(53, 162, 255)"
            backgroundColor="rgba(53, 162, 255,0.5)"
            labels={["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]}
          />
          <h2 className="my-8 text-center">Active Users</h2>
        </section>
        <section className="w-[80%] my-16 mx-auto">
          <LineChart
            data={[40, 60, 244, 100, 143, 120, 41, 47, 50, 56, 32]}
            backgroundColor={"hsla(269,80%,40%,0.4)"}
            borderColor={"hsl(269,80%,40%)"}
            label="Products"
            labels={["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]}
          />
          <h2 className="my-8 text-center">Total Products (SKU)</h2>
        </section>

        <section className="w-[80%] my-16 mx-auto">
          <LineChart
            data={[
              24000, 14400, 24100, 34300, 90000, 20000, 25600, 44700, 99000,
              144400, 100000, 120000,
            ]}
            backgroundColor={"hsla(129,80%,40%,0.4)"}
            borderColor={"hsl(129,80%,40%)"}
            label="Revenue"
            labels={["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]}
          />
          <h2 className="my-8 text-center">Total Revenue</h2>
        </section>

        <section className="w-[80%] my-16 mx-auto">
          <LineChart
            data={[
              9000, 12000, 12000, 9000, 1000, 5000, 4000, 1200, 1100, 1500,
              2000, 5000,
            ]}
            backgroundColor={"hsla(29,80%,40%,0.4)"}
            borderColor={"hsl(29,80%,40%)"}
            label="Discount"
            labels={["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]}
          />
          <h2 className="my-8 text-center">Discount Allotted</h2>
        </section>
      </main>
    </div>
  )
}

export default LineCharts
