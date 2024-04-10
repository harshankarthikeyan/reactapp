import React from "react"
import { FaRegTrashAlt } from "react-icons/fa";

const LineItem = ({item,handleCheck,handleDelete}) => {
  return (
    <li className="item">
    <input type="checkbox"
    checked ={item.checked}
    onChange={() => handleCheck(item.id)}
    />
    <label
    style={
      (item.checked)?{textDecoration:'line-through'}:null
    }
    onDoubleClick={()=>handleCheck(item.id)}>{item.item}</label>

    <FaRegTrashAlt
    role="button"
    onClick={()=>handleDelete(item.id)}
    tabIndex="0"
    />  
  </li>
  )
}

export default LineItem