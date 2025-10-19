import React from 'react'
import { Box,Container, Title, Text, Paper, Grid, Stack, ThemeIcon, Group, Card, Badge } from '@mantine/core'
import { LayoutDashboard, Calendar, Bell, BookOpen, Users } from 'lucide-react'
import Layout from '../../layouts/app/Backend/Layout'
import { useLanguage } from '../../contexts/LanguageContext'

const Dashboard = ({ upcomingEvents = [] }) => {
  const { t } = useLanguage()

  return (
    <Layout>
      <Container size="xl" py="xl">
        <Stack gap="xl">
          {/* Welcome Section */}
          <Paper 
            p="xl" 
            withBorder
            style={{ 
              background: 'linear-gradient(135deg, rgba(26, 31, 46, 0.8) 0%, rgba(15, 20, 25, 0.9) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 215, 0, 0.2)',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 215, 0, 0.1)'
            }}
          >
            <Group gap="md" mb="md">
              <ThemeIcon 
                size={60} 
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(255, 215, 0, 0.3)'
                }}
              >
                <LayoutDashboard size={30} color="#1a1f2e" />
              </ThemeIcon>
              <Box>
                <Title order={1} c="#FFD700" style={{ fontFamily: 'serif' }}>
                  {t('memberDashboard')}
                </Title>
                <Text c="#b8b8b8">
                  {t('dashboardIntro')}
                </Text>
              </Box>
            </Group>
          </Paper>

          {/* Quick Links Grid */}
          <Grid>
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Card
                p="lg"
                withBorder
                component="a"
                href="/settings/profile"
                className="hover-card dark-card"
                style={{
                  background: 'linear-gradient(135deg, rgba(26, 31, 46, 0.6) 0%, rgba(15, 20, 25, 0.8) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 215, 0, 0.15)',
                  borderRadius: '16px',
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
                }}
              >
                <Stack align="center" gap="md">
                  <ThemeIcon 
                    size={50} 
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 165, 0, 0.15) 100%)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 215, 0, 0.2)'
                    }}
                  >
                    <Users size={25} color="#FFD700" />
                  </ThemeIcon>
                  <Title order={4} c="#FFD700" ta="center" style={{ fontFamily: 'serif' }}>
                    {t('profile')}
                  </Title>
                  <Text size="sm" c="#b8b8b8" ta="center">
                    Manage your account
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Card
                p="lg"
                withBorder
                component="a"
                href="/calendar"
                className="hover-card dark-card"
                style={{
                  background: 'linear-gradient(135deg, rgba(26, 31, 46, 0.6) 0%, rgba(15, 20, 25, 0.8) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 215, 0, 0.15)',
                  borderRadius: '16px',
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
                }}
              >
                <Stack align="center" gap="md">
                  <ThemeIcon 
                    size={50} 
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 165, 0, 0.15) 100%)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 215, 0, 0.2)'
                    }}
                  >
                    <Calendar size={25} color="#FFD700" />
                  </ThemeIcon>
                  <Title order={4} c="#FFD700" ta="center" style={{ fontFamily: 'serif' }}>
                    {t('viewCalendar')}
                  </Title>
                  <Text size="sm" c="#b8b8b8" ta="center">
                    View upcoming events
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Card
                p="lg"
                withBorder
                component="a"
                href="/bulletin"
                className="hover-card dark-card"
                style={{
                  background: 'linear-gradient(135deg, rgba(26, 31, 46, 0.6) 0%, rgba(15, 20, 25, 0.8) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 215, 0, 0.15)',
                  borderRadius: '16px',
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
                }}
              >
                <Stack align="center" gap="md">
                  <ThemeIcon 
                    size={50} 
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 165, 0, 0.15) 100%)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 215, 0, 0.2)'
                    }}
                  >
                    <Bell size={25} color="#FFD700" />
                  </ThemeIcon>
                  <Title order={4} c="#FFD700" ta="center" style={{ fontFamily: 'serif' }}>
                    {t('bulletin')}
                  </Title>
                  <Text size="sm" c="#b8b8b8" ta="center">
                    Latest announcements
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Card
                p="lg"
                withBorder
                component="a"
                href="/blog"
                className="hover-card dark-card"
                style={{
                  background: 'linear-gradient(135deg, rgba(26, 31, 46, 0.6) 0%, rgba(15, 20, 25, 0.8) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 215, 0, 0.15)',
                  borderRadius: '16px',
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
                }}
              >
                <Stack align="center" gap="md">
                  <ThemeIcon 
                    size={50} 
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 165, 0, 0.15) 100%)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 215, 0, 0.2)'
                    }}
                  >
                    <BookOpen size={25} color="#FFD700" />
                  </ThemeIcon>
                  <Title order={4} c="#FFD700" ta="center" style={{ fontFamily: 'serif' }}>
                    {t('news')}
                  </Title>
                  <Text size="sm" c="#b8b8b8" ta="center">
                    Read latest news
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>

          {/* Upcoming Events */}
          <Paper 
            p="xl" 
            withBorder
            style={{ 
              background: 'linear-gradient(135deg, rgba(26, 31, 46, 0.8) 0%, rgba(15, 20, 25, 0.9) 100%)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 215, 0, 0.2)',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 215, 0, 0.1)'
            }}
          >
            <Title order={3} c="#FFD700" mb="lg" style={{ fontFamily: 'serif' }}>
              {t('upcomingEvents')}
            </Title>
            <Stack gap="md">
              {upcomingEvents && upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <Group 
                    key={event.id}
                    justify="space-between" 
                    p="md" 
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.08) 0%, rgba(255, 165, 0, 0.05) 100%)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255, 215, 0, 0.15)'
                    }}
                  >
                    <Box>
                      <Text fw={600} c="#FFD700">{event.title}</Text>
                      <Text size="sm" c="#b8b8b8">
                        {new Date(event.event_date).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          month: 'short', 
                          day: 'numeric' 
                        })}
                        {event.start_time && ` - ${event.start_time}`}
                      </Text>
                      {event.location && (
                        <Text size="xs" c="#b8b8b8" style={{ opacity: 0.7 }}>
                          📍 {event.location}
                        </Text>
                      )}
                    </Box>
                    <Badge 
                      style={{
                        background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                        color: '#1a1f2e',
                        fontWeight: 600
                      }}
                      tt="capitalize"
                    >
                      {event.event_type}
                    </Badge>
                  </Group>
                ))
              ) : (
                <Text ta="center" c="#b8b8b8" py="md">
                  No upcoming events scheduled
                </Text>
              )}
            </Stack>
          </Paper>
        </Stack>

        <style>{`
          .dark-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(255, 215, 0, 0.2), 0 0 0 1px rgba(255, 215, 0, 0.3) !important;
            border: 1px solid rgba(255, 215, 0, 0.3) !important;
          }

          @media (max-width: 768px) {
            .dark-card:hover {
              transform: none;
            }
          }
        `}</style>
      </Container>
    </Layout>
  )
}

export default Dashboard