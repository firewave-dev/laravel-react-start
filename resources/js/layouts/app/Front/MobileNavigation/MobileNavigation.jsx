import React from 'react'
import { Paper, Text, Button, Group, Box, Stack, Divider, Container, Collapse } from '@mantine/core'
import { Link, usePage } from '@inertiajs/react'
import { useLanguage } from '../../../../contexts/LanguageContext'
import styles from './MobileNavigation.module.css'

const getNavigationLinks = (t) => [
  { href: '/', label: t('home') },
  { href: '/about', label: t('about') },
  { href: '/calendar', label: t('calendar') },
  { href: '/blog', label: t('news') },
  { href: '/bulletin', label: t('bulletin') },
  { href: '/prayer-requests', label: t('prayerRequests') },
  { href: '/search', label: t('search') },
  { href: '/contact', label: t('contact') },
]

const MobileNavigation = ({ mobileMenuOpened, setMobileMenuOpened }) => {
  const { auth, ziggy } = usePage().props
  const { t, currentLanguage, changeLanguage, availableLanguages } = useLanguage()
  const currentRoute = ziggy?.location || ''
  
  const navigationLinks = getNavigationLinks(t)
  
  // Add language parameter to navigation links
  const getLinkWithLanguage = (href) => {
    if (currentLanguage === 'en') {
      return href
    }
    return `${href}?lang=${currentLanguage}`
  }

  const isActiveLink = (href) => {
    if (href === '/' && currentRoute === '/') return true
    if (href !== '/' && currentRoute.startsWith(href)) return true
    return false
  }

  return (
    <Collapse in={mobileMenuOpened} hiddenFrom="sm">
      <Paper 
        p="md" 
        shadow="lg"
        className={`fresco-texture ${styles.mobileNav}`}
      >
        <Container size="xl">
          <Stack gap="xs">
            {navigationLinks.map((link) => {
              const isActive = isActiveLink(link.href)
              return (
                <Link
                  key={link.href}
                  href={getLinkWithLanguage(link.href)}
                  style={{ textDecoration: 'none' }}
                  onClick={() => setMobileMenuOpened(false)}
                >
                  <Box
                    p="sm"
                    className={`${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`}
                  >
                    {link.label}
                  </Box>
                </Link>
              )
            })}
            
            <Divider color="rgba(255, 255, 255, 0.2)" my="sm" />
            
            {/* Mobile Language Switcher */}
            <Stack gap="xs">
              <Text className={styles.languageLabel}>
                {t('language')}
              </Text>
              <Group grow>
                {availableLanguages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={currentLanguage === lang.code ? "light" : "subtle"}
                    size="xs"
                    onClick={() => changeLanguage(lang.code)}
                    leftSection={<Text size="xs">{lang.flag}</Text>}
                    className={`${styles.languageButton} ${currentLanguage === lang.code ? styles.languageButtonActive : ''}`}
                  >
                    {lang.code.toUpperCase()}
                  </Button>
                ))}
              </Group>
            </Stack>

            <Divider color="rgba(255, 255, 255, 0.2)" my="sm" />
            
            {/* Mobile Auth Buttons */}
            {auth.user ? (
              <Stack gap="sm">
                <Text className={styles.welcomeText}>
                  {t('welcome')}, {auth.user.name}
                </Text>
                <Link href="/dashboard" onClick={() => setMobileMenuOpened(false)}>
                  <Button 
                    fullWidth
                    size="sm"
                    className={styles.dashboardButton}
                  >
                    {t('dashboard')}
                  </Button>
                </Link>
              </Stack>
            ) : (
              <Group grow>
                <Link href="/login" onClick={() => setMobileMenuOpened(false)}>
                  <Button 
                    variant="subtle"
                    size="sm" 
                    fullWidth
                    className={styles.loginButton}
                  >
                    {t('login')}
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpened(false)}>
                  <Button 
                    size="sm"
                    fullWidth
                    className={styles.signUpButton}
                  >
                    {t('signUp')}
                  </Button>
                </Link>
              </Group>
            )}
          </Stack>
        </Container>
      </Paper>
    </Collapse>
  )
}

export default MobileNavigation
