import React from 'react'
import { Container, Title, Text, Paper, Badge, Group, Button, Stack, Grid, Divider } from '@mantine/core'
import { Link } from '@inertiajs/react'
import { ArrowLeft, Edit, Mail, Calendar, Shield, User as UserIcon } from 'lucide-react'
import Layout from '../../layouts/app/Backend/Layout'

const UsersShow = ({ user }) => {
  const getRoleBadgeColor = (role) => {
    const colors = {
      admin: 'red',
      operator: 'orange',
      manager: 'blue',
      member: 'gray'
    }
    return colors[role] || 'gray'
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
              <Link href="/users">
                <Button 
                  variant="subtle" 
                  leftSection={<ArrowLeft size={18} />}
                  c="#FFD700"
                >
                  Back to Users
                </Button>
              </Link>
            </Group>
            <Group>
              {user.preference && (
                <Link href={`/preferences/${user.preference.id}/edit`}>
                  <Button
                    variant="light"
                    leftSection={<Edit size={18} />}
                    style={{
                      color: '#FFD700',
                      borderColor: 'rgba(255, 215, 0, 0.3)'
                    }}
                  >
                    Edit Preferences
                  </Button>
                </Link>
              )}
              <Link href={`/users/${user.id}/edit`}>
                <Button
                  leftSection={<Edit size={18} />}
                  style={{
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    color: '#1a1f2e',
                    fontWeight: 600
                  }}
                >
                  Edit User
                </Button>
              </Link>
            </Group>
          </Group>

          <Title order={2} c="#FFD700" mb="xs" style={{ fontFamily: 'serif' }}>
            {user.name}
          </Title>
          <Group mb="xl">
            <Badge color={getRoleBadgeColor(user.role)} size="lg" variant="light">
              {user.role}
            </Badge>
            <Badge color={user.email_verified_at ? 'green' : 'yellow'} size="lg" variant="dot">
              {user.email_verified_at ? 'Verified' : 'Pending Verification'}
            </Badge>
          </Group>

          <Divider color="rgba(255, 215, 0, 0.2)" mb="xl" />

          {/* User Information */}
          <Stack gap="xl">
            <Grid>
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
                    <Text fw={500} c="#FFD700">Email Address</Text>
                  </Group>
                  <Text c="#b8b8b8">{user.email}</Text>
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
                    <Shield size={20} color="#FFD700" />
                    <Text fw={500} c="#FFD700">User Role</Text>
                  </Group>
                  <Text c="#b8b8b8" tt="capitalize">{user.role}</Text>
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
                    <Text fw={500} c="#FFD700">Member Since</Text>
                  </Group>
                  <Text c="#b8b8b8">
                    {new Date(user.created_at).toLocaleDateString('en-US', {
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
                    <Calendar size={20} color="#FFD700" />
                    <Text fw={500} c="#FFD700">Last Updated</Text>
                  </Group>
                  <Text c="#b8b8b8">
                    {new Date(user.updated_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Text>
                </Paper>
              </Grid.Col>
            </Grid>

            {/* Preferences Section */}
            <Divider color="rgba(255, 215, 0, 0.2)" label={
              <Text c="#FFD700" fw={600}>User Preferences</Text>
            } />

            {user.preference ? (
              <Grid>
                  {user.preference.phone && (
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <Paper
                        p="md"
                        withBorder
                        style={{
                          backgroundColor: 'rgba(15, 20, 25, 0.5)',
                          border: '1px solid rgba(255, 215, 0, 0.1)'
                        }}
                      >
                        <Text fw={500} c="#FFD700" mb="xs">Phone</Text>
                        <Text c="#b8b8b8">{user.preference.phone}</Text>
                      </Paper>
                    </Grid.Col>
                  )}

                  {user.preference.address && (
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <Paper
                        p="md"
                        withBorder
                        style={{
                          backgroundColor: 'rgba(15, 20, 25, 0.5)',
                          border: '1px solid rgba(255, 215, 0, 0.1)'
                        }}
                      >
                        <Text fw={500} c="#FFD700" mb="xs">Address</Text>
                        <Text c="#b8b8b8">{user.preference.address}</Text>
                      </Paper>
                    </Grid.Col>
                  )}

                  {user.preference.date_of_birth && (
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <Paper
                        p="md"
                        withBorder
                        style={{
                          backgroundColor: 'rgba(15, 20, 25, 0.5)',
                          border: '1px solid rgba(255, 215, 0, 0.1)'
                        }}
                      >
                        <Text fw={500} c="#FFD700" mb="xs">Date of Birth</Text>
                        <Text c="#b8b8b8">
                          {new Date(user.preference.date_of_birth).toLocaleDateString()}
                        </Text>
                      </Paper>
                    </Grid.Col>
                  )}

                  {user.preference.gender && (
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <Paper
                        p="md"
                        withBorder
                        style={{
                          backgroundColor: 'rgba(15, 20, 25, 0.5)',
                          border: '1px solid rgba(255, 215, 0, 0.1)'
                        }}
                      >
                        <Text fw={500} c="#FFD700" mb="xs">Gender</Text>
                        <Text c="#b8b8b8" tt="capitalize">{user.preference.gender}</Text>
                      </Paper>
                    </Grid.Col>
                  )}
                </Grid>
            ) : (
              <Paper
                p="xl"
                withBorder
                style={{
                  backgroundColor: 'rgba(15, 20, 25, 0.5)',
                  border: '1px solid rgba(255, 215, 0, 0.1)',
                  textAlign: 'center'
                }}
              >
                <Text c="#b8b8b8" mb="md">
                  This user doesn't have preferences set up yet.
                </Text>
                <Link href="/preferences/create">
                  <Button
                    variant="light"
                    style={{
                      color: '#FFD700',
                      borderColor: 'rgba(255, 215, 0, 0.3)'
                    }}
                  >
                    Create Preferences
                  </Button>
                </Link>
              </Paper>
            )}
          </Stack>
        </Paper>
      </Container>
    </Layout>
  )
}

export default UsersShow
