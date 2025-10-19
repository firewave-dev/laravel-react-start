import React, { useState } from 'react'
import { Container, Title, Text, Paper, Table, Button, Group, Badge, TextInput, ActionIcon, Select, Pagination } from '@mantine/core'
import { Link, router } from '@inertiajs/react'
import { Plus, Search, Edit, Eye, Trash, Calendar } from 'lucide-react'
import Layout from '../../layouts/app/Backend/Layout'

const EventsIndex = ({ events, filters }) => {
  const [search, setSearch] = useState(filters?.search || '')
  const [status, setStatus] = useState(filters?.status || '')
  const [type, setType] = useState(filters?.type || '')
  const [currentPage, setCurrentPage] = useState(events?.current_page || 1)

  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    router.get('/events', { search, status, type, page: 1 }, { preserveState: true })
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    router.get('/events', { search, status, type, page }, { preserveState: true })
  }

  const handleDelete = (eventId) => {
    if (confirm('Are you sure you want to delete this event?')) {
      router.delete(`/events/${eventId}`)
    }
  }

  const getStatusBadgeColor = (status) => {
    const colors = {
      published: 'green',
      draft: 'yellow',
      cancelled: 'red'
    }
    return colors[status] || 'gray'
  }

  const getTypeBadgeColor = (type) => {
    const colors = {
      liturgy: 'purple',
      feast: 'gold',
      social: 'blue',
      study: 'teal',
      service: 'pink',
      other: 'gray'
    }
    return colors[type] || 'gray'
  }

  return (
    <Layout>
      <Container size="xl" py="xl">
        <Paper 
          p="xl" 
          withBorder
          style={{ 
            background: 'linear-gradient(135deg, rgba(26, 31, 46, 0.8) 0%, rgba(15, 20, 25, 0.9) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 215, 0, 0.2)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
          }}
        >
          {/* Header */}
          <Group justify="space-between" mb="xl">
            <div>
              <Title order={2} c="#FFD700" style={{ fontFamily: 'serif' }}>
                Events & Calendar
              </Title>
              <Text c="#b8b8b8" size="sm">
                Manage church events, liturgies, and activities
              </Text>
            </div>
            <Link href="/events/create">
              <Button 
                leftSection={<Plus size={18} />}
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  color: '#1a1f2e',
                  fontWeight: 600
                }}
              >
                Add Event
              </Button>
            </Link>
          </Group>

          {/* Filters */}
          <form onSubmit={handleSearch}>
            <Group mb="lg">
              <TextInput
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                leftSection={<Search size={16} />}
                style={{ flex: 1 }}
                styles={{
                  input: {
                    backgroundColor: 'rgba(26, 31, 46, 0.6)',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    color: '#fff'
                  }
                }}
              />
              <Select
                placeholder="Status"
                value={status}
                onChange={(value) => setStatus(value)}
                data={[
                  { value: '', label: 'All Status' },
                  { value: 'published', label: 'Published' },
                  { value: 'draft', label: 'Draft' },
                  { value: 'cancelled', label: 'Cancelled' }
                ]}
                styles={{
                  input: {
                    backgroundColor: 'rgba(26, 31, 46, 0.6)',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    color: '#fff'
                  }
                }}
              />
              <Select
                placeholder="Type"
                value={type}
                onChange={(value) => setType(value)}
                data={[
                  { value: '', label: 'All Types' },
                  { value: 'liturgy', label: 'Liturgy' },
                  { value: 'feast', label: 'Feast' },
                  { value: 'social', label: 'Social' },
                  { value: 'study', label: 'Study' },
                  { value: 'service', label: 'Service' },
                  { value: 'other', label: 'Other' }
                ]}
                styles={{
                  input: {
                    backgroundColor: 'rgba(26, 31, 46, 0.6)',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    color: '#fff'
                  }
                }}
              />
              <Button type="submit" variant="light">Search</Button>
            </Group>
          </form>

          {/* Events Table */}
          <Paper
            withBorder
            style={{
              backgroundColor: 'rgba(15, 20, 25, 0.5)',
              border: '1px solid rgba(255, 215, 0, 0.1)',
              overflow: 'hidden'
            }}
          >
            <Table 
              highlightOnHover
              styles={{
                thead: {
                  backgroundColor: 'rgba(26, 31, 46, 0.8)'
                },
                th: {
                  color: '#FFD700',
                  fontWeight: 600,
                  padding: '16px'
                },
                tr: {
                  transition: 'all 0.2s ease',
                  borderLeft: '2px solid transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(26, 31, 46, 0.6)',
                    borderLeft: '2px solid rgba(255, 215, 0, 0.5)',
                  },
                  '&:hover td': {
                    color: '#ffffff'
                  }
                },
                td: {
                  color: '#b8b8b8',
                  padding: '16px',
                  borderBottom: '1px solid rgba(255, 215, 0, 0.05)',
                  transition: 'color 0.2s ease'
                }
              }}
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Event</Table.Th>
                  <Table.Th>Date & Time</Table.Th>
                  <Table.Th>Type</Table.Th>
                  <Table.Th>Location</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {events.data && events.data.length > 0 ? (
                  events.data.map((event) => (
                    <Table.Tr key={event.id}>
                      <Table.Td>
                        <Text fw={500} c="#fff">{event.title}</Text>
                        {event.is_featured && (
                          <Badge size="xs" color="yellow" variant="light" ml="xs">Featured</Badge>
                        )}
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm">
                          {new Date(event.event_date).toLocaleDateString()}
                        </Text>
                        {event.start_time && (
                          <Text size="xs" c="dimmed">
                            {event.start_time}
                            {event.end_time && ` - ${event.end_time}`}
                          </Text>
                        )}
                      </Table.Td>
                      <Table.Td>
                        <Badge color={getTypeBadgeColor(event.event_type)} variant="light" tt="capitalize">
                          {event.event_type}
                        </Badge>
                      </Table.Td>
                      <Table.Td>{event.location || '-'}</Table.Td>
                      <Table.Td>
                        <Badge color={getStatusBadgeColor(event.status)} variant="dot" tt="capitalize">
                          {event.status}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <ActionIcon
                            component={Link}
                            href={`/events/${event.id}`}
                            variant="subtle"
                            color="blue"
                          >
                            <Eye size={16} />
                          </ActionIcon>
                          <ActionIcon
                            component={Link}
                            href={`/events/${event.id}/edit`}
                            variant="subtle"
                            color="orange"
                          >
                            <Edit size={16} />
                          </ActionIcon>
                          <ActionIcon
                            variant="subtle"
                            color="red"
                            onClick={() => handleDelete(event.id)}
                          >
                            <Trash size={16} />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))
                ) : (
                  <Table.Tr>
                    <Table.Td colSpan={6}>
                      <Text ta="center" c="dimmed" py="xl">
                        No events found
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
            
            {/* Pagination */}
            {events.last_page > 1 && (
              <Group justify="center" mt="xl">
                <Pagination
                  total={events.last_page}
                  value={currentPage}
                  onChange={handlePageChange}
                  color="yellow"
                  size="md"
                  withEdges
                />
              </Group>
            )}
          </Paper>
        </Paper>
      </Container>
    </Layout>
  )
}

export default EventsIndex
