  import React from 'react'
import ItemLists from './ItemLists'
const Content = ({items,setItems,handleCheck,handleDelete}) => {
  
  return (
    <>
      {(items.length)?(
      <ItemLists
      items={items}
      setItems={setItems}
      handleCheck={handleCheck}
      handleDelete={handleDelete} />
      ):
      (<p style={{marginTop:'2rem'}}>Your List is empty</p>)
        }
    </>
  )
}

export default Content