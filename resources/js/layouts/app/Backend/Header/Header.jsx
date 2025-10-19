import React from 'react'
import { AppShell, Group, Text, Burger, Menu, ActionIcon } from '@mantine/core'
import { usePage } from '@inertiajs/react'
import { useLanguage } from '../../../../contexts/LanguageContext'
import styles from './Header.module.css'

const Header = ({ mobileOpened, setMobileOpened }) => {
  const { props } = usePage()
  const { auth } = props
  const { t, currentLanguage, changeLanguage, availableLanguages } = useLanguage()

  const getCurrentLanguageFlag = () => {
    return availableLanguages.find(lang => lang.code === currentLanguage)?.flag || '🌐'
  }

  return (
    <AppShell.Header p="md" className={styles.header}>
      <Group justify="space-between" align="center">
        <Group gap="md">
          <Burger
            opened={mobileOpened}
            onClick={() => setMobileOpened(!mobileOpened)}
            hiddenFrom="sm"
            color="#FFD700"
          />
          <Text size="xl" fw={700} c="#FFD700" style={{ fontFamily: 'serif' }}>
            {t('welcomeBack')}, {auth?.user?.name || 'Member'}
          </Text>
        </Group>

        <Group gap="sm">
          {/* Language Switcher */}
          <Menu
            shadow="md"
            width={160}
            position="bottom-end"
            offset={8}
            styles={{
              dropdown: {
                zIndex: 1001,
                backgroundColor: '#1a1f2e',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 215, 0, 0.3)',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
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
        </Group>
      </Group>
    </AppShell.Header>
  )
}

export default Header
