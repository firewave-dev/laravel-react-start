import React from 'react'
import { AppShell } from '@mantine/core'
import styles from './Main.module.css'

const Main = ({ children }) => {
  return (
    <AppShell.Main className={styles.main}>
      {children}
    </AppShell.Main>
  )
}

export default Main
