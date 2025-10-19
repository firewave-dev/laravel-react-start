import React from 'react'
import { Button, Group, Menu, Text, Avatar, Box } from '@mantine/core'
import { usePage, Link } from '@inertiajs/react'
import { ChevronDown, Globe } from 'lucide-react'

const LanguageSwitcher = ({ currentLocale = 'en' }) => {
  const { url } = usePage()
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'sr', name: 'Српски', flag: '🇷🇸' }
  ]
  
  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0]
  
  const getLanguageUrl = (langCode) => {
    if (langCode === 'en') {
      // Remove lang parameter for English (default)
      const urlObj = new URL(url, window.location.origin)
      urlObj.searchParams.delete('lang')
      return urlObj.pathname + (urlObj.search || '')
    } else {
      // Add or update lang parameter
      const urlObj = new URL(url, window.location.origin)
      urlObj.searchParams.set('lang', langCode)
      return urlObj.pathname + '?' + urlObj.searchParams.toString()
    }
  }

  return (
    <Box>
      <Menu shadow="md" width={200} position="bottom-end">
        <Menu.Target>
          <Button
            variant="light"
            leftSection={<Globe size={16} />}
            rightSection={<ChevronDown size={14} />}
            style={{
              backgroundColor: 'rgba(240, 230, 200, 0.9)',
              border: '1px solid rgba(139, 69, 19, 0.3)',
              color: '#8B4513'
            }}
          >
            <Group gap="xs">
              <Text size="sm">{currentLanguage.flag}</Text>
              <Text size="sm" fw={500}>{currentLanguage.name}</Text>
            </Group>
          </Button>
        </Menu.Target>

        <Menu.Dropdown
          style={{
            backgroundColor: 'rgba(240, 230, 200, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(139, 69, 19, 0.3)'
          }}
        >
          {languages.map((language) => (
            <Menu.Item
              key={language.code}
              component={Link}
              href={getLanguageUrl(language.code)}
              leftSection={
                <Group gap="xs">
                  <Text>{language.flag}</Text>
                  <Text size="sm">{language.name}</Text>
                </Group>
              }
              style={{
                color: language.code === currentLocale ? '#8B4513' : '#654321',
                backgroundColor: language.code === currentLocale ? 'rgba(139, 69, 19, 0.1)' : 'transparent',
                fontWeight: language.code === currentLocale ? 600 : 400
              }}
            />
          ))}
        </Menu.Dropdown>
      </Menu>
    </Box>
  )
}

export default LanguageSwitcher
