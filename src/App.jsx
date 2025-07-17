import React from 'react'
import Dashboard from './pages/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import NoPage from './pages/NoPage'

import CreatePurchases from './pages/Purchases/CreatePurchases'
import ManagePurchases from './pages/Purchases/ManagePurchases'

import CreateSupplier from './pages/Supplier/CreateSupplier'
import ManageSupplier from './pages/Supplier/ManageSupplier'

import CreateStock from './pages/Stock/CreateStock'
import ManageStock from './pages/Stock/ManageStock'






import CreateInvoice from './pages/Accounts/CreateInvoice'
import ManageInvoice from './pages/Accounts/ManageInvoice'

import CreateOrder from './pages/Order/CreateOrder'
import ManageOrder from './pages/Order/ManageOrder'



  

import CreateProduction from './pages/Production/CreateProduction'
import ManageProduction from './pages/Production/ManageProduction'

import ManageProduct from './pages/Product/ManageProduct'
import CreateProduct from './pages/Product/CreateProduct'

import CreateRawMaterial from './pages/Inventory/RawMaterial/CreateRawMaterial'
import ManageRawMaterial from './pages/Inventory/RawMaterial/ManageRawmaterial'

import CreateFinishedGoods from './pages/Inventory/FinishedGood/CreateFinishedGood'
import ManageFinishedGood from './pages/Inventory/FinishedGood/ManageFinished'

import CreateCustomer from './pages/Customer/CreateCustomer'
import ManageCustomer from './pages/Customer/ManageCustomer'
import CreateMoney from './pages/MR/CreateMR'
import ManageMoney from './pages/MR/ManageMR'









const App = () => {
    return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="create-purchases" element={<CreatePurchases />} />      
          <Route path="manage-purchases" element={<ManagePurchases />} />   

          <Route path="create-supplier" element={<CreateSupplier />} />      
          <Route path="manage-supplier" element={<ManageSupplier />} /> 

          <Route path="create-stock" element={<CreateStock />} />      
          <Route path="manage-stock" element={<ManageStock />} /> 

          <Route path="create-production" element={<CreateProduction />} />   
          <Route path="manage-production" element={<ManageProduction />} />   

          <Route path="create-product" element={<CreateProduct />} />   
          <Route path="manage-product" element={<ManageProduct />} />   

          <Route path="create-rawmaterials" element={<CreateRawMaterial />} />   
          <Route path="manage-rawmaterials" element={<ManageRawMaterial />} />   
           
          <Route path="create-finishedgoods" element={<CreateFinishedGoods />} />   
          <Route path="manage-finishedgoods" element={<ManageFinishedGood />} />   


          <Route path="create-order" element={<CreateOrder />} />      
          <Route path="manage-order" element={<ManageOrder />} />   

          <Route path="create-customers" element={<CreateCustomer />} />      
          <Route path="manage-customers" element={<ManageCustomer/>} />  

          <Route path="create-invoice" element={<CreateInvoice />} />      
          <Route path="manage-invoice" element={<ManageInvoice />} />   

          <Route path="create-MR" element={<CreateMoney />} />   
          <Route path="manage-MR" element={<ManageMoney />} />   
         
          

          <Route path="*" element={<NoPage />} />
          </Route>
      </Routes>
    </BrowserRouter>
    )
}

export default App;