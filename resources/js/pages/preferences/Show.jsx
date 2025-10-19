import React from 'react'
import { Container, Title, Text, Paper, Badge, Group, Button, Stack, Grid, Divider } from '@mantine/core'
import { Link } from '@inertiajs/react'
import { ArrowLeft, Edit, Phone, MapPin, Calendar, User as UserIcon, Mail, MessageSquare, Bell } from 'lucide-react'
import Layout from '../../layouts/app/Backend/Layout'

const PreferencesShow = ({ preference }) => {
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
              <Link href="/preferences">
                <Button 
                  variant="subtle" 
                  leftSection={<ArrowLeft size={18} />}
                  c="#FFD700"
                >
                  Back to Preferences
                </Button>
              </Link>
            </Group>
            <Link href={`/preferences/${preference.id}/edit`}>
              <Button
                leftSection={<Edit size={18} />}
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  color: '#1a1f2e',
                  fontWeight: 600
                }}
              >
                Edit Preferences
              </Button>
            </Link>
          </Group>

          <Title order={2} c="#FFD700" mb="xs" style={{ fontFamily: 'serif' }}>
            {preference.user?.name}'s Preferences
          </Title>
          <Text c="#b8b8b8" mb="xl">{preference.user?.email}</Text>

          <Divider color="rgba(255, 215, 0, 0.2)" mb="xl" />

          {/* Personal Information */}
          <Text c="#FFD700" fw={600} size="lg" mb="md">Personal Information</Text>
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
                  <Phone size={20} color="#FFD700" />
                  <Text fw={500} c="#FFD700">Phone Number</Text>
                </Group>
                <Text c="#b8b8b8">{preference.phone || 'Not provided'}</Text>
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
                  <Calendar size={20} color="#FFD700" />
                  <Text fw={500} c="#FFD700">Date of Birth</Text>
                </Group>
                <Text c="#b8b8b8">
                  {preference.date_of_birth 
                    ? new Date(preference.date_of_birth).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    : 'Not provided'}
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
                  <UserIcon size={20} color="#FFD700" />
                  <Text fw={500} c="#FFD700">Gender</Text>
                </Group>
                <Text c="#b8b8b8" tt="capitalize">
                  {preference.gender || 'Not provided'}
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
                  <MapPin size={20} color="#FFD700" />
                  <Text fw={500} c="#FFD700">Address</Text>
                </Group>
                <Text c="#b8b8b8">{preference.address || 'Not provided'}</Text>
              </Paper>
            </Grid.Col>
          </Grid>

          {/* Notification Preferences */}
          <Divider color="rgba(255, 215, 0, 0.2)" mb="md" />
          <Text c="#FFD700" fw={600} size="lg" mb="md">Notification Settings</Text>
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
                  <Mail size={20} color="#FFD700" />
                  <Text fw={500} c="#FFD700">Email Notifications</Text>
                </Group>
                <Badge color={preference.email_notifications ? 'green' : 'red'} variant="filled">
                  {preference.email_notifications ? 'Enabled' : 'Disabled'}
                </Badge>
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
                  <MessageSquare size={20} color="#FFD700" />
                  <Text fw={500} c="#FFD700">SMS Notifications</Text>
                </Group>
                <Badge color={preference.sms_notifications ? 'green' : 'red'} variant="filled">
                  {preference.sms_notifications ? 'Enabled' : 'Disabled'}
                </Badge>
              </Paper>
            </Grid.Col>
          </Grid>

          {/* Admin Notes */}
          {preference.notes && (
            <>
              <Divider color="rgba(255, 215, 0, 0.2)" mb="md" />
              <Text c="#FFD700" fw={600} size="lg" mb="md">Admin Notes</Text>
              <Paper
                p="md"
                withBorder
                mb="xl"
                style={{
                  backgroundColor: 'rgba(15, 20, 25, 0.5)',
                  border: '1px solid rgba(255, 215, 0, 0.1)'
                }}
              >
                <Text c="#b8b8b8" style={{ whiteSpace: 'pre-wrap' }}>
                  {preference.notes}
                </Text>
              </Paper>
            </>
          )}

          {/* Metadata */}
          <Divider color="rgba(255, 215, 0, 0.2)" mb="md" />
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Text c="#b8b8b8" size="sm">
                <strong>Created:</strong> {new Date(preference.created_at).toLocaleString()}
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Text c="#b8b8b8" size="sm">
                <strong>Last Updated:</strong> {new Date(preference.updated_at).toLocaleString()}
              </Text>
            </Grid.Col>
          </Grid>
        </Paper>
      </Container>
    </Layout>
  )
}

export default PreferencesShow
