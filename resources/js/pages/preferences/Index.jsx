import React, { useState } from 'react'
import { Container, Title, Text, Paper, Table, Button, Group, Badge, TextInput, ActionIcon } from '@mantine/core'
import { Link, router } from '@inertiajs/react'
import { Plus, Search, Edit, Eye, Trash } from 'lucide-react'
import Layout from '../../layouts/app/Backend/Layout'

const PreferencesIndex = ({ preferences, filters }) => {
  const [search, setSearch] = useState(filters?.search || '')

  const handleSearch = (e) => {
    e.preventDefault()
    router.get('/preferences', { search }, { preserveState: true })
  }

  const handleDelete = (preferenceId) => {
    if (confirm('Are you sure you want to delete these preferences?')) {
      router.delete(`/preferences/${preferenceId}`)
    }
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
                User Preferences Management
              </Title>
              <Text c="#b8b8b8" size="sm">
                Manage member preferences and contact information
              </Text>
            </div>
            <Link href="/preferences/create">
              <Button 
                leftSection={<Plus size={18} />}
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  color: '#1a1f2e',
                  fontWeight: 600
                }}
              >
                Add Preferences
              </Button>
            </Link>
          </Group>

          {/* Search */}
          <form onSubmit={handleSearch}>
            <Group mb="lg">
              <TextInput
                placeholder="Search by user name..."
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
              <Button type="submit" variant="light">Search</Button>
            </Group>
          </form>

          {/* Preferences Table */}
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
                  <Table.Th>User</Table.Th>
                  <Table.Th>Phone</Table.Th>
                  <Table.Th>Address</Table.Th>
                  <Table.Th>Notifications</Table.Th>
                  <Table.Th>Last Updated</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {preferences.data && preferences.data.length > 0 ? (
                  preferences.data.map((preference) => (
                    <Table.Tr key={preference.id}>
                      <Table.Td>
                        <Text fw={500} c="#fff">
                          {preference.user?.name || 'N/A'}
                        </Text>
                      </Table.Td>
                      <Table.Td>{preference.phone || '-'}</Table.Td>
                      <Table.Td>{preference.address ? `${preference.address.substring(0, 30)}...` : '-'}</Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <Badge color={preference.email_notifications ? 'green' : 'gray'} size="sm">
                            Email: {preference.email_notifications ? 'On' : 'Off'}
                          </Badge>
                          <Badge color={preference.sms_notifications ? 'green' : 'gray'} size="sm">
                            SMS: {preference.sms_notifications ? 'On' : 'Off'}
                          </Badge>
                        </Group>
                      </Table.Td>
                      <Table.Td>
                        {new Date(preference.updated_at).toLocaleDateString()}
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <ActionIcon
                            component={Link}
                            href={`/preferences/${preference.id}`}
                            variant="subtle"
                            color="blue"
                          >
                            <Eye size={16} />
                          </ActionIcon>
                          <ActionIcon
                            component={Link}
                            href={`/preferences/${preference.id}/edit`}
                            variant="subtle"
                            color="orange"
                          >
                            <Edit size={16} />
                          </ActionIcon>
                          <ActionIcon
                            variant="subtle"
                            color="red"
                            onClick={() => handleDelete(preference.id)}
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
                        No preferences found
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          </Paper>

          {/* Pagination would go here */}
        </Paper>
      </Container>
    </Layout>
  )
}

export default PreferencesIndex
