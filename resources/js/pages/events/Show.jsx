import React from 'react'
import { Container, Title, Text, Paper, Badge, Group, Button, Stack, Grid, Divider } from '@mantine/core'
import { Link } from '@inertiajs/react'
import { ArrowLeft, Edit, Calendar, Clock, MapPin, Users, User } from 'lucide-react'
import Layout from '../../layouts/app/Backend/Layout'

const EventsShow = ({ event }) => {
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
      <Container size="lg" py="xl">
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
            <Group>
              <Link href="/events">
                <Button 
                  variant="subtle" 
                  leftSection={<ArrowLeft size={18} />}
                  c="#FFD700"
                >
                  Back to Events
                </Button>
              </Link>
            </Group>
            <Link href={`/events/${event.id}/edit`}>
              <Button
                leftSection={<Edit size={18} />}
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  color: '#1a1f2e',
                  fontWeight: 600
                }}
              >
                Edit Event
              </Button>
            </Link>
          </Group>

          <Title order={2} c="#FFD700" mb="xs" style={{ fontFamily: 'serif' }}>
            {event.title}
          </Title>
          <Group mb="xl">
            <Badge color={getTypeBadgeColor(event.event_type)} size="lg" variant="light" tt="capitalize">
              {event.event_type}
            </Badge>
            <Badge color={getStatusBadgeColor(event.status)} size="lg" variant="dot" tt="capitalize">
              {event.status}
            </Badge>
            {event.is_featured && (
              <Badge color="yellow" size="lg" variant="filled">Featured</Badge>
            )}
            {event.is_recurring && (
              <Badge color="cyan" size="lg" variant="light">Recurring</Badge>
            )}
          </Group>

          <Divider color="rgba(255, 215, 0, 0.2)" mb="xl" />

          {/* Description */}
          {event.description && (
            <Paper
              p="md"
              mb="xl"
              withBorder
              style={{
                backgroundColor: 'rgba(15, 20, 25, 0.5)',
                border: '1px solid rgba(255, 215, 0, 0.1)'
              }}
            >
              <Text c="#FFD700" fw={600} mb="xs">Description</Text>
              <Text c="#b8b8b8" style={{ whiteSpace: 'pre-wrap' }}>
                {event.description}
              </Text>
            </Paper>
          )}

          {/* Event Details */}
          <Grid mb="xl">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Paper
                p="md"
                withBorder
                style={{
                  backgroundColor: 'rgba(15, 20, 25, 0.5)',
                  border: '1px solid rgba(255, 215, 0, 0.1)'
                }}
              >
                <Group gap="sm" mb="xs">
                  <Calendar size={20} color="#FFD700" />
                  <Text fw={500} c="#FFD700">Event Date</Text>
                </Group>
                <Text c="#b8b8b8">
                  {new Date(event.event_date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Text>
              </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Paper
                p="md"
                withBorder
                style={{
                  backgroundColor: 'rgba(15, 20, 25, 0.5)',
                  border: '1px solid rgba(255, 215, 0, 0.1)'
                }}
              >
                <Group gap="sm" mb="xs">
                  <Clock size={20} color="#FFD700" />
                  <Text fw={500} c="#FFD700">Time</Text>
                </Group>
                <Text c="#b8b8b8">
                  {event.start_time || 'Not specified'}
                  {event.end_time && ` - ${event.end_time}`}
                </Text>
              </Paper>
            </Grid.Col>

            {event.location && (
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Paper
                  p="md"
                  withBorder
                  style={{
                    backgroundColor: 'rgba(15, 20, 25, 0.5)',
                    border: '1px solid rgba(255, 215, 0, 0.1)'
                  }}
                >
                  <Group gap="sm" mb="xs">
                    <MapPin size={20} color="#FFD700" />
                    <Text fw={500} c="#FFD700">Location</Text>
                  </Group>
                  <Text c="#b8b8b8">{event.location}</Text>
                </Paper>
              </Grid.Col>
            )}

            {event.max_attendees && (
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Paper
                  p="md"
                  withBorder
                  style={{
                    backgroundColor: 'rgba(15, 20, 25, 0.5)',
                    border: '1px solid rgba(255, 215, 0, 0.1)'
                  }}
                >
                  <Group gap="sm" mb="xs">
                    <Users size={20} color="#FFD700" />
                    <Text fw={500} c="#FFD700">Max Attendees</Text>
                  </Group>
                  <Text c="#b8b8b8">{event.max_attendees} people</Text>
                </Paper>
              </Grid.Col>
            )}

            {event.is_recurring && event.recurrence_pattern && (
              <Grid.Col span={12}>
                <Paper
                  p="md"
                  withBorder
                  style={{
                    backgroundColor: 'rgba(15, 20, 25, 0.5)',
                    border: '1px solid rgba(255, 215, 0, 0.1)'
                  }}
                >
                  <Text fw={500} c="#FFD700" mb="xs">Recurrence Pattern</Text>
                  <Text c="#b8b8b8">{event.recurrence_pattern}</Text>
                </Paper>
              </Grid.Col>
            )}

            {event.creator && (
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Paper
                  p="md"
                  withBorder
                  style={{
                    backgroundColor: 'rgba(15, 20, 25, 0.5)',
                    border: '1px solid rgba(255, 215, 0, 0.1)'
                  }}
                >
                  <Group gap="sm" mb="xs">
                    <User size={20} color="#FFD700" />
                    <Text fw={500} c="#FFD700">Created By</Text>
                  </Group>
                  <Text c="#b8b8b8">{event.creator.name}</Text>
                </Paper>
              </Grid.Col>
            )}
          </Grid>

          {/* Metadata */}
          <Divider color="rgba(255, 215, 0, 0.2)" mb="md" />
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Text c="#b8b8b8" size="sm">
                <strong>Created:</strong> {new Date(event.created_at).toLocaleString()}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Text c="#b8b8b8" size="sm">
                <strong>Last Updated:</strong> {new Date(event.updated_at).toLocaleString()}
              </Text>
            </Grid.Col>
          </Grid>
        </Paper>
      </Container>
    </Layout>
  )
}

export default EventsShow
