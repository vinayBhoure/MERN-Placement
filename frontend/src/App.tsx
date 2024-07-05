import './App.css'
import { Suspense, lazy, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Loader from './components/Loader'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './auth/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './redux/api/userAPI'
import { UserState, userExist, userNotExist } from './redux/reducer/userReducer'
import ProtectedRoutes from './components/ProtectedRoutes'
import Coupons from './pages/admin/Coupons'
import Footer from './components/Footer'

const Home = lazy(() => import('./pages/Home'))
const Search = lazy(() => import('./pages/Search'))
const Cart = lazy(() => import('./pages/Cart'))
const ShippingPage = lazy(() => import('./pages/ShippingPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const Orders = lazy(() => import('./pages/Orders'))
const OrderDetails = lazy(() => import('./pages/OrderDetails'))
const Not_Found = lazy(() => import('./pages/Not_Found'))
const PaymentStatus = lazy(() => import('./pages/PaymentStatus'))
const MyProfile = lazy(() => import('./pages/MyProfile'))

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

  const dispatch = useDispatch();
  const { user, loading } = useSelector((state: { userReducer: UserState }) => state.userReducer);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUser(user.uid);
        dispatch(userExist(data.user));
      } else {
        dispatch(userNotExist());
      }
    })
  }, [])

  return loading ? <Loader /> : (
    <div>

      {/* header */}
      <Header user={user} />

      {/* routes */}

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />


          <Route path="/login" element={
            <ProtectedRoutes isLoggedIn={!user ? true : false}>
              <LoginPage />
            </ProtectedRoutes>
          } />

          {/* Logged In user routes */}
          <Route element={<ProtectedRoutes isLoggedIn={user ? true : false} redirectPath='/login' />}>
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/payment/:productInfo/:transactionId" element={<PaymentStatus />} />
            <Route path='/profile' element={<MyProfile />} />
            <Route path='/:user/:id' element={<OrderDetails />} />

          </Route>

          {/* ADMIN DASHBOARD ROUTES */}
          <Route element={<ProtectedRoutes isLoggedIn={user ? true : false}
            admin={user?.role === 'admin'} adminOnly={true}
          />}>
            <Route path='/admin/dashboard' element={<Dashboard />} />
            <Route path='/admin/products' element={<Products />} />
            <Route path='/admin/transactions' element={<Transactions />} />
            <Route path='/admin/customers' element={<Customers />} />
            <Route path='/admin/coupons' element={<Coupons />} />

            {/* Management */}
            <Route path='/admin/product/new' element={<AddNewProduct />} />
            <Route path='/admin/product/:id' element={<ProductManagement />} />
            <Route path='/admin/transaction/:id' element={<TransactionManagement />} />

            {/* Charts */}
            <Route path='/admin/charts/bar' element={<BarChart />} />
            <Route path='/admin/charts/line' element={<LineChart />} />
            <Route path='/admin/charts/pie' element={<PieChart />} />
          </Route>


          <Route path="*" element={<Not_Found />} />

        </Routes>
      </Suspense>

      {/* FOOTER */}
      <Footer />

    </div>
  )
}


export default App
