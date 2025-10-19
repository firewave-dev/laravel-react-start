import React from 'react'
import { Paper, Text, Title, Stack, Box, ThemeIcon, Container, Grid, Card, Badge, Button, Group, Divider } from '@mantine/core'
import { Bell, Cross, BookOpen, Heart, Calendar, Clock, MapPin, Users, ArrowRight, Mail, Phone } from 'lucide-react'
import { Link } from '@inertiajs/react'
import FrontLayout from '../../layouts/app/Front/FrontLayout'
import { useLanguage } from '../../contexts/LanguageContext'

const Home = ({ auth, quote }) => {
  const { t, currentLanguage } = useLanguage()

  return (
    <FrontLayout>
      <Box 
        style={{ 
          minHeight: 'calc(100vh - 200px)',
          background: 'linear-gradient(135deg, #F5F5DC 0%, #DDD1A0 30%, #D2B48C 70%, #BC9A6A 100%)',
          padding: '3rem 0'
        }}
      >
        <Container size="xl">
          <Stack gap="xl">
          {/* Welcome Section */}
          <Paper 
            p="xl" 
            withBorder 
            style={{ 
                backgroundColor: 'rgba(240, 230, 200, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(139, 69, 19, 0.25)',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(139, 69, 19, 0.1)'
            }}
          >
            <Grid align="center">
              <Grid.Col span={{ base: 12, md: 8 }}>
                  <Box>
                    <Title order={1} mb="md" c="#8B4513" style={{ fontFamily: 'serif' }}>
                      {t('welcomeTitle')}
                    </Title>
                    <Text size="lg" c="#654321" style={{ lineHeight: 1.7 }}>
                      {t('welcomeText')}
                    </Text>
                  </Box>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box ta="center">
                  <ThemeIcon 
                    size={80} 
                    color="#8B4513" 
                    variant="light"
                    style={{ 
                      borderRadius: '50%',
                      boxShadow: '0 4px 20px rgba(139, 69, 19, 0.3)'
                    }}
                  >
                    <Cross size={40} />
                  </ThemeIcon>
                </Box>
              </Grid.Col>
            </Grid>
          </Paper>

          {/* Daily Quote */}
          {quote && (
            <Paper 
              p="xl" 
              withBorder
              style={{ 
                backgroundColor: 'rgba(235, 225, 195, 0.85)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(139, 69, 19, 0.3)',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(139, 69, 19, 0.15)'
              }}
            >
              <Grid align="center">
                <Grid.Col span={{ base: 12, md: 2 }}>
                  <Box ta="center">
                    <ThemeIcon 
                      size={60} 
                      color="#8B4513" 
                      variant="light"
                      style={{ 
                        borderRadius: '50%',
                        boxShadow: '0 4px 20px rgba(139, 69, 19, 0.2)'
                      }}
                    >
                      <Bell size={30} />
                    </ThemeIcon>
                  </Box>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 10 }}>
                  <Box>
                    <Text fw={600} mb="md" c="#8B4513" size="lg" style={{ fontFamily: 'serif' }}>
                      {t('dailyInspiration')}
                    </Text>
                    <Text 
                      fs="italic" 
                      c="#654321" 
                      size="xl" 
                      mb="md"
                      style={{ 
                        fontFamily: 'serif',
                        lineHeight: 1.6,
                        textShadow: '0 1px 2px rgba(139, 69, 19, 0.1)'
                      }}
                    >
                      "{quote.message}"
                    </Text>
                    <Text 
                      size="md" 
                      c="#8B4513" 
                      fw={500}
                      style={{ fontFamily: 'serif' }}
                    >
                      — {quote.author}
                    </Text>
                    {(quote.source || quote.century) && (
                      <Text 
                        size="sm" 
                        c="#654321" 
                        style={{ fontStyle: 'italic', opacity: 0.8 }}
                      >
                        {quote.source && quote.century 
                          ? `${quote.source} (${quote.century}th century)`
                          : quote.source || `(${quote.century}th century)`
                        }
                      </Text>
                    )}
                  </Box>
                </Grid.Col>
              </Grid>
            </Paper>
          )}

          {/* Features Grid */}
          <Grid>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card 
                p="xl" 
                withBorder
                style={{ 
                  backgroundColor: 'rgba(230, 220, 190, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(139, 69, 19, 0.25)',
                  borderRadius: '12px',
                  height: '100%',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}
                className="hover-card"
              >
                <Stack align="center" gap="md">
                  <ThemeIcon 
                    size={50} 
                    color="#8B4513" 
                    variant="light"
                    style={{ borderRadius: '50%' }}
                  >
                    <BookOpen size={25} />
                  </ThemeIcon>
                  <Title order={3} c="#8B4513" ta="center" style={{ fontFamily: 'serif' }}>
                    {t('spiritualLearning')}
                  </Title>
                  <Text ta="center" c="#654321" style={{ lineHeight: 1.6 }}>
                    {t('spiritualLearningText')}
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card 
                p="xl" 
                withBorder
                style={{ 
                  backgroundColor: 'rgba(230, 220, 190, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(139, 69, 19, 0.25)',
                  borderRadius: '12px',
                  height: '100%',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}
                className="hover-card"
              >
                <Stack align="center" gap="md">
                  <ThemeIcon 
                    size={50} 
                    color="#8B4513" 
                    variant="light"
                    style={{ borderRadius: '50%' }}
                  >
                    <Heart size={25} />
                  </ThemeIcon>
                  <Title order={3} c="#8B4513" ta="center" style={{ fontFamily: 'serif' }}>
                    {t('communityFellowship')}
                  </Title>
                  <Text ta="center" c="#654321" style={{ lineHeight: 1.6 }}>
                    {t('communityFellowshipText')}
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Card 
                p="xl" 
                withBorder
                style={{ 
                  backgroundColor: 'rgba(230, 220, 190, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '2px solid rgba(139, 69, 19, 0.25)',
                  borderRadius: '12px',
                  height: '100%',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}
                className="hover-card"
              >
                <Stack align="center" gap="md">
                  <ThemeIcon 
                    size={50} 
                    color="#8B4513" 
                    variant="light"
                    style={{ borderRadius: '50%' }}
                  >
                    <Cross size={25} />
                  </ThemeIcon>
                  <Title order={3} c="#8B4513" ta="center" style={{ fontFamily: 'serif' }}>
                    {t('sacredWorship')}
                  </Title>
                  <Text ta="center" c="#654321" style={{ lineHeight: 1.6 }}>
                    {t('sacredWorshipText')}
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>

          {/* Service Times Section */}
          <Paper 
            p="xl" 
            withBorder
            style={{ 
                backgroundColor: 'rgba(240, 230, 200, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(139, 69, 19, 0.25)',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(139, 69, 19, 0.1)'
            }}
          >
            <Stack gap="lg">
              <Box ta="center">
                <ThemeIcon 
                  size={50} 
                  color="#8B4513" 
                  variant="light"
                  style={{ 
                    borderRadius: '50%',
                    margin: '0 auto 1rem'
                  }}
                >
                  <Clock size={25} />
                </ThemeIcon>
                <Title order={2} c="#8B4513" style={{ fontFamily: 'serif' }}>
                  {t('serviceTimesTitle')}
                </Title>
                <Text c="#654321" mt="sm">
                  {t('serviceTimesText')}
                </Text>
              </Box>

              <Divider color="rgba(139, 69, 19, 0.2)" />

              <Grid>
                <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                  <Card 
                    p="lg" 
                    withBorder
                    style={{ 
                      backgroundColor: 'rgba(139, 69, 19, 0.05)',
                        border: '1px solid rgba(139, 69, 19, 0.2)',
                      borderRadius: '8px',
                      height: '100%'
                    }}
                  >
                    <Stack gap="xs" align="center">
                      <Text fw={600} c="#8B4513" size="lg">{t('sunday')}</Text>
                      <Badge color="#8B4513" variant="light" size="lg">{t('divineLiturgy')}</Badge>
                      <Text c="#654321" size="xl" fw={700}>9:00 AM</Text>
                      <Text c="#654321" size="sm" ta="center">
                        {t('matinsTime')}
                      </Text>
                    </Stack>
                  </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                  <Card 
                    p="lg" 
                    withBorder
                    style={{ 
                      backgroundColor: 'rgba(139, 69, 19, 0.05)',
                        border: '1px solid rgba(139, 69, 19, 0.2)',
                      borderRadius: '8px',
                      height: '100%'
                    }}
                  >
                    <Stack gap="xs" align="center">
                      <Text fw={600} c="#8B4513" size="lg">{t('wednesday')}</Text>
                      <Badge color="#8B4513" variant="light" size="lg">{t('vespers')}</Badge>
                      <Text c="#654321" size="xl" fw={700}>6:00 PM</Text>
                      <Text c="#654321" size="sm" ta="center">
                        {t('eveningPrayer')}
                      </Text>
                    </Stack>
                  </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                  <Card 
                    p="lg" 
                    withBorder
                    style={{ 
                      backgroundColor: 'rgba(139, 69, 19, 0.05)',
                        border: '1px solid rgba(139, 69, 19, 0.2)',
                      borderRadius: '8px',
                      height: '100%'
                    }}
                  >
                    <Stack gap="xs" align="center">
                      <Text fw={600} c="#8B4513" size="lg">{t('saturday')}</Text>
                      <Badge color="#8B4513" variant="light" size="lg">{t('greatVespers')}</Badge>
                      <Text c="#654321" size="xl" fw={700}>5:00 PM</Text>
                      <Text c="#654321" size="sm" ta="center">
                        {t('eveningWorship')}
                      </Text>
                    </Stack>
                  </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                  <Card 
                    p="lg" 
                    withBorder
                    style={{ 
                      backgroundColor: 'rgba(139, 69, 19, 0.05)',
                        border: '1px solid rgba(139, 69, 19, 0.2)',
                      borderRadius: '8px',
                      height: '100%'
                    }}
                  >
                    <Stack gap="xs" align="center">
                      <Text fw={600} c="#8B4513" size="lg">{t('feastDays')}</Text>
                      <Badge color="#8B4513" variant="light" size="lg">{t('specialServices')}</Badge>
                      <Text c="#654321" size="xl" fw={700}>{t('varies')}</Text>
                      <Text c="#654321" size="sm" ta="center">
                        {t('checkCalendar')}
                      </Text>
                    </Stack>
                  </Card>
                </Grid.Col>
              </Grid>
            </Stack>
          </Paper>

          {/* Upcoming Events Section */}
          <Paper 
            p="xl" 
            withBorder
            style={{ 
                backgroundColor: 'rgba(240, 230, 200, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(139, 69, 19, 0.25)',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(139, 69, 19, 0.1)'
            }}
          >
            <Stack gap="lg">
              <Group justify="space-between" align="flex-start">
                <Box>
                  <Group gap="sm" mb="xs">
                    <ThemeIcon 
                      size={40} 
                      color="#8B4513" 
                      variant="light"
                      style={{ borderRadius: '50%' }}
                    >
                      <Calendar size={20} />
                    </ThemeIcon>
                    <Title order={2} c="#8B4513" style={{ fontFamily: 'serif' }}>
                      {t('upcomingEvents')}
                    </Title>
                  </Group>
                  <Text c="#654321">
                    {t('stayConnected')}
                  </Text>
                </Box>
                <Link href="/calendar">
                  <Button 
                    variant="light" 
                    color="#8B4513"
                    rightSection={<ArrowRight size={16} />}
                  >
                    {t('viewCalendar')}
                  </Button>
                </Link>
              </Group>

              <Grid>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Card 
                    p="lg" 
                    withBorder
                    className="hover-card"
                    style={{ 
                      backgroundColor: 'rgba(230, 220, 190, 0.8)',
                      border: '2px solid rgba(139, 69, 19, 0.25)',
                      borderRadius: '8px',
                      height: '100%',
                      transition: 'transform 0.3s ease',
                      cursor: 'pointer'
                    }}
                  >
                    <Stack gap="sm">
                      <Badge color="#8B4513" variant="filled" size="lg">
                        {t('thisSunday')}
                      </Badge>
                      <Title order={3} c="#8B4513" style={{ fontFamily: 'serif' }}>
                        {t('parishPotluck')}
                      </Title>
                      <Group gap="xs">
                        <Clock size={16} color="#654321" />
                        <Text c="#654321" size="sm">{t('afterLiturgy')}</Text>
                      </Group>
                      <Group gap="xs">
                        <MapPin size={16} color="#654321" />
                        <Text c="#654321" size="sm">{t('fellowshipHall')}</Text>
                      </Group>
                      <Text c="#654321" size="sm" style={{ lineHeight: 1.6 }}>
                        {t('potluckText')}
                      </Text>
                    </Stack>
                  </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Card 
                    p="lg" 
                    withBorder
                    className="hover-card"
                    style={{ 
                      backgroundColor: 'rgba(230, 220, 190, 0.8)',
                      border: '2px solid rgba(139, 69, 19, 0.25)',
                      borderRadius: '8px',
                      height: '100%',
                      transition: 'transform 0.3s ease',
                      cursor: 'pointer'
                    }}
                  >
                    <Stack gap="sm">
                      <Badge color="#8B4513" variant="light" size="lg">
                        {t('nextWeek')}
                      </Badge>
                      <Title order={3} c="#8B4513" style={{ fontFamily: 'serif' }}>
                        {t('bibleStudy')}
                      </Title>
                      <Group gap="xs">
                        <Clock size={16} color="#654321" />
                        <Text c="#654321" size="sm">{t('tuesdayEvening')}</Text>
                      </Group>
                      <Group gap="xs">
                        <Users size={16} color="#654321" />
                        <Text c="#654321" size="sm">{t('allAgesWelcome')}</Text>
                      </Group>
                      <Text c="#654321" size="sm" style={{ lineHeight: 1.6 }}>
                        {t('bibleStudyText')}
                      </Text>
                    </Stack>
                  </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Card 
                    p="lg" 
                    withBorder
                    className="hover-card"
                    style={{ 
                      backgroundColor: 'rgba(230, 220, 190, 0.8)',
                      border: '2px solid rgba(139, 69, 19, 0.25)',
                      borderRadius: '8px',
                      height: '100%',
                      transition: 'transform 0.3s ease',
                      cursor: 'pointer'
                    }}
                  >
                    <Stack gap="sm">
                      <Badge color="#8B4513" variant="outline" size="lg">
                        {t('comingSoon')}
                      </Badge>
                      <Title order={3} c="#8B4513" style={{ fontFamily: 'serif' }}>
                        {t('youthRetreat')}
                      </Title>
                      <Group gap="xs">
                        <Calendar size={16} color="#654321" />
                        <Text c="#654321" size="sm">{t('nextMonth')}</Text>
                      </Group>
                      <Group gap="xs">
                        <MapPin size={16} color="#654321" />
                        <Text c="#654321" size="sm">{t('mountainCenter')}</Text>
                      </Group>
                      <Text c="#654321" size="sm" style={{ lineHeight: 1.6 }}>
                        {t('youthRetreatText')}
                      </Text>
                    </Stack>
                  </Card>
                </Grid.Col>
              </Grid>
            </Stack>
          </Paper>

          {/* Call to Action Section */}
          <Paper 
            p="xl" 
            withBorder
            style={{ 
              backgroundColor: 'rgba(139, 69, 19, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(139, 69, 19, 0.3)',
              borderRadius: '16px',
              boxShadow: '0 12px 48px rgba(139, 69, 19, 0.25)'
            }}
          >
            <Grid align="center">
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Stack gap="md">
                  <Title order={2} c="white" style={{ fontFamily: 'serif' }}>
                    {t('joinCommunity')}
                  </Title>
                  <Text size="lg" c="white" style={{ lineHeight: 1.7, opacity: 0.95 }}>
                    {t('joinText')}
                  </Text>
                  <Group gap="md" mt="md">
                    <Link href="/contact">
                      <Button 
                        size="lg" 
                        variant="white" 
                        color="#8B4513"
                        leftSection={<Mail size={20} />}
                      >
                        {t('contactUs')}
                      </Button>
                    </Link>
                    <Link href="/about">
                      <Button 
                        size="lg" 
                        variant="outline" 
                        color="white"
                        style={{ borderColor: 'white', color: 'white' }}
                      >
                        {t('learnMore')}
                      </Button>
                    </Link>
                  </Group>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Box ta="center">
                  <ThemeIcon 
                    size={100} 
                    color="white" 
                    variant="light"
                    style={{ 
                      borderRadius: '50%',
                      boxShadow: '0 8px 32px rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    <Users size={50} />
                  </ThemeIcon>
                </Box>
              </Grid.Col>
            </Grid>
          </Paper>

          {/* Contact Info Bar */}
          <Paper 
            p="md" 
            withBorder
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(139, 69, 19, 0.25)',
              borderRadius: '8px',
              boxShadow: '0 4px 16px rgba(139, 69, 19, 0.1)'
            }}
          >
            <Group justify="center" gap="xl" wrap="wrap">
              <Group gap="sm">
                <ThemeIcon size="md" color="#8B4513" variant="light">
                  <MapPin size={18} />
                </ThemeIcon>
                <Text c="#654321" size="sm">{t('address')}</Text>
              </Group>
              <Group gap="sm">
                <ThemeIcon size="md" color="#8B4513" variant="light">
                  <Phone size={18} />
                </ThemeIcon>
                <Text c="#654321" size="sm">{t('phone')}</Text>
              </Group>
              <Group gap="sm">
                <ThemeIcon size="md" color="#8B4513" variant="light">
                  <Mail size={18} />
                </ThemeIcon>
                <Text c="#654321" size="sm">{t('email')}</Text>
              </Group>
            </Group>
          </Paper>
        </Stack>
      </Container>

        <style>{`
          .hover-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(139, 69, 19, 0.2) !important;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (max-width: 768px) {
            .hover-card:hover {
              transform: none;
            }
          }
        `}</style>
      </Box>
    </FrontLayout>
  )
}

export default Home