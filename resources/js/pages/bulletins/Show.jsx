import React from 'react'
import { Container, Title, Text, Paper, Badge, Group, Button, Stack, Divider } from '@mantine/core'
import { Link } from '@inertiajs/react'
import { ArrowLeft, Edit, User, Calendar, Bell } from 'lucide-react'
import Layout from '../../layouts/app/Backend/Layout'

const BulletinsShow = ({ bulletin }) => {
  const getPriorityColor = (priority) => {
    return { high: 'red', normal: 'blue', low: 'gray' }[priority] || 'gray'
  }

  const getTypeColor = (type) => {
    return { announcement: 'blue', prayer_request: 'purple', event_notice: 'cyan', urgent: 'red', general: 'gray' }[type] || 'gray'
  }

  return (
    <Layout>
      <Container size="lg" py="xl">
        <Paper p="xl" withBorder style={{ background: 'linear-gradient(135deg, rgba(26, 31, 46, 0.8) 0%, rgba(15, 20, 25, 0.9) 100%)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 215, 0, 0.2)', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)' }}>
          <Group justify="space-between" mb="xl">
            <Group>
              <Link href="/bulletins">
                <Button variant="subtle" leftSection={<ArrowLeft size={18} />} c="#FFD700">Back to Bulletins</Button>
              </Link>
            </Group>
            <Link href={`/bulletins/${bulletin.id}/edit`}>
              <Button leftSection={<Edit size={18} />} style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', color: '#1a1f2e', fontWeight: 600 }}>Edit Bulletin</Button>
            </Link>
          </Group>

          <Title order={2} c="#FFD700" mb="md" style={{ fontFamily: 'serif' }}>{bulletin.title}</Title>
          <Group mb="xl">
            <Badge color={getTypeColor(bulletin.type)} variant="light" size="lg" tt="capitalize">{bulletin.type.replace('_', ' ')}</Badge>
            <Badge color={getPriorityColor(bulletin.priority)} variant="filled" size="lg" tt="capitalize">{bulletin.priority}</Badge>
            <Badge color={bulletin.status === 'active' ? 'green' : 'gray'} variant="dot" size="lg" tt="capitalize">{bulletin.status}</Badge>
            {bulletin.is_pinned && <Badge color="yellow" variant="filled" size="lg">Pinned</Badge>}
          </Group>

          <Divider color="rgba(255, 215, 0, 0.2)" mb="xl" />

          <Paper p="xl" mb="xl" withBorder style={{ backgroundColor: 'rgba(15, 20, 25, 0.5)', border: '1px solid rgba(255, 215, 0, 0.1)' }}>
            <Text c="#b8b8b8" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, fontSize: '1.05rem' }}>{bulletin.message}</Text>
          </Paper>

          <Stack gap="md">
            <Group gap="xs">
              <User size={18} color="#FFD700" />
              <Text c="#b8b8b8"><strong>Posted by:</strong> {bulletin.poster?.name || 'Unknown'}</Text>
            </Group>
            <Group gap="xs">
              <Calendar size={18} color="#FFD700" />
              <Text c="#b8b8b8"><strong>Posted on:</strong> {new Date(bulletin.created_at).toLocaleString()}</Text>
            </Group>
            {bulletin.expires_at && (
              <Group gap="xs">
                <Bell size={18} color="#FFD700" />
                <Text c="#b8b8b8"><strong>Expires:</strong> {new Date(bulletin.expires_at).toLocaleString()}</Text>
              </Group>
            )}
          </Stack>
        </Paper>
      </Container>
    </Layout>
  )
}

export default BulletinsShow
