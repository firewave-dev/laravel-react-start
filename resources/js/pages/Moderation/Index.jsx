import React, { useState } from 'react'
import { 
  Container, 
  Title, 
  Text, 
  Group, 
  Badge, 
  Card, 
  Stack, 
  Grid, 
  Paper,
  Select,
  TextInput,
  Button,
  Tabs,
  Pagination,
  Box,
  Alert,
  ActionIcon,
  Menu,
  Modal
} from '@mantine/core'
import { Link, router } from '@inertiajs/react'
import { 
  Search, 
  Eye, 
  Check, 
  X, 
  Edit,
  MoreVertical,
  Calendar,
  FileText,
  Bell,
  User,
  Clock,
  Shield,
  Filter,
  ArrowRight
} from 'lucide-react'
import { formatDate } from '../../utils/dateUtils'
import Layout from '../../layouts/app/Backend/Layout'

const ModerationIndex = ({ moderations, filters, stats }) => {
  const [selectedModeration, setSelectedModeration] = useState(null)
  const [actionModal, setActionModal] = useState({ opened: false, action: null })

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#FFA500'
      case 'approved': return '#4CAF50'
      case 'rejected': return '#F44336'
      case 'needs_revision': return '#FF9800'
      default: return '#666'
    }
  }

  const getContentIcon = (type) => {
    switch (type) {
      case 'App\\Models\\Post':
        return <FileText size={20} color="#228BE6" />
      case 'App\\Models\\Event':
        return <Calendar size={20} color="#40C057" />
      case 'App\\Models\\Bulletin':
        return <Bell size={20} color="#FD7E14" />
      default:
        return <FileText size={20} color="#666" />
    }
  }

  const getContentTypeLabel = (type) => {
    switch (type) {
      case 'App\\Models\\Post': return 'Blog Post'
      case 'App\\Models\\Event': return 'Event'
      case 'App\\Models\\Bulletin': return 'Bulletin'
      default: return 'Content'
    }
  }

  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams(window.location.search)
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.visit(`/moderation?${params.toString()}`, {
      preserveScroll: true,
      preserveState: true
    })
  }

  const handleAction = (moderation, action) => {
    setSelectedModeration(moderation)
    setActionModal({ opened: true, action })
  }

  return (
    <Layout>
      <Container size="xl" py="md">
      {/* Header Section */}
      <Box mb="xl">
        <Group justify="space-between" mb="md">
          <Box>
            <Group gap="sm" mb="xs">
              <Box
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(255, 215, 0, 0.3)'
                }}
              >
                <Shield size={24} color="#1a1f2e" />
              </Box>
              <Box>
                <Title order={1} c="#FFD700" mb="xs" style={{ fontFamily: 'serif' }}>
                  Content Moderation
                </Title>
                <Text c="rgba(255, 255, 255, 0.7)" size="sm">
                  Review and approve content submissions for your Orthodox community
                </Text>
              </Box>
            </Group>
          </Box>
        </Group>

        {/* Stats Cards */}
        <Grid mb="xl">
          <Grid.Col span={{ base: 6, sm: 3 }}>
            <Card 
              withBorder 
              p="md" 
              className="stat-card" 
              style={{ 
                borderLeft: '4px solid #FFA500',
                background: 'linear-gradient(135deg, rgba(26, 31, 46, 0.8) 0%, rgba(15, 20, 25, 0.9) 100%)',
                border: '1px solid rgba(255, 165, 0, 0.2)',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
              }}
            >
              <Group justify="space-between">
                <Box>
                  <Text size="xs" tt="uppercase" fw={700} c="rgba(255, 255, 255, 0.6)">
                    Pending Review
                  </Text>
                  <Text size="xl" fw={700} c="#FFA500">
                    {stats.pending}
                  </Text>
                </Box>
                <Box
                  style={{
                    backgroundColor: 'rgba(255, 165, 0, 0.2)',
                    borderRadius: '50%',
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Clock size={24} color="#FFA500" />
                </Box>
              </Group>
            </Card>
          </Grid.Col>
          
          <Grid.Col span={{ base: 6, sm: 3 }}>
            <Card 
              withBorder 
              p="md" 
              className="stat-card" 
              style={{ 
                borderLeft: '4px solid #4CAF50',
                background: 'linear-gradient(135deg, rgba(26, 31, 46, 0.8) 0%, rgba(15, 20, 25, 0.9) 100%)',
                border: '1px solid rgba(76, 175, 80, 0.2)',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
              }}
            >
              <Group justify="space-between">
                <Box>
                  <Text size="xs" tt="uppercase" fw={700} c="rgba(255, 255, 255, 0.6)">
                    Approved
                  </Text>
                  <Text size="xl" fw={700} c="#4CAF50">
                    {stats.approved}
                  </Text>
                </Box>
                <Box
                  style={{
                    backgroundColor: 'rgba(76, 175, 80, 0.2)',
                    borderRadius: '50%',
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Check size={24} color="#4CAF50" />
                </Box>
              </Group>
            </Card>
          </Grid.Col>
          
          <Grid.Col span={{ base: 6, sm: 3 }}>
            <Card 
              withBorder 
              p="md" 
              className="stat-card" 
              style={{ 
                borderLeft: '4px solid #F44336',
                background: 'linear-gradient(135deg, rgba(26, 31, 46, 0.8) 0%, rgba(15, 20, 25, 0.9) 100%)',
                border: '1px solid rgba(244, 67, 54, 0.2)',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
              }}
            >
              <Group justify="space-between">
                <Box>
                  <Text size="xs" tt="uppercase" fw={700} c="rgba(255, 255, 255, 0.6)">
                    Rejected
                  </Text>
                  <Text size="xl" fw={700} c="#F44336">
                    {stats.rejected}
                  </Text>
                </Box>
                <Box
                  style={{
                    backgroundColor: 'rgba(244, 67, 54, 0.2)',
                    borderRadius: '50%',
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <X size={24} color="#F44336" />
                </Box>
              </Group>
            </Card>
          </Grid.Col>
          
          <Grid.Col span={{ base: 6, sm: 3 }}>
            <Card 
              withBorder 
              p="md" 
              className="stat-card" 
              style={{ 
                borderLeft: '4px solid #FF9800',
                background: 'linear-gradient(135deg, rgba(26, 31, 46, 0.8) 0%, rgba(15, 20, 25, 0.9) 100%)',
                border: '1px solid rgba(255, 152, 0, 0.2)',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
              }}
            >
              <Group justify="space-between">
                <Box>
                  <Text size="xs" tt="uppercase" fw={700} c="rgba(255, 255, 255, 0.6)">
                    Needs Revision
                  </Text>
                  <Text size="xl" fw={700} c="#FF9800">
                    {stats.needs_revision}
                  </Text>
                </Box>
                <Box
                  style={{
                    backgroundColor: 'rgba(255, 152, 0, 0.2)',
                    borderRadius: '50%',
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Edit size={24} color="#FF9800" />
                </Box>
              </Group>
            </Card>
          </Grid.Col>
        </Grid>
      </Box>

      {/* Filters Section */}
      <Card 
        withBorder 
        p="lg" 
        mb="lg" 
        className="filter-card"
        style={{ 
          background: 'linear-gradient(135deg, rgba(26, 31, 46, 0.8) 0%, rgba(15, 20, 25, 0.9) 100%)',
          border: '1px solid rgba(255, 215, 0, 0.2)',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}
      >
        <Group mb="md">
          <Filter size={20} color="#FFD700" />
          <Text fw={600} size="sm" c="#FFD700">Filter & Search</Text>
        </Group>
        
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Select
              label="Status"
              value={filters.status}
              onChange={(value) => handleFilterChange('status', value)}
              data={[
                { value: 'all', label: 'All Statuses' },
                { value: 'pending', label: 'Pending Review' },
                { value: 'approved', label: 'Approved' },
                { value: 'rejected', label: 'Rejected' },
                { value: 'needs_revision', label: 'Needs Revision' }
              ]}
              placeholder="Filter by status"
              leftSection={<Clock size={16} />}
              styles={{
                label: { color: '#FFD700', fontWeight: 600 },
                input: { 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 215, 0, 0.3)',
                  color: '#FFFFFF',
                  '&:focus': {
                    borderColor: '#FFD700',
                    boxShadow: '0 0 0 1px #FFD700'
                  }
                },
                dropdown: {
                  backgroundColor: '#1a1f2e',
                  border: '1px solid rgba(255, 215, 0, 0.2)'
                },
                option: {
                  backgroundColor: 'transparent',
                  color: '#FFFFFF',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 215, 0, 0.1)'
                  },
                  '&[data-selected]': {
                    backgroundColor: 'rgba(255, 215, 0, 0.2)',
                    color: '#FFD700'
                  }
                }
              }}
            />
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Select
              label="Content Type"
              value={filters.type}
              onChange={(value) => handleFilterChange('type', value)}
              data={[
                { value: 'all', label: 'All Types' },
                { value: 'App\\Models\\Post', label: 'Blog Posts' },
                { value: 'App\\Models\\Event', label: 'Events' },
                { value: 'App\\Models\\Bulletin', label: 'Bulletins' }
              ]}
              placeholder="Filter by type"
              leftSection={<FileText size={16} />}
              styles={{
                label: { color: '#FFD700', fontWeight: 600 },
                input: { 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 215, 0, 0.3)',
                  color: '#FFFFFF',
                  '&:focus': {
                    borderColor: '#FFD700',
                    boxShadow: '0 0 0 1px #FFD700'
                  }
                },
                dropdown: {
                  backgroundColor: '#1a1f2e',
                  border: '1px solid rgba(255, 215, 0, 0.2)'
                },
                option: {
                  backgroundColor: 'transparent',
                  color: '#FFFFFF',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 215, 0, 0.1)'
                  },
                  '&[data-selected]': {
                    backgroundColor: 'rgba(255, 215, 0, 0.2)',
                    color: '#FFD700'
                  }
                }
              }}
            />
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <TextInput
              label="Search Content"
              placeholder="Search by title, author, or content..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              leftSection={<Search size={16} />}
              styles={{
                label: { color: '#FFD700', fontWeight: 600 },
                input: { 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 215, 0, 0.3)',
                  color: '#FFFFFF',
                  '&:focus': {
                    borderColor: '#FFD700',
                    boxShadow: '0 0 0 1px #FFD700'
                  },
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.5)'
                  }
                }
              }}
            />
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, sm: 6, md: 2 }}>
            <Button 
              onClick={() => router.visit('/moderation')}
              variant="outline"
              fullWidth
              mt="xl"
              leftSection={<X size={16} />}
              style={{
                borderColor: 'rgba(255, 215, 0, 0.3)',
                color: '#FFD700',
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 215, 0, 0.2)',
                  borderColor: '#FFD700'
                }
              }}
            >
              Clear Filters
            </Button>
          </Grid.Col>
        </Grid>
      </Card>

      {/* Content Queue */}
      {moderations.data.length > 0 ? (
        <Box>
          <Group justify="space-between" mb="lg">
            <Title order={3} c="#FFD700" style={{ fontFamily: 'serif' }}>
              Content Queue ({moderations.data.length} items)
            </Title>
            <Group gap="xs">
              <Badge 
                variant="light" 
                color="blue"
                style={{ 
                  background: 'rgba(33, 150, 243, 0.2)',
                  color: '#2196F3',
                  border: '1px solid rgba(33, 150, 243, 0.3)'
                }}
              >
                Page {moderations.current_page} of {moderations.last_page}
              </Badge>
            </Group>
          </Group>

          <Stack gap="lg">
            {moderations.data.map((moderation) => (
              <Card 
                key={moderation.id} 
                withBorder 
                p="lg" 
                className="moderation-item-card"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(26, 31, 46, 0.8) 0%, rgba(15, 20, 25, 0.9) 100%)',
                  border: '1px solid rgba(255, 215, 0, 0.1)',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                }}
              >
                <Grid>
                  <Grid.Col span={{ base: 12, md: 8 }}>
                    <Stack gap="sm">
                      {/* Header */}
                      <Group justify="space-between">
                        <Group gap="sm">
                          <Box
                            style={{
                              backgroundColor: getStatusColor(moderation.status) + '20',
                              borderRadius: '8px',
                              padding: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            {getContentIcon(moderation.moderatable_type)}
                          </Box>
                          <Box>
                            <Group gap="xs" mb="xs">
                              <Badge color={getStatusColor(moderation.status)} variant="filled" size="sm">
                                {moderation.status.replace('_', ' ').toUpperCase()}
                              </Badge>
                              <Badge variant="outline" size="sm">
                                {getContentTypeLabel(moderation.moderatable_type)}
                              </Badge>
                            </Group>
                            <Text fw={700} size="lg" c="#FFFFFF" lineClamp={2}>
                              {moderation.moderatable?.title || 'Untitled Content'}
                            </Text>
                          </Box>
                        </Group>
                      </Group>

                      {/* Content Info */}
                      <Group gap="lg" c="rgba(255, 255, 255, 0.7)">
                        <Group gap="xs">
                          <User size={16} />
                          <Text size="sm">
                            Submitted by <Text span fw={500} c="#FFD700">
                              {moderation.submittedBy?.name || 'Unknown User'}
                            </Text>
                          </Text>
                        </Group>
                        <Group gap="xs">
                          <Calendar size={16} />
                          <Text size="sm">
                            {formatDate(moderation.created_at)}
                          </Text>
                        </Group>
                        {moderation.moderatable?.event_date && (
                          <Group gap="xs">
                            <Calendar size={16} />
                            <Text size="sm">
                              Event: {formatDate(moderation.moderatable.event_date)}
                            </Text>
                          </Group>
                        )}
                      </Group>

                      {/* Notes */}
                      {moderation.notes && (
                        <Paper 
                          p="sm" 
                          withBorder
                          style={{ 
                            background: 'rgba(33, 150, 243, 0.1)',
                            border: '1px solid rgba(33, 150, 243, 0.3)',
                            borderRadius: '8px'
                          }}
                        >
                          <Group gap="xs" mb="xs">
                            <Bell size={16} color="#2196F3" />
                            <Text size="sm" fw={600} c="#2196F3">Moderation Notes</Text>
                          </Group>
                          <Text size="sm" c="rgba(255, 255, 255, 0.8)">
                            {moderation.notes}
                          </Text>
                        </Paper>
                      )}
                    </Stack>
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 4 }}>
                    <Stack gap="sm">
                      {/* Actions */}
                      <Group justify="flex-end" gap="xs">
                        <Link href={`/moderation/${moderation.id}`}>
                          <Button variant="light" size="sm" leftSection={<Eye size={16} />}>
                            View Details
                          </Button>
                        </Link>
                        
                        {moderation.status === 'pending' && (
                          <Menu shadow="md" width={200} position="bottom-end">
                            <Menu.Target>
                              <Button variant="outline" size="sm" leftSection={<MoreVertical size={16} />}>
                                Actions
                              </Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                              <Menu.Item 
                                leftSection={<Check size={16} />}
                                onClick={() => handleAction(moderation, 'approve')}
                                color="green"
                              >
                                Approve Content
                              </Menu.Item>
                              <Menu.Item 
                                leftSection={<Edit size={16} />}
                                onClick={() => handleAction(moderation, 'revision')}
                                color="orange"
                              >
                                Request Revision
                              </Menu.Item>
                              <Menu.Item 
                                leftSection={<X size={16} />}
                                onClick={() => handleAction(moderation, 'reject')}
                                color="red"
                              >
                                Reject Content
                              </Menu.Item>
                            </Menu.Dropdown>
                          </Menu>
                        )}
                      </Group>

                      {/* Status Info */}
                      <Paper 
                        p="sm" 
                        withBorder
                        style={{ 
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px'
                        }}
                      >
                        <Stack gap="xs">
                          <Text size="xs" tt="uppercase" fw={600} c="rgba(255, 255, 255, 0.6)">
                            Submission Info
                          </Text>
                          <Group justify="space-between">
                            <Text size="sm" c="rgba(255, 255, 255, 0.8)">Version:</Text>
                            <Badge 
                              size="sm" 
                              variant="outline"
                              style={{ 
                                borderColor: 'rgba(255, 215, 0, 0.3)',
                                color: '#FFD700'
                              }}
                            >
                              v{moderation.version || 1}
                            </Badge>
                          </Group>
                          {moderation.moderated_by && (
                            <Group justify="space-between">
                              <Text size="sm" c="rgba(255, 255, 255, 0.8)">Moderated by:</Text>
                              <Text size="sm" fw={500} c="#FFD700">
                                {moderation.moderatedBy?.name}
                              </Text>
                            </Group>
                          )}
                        </Stack>
                      </Paper>
                    </Stack>
                  </Grid.Col>
                </Grid>
              </Card>
            ))}
          </Stack>

          {/* Pagination */}
          {moderations.last_page > 1 && (
            <Group justify="center" mt="xl">
              <Pagination
                total={moderations.last_page}
                value={moderations.current_page}
                onChange={(page) => {
                  const params = new URLSearchParams(window.location.search)
                  params.set('page', page)
                  router.visit(`/moderation?${params.toString()}`)
                }}
              />
            </Group>
          )}
        </Box>
      ) : (
        <Card 
          withBorder 
          p="xl" 
          className="empty-state"
          style={{ 
            background: 'linear-gradient(135deg, rgba(26, 31, 46, 0.8) 0%, rgba(15, 20, 25, 0.9) 100%)',
            border: '1px solid rgba(255, 215, 0, 0.2)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
          }}
        >
          <Stack align="center" gap="md">
            <Box
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                borderRadius: '50%',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(255, 215, 0, 0.3)'
              }}
            >
              <Shield size={48} color="#1a1f2e" />
            </Box>
            <Box ta="center">
              <Title order={3} c="#FFD700" mb="xs" style={{ fontFamily: 'serif' }}>
                No content to moderate
              </Title>
              <Text c="rgba(255, 255, 255, 0.7)" size="sm">
                All caught up! There are no content items matching your current filters.
              </Text>
            </Box>
            <Button 
              variant="outline" 
              leftSection={<ArrowRight size={16} />}
              onClick={() => router.visit('/moderation')}
              style={{
                borderColor: 'rgba(255, 215, 0, 0.3)',
                color: '#FFD700'
              }}
            >
              View All Content
            </Button>
          </Stack>
        </Card>
      )}

      {/* Action Modal */}
      <Modal
        opened={actionModal.opened}
        onClose={() => setActionModal({ opened: false, action: null })}
        title={`${actionModal.action?.charAt(0).toUpperCase() + actionModal.action?.slice(1)} Content`}
        size="md"
      >
        <Stack gap="md">
          <Text>
            Are you sure you want to {actionModal.action} this content?
          </Text>
          {selectedModeration && (
            <Paper p="md" bg="gray.0" withBorder>
              <Text fw={600} mb="xs">
                {selectedModeration.moderatable?.title}
              </Text>
              <Text size="sm" c="dimmed">
                {getContentTypeLabel(selectedModeration.moderatable_type)} • 
                Submitted by {selectedModeration.submittedBy?.name}
              </Text>
            </Paper>
          )}
          <Group justify="flex-end" gap="sm">
            <Button 
              variant="outline" 
              onClick={() => setActionModal({ opened: false, action: null })}
            >
              Cancel
            </Button>
            <Button 
              color={actionModal.action === 'approve' ? 'green' : actionModal.action === 'reject' ? 'red' : 'orange'}
              onClick={() => {
                // Handle the action here
                setActionModal({ opened: false, action: null })
              }}
            >
              {actionModal.action?.charAt(0).toUpperCase() + actionModal.action?.slice(1)}
            </Button>
          </Group>
        </Stack>
      </Modal>
      </Container>
    </Layout>
  )
}

export default ModerationIndex