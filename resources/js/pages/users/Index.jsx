import React, { useState } from 'react'
import { Container, Title, Text, Paper, Table, Button, Group, Badge, TextInput, ActionIcon, Menu, Pagination } from '@mantine/core'
import { Link, router } from '@inertiajs/react'
import { Plus, Search, Edit, Eye, Trash, MoreVertical } from 'lucide-react'
import Layout from '../../layouts/app/Backend/Layout'
import { useLanguage } from '../../contexts/LanguageContext'

const UsersIndex = ({ users, filters }) => {
  const { t } = useLanguage()
  const [search, setSearch] = useState(filters?.search || '')
  const [currentPage, setCurrentPage] = useState(users?.current_page || 1)

  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    router.get('/users', { search, page: 1 }, { preserveState: true })
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    router.get('/users', { search, page }, { preserveState: true })
  }

  const handleDelete = (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      router.delete(`/users/${userId}`)
    }
  }

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
                User Management
              </Title>
              <Text c="#b8b8b8" size="sm">
                Manage church members and administrators
              </Text>
            </div>
            <Link href="/users/create">
              <Button 
                leftSection={<Plus size={18} />}
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  color: '#1a1f2e',
                  fontWeight: 600
                }}
              >
                Add User
              </Button>
            </Link>
          </Group>

          {/* Search */}
          <form onSubmit={handleSearch}>
            <Group mb="lg">
              <TextInput
                placeholder="Search by name or email..."
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

          {/* Users Table */}
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
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th>Role</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Joined</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {users.data && users.data.length > 0 ? (
                  users.data.map((user) => (
                    <Table.Tr key={user.id}>
                      <Table.Td>
                        <Text fw={500} c="#fff">{user.name}</Text>
                      </Table.Td>
                      <Table.Td>{user.email}</Table.Td>
                      <Table.Td>
                        <Badge color={getRoleBadgeColor(user.role)} variant="light">
                          {user.role}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Badge color={user.email_verified_at ? 'green' : 'yellow'} variant="dot">
                          {user.email_verified_at ? 'Verified' : 'Pending'}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        {new Date(user.created_at).toLocaleDateString()}
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <ActionIcon
                            component={Link}
                            href={`/users/${user.id}`}
                            variant="subtle"
                            color="blue"
                          >
                            <Eye size={16} />
                          </ActionIcon>
                          <ActionIcon
                            component={Link}
                            href={`/users/${user.id}/edit`}
                            variant="subtle"
                            color="orange"
                          >
                            <Edit size={16} />
                          </ActionIcon>
                          <ActionIcon
                            variant="subtle"
                            color="red"
                            onClick={() => handleDelete(user.id)}
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
                        No users found
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          </Paper>

          {/* Pagination */}
          {users && users.last_page > 1 && (
            <Group justify="center" mt="xl">
              <Pagination
                value={currentPage}
                onChange={handlePageChange}
                total={users.last_page}
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

export default UsersIndex
