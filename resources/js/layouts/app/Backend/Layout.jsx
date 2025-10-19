import React, { useState } from 'react'
import { AppShell } from '@mantine/core'
import Header from './Header/Header'
import Menu from './Menu/Menu'
import Main from './Main/Main'
import FlashMessage from '../../../components/FlashMessage'

const Layout = ({ children }) => {
  const [mobileOpened, setMobileOpened] = useState(false)

  return (
    <AppShell
      navbar={{ 
        width: 280, 
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened }
      }}
      header={{ height: 70 }}
      padding="md"
    >
      <FlashMessage />
      <Header 
        mobileOpened={mobileOpened} 
        setMobileOpened={setMobileOpened} 
      />
      <Menu 
        mobileOpened={mobileOpened} 
        setMobileOpened={setMobileOpened} 
      />
      <Main>
        {children}
      </Main>
    </AppShell>
  )
}

export default Layout