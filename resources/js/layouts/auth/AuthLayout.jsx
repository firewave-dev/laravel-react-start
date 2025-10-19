import React from 'react'
import { Box, Container, Paper, ThemeIcon, Title, Text, Group, Menu, ActionIcon, Stack } from '@mantine/core'
import { Cross } from 'lucide-react'
import { Link } from '@inertiajs/react'
import { useLanguage } from '../../contexts/LanguageContext'

const AuthLayout = ({ children }) => {
  const { t, currentLanguage, changeLanguage, availableLanguages } = useLanguage()

  const getCurrentLanguageFlag = () => {
    return availableLanguages.find(lang => lang.code === currentLanguage)?.flag || '🌐'
  }

  return (
    <Box
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f1e8 0%, #e8ddd4 50%, #d4c4a8 100%)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {/* Header with Orthodox Theotokos Logo */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '1.5rem',
          zIndex: 10
        }}
      >
        <Container size="xl">
          <Group justify="space-between" align="center">
            {/* Orthodox Logo */}
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Group gap="md">
                <Box
                  className="theotokos-icon orthodox-icon"
                  style={{
                    width: 50,
                    height: 50,
                  }}
                >
                  {/* Theotokos Symbol */}
                  <Text className="icon-symbol" style={{ fontSize: '1.5rem' }}>
                    ☦
                  </Text>
                </Box>
                <Box visibleFrom="sm">
                  <Title
                    order={3}
                    style={{
                      marginBottom: 0,
                      fontFamily: 'serif',
                      color: '#8B4513',
                      textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                    }}
                  >
                    {t('churchName')}
                  </Title>
                  <Text
                    size="sm"
                    c="#654321"
                    style={{
                      fontStyle: 'italic',
                      textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}
                  >
                    {t('churchTagline')}
                  </Text>
                </Box>
              </Group>
            </Link>

            {/* Language Switcher */}
            <Menu
              shadow="md"
              width={180}
              position="bottom-end"
              offset={5}
              styles={{
                dropdown: {
                  zIndex: 1001,
                }
              }}
            >
              <Menu.Target>
                <ActionIcon
                  variant="light"
                  size="lg"
                  style={{
                    backgroundColor: 'rgba(139, 69, 19, 0.1)',
                    border: '1px solid rgba(139, 69, 19, 0.3)',
                    boxShadow: '0 2px 10px rgba(139, 69, 19, 0.2)'
                  }}
                >
                  <Text size="lg" style={{ lineHeight: 1 }}>
                    {getCurrentLanguageFlag()}
                  </Text>
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>{t('language')}</Menu.Label>
                {availableLanguages.map((lang) => (
                  <Menu.Item
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    leftSection={<Text size="lg">{lang.flag}</Text>}
                    style={{
                      backgroundColor: currentLanguage === lang.code ? 'rgba(139, 69, 19, 0.1)' : 'transparent',
                      fontWeight: currentLanguage === lang.code ? 600 : 400
                    }}
                  >
                    {lang.name}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Container>
      </Box>

      {/* Main Content - Centered */}
      <Box
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1rem'
        }}
      >
        <Container size="xs" style={{ width: '100%' }}>
          {children}
        </Container>
      </Box>

      {/* Footer */}
      <Box
        style={{
          padding: '1rem',
          textAlign: 'center'
        }}
      >
        <Text size="sm" c="#34495e" opacity={0.8}>
          © {new Date().getFullYear()} {t('churchName')}
        </Text>
      </Box>
    </Box>
  )
}

export default AuthLayout