import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <>
    
    <nav className="navbar navbar-light navbar-vertical navbar-expand-xl">
  <div className="d-flex align-items-center">
    <div className="toggle-icon-wrapper">
      <button className="btn navbar-toggler-humburger-icon navbar-vertical-toggle" data-bs-toggle="tooltip" data-bs-placement="left" title="Toggle Navigation"><span className="navbar-toggle-icon"><span className="toggle-line" /></span></button>
    </div><a className="navbar-brand" href="index.html">
      <div className="d-flex align-items-center py-3"><img className="me-2" src="assets/img/download(5).jpeg" alt width={32} /><span className="font-sans-serif"> Rice Mills</span>
      </div>
    </a>
  </div>
  <div className="collapse navbar-collapse" id="navbarVerticalCollapse">
    <div className="navbar-vertical-content scrollbar">
      <ul className="navbar-nav flex-column mb-3" id="navbarVerticalNav">
       
       {/* Dashboard */}
        <li className="nav-item">         
          <a className="nav-link dropdown-indicator" href="#dashboard" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="dashboard">
            <div className="d-flex align-items-center"><span className="nav-link-icon"><span className="fas fa-address-book" /></span><span className="nav-link-text ps-1">Dashboard</span>
            </div>
          </a>
          <ul className="nav collapse" id="dashboard">          
            <li className="nav-item">
              <NavLink className="nav-link active" to="/">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Home</span>
                </div>
              </NavLink>
              {/* more inner pages*/}
            </li>
          
          </ul>
        </li>

        {/* Purchases */}

        <li className="nav-item">
          <a className="nav-link dropdown-indicator" href="#Purchases" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="Purchases">
            <div className="d-flex align-items-center"><span className="nav-link-icon"><span className="fas fa-first-aid" /></span><span className="nav-link-text ps-1">Purchases</span>
            </div>
          </a>
          <ul className="nav collapse" id="Purchases">          
           
            <li className="nav-item"><NavLink className="nav-link active" to="/purchases/create">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Create Purchases</span>
                </div>
              </NavLink>
            </li>
            <li className="nav-item"><NavLink className="nav-link" to="/purchases">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Manage Purchases</span>
                </div>
              </NavLink>
            </li>

          </ul>

        </li>

        {/* Supplier */}

        <li className="nav-item">
          <a className="nav-link dropdown-indicator" href="#Supplier" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="dashboard">
            <div className="d-flex align-items-center"><span className="nav-link-icon"><span className="fas fa-chart-bar" /></span><span className="nav-link-text ps-1">Supplier Management</span>
            </div>
          </a>
          <ul className="nav collapse" id="Supplier">          
           
            <li className="nav-item"><NavLink className="nav-link active" to="/suppliers/create">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Create Supplier</span>
                </div>
              </NavLink>
              {/* more inner pages*/}
            </li>
            <li className="nav-item"><NavLink className="nav-link" to="/suppliers">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Manage Supplier</span>
                </div>
              </NavLink>
              {/* more inner pages*/}
            </li>
          </ul>
        </li>

        {/* Stock */}

        <li className="nav-item">
          <a className="nav-link dropdown-indicator" href="#Stock" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="dashboard">
            <div className="d-flex align-items-center"><span className="nav-link-icon"><span className="fas fa-calculator" /></span><span className="nav-link-text ps-1">Stock Management</span>
            </div>
          </a>
          <ul className="nav collapse" id="Stock">          
           
            <li className="nav-item"><NavLink className="nav-link active" to="/stocks/create">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Create Stock</span>
                </div>
              </NavLink>
              {/* more inner pages*/}
            </li>
            <li className="nav-item"><NavLink className="nav-link" to="/stocks">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Manage Stock</span>
                </div>
              </NavLink>
              {/* more inner pages*/}
            </li>
          
          </ul>
        </li>

        {/* Production  */}

        <li className="nav-item">
          <a className="nav-link dropdown-indicator" href="#Production" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="dashboard">
            <div className="d-flex align-items-center"><span className="nav-link-icon"><span className="fas fa-wallet" /></span><span className="nav-link-text ps-1">Production</span>
            </div>
          </a>
          <ul className="nav collapse" id="Production">          
           
            <li className="nav-item"><NavLink className="nav-link active" to="/productions/create">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Create raw production</span>
                </div>
              </NavLink>
              {/* more inner pages*/}
            </li>
            <li className="nav-item"><NavLink className="nav-link" to="/productions">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Manage Production</span>
                </div>
              </NavLink>
              {/* more inner pages*/}
            </li>

            <li className="nav-item"><NavLink className="nav-link" to="/products/create">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Create Product</span>
                </div>
              </NavLink>
              {/* more inner pages*/}
            </li>
            <li className="nav-item"><NavLink className="nav-link" to="/products">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Manage Product</span>
                </div>
              </NavLink>
            </li>
          </ul>
        </li>


        {/* Inventory */}

        <li className="nav-item">
          <a className="nav-link dropdown-indicator" href="#inventory" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="dashboard">
            <div className="d-flex align-items-center"><span className="nav-link-icon"><span className="far fa-address-card" /></span><span className="nav-link-text ps-1">Inventory</span>
            </div>
          </a>
          <ul className="nav collapse" id="inventory">          
           
            <li className="nav-item"><NavLink className="nav-link active" to="/rawmaterials/create">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1"> Create Raw Materials</span>
                </div>
              </NavLink>
            </li>

            <li className="nav-item"><NavLink className="nav-link active" to="/rawmaterials">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Manage Raw Materials</span>
                </div>
              </NavLink>
            </li>

            <li className="nav-item"><NavLink className="nav-link" to="/finishedgoods/create">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1"> Create Finished goods</span>
                </div>
              </NavLink>
            </li>

            <li className="nav-item"><NavLink className="nav-link" to="/finishedgoods">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1"> Manage Finished goods</span>
                </div>
              </NavLink>
            </li>

          </ul>
        </li>

         {/* Order management */}

        <li className="nav-item">
          <a className="nav-link dropdown-indicator" href="#Order" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="dashboard">
            <div className="d-flex align-items-center"><span className="nav-link-icon"><span className="fas fa-business-time" /></span><span className="nav-link-text ps-1">Order Management</span>
            </div>
          </a>
          <ul className="nav collapse" id="Order">          
           
            <li className="nav-item"><NavLink className="nav-link active" to="/orders/create">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Create Order</span>
                </div>
              </NavLink>
              {/* more inner pages*/}
            </li>
            <li className="nav-item"><NavLink className="nav-link" to="/orders">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Manage Order</span>
                </div>
              </NavLink>
              {/* more inner pages*/}
            </li>
          
          </ul>
        </li>

       {/* Customer Management */}

           
        <li className="nav-item">
          <a className="nav-link dropdown-indicator" href="#Customer" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="dashboard">
            <div className="d-flex align-items-center"><span className="nav-link-icon"><span className="fas fa-file-invoice" /></span><span className="nav-link-text ps-1">Customer </span>
            </div>
          </a>
          <ul className="nav collapse" id="Customer">          
           
            <li className="nav-item"><NavLink className="nav-link active" to="/customers/create">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Create Customer</span>
                </div>
              </NavLink>
              {/* more inner pages*/}
            </li>
            <li className="nav-item"><NavLink className="nav-link" to="/customers">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Management Customer</span>
                </div>
              </NavLink>
              {/* more inner pages*/}
            </li>
          </ul>
        </li>


        {/* Accounts */}

        <li className="nav-item">
          <a className="nav-link dropdown-indicator" href="#Accounts" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="dashboard">
            <div className="d-flex align-items-center"><span className="nav-link-icon"><span className="fas fa-briefcase" /></span><span className="nav-link-text ps-1">Accounts </span>
            </div>
          </a>
          <ul className="nav collapse" id="Accounts">          
           
            <li className="nav-item"><NavLink className="nav-link active" to="/mrs/create">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Create MR</span>
                </div>
              </NavLink>
              {/* more inner pages*/}
            </li>
            <li className="nav-item"><NavLink className="nav-link" to="/mrs">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Manage MR</span>
                </div>
              </NavLink>
            </li>


            {/* <li className="nav-item"><NavLink className="nav-link active" to="/Create-invoice">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Create invoice</span>
                </div>
              </NavLink>
            </li>

            <li className="nav-item"><NavLink className="nav-link" to="/Manage-Invoice">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Manage Invoice</span>
                </div>
              </NavLink>
            </li> */}
       
          </ul>
        </li>


        {/* Finance $ Accounting */}

        
        <li className="nav-item">
          <a className="nav-link dropdown-indicator" href="#Finance" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="dashboard">
            <div className="d-flex align-items-center"><span className="nav-link-icon"><span className="fas fa-book" /></span><span className="nav-link-text ps-1">Sales Management</span>
            </div>
          </a>
          <ul className="nav collapse" id="Finance">          
           
            <li className="nav-item"><NavLink className="nav-link active" to="/sales/create">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Create Sales</span>
                </div>
              </NavLink>
            </li>
            
            <li className="nav-item"><NavLink className="nav-link" to="/sales">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Sales List</span>
                </div>
              </NavLink>
            </li>

          </ul>

        </li>

        {/* Human Resource */}

         
        <li className="nav-item">
          <a className="nav-link dropdown-indicator" href="#Human" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="dashboard">
            <div className="d-flex align-items-center"><span className="nav-link-icon"><span className="fas fa-chart-line" /></span><span className="nav-link-text ps-1">HR & Payroll </span>
            </div>
          </a>
          <ul className="nav collapse" id="Human">          
              
            <li className="nav-item"><NavLink className="nav-link active" to="/employees/create">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Create Employee </span>
                </div>
              </NavLink>
            </li>


            <li className="nav-item"><NavLink className="nav-link active" to="/employees">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Employee List</span>
                </div>
              </NavLink>
            </li>

            <li className="nav-item"><NavLink className="nav-link" to="/employeesalarys/create">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Create Payment</span>
                </div>
              </NavLink>
            </li>

            <li className="nav-item"><NavLink className="nav-link" to="/employeesalarys">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Payment List</span>
                </div>
              </NavLink>
            </li>

          </ul>

        </li>

        {/* Remote Access */}

        <li className="nav-item">
          <a className="nav-link dropdown-indicator" href="#Remote" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="dashboard">
            <div className="d-flex align-items-center"><span className="nav-link-icon"><span className="fas fa-file-invoice-dollar" /></span><span className="nav-link-text ps-1">Remote Access </span>
            </div>
          </a>
          <ul className="nav collapse" id="Remote">          
           
            <li className="nav-item"><NavLink className="nav-link active" to="/">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Mobile App Integration </span>
                </div>
              </NavLink>
              {/* more inner pages*/}
            </li>
            <li className="nav-item"><NavLink className="nav-link" to="/">
                <div className="d-flex align-items-center"><span className="nav-link-text ps-1">Remote Monitoring </span>
                </div>
              </NavLink>
              {/* more inner pages*/}
            </li>

          </ul>

        </li>

        {/* logout */}

        <li className="nav-item">
          <a className="nav-link dropdown-indicator" href="#Logout" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="dashboard">
            <div className="d-flex align-items-center"><span className="nav-link-icon"><span className="fas fa-stamp" /></span><span className="nav-link-text ps-1">Logout </span>
            </div>
          </a>
          
        </li>

      </ul>

      
    </div>
  </div>
</nav>

    
    
    </>
  )
}

export default Sidebar