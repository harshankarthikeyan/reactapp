import Header from "./Header";
import { useState, useEffect } from 'react';
import Content from "./Content";
import Footer from "./Footer";
import AddItem from "./AddItem";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";


function App() {
  const API ='http://localhost:3500/items'
  const[items,setItems]=useState([]);
  const[newItem,setNewItem]=useState('')
  const[search,setSearch]=useState('')
  const[fetchError,setFetchError]=useState(null)
  const[isLoading,setIsloading]=useState(true)

useEffect( ()=>{
  const fetchItems = async ()=>{
    try{
     const response = await fetch(API);
    if (!response.ok) throw Error("Data not received");
     const listItems= await response.json();
     setItems(listItems);
     setFetchError(null)
    }
    catch(err){
        setFetchError(err.message)
    }
    finally{
      setIsloading(false)
    }
  }
  setTimeout(()=>{
    (async ()=> await fetchItems())()
  },2000)
  },[])

  const addItem =async(item)=>{
    const id=items.length ?items[items.length-1].id+1:1;
    const addNewItem ={id,checked:false,item}
    const ListItems =[...items,addNewItem]
    setItems(ListItems)
    const postOptions ={
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(addNewItem)
    }
    const result =await apiRequest(API,postOptions)
    if(result)setFetchError(result)
  }
  
  const handleCheck =async(id)=>{
    const listItems=items.map((item)=>{
      return(
      item.id===id?{...item,checked:!item.checked}: item)
      }
    )
    setItems(listItems)
    const myItem = listItems.filter((item)=>item.id===id)
    const UpdateOptions ={
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({checked:myItem[0].checked})
    }
    const reqUrl=`${API}/${id}`
    const result =await apiRequest(reqUrl,UpdateOptions)
    if(result)setFetchError(result)
    

  }
  const handleDelete=async(id) =>{
    const listItems = items.filter((item)=>
        item.id!==id)
    setItems(listItems)
    const deleteOptions={method: 'DELETE'}
    const reqUrl=`${API}/${id}`
    const result =await apiRequest(reqUrl,deleteOptions)
    if(result)setFetchError(result)
    

  }
  //this fuction shows user input will shown in the pa
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!newItem) return;
    console.log(newItem)
    addItem(newItem)
    setNewItem('')
  }
  return (
    <div  className="App">
      <Header title="Course List" />
      <AddItem
      newItem={newItem}
      setNewItem={setNewItem}
      handleSubmit={handleSubmit}
      />
      <SearchItem
      search={search}
      setSearch={setSearch}
      
      />
      <main>
        {isLoading && <p>Loading items..</p>}
        {fetchError && <p> {`Error: ${fetchError}`}</p>}
      {!isLoading && !fetchError&&<Content
       items={items.filter(item=>(item.item).toLowerCase().includes(search.toLowerCase()))}
      setItems={setItems}
      handleCheck={handleCheck}
      handleDelete={handleDelete}        
        />}
        </main>
      <Footer length = {items.length}
       />
    
    </div>
  );
}
Header.defaultProps ={title:"To Do List"}

export default App;
