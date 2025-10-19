import React, { useState } from 'react'
import { Container, Title, Text, Paper, Table, Button, Group, Badge, TextInput, ActionIcon, Select } from '@mantine/core'
import { Link, router } from '@inertiajs/react'
import { Plus, Search, Edit, Eye, Trash } from 'lucide-react'
import Layout from '../../layouts/app/Backend/Layout'

const PostsIndex = ({ posts, filters }) => {
  const [search, setSearch] = useState(filters?.search || '')
  const [status, setStatus] = useState(filters?.status || '')
  const [category, setCategory] = useState(filters?.category || '')

  const handleSearch = (e) => {
    e.preventDefault()
    router.get('/posts', { search, status, category }, { preserveState: true })
  }

  const handleDelete = (postId) => {
    if (confirm('Are you sure you want to delete this post?')) {
      router.delete(`/posts/${postId}`)
    }
  }

  const getStatusBadgeColor = (status) => {
    return status === 'published' ? 'green' : 'yellow'
  }

  const getCategoryBadgeColor = (category) => {
    const colors = {
      news: 'blue',
      announcement: 'orange',
      reflection: 'purple',
      saint_day: 'gold',
      teaching: 'teal'
    }
    return colors[category] || 'gray'
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
                Blog & News Management
              </Title>
              <Text c="#b8b8b8" size="sm">
                Manage church news, reflections, and announcements
              </Text>
            </div>
            <Link href="/posts/create">
              <Button 
                leftSection={<Plus size={18} />}
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  color: '#1a1f2e',
                  fontWeight: 600
                }}
              >
                New Post
              </Button>
            </Link>
          </Group>

          {/* Filters */}
          <form onSubmit={handleSearch}>
            <Group mb="lg">
              <TextInput
                placeholder="Search posts..."
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
                  { value: 'draft', label: 'Draft' }
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
                placeholder="Category"
                value={category}
                onChange={(value) => setCategory(value)}
                data={[
                  { value: '', label: 'All Categories' },
                  { value: 'news', label: 'News' },
                  { value: 'announcement', label: 'Announcement' },
                  { value: 'reflection', label: 'Reflection' },
                  { value: 'saint_day', label: 'Saint Day' },
                  { value: 'teaching', label: 'Teaching' }
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

          {/* Posts Table */}
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
                  <Table.Th>Title</Table.Th>
                  <Table.Th>Category</Table.Th>
                  <Table.Th>Author</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Published</Table.Th>
                  <Table.Th>Views</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {posts.data && posts.data.length > 0 ? (
                  posts.data.map((post) => (
                    <Table.Tr key={post.id}>
                      <Table.Td>
                        <Text fw={500} c="#fff">{post.title}</Text>
                        {post.is_featured && (
                          <Badge size="xs" color="yellow" variant="light" ml="xs">Featured</Badge>
                        )}
                      </Table.Td>
                      <Table.Td>
                        <Badge color={getCategoryBadgeColor(post.category)} variant="light" tt="capitalize">
                          {post.category.replace('_', ' ')}
                        </Badge>
                      </Table.Td>
                      <Table.Td>{post.author?.name || 'Unknown'}</Table.Td>
                      <Table.Td>
                        <Badge color={getStatusBadgeColor(post.status)} variant="dot" tt="capitalize">
                          {post.status}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        {post.published_at ? new Date(post.published_at).toLocaleDateString() : '-'}
                      </Table.Td>
                      <Table.Td>{post.views_count || 0}</Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <ActionIcon
                            component={Link}
                            href={`/posts/${post.id}`}
                            variant="subtle"
                            color="blue"
                          >
                            <Eye size={16} />
                          </ActionIcon>
                          <ActionIcon
                            component={Link}
                            href={`/posts/${post.id}/edit`}
                            variant="subtle"
                            color="orange"
                          >
                            <Edit size={16} />
                          </ActionIcon>
                          <ActionIcon
                            variant="subtle"
                            color="red"
                            onClick={() => handleDelete(post.id)}
                          >
                            <Trash size={16} />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))
                ) : (
                  <Table.Tr>
                    <Table.Td colSpan={7}>
                      <Text ta="center" c="dimmed" py="xl">
                        No posts found
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          </Paper>
        </Paper>
      </Container>
    </Layout>
  )
}

export default PostsIndex
