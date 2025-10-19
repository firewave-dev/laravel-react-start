import React, { useState } from 'react'
import { Head, useForm } from '@inertiajs/react'
import { 
  Container, 
  Card, 
  Title, 
  Text, 
  TextInput, 
  NumberInput, 
  Textarea, 
  Button, 
  Group, 
  Stack,
  Alert,
  Badge,
  Divider,
  ThemeIcon,
  Grid,
  Paper
} from '@mantine/core'
import { Calendar, MapPin, Clock, Users, AlertCircle, Check } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import FrontLayout from '../../layouts/app/Front/FrontLayout'

export default function EventRegistration({ event, registration = null, currentLocale = 'en' }) {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)

  const { data, setData, post, put, processing, errors, reset } = useForm({
    registrant_name: registration?.registrant_name || '',
    registrant_email: registration?.registrant_email || '',
    total_attendees: registration?.total_attendees || 1,
    notes: registration?.notes || '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    if (registration) {
      // Update existing registration
      put(route('event-registrations.update', registration.id), {
        onSuccess: () => {
          setLoading(false)
        },
        onError: () => {
          setLoading(false)
        }
      })
    } else {
      // Create new registration
      post(route('event-registrations.store', event.id), {
        onSuccess: () => {
          setLoading(false)
        },
        onError: () => {
          setLoading(false)
        }
      })
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(currentLocale === 'en' ? 'en-US' : 
                                           currentLocale === 'fr' ? 'fr-FR' : 'sr-RS')
  }

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString(currentLocale === 'en' ? 'en-US' : 
                                                           currentLocale === 'fr' ? 'fr-FR' : 'sr-RS', 
                                                           { hour: '2-digit', minute: '2-digit' })
  }

  const getRegistrationStatus = () => {
    if (!event.requiresRegistration) return null
    
    if (!event.isRegistrationOpen) {
      return { status: 'closed', label: t('registrationClosed'), color: 'red' }
    }
    
    if (event.isFull) {
      return { status: 'full', label: t('eventFull'), color: 'orange' }
    }
    
    return { status: 'open', label: t('registrationOpen'), color: 'green' }
  }

  const registrationStatus = getRegistrationStatus()

  return (
    <FrontLayout>
      <Head title={`${t('registerForEvent')} - ${event.title}`} />
      
      <Container size="lg" py="xl">
        <Stack spacing="xl">
          {/* Event Information Card */}
          <Card withBorder p="lg" style={{ backgroundColor: '#FFF8DC', border: '2px solid #D2B48C' }}>
            <Stack spacing="md">
              <Group>
                <ThemeIcon size="lg" variant="light" color="gold">
                  <Calendar size={20} />
                </ThemeIcon>
                <div>
                  <Title order={2} style={{ color: '#8B4513' }}>
                    {event.title}
                  </Title>
                  <Text size="sm" style={{ color: '#8B4513' }}>
                    {event.description}
                  </Text>
                </div>
              </Group>

              <Divider style={{ borderColor: '#D2B48C' }} />

              <Grid>
                <Grid.Col span={6}>
                  <Group spacing="sm">
                    <Calendar size={16} style={{ color: '#8B4513' }} />
                    <div>
                      <Text size="sm" fw={500} style={{ color: '#8B4513' }}>
                        {formatDate(event.event_date)}
                      </Text>
                      <Text size="xs" style={{ color: '#8B4513' }}>
                        {formatTime(event.start_time)} - {formatTime(event.end_time)}
                      </Text>
                    </div>
                  </Group>
                </Grid.Col>
                
                <Grid.Col span={6}>
                  <Group spacing="sm">
                    <MapPin size={16} style={{ color: '#8B4513' }} />
                    <div>
                      <Text size="sm" fw={500} style={{ color: '#8B4513' }}>
                        {event.location}
                      </Text>
                    </div>
                  </Group>
                </Grid.Col>
              </Grid>

              {event.requiresRegistration && (
                <Grid>
                  <Grid.Col span={6}>
                    <Group spacing="sm">
                      <Users size={16} style={{ color: '#8B4513' }} />
                      <div>
                        <Text size="sm" fw={500} style={{ color: '#8B4513' }}>
                          {t('eventCapacity')}: {event.registration_capacity || 'Unlimited'}
                        </Text>
                        <Text size="xs" style={{ color: '#8B4513' }}>
                          {t('availableSpots')}: {event.getAvailableSpots()}
                        </Text>
                      </div>
                    </Group>
                  </Grid.Col>
                  
                  <Grid.Col span={6}>
                    <Group spacing="sm">
                      <Clock size={16} style={{ color: '#8B4513' }} />
                      <div>
                        <Text size="sm" fw={500} style={{ color: '#8B4513' }}>
                          {t('registrationDeadline')}:
                        </Text>
                        <Text size="xs" style={{ color: '#8B4513' }}>
                          {event.getFormattedRegistrationDeadline()}
                        </Text>
                      </div>
                    </Group>
                  </Grid.Col>
                </Grid>
              )}

              {registrationStatus && (
                <Group>
                  <Badge color={registrationStatus.color} size="lg">
                    {registrationStatus.label}
                  </Badge>
                </Group>
              )}
            </Stack>
          </Card>

          {/* Registration Form */}
          {event.requiresRegistration && event.isRegistrationOpen && !event.isFull && (
            <Card withBorder p="lg" style={{ backgroundColor: '#FFF8DC', border: '2px solid #D2B48C' }}>
              <Stack spacing="md">
                <Title order={3} style={{ color: '#8B4513' }}>
                  {registration ? t('editRegistration') : t('registrationForm')}
                </Title>

                {event.registration_instructions && (
                  <Alert 
                    icon={<AlertCircle size={16} />} 
                    title={t('registrationInstructions')}
                    style={{ backgroundColor: '#F5F5DC', border: '1px solid #D2B48C' }}
                  >
                    <Text size="sm" style={{ color: '#8B4513' }}>
                      {event.registration_instructions}
                    </Text>
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  <Stack spacing="md">
                    <TextInput
                      label={t('registrantName')}
                      placeholder="Enter your full name"
                      value={data.registrant_name}
                      onChange={(e) => setData('registrant_name', e.target.value)}
                      error={errors.registrant_name}
                      required
                      styles={{
                        input: {
                          backgroundColor: '#FFF8DC',
                          border: '2px solid #D2B48C',
                          color: '#8B4513',
                          '&:focus': {
                            borderColor: '#8B4513',
                            backgroundColor: '#FFF8DC'
                          }
                        },
                        label: { color: '#8B4513' }
                      }}
                    />

                    <TextInput
                      label={t('registrantEmail')}
                      placeholder="Enter your email address"
                      type="email"
                      value={data.registrant_email}
                      onChange={(e) => setData('registrant_email', e.target.value)}
                      error={errors.registrant_email}
                      required
                      styles={{
                        input: {
                          backgroundColor: '#FFF8DC',
                          border: '2px solid #D2B48C',
                          color: '#8B4513',
                          '&:focus': {
                            borderColor: '#8B4513',
                            backgroundColor: '#FFF8DC'
                          }
                        },
                        label: { color: '#8B4513' }
                      }}
                    />

                    <NumberInput
                      label={t('totalAttendees')}
                      placeholder="Number of people attending"
                      min={1}
                      max={event.registration_capacity ? Math.min(10, event.getAvailableSpots() + (registration?.total_attendees || 0)) : 10}
                      value={data.total_attendees}
                      onChange={(value) => setData('total_attendees', value)}
                      error={errors.total_attendees}
                      required
                      styles={{
                        input: {
                          backgroundColor: '#FFF8DC',
                          border: '2px solid #D2B48C',
                          color: '#8B4513',
                          '&:focus': {
                            borderColor: '#8B4513',
                            backgroundColor: '#FFF8DC'
                          }
                        },
                        label: { color: '#8B4513' }
                      }}
                    />

                    <Textarea
                      label={t('registrationNotes')}
                      placeholder={t('registrationNotesPlaceholder')}
                      value={data.notes}
                      onChange={(e) => setData('notes', e.target.value)}
                      error={errors.notes}
                      minRows={3}
                      styles={{
                        input: {
                          backgroundColor: '#FFF8DC',
                          border: '2px solid #D2B48C',
                          color: '#8B4513',
                          '&:focus': {
                            borderColor: '#8B4513',
                            backgroundColor: '#FFF8DC'
                          }
                        },
                        label: { color: '#8B4513' }
                      }}
                    />

                    <Group position="right">
                      <Button
                        type="submit"
                        loading={processing || loading}
                        leftIcon={<Check size={16} />}
                        style={{
                          backgroundColor: '#8B4513',
                          '&:hover': { backgroundColor: '#A0522D' }
                        }}
                      >
                        {registration ? t('updateRegistration') : t('submitRegistration')}
                      </Button>
                    </Group>
                  </Stack>
                </form>
              </Stack>
            </Card>
          )}

          {/* Registration Closed/Full Message */}
          {event.requiresRegistration && (!event.isRegistrationOpen || event.isFull) && (
            <Card withBorder p="lg" style={{ backgroundColor: '#FFF8DC', border: '2px solid #D2B48C' }}>
              <Stack spacing="md" align="center">
                <ThemeIcon size="xl" variant="light" color="red">
                  <AlertCircle size={24} />
                </ThemeIcon>
                <Title order={3} style={{ color: '#8B4513' }}>
                  {event.isFull ? t('eventFull') : t('registrationClosed')}
                </Title>
                <Text style={{ color: '#8B4513' }} align="center">
                  {event.isFull 
                    ? t('eventFullMessage')
                    : t('registrationClosedMessage')
                  }
                </Text>
              </Stack>
            </Card>
          )}
        </Stack>
      </Container>
    </FrontLayout>
  )
}
