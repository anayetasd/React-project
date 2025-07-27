import React from 'react'
import Dashboard from './pages/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import NoPage from './pages/NoPage'

import CreatePurchases from './pages/Purchases/CreatePurchases'
import ManagePurchases from './pages/Purchases/ManagePurchases'
import EditPurchases from './pages/Purchases/editpurchases'
import ShowPurchases from './pages/Purchases/showPurchases'
import DeletePurchases from './pages/Purchases/deletePurchases'

import CreateSupplier from './pages/Supplier/CreateSupplier'
import ManageSupplier from './pages/Supplier/ManageSupplier'
import EditSupplier from './pages/Supplier/EditSupplier'
import ShowSupplier from './pages/Supplier/ShowSupplier'
import DeleteSupplier from './pages/Supplier/DeleteSupplier'

import ManageStock from './pages/Stock/ManageStock'
import CreateStock from './pages/Stock/CreateStock'
import EditStock from './pages/Stock/EditStock'
import ShowStock from './pages/Stock/ShowStock'
import DeleteStock from './pages/Stock/DeleteStock'


import ManageOrder from './pages/Order/ManageOrder'
import CreateOrder from './pages/Order/CreateOrder'
import EditOrder from './pages/Order/EditOrder'
import ShowOrder from './pages/Order/ShowOrder'
import DeleteOrder from './pages/Order/DeleteOrder'

import CreateProduction from './pages/Production/CreateProduction'
import ManageProduction from './pages/Production/ManageProduction'
import EditProduction from './pages/Production/EditProduction'
import ShowProduction from './pages/Production/ShowProduction'
import DeleteProduction from './pages/Production/DeleteProduction'


import ManageProduct from './pages/Product/ManageProduct'
import CreateProduct from './pages/Product/CreateProduct'
import EditProduct from './pages/Product/EditProduct'
import ShowProduct from './pages/Product/ShowProduct'
import DeleteProduct from './pages/Product/DeleteProduct'



import CreateRawMaterial from './pages/Inventory/RawMaterial/CreateRawMaterial'
import ManageRawMaterial from './pages/Inventory/RawMaterial/ManageRawmaterial'
import EditRawMaterial from './pages/Inventory/RawMaterial/EditRawMaterial'
import ShowRawMaterial from './pages/Inventory/RawMaterial/ShowRawMaterial'
import DeleteRawMaterial from './pages/Inventory/RawMaterial/DeleteRawMaterial'

import CreateFinishedGoods from './pages/Inventory/FinishedGood/CreateFinishedGood'
import ManageFinishedGoods from './pages/Inventory/FinishedGood/ManageFinished'
import EditFinishedGoods from './pages/Inventory/FinishedGood/EditFinishedGood'
import ShowFinishedGoods from './pages/Inventory/FinishedGood/ShowFinishedGood'
import DeleteFinishedGoods from './pages/Inventory/FinishedGood/DeleteFinishedGood'

import ManageCustomer from './pages/Customer/ManageCustomer'
import CreateCustomer from './pages/Customer/CreateCustomer'
import EditCustomer from './pages/Customer/EditCustomer'
import ShowCustomer from './pages/Customer/ShowCustomer'
import DeleteCustomer from './pages/Customer/DeleteCustomer'

import ManageSale from './pages/Sales/ManageSales'
import CreateSale from './pages/Sales/CreateSales'
import EditSale from './pages/Sales/EditSales'
import ShowSale from './pages/Sales/ShowSales'
import DeleteSale from './pages/Sales/DeleteSales'


import ManageMR from './pages/MR/ManageMr'
import CreateMR from './pages/MR/CreateMR'
import EditMR from './pages/MR/EditMr'
import ShowMR from './pages/MR/ShowMR'
import DeleteMR from './pages/MR/DeleteMr'

import ManageEmployee from './pages/HR/Employee/ManageEmployee'
import CreateEmployee from './pages/HR/Employee/CreateEmployee'
import EditEmployee from './pages/HR/Employee/EditEmployee'
import ShowEmployee from './pages/HR/Employee/ShowEmployee'
import DeleteEmployee from './pages/HR/Employee/DeleteEmployee'

import ManageEmployeeSalary from './pages/HR/PaymentSalary/ManagePayment'
import CreateEmployeeSalary from './pages/HR/PaymentSalary/CreatePayment'
import EditEmployeeSalary from './pages/HR/PaymentSalary/EditPayment'
import ShowEmployeeSalary from './pages/HR/PaymentSalary/ShowPayment'
import DeleteEmployeeSalary from './pages/HR/PaymentSalary/DeletePayment'




const App = () => {
    return (
    <BrowserRouter basename='/react_anayet/dist'>
      <Routes>
          <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="/purchases" element={<ManagePurchases />} />   
          <Route path="/purchases/create" element={<CreatePurchases />} />      
          <Route path="/purchases/:id/edit" element={<EditPurchases />} />   
          <Route path="/purchases/:id" element={<ShowPurchases />} />   
          <Route path="/purchases/:id/confirm" element={<DeletePurchases />} />   

          <Route path="/suppliers" element={<ManageSupplier />} /> 
          <Route path="/suppliers/create" element={<CreateSupplier />} />      
          <Route path="/suppliers/:id/edit" element={<EditSupplier />} />      
          <Route path="/suppliers/:id" element={<ShowSupplier />} />      
          <Route path="/suppliers/:id/confirm" element={<DeleteSupplier />} />      

          <Route path="/stocks" element={<ManageStock />} /> 
          <Route path="/stocks/create" element={<CreateStock />} />      
          <Route path="/stocks/:id/edit" element={<EditStock />} />      
          <Route path="/stocks/:id" element={<ShowStock />} />      
          <Route path="/stocks/:id/confirm" element={<DeleteStock />} />      

          <Route path="/productions" element={<ManageProduction />} />   
          <Route path="/productions/create" element={<CreateProduction />} />   
          <Route path="/productions/:id/edit" element={<EditProduction />} />   
          <Route path="/productions/:id" element={<ShowProduction />} />   
          <Route path="/productions/:id/confirm" element={<DeleteProduction />} />   

          <Route path="/products" element={<ManageProduct />} />   
          <Route path="/products/create" element={<CreateProduct />} />   
          <Route path="/products/:id/edit" element={<EditProduct />} />   
          <Route path="/products/:id" element={<ShowProduct />} />   
          <Route path="/products/:id/confirm" element={<DeleteProduct />} />   

          <Route path="/rawmaterials" element={<ManageRawMaterial />} />   
          <Route path="/rawmaterials/create" element={<CreateRawMaterial />} />   
          <Route path="/rawmaterials/:id/edit" element={<EditRawMaterial />} />   
          <Route path="/rawmaterials/:id" element={<ShowRawMaterial />} />   
          <Route path="/rawmaterials/:id/confirm" element={<DeleteRawMaterial />} />   
           
          <Route path="/finishedgoods" element={<ManageFinishedGoods />} />   
          <Route path="/finishedgoods/create" element={<CreateFinishedGoods />} />   
          <Route path="/finishedgoods/:id/edit" element={<EditFinishedGoods />} />   
          <Route path="/finishedgoods/:id" element={<ShowFinishedGoods />} />   
          <Route path="/finishedgoods/:id/confirm" element={<DeleteFinishedGoods />} />   


          <Route path="/orders" element={<ManageOrder />} />   
          <Route path="/orders/create" element={<CreateOrder />} />      
          <Route path="/orders/:id/edit" element={<EditOrder />} />      
          <Route path="/orders/:id" element={<ShowOrder />} />      
          <Route path="/orders/:id/confirm" element={<DeleteOrder />} />      

          <Route path="/customers" element={<ManageCustomer/>} />  
          <Route path="/customers/create" element={<CreateCustomer />} />      
          <Route path="/customers/:id/edit" element={<EditCustomer />} />      
          <Route path="/customers/:id" element={<ShowCustomer />} />      
          <Route path="/customers/:id/confirm" element={<DeleteCustomer />} />      

          <Route path="/sales" element={<ManageSale/>} />  
          <Route path="/sales/create" element={<CreateSale/>} />  
          <Route path="/sales/:id/edit" element={<EditSale/>} />  
          <Route path="/sales/:id" element={<ShowSale/>} />  
          <Route path="/sales/:id/confirm" element={<DeleteSale/>} />  


          {/* <Route path="create-invoice" element={<CreateInvoice />} />      
          <Route path="manage-invoice" element={<ManageInvoice />} />    */}

          <Route path="/mrs" element={<ManageMR />} />   
          <Route path="/mrs/create" element={<CreateMR />} />   
          <Route path="/mrs/:id/edit" element={<EditMR />} />   
          <Route path="/mrs/:id" element={<ShowMR />} />   
          <Route path="/mrs/:id/confirm" element={<DeleteMR />} />   


          <Route path="/employees" element={<ManageEmployee />} />  
          <Route path="/employees/create" element={<CreateEmployee />} />  
          <Route path="/employees/:id/edit" element={<EditEmployee />} />  
          <Route path="/employees/:id" element={<ShowEmployee />} />  
          <Route path="/employees/:id/confirm" element={<DeleteEmployee />} />

          <Route path="/employeesalarys" element={<ManageEmployeeSalary />} />  
          <Route path="/employeesalarys/create" element={<CreateEmployeeSalary />} />  
          <Route path="/employeesalarys/:id/edit" element={<EditEmployeeSalary />} />  
          <Route path="/employeesalarys/:id" element={<ShowEmployeeSalary />} />  
          <Route path="/employeesalarys/:id/confirm" element={<DeleteEmployeeSalary />} />  
         
          

          <Route path="*" element={<NoPage />} />
          </Route>
      </Routes>
    </BrowserRouter>
    )
}

export default App;