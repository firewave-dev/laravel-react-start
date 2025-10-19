import React, { useState } from 'react'
import { Box, Container } from '@mantine/core'
import Header from './Header/Header'
import Navigation from './Navigation/Navigation'
import MobileNavigation from './MobileNavigation/MobileNavigation'
import Main from './Main/Main'
import Footer from './Footer/Footer'

const FrontLayout = ({ children }) => {
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false)

  return (
    <Box>
      <Header 
        mobileMenuOpened={mobileMenuOpened} 
        setMobileMenuOpened={setMobileMenuOpened} 
      />
      <Navigation />
      <MobileNavigation 
        mobileMenuOpened={mobileMenuOpened} 
        setMobileMenuOpened={setMobileMenuOpened} 
      />
      <Main>
        {children}
      </Main>
      <Footer />
    </Box>
  )
}

export default FrontLayout
