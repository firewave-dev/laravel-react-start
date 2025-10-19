import React, { useState } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import {
  Container,
  Title,
  Card,
  Table,
  Badge,
  Group,
  Button,
  TextInput,
  Select,
  Stack,
  Text,
  Pagination,
  ActionIcon,
  Menu,
  Modal,
  Alert,
  ThemeIcon,
  Grid,
  Paper
} from '@mantine/core'
import {
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Check,
  X,
  Clock,
  Users,
  Calendar,
  MoreHorizontal,
  AlertCircle
} from 'lucide-react'
import { useLanguage } from '../../../contexts/LanguageContext'
import Layout from '../../../layouts/app/Backend/Layout'

export default function EventRegistrationsIndex({ 
  registrations, 
  events, 
  stats,
  filters = {},
  currentLocale = 'en' 
}) {
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState(filters.search || '')
  const [statusFilter, setStatusFilter] = useState(filters.status || '')
  const [eventFilter, setEventFilter] = useState(filters.event_id || '')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedRegistration, setSelectedRegistration] = useState(null)

  const handleSearch = (value) => {
    setSearchTerm(value)
    router.get(route('admin.event-registrations.index'), {
      search: value,
      status: statusFilter,
      event_id: eventFilter,
    }, {
      preserveState: true,
      replace: true
    })
  }

  const handleStatusFilter = (value) => {
    setStatusFilter(value)
    router.get(route('admin.event-registrations.index'), {
      search: searchTerm,
      status: value,
      event_id: eventFilter,
    }, {
      preserveState: true,
      replace: true
    })
  }

  const handleEventFilter = (value) => {
    setEventFilter(value)
    router.get(route('admin.event-registrations.index'), {
      search: searchTerm,
      status: statusFilter,
      event_id: value,
    }, {
      preserveState: true,
      replace: true
    })
  }

  const handleDelete = (registration) => {
    setSelectedRegistration(registration)
    setDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (selectedRegistration) {
      router.delete(route('admin.event-registrations.destroy', selectedRegistration.id))
      setDeleteModalOpen(false)
      setSelectedRegistration(null)
    }
  }

  const handleStatusChange = (registration, status) => {
    const routeMap = {
      confirm: route('admin.event-registrations.confirm', registration.id),
      cancel: route('admin.event-registrations.cancel', registration.id),
      waitlist: route('admin.event-registrations.waitlist', registration.id),
      'check-in': route('admin.event-registrations.check-in', registration.id)
    }

    if (routeMap[status]) {
      router.post(routeMap[status])
    }
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'yellow', label: t('pending') },
      confirmed: { color: 'green', label: t('confirmed') },
      waitlisted: { color: 'orange', label: t('waitlisted') },
      cancelled: { color: 'red', label: t('cancelled') },
      checked_in: { color: 'blue', label: t('checkedIn') }
    }

    const config = statusConfig[status] || statusConfig.pending
    return (
      <Badge color={config.color} size="md">
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
      <Badge color={config.color} size="sm">
        {config.label}
      </Badge>
    )
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(currentLocale === 'en' ? 'en-US' : 
                                           currentLocale === 'fr' ? 'fr-FR' : 'sr-RS')
  }

  return (
    <Layout>
      <Head title={t('manageRegistrations')} />
      
      <Container size="xl" py="xl">
        <Stack spacing="xl">
          {/* Header */}
          <Group position="apart">
            <div>
              <Title order={1} style={{ color: '#FFFFFF' }}>
                {t('manageRegistrations')}
              </Title>
              <Text style={{ color: '#CCCCCC' }}>
                {t('manageRegistrationsDescription')}
              </Text>
            </div>
          </Group>

          {/* Statistics Cards */}
          <Grid>
            <Grid.Col span={3}>
              <Card withBorder p="lg" style={{ 
                backgroundColor: 'rgba(26, 31, 46, 0.8)', 
                border: '1px solid rgba(255, 215, 0, 0.2)',
                backdropFilter: 'blur(10px)'
              }}>
                <Group>
                  <ThemeIcon size="xl" variant="light" color="blue">
                    <Users size={24} />
                  </ThemeIcon>
                  <div>
                    <Text size="sm" style={{ color: '#CCCCCC' }}>
                      {t('totalRegistrations')}
                    </Text>
                    <Text size="xl" fw={700} style={{ color: '#FFFFFF' }}>
                      {stats.total}
                    </Text>
                  </div>
                </Group>
              </Card>
            </Grid.Col>
            
            <Grid.Col span={3}>
              <Card withBorder p="lg" style={{ 
                backgroundColor: 'rgba(26, 31, 46, 0.8)', 
                border: '1px solid rgba(255, 215, 0, 0.2)',
                backdropFilter: 'blur(10px)'
              }}>
                <Group>
                  <ThemeIcon size="xl" variant="light" color="green">
                    <Check size={24} />
                  </ThemeIcon>
                  <div>
                    <Text size="sm" style={{ color: '#CCCCCC' }}>
                      {t('confirmedRegistrations')}
                    </Text>
                    <Text size="xl" fw={700} style={{ color: '#FFFFFF' }}>
                      {stats.confirmed}
                    </Text>
                  </div>
                </Group>
              </Card>
            </Grid.Col>
            
            <Grid.Col span={3}>
              <Card withBorder p="lg" style={{ 
                backgroundColor: 'rgba(26, 31, 46, 0.8)', 
                border: '1px solid rgba(255, 215, 0, 0.2)',
                backdropFilter: 'blur(10px)'
              }}>
                <Group>
                  <ThemeIcon size="xl" variant="light" color="yellow">
                    <Clock size={24} />
                  </ThemeIcon>
                  <div>
                    <Text size="sm" style={{ color: '#CCCCCC' }}>
                      {t('pendingRegistrations')}
                    </Text>
                    <Text size="xl" fw={700} style={{ color: '#FFFFFF' }}>
                      {stats.pending}
                    </Text>
                  </div>
                </Group>
              </Card>
            </Grid.Col>
            
            <Grid.Col span={3}>
              <Card withBorder p="lg" style={{ 
                backgroundColor: 'rgba(26, 31, 46, 0.8)', 
                border: '1px solid rgba(255, 215, 0, 0.2)',
                backdropFilter: 'blur(10px)'
              }}>
                <Group>
                  <ThemeIcon size="xl" variant="light" color="blue">
                    <Calendar size={24} />
                  </ThemeIcon>
                  <div>
                    <Text size="sm" style={{ color: '#CCCCCC' }}>
                      {t('checkedInCount')}
                    </Text>
                    <Text size="xl" fw={700} style={{ color: '#FFFFFF' }}>
                      {stats.checked_in}
                    </Text>
                  </div>
                </Group>
              </Card>
            </Grid.Col>
          </Grid>

          {/* Filters */}
          <Card withBorder p="lg" style={{ 
            backgroundColor: 'rgba(26, 31, 46, 0.8)', 
            border: '1px solid rgba(255, 215, 0, 0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            <Grid>
              <Grid.Col span={4}>
                <TextInput
                  placeholder={t('searchRegistrations')}
                  leftSection={<Search size={16} />}
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  styles={{
                    input: {
                      backgroundColor: 'rgba(26, 31, 46, 0.8)',
                      border: '1px solid rgba(255, 215, 0, 0.3)',
                      color: '#FFFFFF',
                      '&:focus': {
                        borderColor: 'rgba(255, 215, 0, 0.6)',
                        backgroundColor: 'rgba(26, 31, 46, 0.9)'
                      }
                    }
                  }}
                />
              </Grid.Col>
              
              <Grid.Col span={4}>
                <Select
                  placeholder={t('filterByStatus')}
                  leftSection={<Filter size={16} />}
                  value={statusFilter}
                  onChange={handleStatusFilter}
                  data={[
                    { value: '', label: t('allStatuses') },
                    { value: 'pending', label: t('pending') },
                    { value: 'confirmed', label: t('confirmed') },
                    { value: 'waitlisted', label: t('waitlisted') },
                    { value: 'cancelled', label: t('cancelled') },
                    { value: 'checked_in', label: t('checkedIn') }
                  ]}
                  styles={{
                    input: {
                      backgroundColor: 'rgba(26, 31, 46, 0.8)',
                      border: '1px solid rgba(255, 215, 0, 0.3)',
                      color: '#FFFFFF',
                      '&:focus': {
                        borderColor: 'rgba(255, 215, 0, 0.6)',
                        backgroundColor: 'rgba(26, 31, 46, 0.9)'
                      }
                    }
                  }}
                />
              </Grid.Col>
              
              <Grid.Col span={4}>
                <Select
                  placeholder={t('filterByEvent')}
                  leftSection={<Calendar size={16} />}
                  value={eventFilter}
                  onChange={handleEventFilter}
                  data={[
                    { value: '', label: t('allEvents') },
                    ...events.map(event => ({
                      value: event.id.toString(),
                      label: event.title
                    }))
                  ]}
                  styles={{
                    input: {
                      backgroundColor: 'rgba(26, 31, 46, 0.8)',
                      border: '1px solid rgba(255, 215, 0, 0.3)',
                      color: '#FFFFFF',
                      '&:focus': {
                        borderColor: 'rgba(255, 215, 0, 0.6)',
                        backgroundColor: 'rgba(26, 31, 46, 0.9)'
                      }
                    }
                  }}
                />
              </Grid.Col>
            </Grid>
          </Card>

          {/* Registrations Table */}
          <Card withBorder p="lg" style={{ 
            backgroundColor: 'rgba(26, 31, 46, 0.8)', 
            border: '1px solid rgba(255, 215, 0, 0.2)',
            backdropFilter: 'blur(10px)'
          }}>
            <Table 
              highlightOnHover
              styles={{
                root: { color: '#FFFFFF' },
                thead: {
                  tr: { 
                    backgroundColor: 'rgba(255, 215, 0, 0.15)',
                    '& th': { 
                      color: '#FFD700',
                      borderBottom: '2px solid rgba(255, 215, 0, 0.5)',
                      backgroundColor: 'rgba(255, 215, 0, 0.1)',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      padding: '16px 12px'
                    }
                  }
                },
                tbody: {
                  tr: {
                    backgroundColor: 'transparent',
                    borderBottom: '1px solid rgba(255, 215, 0, 0.1)',
                    '&:hover': { backgroundColor: 'rgba(255, 215, 0, 0.05)' },
                    '&:nthOfType(even)': { backgroundColor: 'rgba(255, 215, 0, 0.02)' },
                    '& td': { 
                      color: '#FFFFFF',
                      borderBottom: '1px solid rgba(255, 215, 0, 0.1)',
                      backgroundColor: 'transparent'
                    }
                  }
                }
              }}
            >
              <thead>
                <tr>
                  <th>{t('registrantName')}</th>
                  <th>{t('event')}</th>
                  <th>{t('registrationStatus')}</th>
                  <th>{t('totalAttendees')}</th>
                  <th>{t('registrationDate')}</th>
                  <th>{t('paymentStatus')}</th>
                  <th>{t('actions')}</th>
                </tr>
              </thead>
              <tbody>
                {registrations.data.map((registration) => (
                  <tr key={registration.id}>
                    <td>
                      <div>
                        <Text fw={500} style={{ color: '#FFFFFF' }}>
                          {registration.registrant_name}
                        </Text>
                        <Text size="sm" style={{ color: '#CCCCCC' }}>
                          {registration.registrant_email}
                        </Text>
                      </div>
                    </td>
                    <td>
                      <Text style={{ color: '#FFFFFF' }}>
                        {registration.event?.title || 'N/A'}
                      </Text>
                      <Text size="sm" style={{ color: '#CCCCCC' }}>
                        {registration.event?.event_date ? formatDate(registration.event.event_date) : 'N/A'}
                      </Text>
                    </td>
                    <td>{getStatusBadge(registration.status)}</td>
                    <td>
                      <Text style={{ color: '#FFFFFF' }}>
                        {registration.total_attendees}
                      </Text>
                    </td>
                    <td>
                      <Text style={{ color: '#FFFFFF' }}>
                        {formatDate(registration.registration_date)}
                      </Text>
                    </td>
                    <td>{getPaymentStatusBadge(registration.payment_status)}</td>
                    <td>
                      <Group spacing="xs">
                        <Link href={route('admin.event-registrations.show', registration.id)}>
                          <ActionIcon 
                            color="blue" 
                            variant="light"
                            size="sm"
                          >
                            <Eye size={14} />
                          </ActionIcon>
                        </Link>
                        
                        <Link href={route('admin.event-registrations.edit', registration.id)}>
                          <ActionIcon 
                            color="yellow" 
                            variant="light"
                            size="sm"
                          >
                            <Edit size={14} />
                          </ActionIcon>
                        </Link>

                        <Menu shadow="md" width={200}>
                          <Menu.Target>
                            <ActionIcon color="gray" variant="light" size="sm">
                              <MoreHorizontal size={14} />
                            </ActionIcon>
                          </Menu.Target>

                          <Menu.Dropdown style={{ backgroundColor: 'rgba(26, 31, 46, 0.95)' }}>
                            {registration.status === 'pending' && (
                              <>
                                <Menu.Item 
                                  icon={<Check size={14} />}
                                  onClick={() => handleStatusChange(registration, 'confirm')}
                                >
                                  {t('confirm')}
                                </Menu.Item>
                                <Menu.Item 
                                  icon={<Clock size={14} />}
                                  onClick={() => handleStatusChange(registration, 'waitlist')}
                                >
                                  {t('moveToWaitlist')}
                                </Menu.Item>
                              </>
                            )}
                            
                            {registration.status === 'confirmed' && (
                              <Menu.Item 
                                icon={<Calendar size={14} />}
                                onClick={() => handleStatusChange(registration, 'check-in')}
                              >
                                {t('checkIn')}
                              </Menu.Item>
                            )}
                            
                            <Menu.Divider />
                            <Menu.Item 
                              color="red"
                              icon={<Trash2 size={14} />}
                              onClick={() => handleDelete(registration)}
                            >
                              {t('delete')}
                            </Menu.Item>
                          </Menu.Dropdown>
                        </Menu>
                      </Group>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {registrations.data.length === 0 && (
              <Alert 
                icon={<AlertCircle size={16} />} 
                title={t('noRegistrations')}
                color="blue"
                style={{ backgroundColor: 'rgba(26, 31, 46, 0.8)' }}
              >
                {t('noRegistrationsMessage')}
              </Alert>
            )}

            {registrations.last_page > 1 && (
              <Group position="center" mt="xl">
                <Pagination
                  total={registrations.last_page}
                  page={registrations.current_page}
                  onChange={(page) => router.get(route('admin.event-registrations.index'), {
                    page,
                    search: searchTerm,
                    status: statusFilter,
                    event_id: eventFilter,
                  })}
                  styles={{
                    control: {
                      backgroundColor: 'rgba(26, 31, 46, 0.8)',
                      border: '1px solid rgba(255, 215, 0, 0.3)',
                      color: '#FFFFFF',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 215, 0, 0.1)',
                        borderColor: 'rgba(255, 215, 0, 0.6)'
                      }
                    }
                  }}
                />
              </Group>
            )}
          </Card>
        </Stack>

        {/* Delete Confirmation Modal */}
        <Modal
          opened={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          title={t('confirmDelete')}
          centered
        >
          <Stack spacing="md">
            <Text style={{ color: '#FFFFFF' }}>
              {t('confirmDeleteRegistrationMessage')}
            </Text>
            
            {selectedRegistration && (
              <Paper p="md" style={{ backgroundColor: 'rgba(26, 31, 46, 0.8)' }}>
                <Text fw={500} style={{ color: '#FFFFFF' }}>
                  {selectedRegistration.registrant_name}
                </Text>
                <Text size="sm" style={{ color: '#CCCCCC' }}>
                  {selectedRegistration.event?.title}
                </Text>
              </Paper>
            )}

            <Group position="right">
              <Button 
                variant="outline" 
                onClick={() => setDeleteModalOpen(false)}
                style={{ 
                  borderColor: '#D2B48C', 
                  color: '#D2B48C',
                  '&:hover': { backgroundColor: '#F5F5DC' }
                }}
              >
                {t('cancel')}
              </Button>
              <Button 
                color="red"
                onClick={confirmDelete}
                style={{
                  backgroundColor: '#DC3545',
                  '&:hover': { backgroundColor: '#C82333' }
                }}
              >
                {t('delete')}
              </Button>
            </Group>
          </Stack>
        </Modal>
      </Container>
    </Layout>
  )
}
