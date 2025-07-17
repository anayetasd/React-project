import { useState,useEffect,useRef } from "react";

import Card from "../UI/Card";


function CreateInvoice(props){

    const[items, setItem]=useState([]);
    const[customers,setCustomer]=useState([]);
    
    const[cart, setCart]=useState([]);

    const[subTotal, setSubTotal]=useState(0);
    const[discount, setDiscount]=useState(0);
    const[vat, setVat]=useState(0);

    const[customerId, setCustomerId]=useState(0);
    const[productId, setProductId]=useState(0);
    const[productPrice, setPrice]=useState(0);
    const[productUnit,setUnit]=useState(0);

    const unit=useRef(null);

    useEffect(()=>{
        unit.current.focus();
        fetchProducts();
        fetchCustomers();
    },[])




    const fetchProducts = async () => {
        try{
            const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/product`,{
                method: "GET",
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                }
            });
            if(!res.ok){
                throw new Error('Failed to fetch users');
            }
            const data = await res.json();
            setItem(data.products);
        }catch(err){
            console.error('Error:',err.message);

        }

    };

    const fetchCustomers = async () => {
        try{
            const res = await fetch(`http://anayet.intelsofts.com/project_app/public/api/customer`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                }
            });
            if(!res.ok){
                throw new Error('Failed to fetch users');
            }
            const data = await res.json();
            setCustomer(data.customers);
        } catch(err){
            console.error('Error:',err.message);
        }
    };



    const handleAddItem=(e)=>{

        let product_name=productId.options[productId.selectedIndex].text;
       

        let totalLine= productPrice*productUnit;

        let json={
            id:cart.length+1,
            desc:product_name,
            product_id:productId.value,
            qty:productUnit,
            price:productPrice,
            discount:0,
            vat:0,
            lineTotal:totalLine


        };

        setCart([...cart,json]);
        setSubTotal(subTotal+totalLine);

    }

    const handleGetPrice =(e) =>{

        let i=items.find((item)=>item.id==e.value)
        setPrice(i.offer_price);
        setUnit(1);

        setProductId(e)
    }


    const handleSave = async(e)=>{
        if(confirm("Are you sure?")){
            var utc = new Date(). toJSON(). slice(0,10).replace(/-/g,'-');
            let date=utc;


            let jsonData={
                created_at:date,
                updated_at:date,
                customer_id:customerId,
                remark:"Na",
                payment_term:"CASH",
                invoice_total:subTotal,
                previous_due:0,
                items:cart


            }
            let response = await fetch(`http://anayet.intelsofts.com/project_app/public/api/invoice/save`,{
                method: "POST",
                headers:{
                    "content-Type":"application/json"

                },
                body:JSON.stringify(jsonData)
            });
            let json=response.json();
            console.log(json);

            setCart([]);
            setSubTotal(0);
            setVat(0);
            setDiscount(0);

        }

    }


   

    return(
        <>
           <h1>Create Invoice</h1>
           <p>{props.desc}</p>

           <div className="card mb-3">
  <div className="card-body">
    <div className="row align-items-center text-center mb-3">
      <div className="col-sm-6 text-sm-start">
        <img src="" width={100} />
      </div>
      <div className="col text-sm-end mt-3 mt-sm-0">
        <h2 className="mb-3">Invoice</h2>
        <h5/>
        <p className="fs--1 mb-0">
          <br />
          <br />{" "}
        </p>
      </div>
      <div className="col-12">
        <hr />
      </div>
    </div>
    <div className="row align-items-center">
      <div className="col">
        <h6 className="text-500">Invoice to</h6>
        <h5>
          <select className="form-select" onChange={e=>setCustomerId(e.target.value)}>
            <option value="0">Select</option>
             {
                customers.map((customer)=>(
                  <option key={customer.id} value={customer.id}>{customer.name}</option>
                ))
              } 
          </select>
        </h5>
        <p className="fs--1">
          1954 Bloor Street West
          <br />
          Torronto ON, M6P 3K9
          <br />
          Canada
        </p>
        <p className="fs--1">
          <a href="mailto:example@gmail.com">example@gmail.com</a>
          <br />
          <a href="tel:444466667777">+4444-6666-7777</a>
        </p>
      </div>
      <div className="col-sm-auto ms-auto">
        <div className="table-responsive">
          <table className="table table-sm table-borderless fs--1">
            <tbody>
              <tr>
                <th className="text-sm-end">Invoice No:</th>
                <td>3434</td>
              </tr>
              <tr>
                <th className="text-sm-end">Invoice Date:</th>
                <td id="date" />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div className="table-responsive scrollbar mt-4 fs--1">
      <table className="table table-striped border-bottom">
        <thead className="light">
          <tr className="bg-primary text-white dark__bg-1000">
            <th className="border-0">Products</th>
            <th className="border-0 text-center">Quantity</th>
            <th className="border-0 text-end">Rate</th>
            <th className="border-0 text-end">Amount</th>
            <th className="border-0 text-end" />
          </tr>
          <tr className="text-white dark__bg-1000">
            <th className="border-0">
              <select onChange={e=>handleGetPrice(e.target)}   className="form-select">
              <option value="0">select</option>
              {
                items.map((item)=>(
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))
              }              
              </select>
            </th>
            <th className="border-0 text-center">
              <input ref={unit}
              value={productUnit} onChange={e=>setUnit(e.target.value)}
                type="text"
                className="form-control"
                style={{ width: "100%" }}
                name="unit"
                id="unit"
                defaultValue={1}
              />
            </th>
            <th className="border-0 text-end">
              <input
                value={productPrice} onChange={e=>setPrice(e.target.value)}
               
                type="text"
                className="form-control"
                style={{ width: "100%" }}
                name="price"
                id="price"
              />
            </th>
            <th className="border-0 text-end" />
            <th className="border-0 text-end">
              <input
                className="form-control"
                type="button"
                defaultValue=" + "
                style={{ width: "100%" }}
                name="btnAdd"
                id="btnAdd"
                onClick={()=>handleAddItem()}
              />
            </th>
          </tr>
        </thead>
        <tbody id="tbody">
            {
                cart.map(item=>(
                    <tr key={item.id}>
                     <td>{item.id}</td>
                     <td>{item.desc}</td>
                     <td>{item.price}</td>
                     <td>{item.qty}</td>
                     <td>{item.qty*item.price}</td>
                     <td><input type="button" onClick={() => {
                          setCart(
                            cart.filter(a =>
                              a.id !== item.id
                            )
                          );
                        }} value="Delete" />
                      </td>
                     </tr>
                ))
            }
        </tbody>
      </table>
    </div>
    <div className="row justify-content-end">
      <div className="col-auto">
        <table className="table table-sm table-borderless fs--1 text-end">
          <tbody>
            <tr>
              <th className="text-900">Subtotal:</th>
              <td className="fw-semi-bold" id="subTotal">
                {subTotal}
              </td>
            </tr>
            <tr>
              <th className="text-900">Tax 3%:</th>
              <td className="fw-semi-bold" id="tax">
                {vat}
              </td>
            </tr>
            <tr className="border-top">
              <th className="text-900">Total:</th>
              <td className="fw-semi-bold" id="netTotal">
                {subTotal+vat}
              </td>
            </tr>           
            <tr>
              <th colSpan={5}>
                <input
                  type="button"
                  className="btn btn-primary"
                  name="btnProcess"
                  defaultValue="Create Invoice"
                  onClick={handleSave}
                />
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div className="card-footer bg-light">
    <p className="fs--1 mb-0">
      <strong>Notes: </strong>We really appreciate your business and if there’s
      anything else we can do, please let us know!
    </p>
  </div>
</div>
          
        </>
    );
}

export default CreateInvoice;