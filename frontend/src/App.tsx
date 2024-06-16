import './App.css'
import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Loader from './components/Loader'
const Home = lazy(() => import('./pages/Home'))
const Search = lazy(() => import('./pages/Search'))
const Cart = lazy(() => import('./pages/Cart'))

// ADMIN DASHBOARD IMPORTS
const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const Products = lazy(() => import('./pages/admin/Products'))
const Transactions = lazy(() => import('./pages/admin/Transactions'))
const Customers = lazy(() => import('./pages/admin/Customers'))
const AddNewProduct = lazy(() => import('./pages/admin/Managements/AddNewProduct'))
const ProductManagement = lazy(() => import('./pages/admin/Managements/ProductManagement'))
const TransactionManagement = lazy(() => import('./pages/admin/Managements/TransactionManagement'))
const BarChart = lazy(() => import('./pages/admin/Charts/BarCharts'))
const LineChart = lazy(() => import('./pages/admin/Charts/LineCharts'))
const PieChart = lazy(() => import('./pages/admin/Charts/PieCharts'))




function App() {

  return (
    <div>

      {/* header */}
      <Header />

      {/* routes */}

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />

          {/* ADMIN DASHBOARD ROUTES */}
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/products' element={<Products />} />
          <Route path='/admin/transactions' element={<Transactions />} />
          <Route path='/admin/customers' element={<Customers />} />

          {/* Management */}
          <Route path='/admin/product/new' element={<AddNewProduct />} />
          <Route path='/admin/product/:id' element={<ProductManagement />} />
          <Route path='/admin/transaction/:id' element={<TransactionManagement />} />

          {/* Charts */}
          <Route path='/admin/charts/bar' element={<BarChart />} />
          <Route path='/admin/charts/line' element={<LineChart />} />
          <Route path='/admin/charts/pie' element={<PieChart />} />

        </Routes>
      </Suspense>
    </div>
  )
}

export default App
