import React from 'react'
import { 
  Container, 
  Title, 
  Text, 
  Paper, 
  Stack, 
  Group, 
  Grid, 
  Card,
  Badge,
  Button,
  Box,
  ThemeIcon,
  Progress,
  SimpleGrid
} from '@mantine/core'
import { 
  User, 
  Calendar, 
  FileText, 
  Bell, 
  Settings, 
  Users,
  TrendingUp,
  Activity,
  Plus,
  Edit,
  Eye
} from 'lucide-react'
import { Link, router } from '@inertiajs/react'
import { Head } from '@inertiajs/react'
import Layout from '../layouts/app/Backend/Layout'

const Dashboard = ({ 
  stats = {},
  recentPosts = [],
  recentEvents = [],
  recentBulletins = [],
  pendingModerations = [],
  currentLocale = 'en'
}) => {
  // Debug: Log the current locale
  console.log('Dashboard received currentLocale:', currentLocale);
  console.log('Dashboard recentPosts:', recentPosts);
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'red'
      case 'normal': return 'blue'
      case 'low': return 'gray'
      default: return 'gray'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'green'
      case 'draft': return 'yellow'
      case 'pending': return 'orange'
      default: return 'gray'
    }
  }

  return (
    <>
      <Head title="Dashboard" />
      <Layout>
        <Container size="xl">
          <Stack gap="xl">
            {/* Header */}
            <Group justify="space-between" align="flex-start">
              <Box>
                <Title order={1} mb="sm" c="white">Dashboard</Title>
                <Text c="dimmed">Welcome to your Orthodox Church Management System</Text>
              </Box>
              <Group>
                <Button 
                  leftSection={<Plus size={16} />}
                  component={Link}
                  href="/posts/create"
                >
                  New Post
                </Button>
                <Button 
                  leftSection={<Plus size={16} />}
                  variant="light"
                  component={Link}
                  href="/events/create"
                >
                  New Event
                </Button>
              </Group>
            </Group>

            {/* Stats Cards */}
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg">
              <Card 
                withBorder 
                p="lg"
                style={{
                  backgroundColor: 'rgba(26, 31, 46, 0.8)',
                  border: '1px solid rgba(255, 215, 0, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Group justify="space-between" mb="md">
                  <ThemeIcon color="blue" size="lg" variant="light">
                    <FileText size={24} />
                  </ThemeIcon>
                  <Badge color="blue" variant="light">
                    {stats.posts?.total || 0}
                  </Badge>
                </Group>
                <Text size="sm" c="dimmed" mb="xs">Total Posts</Text>
                <Text size="xl" fw={700} c="white">{stats.posts?.published || 0}</Text>
                <Text size="xs" c="dimmed">Published ({stats.posts?.draft || 0} drafts)</Text>
              </Card>

              <Card 
                withBorder 
                p="lg"
                style={{
                  backgroundColor: 'rgba(26, 31, 46, 0.8)',
                  border: '1px solid rgba(255, 215, 0, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Group justify="space-between" mb="md">
                  <ThemeIcon color="green" size="lg" variant="light">
                    <Calendar size={24} />
                  </ThemeIcon>
                  <Badge color="green" variant="light">
                    {stats.events?.total || 0}
                  </Badge>
                </Group>
                <Text size="sm" c="dimmed" mb="xs">Total Events</Text>
                <Text size="xl" fw={700} c="white">{stats.events?.upcoming || 0}</Text>
                <Text size="xs" c="dimmed">Upcoming ({stats.events?.past || 0} past)</Text>
              </Card>

              <Card 
                withBorder 
                p="lg"
                style={{
                  backgroundColor: 'rgba(26, 31, 46, 0.8)',
                  border: '1px solid rgba(255, 215, 0, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Group justify="space-between" mb="md">
                  <ThemeIcon color="orange" size="lg" variant="light">
                    <Bell size={24} />
                  </ThemeIcon>
                  <Badge color="orange" variant="light">
                    {stats.bulletins?.total || 0}
                  </Badge>
                </Group>
                <Text size="sm" c="dimmed" mb="xs">Total Bulletins</Text>
                <Text size="xl" fw={700} c="white">{stats.bulletins?.active || 0}</Text>
                <Text size="xs" c="dimmed">Active ({stats.bulletins?.pinned || 0} pinned)</Text>
              </Card>

              <Card 
                withBorder 
                p="lg"
                style={{
                  backgroundColor: 'rgba(26, 31, 46, 0.8)',
                  border: '1px solid rgba(255, 215, 0, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Group justify="space-between" mb="md">
                  <ThemeIcon color="red" size="lg" variant="light">
                    <Users size={24} />
                  </ThemeIcon>
                  <Badge color="red" variant="light">
                    {stats.users?.total || 0}
                  </Badge>
                </Group>
                <Text size="sm" c="dimmed" mb="xs">Total Users</Text>
                <Text size="xl" fw={700} c="white">{stats.users?.active || 0}</Text>
                <Text size="xs" c="dimmed">Active ({stats.users?.admin || 0} admin)</Text>
              </Card>
            </SimpleGrid>

            <Grid>
              {/* Recent Posts */}
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card 
                  withBorder
                  style={{
                    backgroundColor: 'rgba(26, 31, 46, 0.8)',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Card.Section withBorder p="md">
                    <Group justify="space-between">
                      <Title order={4} c="white">Recent Posts</Title>
                      <Button 
                        variant="light" 
                        size="xs"
                        component={Link}
                        href="/posts"
                      >
                        View All
                      </Button>
                    </Group>
                  </Card.Section>
                  <Card.Section p="md">
                    <Stack gap="md">
                      {recentPosts.length > 0 ? (
                        recentPosts.map((post) => (
                          <Group key={post.id} justify="space-between">
                            <Box style={{ flex: 1 }}>
                              <Text fw={500} size="sm" lineClamp={1} c="white">
                                {post.title}
                              </Text>
                              <Text size="xs" c="dimmed">
                                by {post.author_name} • {new Date(post.created_at).toLocaleDateString()}
                              </Text>
                            </Box>
                            <Group gap="xs">
                              <Badge 
                                size="xs" 
                                color={getStatusColor(post.status)}
                              >
                                {post.status}
                              </Badge>
                              <Button 
                                size="xs" 
                                variant="light"
                                component={Link}
                                href={`/posts/${post.id}/edit`}
                              >
                                <Edit size={12} />
                              </Button>
                            </Group>
                          </Group>
                        ))
                      ) : (
                        <Text size="sm" c="dimmed">No recent posts</Text>
                      )}
                    </Stack>
                  </Card.Section>
                </Card>
              </Grid.Col>

              {/* Recent Events */}
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card 
                  withBorder
                  style={{
                    backgroundColor: 'rgba(26, 31, 46, 0.8)',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Card.Section withBorder p="md">
                    <Group justify="space-between">
                      <Title order={4} c="white">Upcoming Events</Title>
                      <Button 
                        variant="light" 
                        size="xs"
                        component={Link}
                        href="/events"
                      >
                        View All
                      </Button>
                    </Group>
                  </Card.Section>
                  <Card.Section p="md">
                    <Stack gap="md">
                      {recentEvents.length > 0 ? (
                        recentEvents.map((event) => (
                          <Group key={event.id} justify="space-between">
                            <Box style={{ flex: 1 }}>
                              <Text fw={500} size="sm" lineClamp={1} c="white">
                                {event.title}
                              </Text>
                              <Text size="xs" c="dimmed">
                                {new Date(event.event_date).toLocaleDateString()}
                                {event.location && ` • ${event.location}`}
                              </Text>
                            </Box>
                            <Group gap="xs">
                              <Badge 
                                size="xs" 
                                color={getStatusColor(event.status)}
                              >
                                {event.status}
                              </Badge>
                              <Button 
                                size="xs" 
                                variant="light"
                                component={Link}
                                href={`/events/${event.id}/edit`}
                              >
                                <Edit size={12} />
                              </Button>
                            </Group>
                          </Group>
                        ))
                      ) : (
                        <Text size="sm" c="dimmed">No upcoming events</Text>
                      )}
                    </Stack>
                  </Card.Section>
                </Card>
              </Grid.Col>

              {/* Recent Bulletins */}
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card 
                  withBorder
                  style={{
                    backgroundColor: 'rgba(26, 31, 46, 0.8)',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Card.Section withBorder p="md">
                    <Group justify="space-between">
                      <Title order={4} c="white">Recent Bulletins</Title>
                      <Button 
                        variant="light" 
                        size="xs"
                        component={Link}
                        href="/bulletins"
                      >
                        View All
                      </Button>
                    </Group>
                  </Card.Section>
                  <Card.Section p="md">
                    <Stack gap="md">
                      {recentBulletins.length > 0 ? (
                        recentBulletins.map((bulletin) => (
                          <Group key={bulletin.id} justify="space-between">
                            <Box style={{ flex: 1 }}>
                              <Text fw={500} size="sm" lineClamp={1} c="white">
                                {bulletin.title}
                                {bulletin.is_pinned && ' 📌'}
                              </Text>
                              <Text size="xs" c="dimmed">
                                by {bulletin.poster_name} • {new Date(bulletin.created_at).toLocaleDateString()}
                              </Text>
                            </Box>
                            <Group gap="xs">
                              <Badge 
                                size="xs" 
                                color={getPriorityColor(bulletin.priority)}
                              >
                                {bulletin.priority}
                              </Badge>
                              <Button 
                                size="xs" 
                                variant="light"
                                component={Link}
                                href={`/bulletins/${bulletin.id}/edit`}
                              >
                                <Edit size={12} />
                              </Button>
                            </Group>
                          </Group>
                        ))
                      ) : (
                        <Text size="sm" c="dimmed">No recent bulletins</Text>
                      )}
                    </Stack>
                  </Card.Section>
                </Card>
              </Grid.Col>

              {/* Pending Moderations */}
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card 
                  withBorder
                  style={{
                    backgroundColor: 'rgba(26, 31, 46, 0.8)',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Card.Section withBorder p="md">
                    <Group justify="space-between">
                      <Title order={4} c="white">Pending Moderations</Title>
                      <Button 
                        variant="light" 
                        size="xs"
                        component={Link}
                        href="/moderation"
                      >
                        View All
                      </Button>
                    </Group>
                  </Card.Section>
                  <Card.Section p="md">
                    <Stack gap="md">
                      {pendingModerations.length > 0 ? (
                        pendingModerations.map((moderation) => (
                          <Group key={moderation.id} justify="space-between">
                            <Box style={{ flex: 1 }}>
                              <Text fw={500} size="sm" lineClamp={1} c="white">
                                {moderation.content_type}: {moderation.title}
                              </Text>
                              <Text size="xs" c="dimmed">
                                {moderation.author_name && `by ${moderation.author_name} • `}
                                Submitted {new Date(moderation.created_at).toLocaleDateString()}
                              </Text>
                            </Box>
                            <Button 
                              size="xs" 
                              variant="light"
                              component={Link}
                              href={`/moderation/${moderation.id}`}
                            >
                              <Eye size={12} />
                            </Button>
                          </Group>
                        ))
                      ) : (
                        <Text size="sm" c="dimmed">No pending moderations</Text>
                      )}
                    </Stack>
                  </Card.Section>
                </Card>
              </Grid.Col>
            </Grid>

            {/* Quick Actions */}
            <Card 
              withBorder
              style={{
                backgroundColor: 'rgba(26, 31, 46, 0.8)',
                border: '1px solid rgba(255, 215, 0, 0.2)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Card.Section withBorder p="md">
                <Title order={4} c="white">Quick Actions</Title>
              </Card.Section>
              <Card.Section p="md">
                <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md">
                  <Button 
                    variant="light" 
                    leftSection={<Plus size={16} />}
                    component={Link}
                    href="/posts/create"
                    fullWidth
                  >
                    New Post
                  </Button>
                  <Button 
                    variant="light" 
                    leftSection={<Plus size={16} />}
                    component={Link}
                    href="/events/create"
                    fullWidth
                  >
                    New Event
                  </Button>
                  <Button 
                    variant="light" 
                    leftSection={<Plus size={16} />}
                    component={Link}
                    href="/bulletins/create"
                    fullWidth
                  >
                    New Bulletin
                  </Button>
                  <Button 
                    variant="light" 
                    leftSection={<Settings size={16} />}
                    component={Link}
                    href="/users"
                    fullWidth
                  >
                    Manage Users
                  </Button>
                </SimpleGrid>
              </Card.Section>
            </Card>
          </Stack>
        </Container>
      </Layout>
    </>
  )
}

export default Dashboard
