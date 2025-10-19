import React from 'react'
import { Container, Paper, Text, Title, Button, Group, Box, Burger, Menu, ActionIcon } from '@mantine/core'
import { Link, usePage } from '@inertiajs/react'
import { useLanguage } from '../../../../contexts/LanguageContext'
import styles from './Header.module.css'

const Header = ({ mobileMenuOpened, setMobileMenuOpened }) => {
  const { auth } = usePage().props
  const { t, currentLanguage, changeLanguage, availableLanguages } = useLanguage()

  const getCurrentLanguageFlag = () => {
    return availableLanguages.find(lang => lang.code === currentLanguage)?.flag || '🌐'
  }

  return (
    <Paper 
      shadow="lg" 
      className={`orthodox-fresco-bg byzantine-pattern ${styles.header}`}
    >
      <Container size="xl">
        <Group justify="space-between" align="center" py="lg" className={styles.headerContent}>
          {/* Logo with Theotokos */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Group gap="lg">
              <Box className={`theotokos-icon orthodox-icon holy-light ${styles.logoIcon}`}>
                <Text className="icon-symbol">☦</Text>
              </Box>
              <Box>
                <Title order={1} className={`orthodox-gold-text ${styles.churchName}`}>
                  {t('churchName')}
                </Title>
                <Text className={styles.churchTagline}>
                  {t('churchTagline')}
                </Text>
              </Box>
            </Group>
          </Link>
          
          {/* Language Switcher & Auth Buttons */}
          <Group gap="sm" visibleFrom="sm">
            {/* Language Switcher */}
            <Menu 
              shadow="md" 
              width={160}
              position="bottom-end"
              offset={8}
              styles={{
                dropdown: {
                  zIndex: 1001,
                  backgroundColor: 'rgba(255, 248, 220, 0.98)',
                  backdropFilter: 'blur(12px)',
                  border: '2px solid rgba(255, 215, 0, 0.3)',
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(139, 69, 19, 0.25)'
                }
              }}
            >
              <Menu.Target>
                <ActionIcon
                  variant="light"
                  size="md"
                  className={styles.languageButton}
                >
                  <Text size="sm" style={{ lineHeight: 1 }}>
                    {getCurrentLanguageFlag()}
                  </Text>
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label className={styles.languageLabel}>
                  {t('language')}
                </Menu.Label>
                {availableLanguages.map((lang) => (
                  <Menu.Item
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    leftSection={<Text size="md">{lang.flag}</Text>}
                    className={`${styles.languageItem} ${currentLanguage === lang.code ? styles.languageItemActive : ''}`}
                  >
                    {lang.name}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>

            {auth.user ? (
              <>
                <Text className={styles.welcomeText}>
                  {t('welcome')}, {auth.user.name}
                </Text>
                <Link href="/dashboard">
                  <Button 
                    size="xs"
                    className={styles.dashboardButton}
                  >
                    {t('dashboard')}
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button 
                    variant="subtle"
                    size="xs"
                    className={styles.loginButton}
                  >
                    {t('login')}
                  </Button>
                </Link>
                <Link href="/register">
                  <Button 
                    size="xs"
                    className={styles.signUpButton}
                  >
                    {t('signUp')}
                  </Button>
                </Link>
              </>
            )}
          </Group>

          {/* Mobile Menu Button */}
          <Burger
            opened={mobileMenuOpened}
            onClick={() => setMobileMenuOpened(!mobileMenuOpened)}
            hiddenFrom="sm"
            color="white"
            size="md"
          />
        </Group>
      </Container>
    </Paper>
  )
}

export default Header
