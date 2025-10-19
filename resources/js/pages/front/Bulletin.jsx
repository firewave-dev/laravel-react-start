import React from 'react'
import { Paper, Text, Title, Stack, Box, Group, Badge, Container } from '@mantine/core'
import FrontLayout from '../../layouts/app/Front/FrontLayout'
import { useLanguage } from '../../contexts/LanguageContext'

const Bulletin = ({ bulletins = [], currentLocale = 'en' }) => {
  const { t } = useLanguage()
  
  // Helper function to get translated content
  const getTranslatedContent = (item, field) => {
    if (currentLocale === 'en' || !item.translations) {
      return item[field]
    }
    
    const translation = item.translations.find(t => t.locale === currentLocale)
    return translation?.[field] || item[field]
  }
  
  const getPriorityColor = (priority) => {
    return { high: 'red', normal: 'blue', low: 'gray' }[priority] || 'gray'
  }

  const getTypeColor = (type) => {
    return { announcement: 'blue', prayer_request: 'purple', event_notice: 'cyan', urgent: 'red', general: 'gray' }[type] || 'gray'
  }

  return (
    <FrontLayout>
      <Box style={{ minHeight: 'calc(100vh - 200px)', background: 'linear-gradient(135deg, #F5F5DC 0%, #DDD1A0 30%, #D2B48C 70%, #BC9A6A 100%)', padding: '3rem 0' }}>
        <Container size="xl">
          <Stack gap="xl">
            <Paper p="xl" withBorder style={{ backgroundColor: 'rgba(240, 230, 200, 0.9)', backdropFilter: 'blur(10px)', border: '2px solid rgba(139, 69, 19, 0.25)', borderRadius: '12px', boxShadow: '0 8px 32px rgba(139, 69, 19, 0.1)' }}>
              <Title order={1} mb="md" c="#8B4513" style={{ fontFamily: 'serif' }}>{t('bulletin')}</Title>
              <Text size="lg" c="#654321">{t('bulletinSubtitle')}</Text>
            </Paper>

            {bulletins && bulletins.length > 0 ? (
              <Stack gap="md">
                {bulletins.map((bulletin) => (
                  <Paper 
                    key={bulletin.id} 
                    p="lg" 
                    withBorder 
                    style={{ 
                      backgroundColor: 'rgba(240, 230, 200, 0.85)', 
                      border: `2px solid ${bulletin.priority === 'high' ? 'rgba(200, 0, 0, 0.3)' : 'rgba(139, 69, 19, 0.2)'}`, 
                      borderRadius: '12px', 
                      borderLeft: bulletin.is_pinned ? '6px solid #8B4513' : undefined 
                    }}
                  >
                    <Group justify="space-between" align="flex-start" mb="sm">
                      <Box style={{ flex: 1 }}>
                        <Group gap="xs" mb="xs">
                          <Badge color={getTypeColor(bulletin.type)} variant="light" size="sm" tt="capitalize">
                            {bulletin.type.replace('_', ' ')}
                          </Badge>
                          <Badge color={getPriorityColor(bulletin.priority)} variant="filled" size="xs" tt="capitalize">
                            {bulletin.priority}
                          </Badge>
                          {bulletin.is_pinned && <Badge color="yellow" variant="filled" size="xs">Pinned</Badge>}
                        </Group>
                        <Title order={4} c="#8B4513" mb="sm" style={{ fontFamily: 'serif' }}>
                          {getTranslatedContent(bulletin, 'title')}
                        </Title>
                        <Text c="#654321" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
                          {getTranslatedContent(bulletin, 'message')}
                        </Text>
                      </Box>
                    </Group>
                    <Group gap="md" mt="md">
                      <Text size="xs" c="#8B4513">Posted by {bulletin.poster?.name}</Text>
                      <Text size="xs" c="#8B4513">{new Date(bulletin.created_at).toLocaleDateString()}</Text>
                      {bulletin.expires_at && (
                        <Text size="xs" c="red">Expires: {new Date(bulletin.expires_at).toLocaleDateString()}</Text>
                      )}
                    </Group>
                  </Paper>
                ))}
              </Stack>
            ) : (
              <Paper p="xl" style={{ backgroundColor: 'rgba(240, 230, 200, 0.9)', textAlign: 'center' }}>
                <Text c="#8B4513">No active bulletins at this time</Text>
              </Paper>
            )}
          </Stack>
        </Container>
      </Box>
    </FrontLayout>
  )
}

export default Bulletin