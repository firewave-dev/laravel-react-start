import React, { useState } from 'react'
import { Container, Title, Text, Paper, Table, Button, Group, Badge, TextInput, ActionIcon, Select, Pagination } from '@mantine/core'
import { Link, router } from '@inertiajs/react'
import { Plus, Search, Edit, Eye, Trash, Pin } from 'lucide-react'
import Layout from '../../layouts/app/Backend/Layout'

const BulletinsIndex = ({ bulletins, filters }) => {
  const [search, setSearch] = useState(filters?.search || '')
  const [currentPage, setCurrentPage] = useState(bulletins?.current_page || 1)

  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    router.get('/bulletins', { search, page: 1 }, { preserveState: true })
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    router.get('/bulletins', { search, page }, { preserveState: true })
  }

  const handleDelete = (bulletinId) => {
    if (confirm('Are you sure you want to delete this bulletin?')) {
      router.delete(`/bulletins/${bulletinId}`)
    }
  }

  const getPriorityColor = (priority) => {
    return { high: 'red', normal: 'blue', low: 'gray' }[priority] || 'gray'
  }

  const getTypeColor = (type) => {
    return { announcement: 'blue', prayer_request: 'purple', event_notice: 'cyan', urgent: 'red', general: 'gray' }[type] || 'gray'
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
          <Group justify="space-between" mb="xl">
            <div>
              <Title order={2} c="#FFD700" style={{ fontFamily: 'serif' }}>
                Bulletin Board Management
              </Title>
              <Text c="#b8b8b8" size="sm">
                Manage announcements and notices
              </Text>
            </div>
            <Link href="/bulletins/create">
              <Button 
                leftSection={<Plus size={18} />}
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  color: '#1a1f2e',
                  fontWeight: 600
                }}
              >
                New Bulletin
              </Button>
            </Link>
          </Group>

          <form onSubmit={handleSearch}>
            <Group mb="lg">
              <TextInput
                placeholder="Search bulletins..."
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
                thead: { backgroundColor: 'rgba(26, 31, 46, 0.8)' },
                th: { color: '#FFD700', fontWeight: 600, padding: '16px' },
                tr: {
                  transition: 'all 0.2s ease',
                  borderLeft: '2px solid transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(26, 31, 46, 0.6)',
                    borderLeft: '2px solid rgba(255, 215, 0, 0.5)',
                  },
                  '&:hover td': { color: '#ffffff' }
                },
                td: { color: '#b8b8b8', padding: '16px', borderBottom: '1px solid rgba(255, 215, 0, 0.05)', transition: 'color 0.2s ease' }
              }}
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Title</Table.Th>
                  <Table.Th>Type</Table.Th>
                  <Table.Th>Priority</Table.Th>
                  <Table.Th>Expires</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {bulletins.data && bulletins.data.length > 0 ? (
                  bulletins.data.map((bulletin) => (
                    <Table.Tr key={bulletin.id}>
                      <Table.Td>
                        <Text fw={500} c="#fff">{bulletin.title}</Text>
                        {bulletin.is_pinned && <Pin size={14} color="#FFD700" style={{ marginLeft: 4 }} />}
                      </Table.Td>
                      <Table.Td>
                        <Badge color={getTypeColor(bulletin.type)} variant="light" tt="capitalize">
                          {bulletin.type.replace('_', ' ')}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Badge color={getPriorityColor(bulletin.priority)} variant="filled" tt="capitalize">
                          {bulletin.priority}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        {bulletin.expires_at ? new Date(bulletin.expires_at).toLocaleDateString() : 'Never'}
                      </Table.Td>
                      <Table.Td>
                        <Badge color={bulletin.status === 'active' ? 'green' : 'gray'} variant="dot" tt="capitalize">
                          {bulletin.status}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <ActionIcon component={Link} href={`/bulletins/${bulletin.id}`} variant="subtle" color="blue">
                            <Eye size={16} />
                          </ActionIcon>
                          <ActionIcon component={Link} href={`/bulletins/${bulletin.id}/edit`} variant="subtle" color="orange">
                            <Edit size={16} />
                          </ActionIcon>
                          <ActionIcon variant="subtle" color="red" onClick={() => handleDelete(bulletin.id)}>
                            <Trash size={16} />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))
                ) : (
                  <Table.Tr>
                    <Table.Td colSpan={6}>
                      <Text ta="center" c="dimmed" py="xl">No bulletins found</Text>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          </Paper>

          {/* Pagination */}
          {bulletins && bulletins.last_page > 1 && (
            <Group justify="center" mt="xl">
              <Pagination
                value={currentPage}
                onChange={handlePageChange}
                total={bulletins.last_page}
                size="sm"
                color="yellow"
                styles={{
                  control: {
                    backgroundColor: 'rgba(26, 31, 46, 0.6)',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 215, 0, 0.1)',
                    }
                  }
                }}
              />
            </Group>
          )}
        </Paper>
      </Container>
    </Layout>
  )
}

export default BulletinsIndex
