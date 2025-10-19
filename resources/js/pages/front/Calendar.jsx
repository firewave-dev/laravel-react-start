import React, { useState } from 'react'
import { Container, Title, Text, Paper, Group, Stack, Box, Badge, Select, Button, Alert } from '@mantine/core'
import { Calendar as CalendarIcon, Clock, MapPin, Users, UserPlus, AlertCircle } from 'lucide-react'
import { Link } from '@inertiajs/react'
import FrontLayout from '../../layouts/app/Front/FrontLayout'
import { useLanguage } from '../../contexts/LanguageContext'

const Calendar = ({ events = [], currentLocale = 'en' }) => {
  const { t } = useLanguage()
  const [filterType, setFilterType] = useState('')
  
  // Helper function to get translated content
  const getTranslatedContent = (item, field) => {
    if (currentLocale === 'en' || !item.translations) {
      return item[field]
    }
    
    const translation = item.translations.find(t => t.locale === currentLocale)
    return translation?.[field] || item[field]
  }
  
  // Helper function to format dates based on locale
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    
    const localeMap = {
      'en': 'en-US',
      'fr': 'fr-FR',
      'sr': 'sr-RS'
    }
    
    return date.toLocaleDateString(localeMap[currentLocale] || 'en-US', options)
  }

  const getTypeColor = (type) => {
    return { liturgy: 'purple', feast: 'gold', social: 'blue', study: 'teal', service: 'pink', other: 'gray' }[type] || 'gray'
  }

  const getRegistrationStatus = (event) => {
    if (!event.registration_required) return null
    
    if (!event.is_registration_open) {
      return { status: 'closed', label: t('registrationClosed'), color: 'red' }
    }
    
    if (event.is_full) {
      return { status: 'full', label: t('eventFull'), color: 'orange' }
    }
    
    return { status: 'open', label: t('registrationOpen'), color: 'green' }
  }

  const filteredEvents = filterType 
    ? events.filter(e => e.event_type === filterType)
    : events

  return (
    <FrontLayout>
      <Box style={{ minHeight: 'calc(100vh - 200px)', background: 'linear-gradient(135deg, #F5F5DC 0%, #DDD1A0 30%, #D2B48C 70%, #BC9A6A 100%)', padding: '3rem 0' }}>
        <Container size="xl">
          <Stack gap="xl">
            <Paper p="xl" withBorder style={{ backgroundColor: 'rgba(240, 230, 200, 0.9)', backdropFilter: 'blur(10px)', border: '2px solid rgba(139, 69, 19, 0.25)', borderRadius: '12px', boxShadow: '0 8px 32px rgba(139, 69, 19, 0.1)' }}>
              <Group justify="space-between" align="center">
                <Box>
                  <Title order={1} c="#8B4513" style={{ fontFamily: 'serif' }} mb="xs">{t('viewCalendar')}</Title>
                  <Text size="lg" c="#654321">{t('calendarSubtitle')}</Text>
                </Box>
                <Select placeholder="Filter by type" value={filterType} onChange={(value) => setFilterType(value)} data={[ {value: '', label: 'All Events'}, {value: 'liturgy', label: 'Liturgy'}, {value: 'feast', label: 'Feast'}, {value: 'social', label: 'Social'}, {value: 'study', label: 'Study'}, {value: 'service', label: 'Service'} ]} styles={{ input: { backgroundColor: 'rgba(255, 248, 220, 0.9)', border: '1px solid rgba(139, 69, 19, 0.3)' } }} />
              </Group>
            </Paper>

            {filteredEvents && filteredEvents.length > 0 ? (
              <Stack gap="md">
                {filteredEvents.map((event) => (
                  <Paper key={event.id} p="lg" withBorder style={{ backgroundColor: 'rgba(240, 230, 200, 0.85)', border: '2px solid rgba(139, 69, 19, 0.2)', borderRadius: '12px', borderLeft: event.is_featured ? '6px solid #DAA520' : undefined }}>
                    <Group justify="space-between" align="flex-start">
                      <Box style={{ flex: 1 }}>
                        <Group gap="xs" mb="sm">
                          <Badge color={getTypeColor(event.event_type)} variant="light" tt="capitalize">{event.event_type}</Badge>
                          {event.is_featured && <Badge color="yellow" variant="filled" size="sm">Featured</Badge>}
                          {event.is_recurring && <Badge color="cyan" variant="light" size="sm">Recurring</Badge>}
                        </Group>
                        <Title order={3} c="#8B4513" mb="sm" style={{ fontFamily: 'serif' }}>{getTranslatedContent(event, 'title')}</Title>
                        {event.description && <Text c="#654321" mb="md" lineClamp={2}>{getTranslatedContent(event, 'description')}</Text>}
                        <Group gap="lg">
                          <Group gap="xs">
                            <CalendarIcon size={16} color="#8B4513" />
                            <Text size="sm" c="#8B4513" fw={500}>{formatDate(event.event_date)}</Text>
                          </Group>
                          {event.start_time && (
                            <Group gap="xs">
                              <Clock size={16} color="#8B4513" />
                              <Text size="sm" c="#8B4513">{event.start_time}{event.end_time && ` - ${event.end_time}`}</Text>
                            </Group>
                          )}
                          {event.location && (
                            <Group gap="xs">
                              <MapPin size={16} color="#8B4513" />
                              <Text size="sm" c="#8B4513">{getTranslatedContent(event, 'location')}</Text>
                            </Group>
                          )}
                          {event.registration_required && (
                            <Group gap="xs">
                              <Users size={16} color="#8B4513" />
                              <Text size="sm" c="#8B4513">
                                {event.registration_capacity ? `${event.confirmed_registrations || 0}/${event.registration_capacity}` : `${event.confirmed_registrations || 0} registered`}
                              </Text>
                            </Group>
                          )}
                        </Group>

                        {/* Registration Status and Actions */}
                        {event.registration_required && (
                          <Box mt="md">
                            {getRegistrationStatus(event) && (
                              <Group justify="space-between" align="center">
                                <Badge 
                                  color={getRegistrationStatus(event).color} 
                                  variant="light"
                                  leftSection={<UserPlus size={12} />}
                                >
                                  {getRegistrationStatus(event).label}
                                </Badge>
                                
                                {getRegistrationStatus(event).status === 'open' && (
                                  <Link href={route('event-registrations.create', event.id)}>
                                    <Button
                                      size="sm"
                                      leftSection={<UserPlus size={14} />}
                                      style={{
                                        backgroundColor: '#8B4513',
                                        '&:hover': { backgroundColor: '#A0522D' }
                                      }}
                                    >
                                      {t('registerForEvent')}
                                    </Button>
                                  </Link>
                                )}
                                
                                {getRegistrationStatus(event).status === 'full' && event.allow_waitlist && (
                                  <Link href={route('event-registrations.create', event.id)}>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      leftSection={<UserPlus size={14} />}
                                      style={{
                                        borderColor: '#D2B48C',
                                        color: '#8B4513',
                                        '&:hover': { backgroundColor: '#F5F5DC' }
                                      }}
                                    >
                                      {t('joinWaitlist')}
                                    </Button>
                                  </Link>
                                )}
                              </Group>
                            )}
                            
                            {event.registration_deadline && (
                              <Alert 
                                icon={<AlertCircle size={16} />} 
                                color="blue" 
                                variant="light" 
                                mt="sm"
                                style={{ backgroundColor: 'rgba(255, 248, 220, 0.5)' }}
                              >
                                <Text size="xs" c="#8B4513">
                                  {t('registrationDeadline')}: {formatDate(event.registration_deadline)}
                                </Text>
                              </Alert>
                            )}
                          </Box>
                        )}
                      </Box>
                    </Group>
                  </Paper>
                ))}
              </Stack>
            ) : (
              <Paper p="xl" style={{ backgroundColor: 'rgba(240, 230, 200, 0.9)', textAlign: 'center' }}>
                <Text c="#8B4513">No upcoming events</Text>
              </Paper>
            )}
          </Stack>
        </Container>
      </Box>
    </FrontLayout>
  )
}

export default Calendar
