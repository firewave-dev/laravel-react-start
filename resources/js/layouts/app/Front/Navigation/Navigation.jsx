import React from 'react'
import { Paper, Group, Box } from '@mantine/core'
import { Link, usePage } from '@inertiajs/react'
import { useLanguage } from '../../../../contexts/LanguageContext'
import styles from './Navigation.module.css'

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

const Navigation = () => {
  const { ziggy } = usePage().props
  const { t, currentLanguage } = useLanguage()
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
    <Paper 
      shadow="lg" 
      className={`fresco-texture ${styles.navigation}`}
      visibleFrom="sm"
    >
      <Group gap={0} justify="center" py="xs" px="sm">
        {navigationLinks.map((link) => {
          const isActive = isActiveLink(link.href)
          return (
            <Link
              key={link.href}
              href={getLinkWithLanguage(link.href)}
              className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
            >
              {link.label}
              {isActive && (
                <Box className={styles.activeIndicator} />
              )}
            </Link>
          )
        })}
      </Group>
    </Paper>
  )
}

export default Navigation
