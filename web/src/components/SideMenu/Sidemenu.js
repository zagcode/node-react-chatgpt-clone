import React from 'react'
import './Sidemenu.css'

const SideMenu = ({onNewChat})=> {
  return(
    <aside className='sidemenu'>
      <button type='button' className='sidemenu-button' onClick={onNewChat}>
        <span>+</span> Novo chat
      </button>
    </aside>
  )
}

export default SideMenu
