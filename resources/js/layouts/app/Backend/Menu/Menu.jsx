import React from 'react'
import { AppShell, Group, Text, Button, Box, Stack, Divider, NavLink } from '@mantine/core'
import { Link, router, usePage } from '@inertiajs/react'
import { LayoutDashboard, Settings, User, Shield, Palette, Smartphone, LogOut, Home, Users, FileText, CalendarDays, BookOpen, Bell, Quote, Heart, ClipboardList } from 'lucide-react'
import { useLanguage } from '../../../../contexts/LanguageContext'
import styles from './Menu.module.css'

const Menu = ({ mobileOpened, setMobileOpened }) => {
  const { props, url } = usePage()
  const { auth } = props
  const { t } = useLanguage()
  const currentRoute = url

  const handleLogout = () => {
    router.post(route('logout'))
  }

  const isActiveRoute = (path) => {
    if (path === '/dashboard') {
      return currentRoute === '/dashboard'
    }
    return currentRoute.startsWith(path)
  }

  const isAccountSettingsActive = () => {
    return currentRoute.startsWith('/settings/account') || 
           currentRoute.startsWith('/settings/profile') || 
           currentRoute.startsWith('/settings/password') || 
           currentRoute.startsWith('/settings/two-factor')
  }

  // Check if user is admin
  const isAdmin = auth?.user?.role === 'admin'

  return (
    <AppShell.Navbar
      p="md"
      className={styles.navbar}
    >
      <Stack gap="sm" style={{ height: '100%' }}>
        <Box>
          <Group gap="sm" mb="md">
            <Box className={styles.orthodoxIcon}>
              <Text style={{ fontSize: '1rem', color: '#1a1f2e' }}>☦</Text>
            </Box>
            <Text c="#FFD700" fw={700} size="lg" style={{ fontFamily: 'serif' }}>
              {t('memberArea')}
            </Text>
          </Group>
          <Divider color="rgba(255, 215, 0, 0.15)" mb="md" />
        </Box>

        <Stack gap="xs" style={{ flex: 1 }}>
          <NavLink
            component={Link}
            href="/dashboard"
            label={t('dashboard')}
            leftSection={<LayoutDashboard size={20} />}
            active={isActiveRoute('/dashboard')}
            onClick={() => setMobileOpened(false)}
            className={styles.navLink}
          />

          {/* Admin Section - Only visible to admins */}
          {isAdmin && (
            <>
              <Text className={styles.sectionLabel}>
                {t('administration')}
              </Text>

              <NavLink
                component={Link}
                href="/users"
                label={t('userManagement')}
                leftSection={<Users size={18} />}
                active={isActiveRoute('/users')}
                onClick={() => setMobileOpened(false)}
                className={styles.navLink}
              />

              <NavLink
                component={Link}
                href="/events"
                label={t('eventsCalendar')}
                leftSection={<CalendarDays size={18} />}
                active={isActiveRoute('/events')}
                onClick={() => setMobileOpened(false)}
                className={styles.navLink}
              />

              <NavLink
                component={Link}
                href="/posts"
                label={t('blogNews')}
                leftSection={<BookOpen size={18} />}
                active={isActiveRoute('/posts')}
                onClick={() => setMobileOpened(false)}
                className={styles.navLink}
              />

              <NavLink
                component={Link}
                href="/bulletins"
                label={t('bulletinBoard')}
                leftSection={<Bell size={18} />}
                active={isActiveRoute('/bulletins')}
                onClick={() => setMobileOpened(false)}
                className={styles.navLink}
              />

              <NavLink
                component={Link}
                href="/quotes"
                label={t('dailyQuotes')}
                leftSection={<Quote size={18} />}
                active={isActiveRoute('/quotes')}
                onClick={() => setMobileOpened(false)}
                className={styles.navLink}
              />

              <NavLink
                component={Link}
                href="/admin/prayer-requests"
                label={t('prayerRequests')}
                leftSection={<Heart size={18} />}
                active={isActiveRoute('/admin/prayer-requests')}
                onClick={() => setMobileOpened(false)}
                className={styles.navLink}
              />

              <NavLink
                component={Link}
                href="/admin/event-registrations"
                label={t('eventRegistrations')}
                leftSection={<ClipboardList size={18} />}
                active={isActiveRoute('/admin/event-registrations')}
                onClick={() => setMobileOpened(false)}
                className={styles.navLink}
              />

              <NavLink
                component={Link}
                href="/moderation"
                label={t('contentModeration')}
                leftSection={<Shield size={18} />}
                active={isActiveRoute('/moderation')}
                onClick={() => setMobileOpened(false)}
                className={styles.navLink}
              />
            </>
          )}

          <Text className={styles.sectionLabel}>
            {t('myAccount')}
          </Text>

          <NavLink
            component={Link}
            href="/settings/account"
            label={t('accountSettings')}
            leftSection={<Settings size={18} />}
            active={isAccountSettingsActive()}
            onClick={() => setMobileOpened(false)}
            className={styles.navLink}
          />

          <NavLink
            component={Link}
            href="/settings/appearance"
            label={t('appearance')}
            leftSection={<Palette size={18} />}
            active={isActiveRoute('/settings/appearance')}
            onClick={() => setMobileOpened(false)}
            className={styles.navLink}
          />
        </Stack>

        <Box>
          <Divider color="rgba(255, 215, 0, 0.15)" mb="md" />
          <Button
            component={Link}
            href="/"
            leftSection={<Home size={18} />}
            variant="subtle"
            fullWidth
            mb="sm"
            onClick={() => setMobileOpened(false)}
            className={styles.backButton}
          >
            {t('backToSite')}
          </Button>
          <Button
            leftSection={<LogOut size={18} />}
            variant="filled"
            fullWidth
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            {t('logout')}
          </Button>
        </Box>
      </Stack>
    </AppShell.Navbar>
  )
}

export default Menu
