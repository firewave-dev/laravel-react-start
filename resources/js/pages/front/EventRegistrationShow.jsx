import React from 'react'
import { Head, Link } from '@inertiajs/react'
import { 
  Container, 
  Card, 
  Title, 
  Text, 
  Button, 
  Group, 
  Stack,
  Badge,
  Divider,
  ThemeIcon,
  Grid,
  Paper,
  Alert
} from '@mantine/core'
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Mail, 
  Edit, 
  Trash2,
  ArrowLeft,
  Check,
  X
} from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import FrontLayout from '../../layouts/app/Front/FrontLayout'

export default function EventRegistrationShow({ registration, event, currentLocale = 'en' }) {
  const { t } = useLanguage()

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(currentLocale === 'en' ? 'en-US' : 
                                           currentLocale === 'fr' ? 'fr-FR' : 'sr-RS')
  }

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString(currentLocale === 'en' ? 'en-US' : 
                                                           currentLocale === 'fr' ? 'fr-FR' : 'sr-RS', 
                                                           { hour: '2-digit', minute: '2-digit' })
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'yellow', icon: ClockWait, label: t('pending') },
      confirmed: { color: 'green', icon: Check, label: t('confirmed') },
      waitlisted: { color: 'orange', icon: ClockWait, label: t('waitlisted') },
      cancelled: { color: 'red', icon: X, label: t('cancelled') },
      checked_in: { color: 'blue', icon: Check, label: t('checkedIn') }
    }

    const config = statusConfig[status] || statusConfig.pending
    return (
      <Badge 
        color={config.color} 
        size="lg" 
        leftSection={<config.icon size={14} />}
      >
        {config.label}
      </Badge>
    )
  }

  const getPaymentStatusBadge = (paymentStatus) => {
    const statusConfig = {
      pending: { color: 'yellow', label: t('paymentPending') },
      completed: { color: 'green', label: t('paymentCompleted') },
      failed: { color: 'red', label: t('paymentFailed') },
      not_required: { color: 'gray', label: t('noPaymentRequired') }
    }

    const config = statusConfig[paymentStatus] || statusConfig.not_required
    return (
      <Badge color={config.color} size="md">
        {config.label}
      </Badge>
    )
  }

  return (
    <FrontLayout>
      <Head title={`${t('registrationDetails')} - ${event.title}`} />
      
      <Container size="lg" py="xl">
        <Stack spacing="xl">
          {/* Back Button */}
          <Group>
            <Link href={route('calendar')}>
              <Button 
                variant="outline" 
                leftIcon={<ArrowLeft size={16} />}
                style={{ 
                  borderColor: '#D2B48C', 
                  color: '#8B4513',
                  '&:hover': { backgroundColor: '#F5F5DC' }
                }}
              >
                {t('backToCalendar')}
              </Button>
            </Link>
          </Group>

          {/* Registration Status Card */}
          <Card withBorder p="lg" style={{ backgroundColor: '#FFF8DC', border: '2px solid #D2B48C' }}>
            <Stack spacing="md">
              <Group position="apart">
                <Title order={2} style={{ color: '#8B4513' }}>
                  {t('registrationConfirmation')}
                </Title>
                {getStatusBadge(registration.status)}
              </Group>
              
              <Text style={{ color: '#8B4513' }}>
                {t('registrationSuccess')}
              </Text>

              <Divider style={{ borderColor: '#D2B48C' }} />

              <Grid>
                <Grid.Col span={6}>
                  <Group spacing="sm">
                    <Calendar size={16} style={{ color: '#8B4513' }} />
                    <div>
                      <Text size="sm" fw={500} style={{ color: '#8B4513' }}>
                        {t('registrationDate')}
                      </Text>
                      <Text size="sm" style={{ color: '#8B4513' }}>
                        {formatDate(registration.registration_date)}
                      </Text>
                    </div>
                  </Group>
                </Grid.Col>
                
                <Grid.Col span={6}>
                  <Group spacing="sm">
                    <Users size={16} style={{ color: '#8B4513' }} />
                    <div>
                      <Text size="sm" fw={500} style={{ color: '#8B4513' }}>
                        {t('totalAttendees')}
                      </Text>
                      <Text size="sm" style={{ color: '#8B4513' }}>
                        {registration.total_attendees}
                      </Text>
                    </div>
                  </Group>
                </Grid.Col>
              </Grid>

              {registration.payment_status !== 'not_required' && (
                <Group>
                  <Text size="sm" fw={500} style={{ color: '#8B4513' }}>
                    {t('paymentStatus')}:
                  </Text>
                  {getPaymentStatusBadge(registration.payment_status)}
                </Group>
              )}
            </Stack>
          </Card>

          {/* Event Information Card */}
          <Card withBorder p="lg" style={{ backgroundColor: '#FFF8DC', border: '2px solid #D2B48C' }}>
            <Stack spacing="md">
              <Title order={3} style={{ color: '#8B4513' }}>
                {event.title}
              </Title>
              
              <Text style={{ color: '#8B4513' }}>
                {event.description}
              </Text>

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
            </Stack>
          </Card>

          {/* Registration Details Card */}
          <Card withBorder p="lg" style={{ backgroundColor: '#FFF8DC', border: '2px solid #D2B48C' }}>
            <Stack spacing="md">
              <Title order={3} style={{ color: '#8B4513' }}>
                {t('registrationDetails')}
              </Title>

              <Grid>
                <Grid.Col span={6}>
                  <Group spacing="sm">
                    <Users size={16} style={{ color: '#8B4513' }} />
                    <div>
                      <Text size="sm" fw={500} style={{ color: '#8B4513' }}>
                        {t('registrantName')}
                      </Text>
                      <Text size="sm" style={{ color: '#8B4513' }}>
                        {registration.registrant_name}
                      </Text>
                    </div>
                  </Group>
                </Grid.Col>
                
                <Grid.Col span={6}>
                  <Group spacing="sm">
                    <Mail size={16} style={{ color: '#8B4513' }} />
                    <div>
                      <Text size="sm" fw={500} style={{ color: '#8B4513' }}>
                        {t('registrantEmail')}
                      </Text>
                      <Text size="sm" style={{ color: '#8B4513' }}>
                        {registration.registrant_email}
                      </Text>
                    </div>
                  </Group>
                </Grid.Col>
              </Grid>

              {registration.notes && (
                <div>
                  <Text size="sm" fw={500} style={{ color: '#8B4513' }}>
                    {t('registrationNotes')}
                  </Text>
                  <Text size="sm" style={{ color: '#8B4513' }}>
                    {registration.notes}
                  </Text>
                </div>
              )}

              <Divider style={{ borderColor: '#D2B48C' }} />

              <Grid>
                <Grid.Col span={4}>
                  <div>
                    <Text size="sm" fw={500} style={{ color: '#8B4513' }}>
                      {t('registrationStatus')}
                    </Text>
                    <div style={{ marginTop: 4 }}>
                      {getStatusBadge(registration.status)}
                    </div>
                  </div>
                </Grid.Col>
                
                <Grid.Col span={4}>
                  <div>
                    <Text size="sm" fw={500} style={{ color: '#8B4513' }}>
                      {t('registrationDate')}
                    </Text>
                    <Text size="sm" style={{ color: '#8B4513' }}>
                      {formatDate(registration.registration_date)}
                    </Text>
                  </div>
                </Grid.Col>
                
                <Grid.Col span={4}>
                  <div>
                    <Text size="sm" fw={500} style={{ color: '#8B4513' }}>
                      {t('totalAttendees')}
                    </Text>
                    <Text size="sm" style={{ color: '#8B4513' }}>
                      {registration.total_attendees}
                    </Text>
                  </div>
                </Grid.Col>
              </Grid>

              {registration.waitlist_position && (
                <Alert 
                  icon={<ClockWait size={16} />} 
                  title={t('waitlistPosition')}
                  color="orange"
                  style={{ backgroundColor: '#F5F5DC', border: '1px solid #D2B48C' }}
                >
                  <Text size="sm" style={{ color: '#8B4513' }}>
                    {t('waitlistPositionMessage', { position: registration.waitlist_position })}
                  </Text>
                </Alert>
              )}

              {registration.checked_in_at && (
                <Alert 
                  icon={<Check size={16} />} 
                  title={t('checkedIn')}
                  color="green"
                  style={{ backgroundColor: '#F5F5DC', border: '1px solid #D2B48C' }}
                >
                  <Text size="sm" style={{ color: '#8B4513' }}>
                    {t('checkedInAt', { time: formatTime(registration.checked_in_at) })}
                  </Text>
                </Alert>
              )}
            </Stack>
          </Card>

          {/* Action Buttons */}
          <Card withBorder p="lg" style={{ backgroundColor: '#FFF8DC', border: '2px solid #D2B48C' }}>
            <Group position="apart">
              <Group>
                {registration.status === 'pending' && (
                  <Link href={route('event-registrations.edit', registration.id)}>
                    <Button 
                      leftIcon={<Edit size={16} />}
                      style={{
                        backgroundColor: '#8B4513',
                        '&:hover': { backgroundColor: '#A0522D' }
                      }}
                    >
                      {t('editRegistration')}
                    </Button>
                  </Link>
                )}
                
                <Link 
                  href={route('event-registrations.destroy', registration.id)}
                  method="delete"
                  as="button"
                  onBefore={() => window.confirm(t('confirmCancelRegistration'))}
                >
                  <Button 
                    variant="outline"
                    color="red"
                    leftIcon={<Trash2 size={16} />}
                    style={{ 
                      borderColor: '#DC3545', 
                      color: '#DC3545',
                      '&:hover': { backgroundColor: '#F8D7DA' }
                    }}
                  >
                    {t('cancelRegistration')}
                  </Button>
                </Link>
              </Group>

              <Link href={route('calendar')}>
                <Button 
                  variant="outline"
                  leftIcon={<ArrowLeft size={16} />}
                  style={{ 
                    borderColor: '#D2B48C', 
                    color: '#8B4513',
                    '&:hover': { backgroundColor: '#F5F5DC' }
                  }}
                >
                  {t('backToCalendar')}
                </Button>
              </Link>
            </Group>
          </Card>
        </Stack>
      </Container>
    </FrontLayout>
  )
}
