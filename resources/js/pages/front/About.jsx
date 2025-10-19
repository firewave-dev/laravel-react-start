import React from 'react'
import { 
  Paper, 
  Text, 
  Title, 
  Stack,
  Box,
  ThemeIcon,
  Group,
  Grid,
  Container,
  Card,
  Badge,
  Divider
} from '@mantine/core'
import { 
  Cross, 
  BookOpen, 
  Heart, 
  Users, 
  Church,
  Flame,
  History,
  Target,
  Star
} from 'lucide-react'
import FrontLayout from '../../layouts/app/Front/FrontLayout'
import { useLanguage } from '../../contexts/LanguageContext'

const About = () => {
  const { t } = useLanguage()

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
            {/* Page Header */}
            <Paper 
              p="xl" 
              withBorder
              style={{ 
                backgroundColor: 'rgba(240, 230, 200, 0.9)',
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
                      {t('aboutUs')}
                    </Title>
                    <Text size="lg" c="#654321" style={{ lineHeight: 1.7 }}>
                      {t('historyText')}
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
                      <Church size={40} />
                    </ThemeIcon>
                  </Box>
                </Grid.Col>
              </Grid>
            </Paper>

            {/* Mission, History, Values Grid */}
            <Grid>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Paper 
                  p="xl" 
                  withBorder
                  className="hover-card"
                  style={{ 
                    backgroundColor: 'rgba(230, 220, 190, 0.85)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(139, 69, 19, 0.25)',
                    borderRadius: '12px',
                    height: '100%',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer'
                  }}
                >
                  <Stack align="center" gap="md">
                    <ThemeIcon 
                      size={60} 
                      color="#8B4513" 
                      variant="light"
                      style={{ borderRadius: '50%' }}
                    >
                      <History size={30} />
                    </ThemeIcon>
                    <Title order={3} c="#8B4513" ta="center" style={{ fontFamily: 'serif' }}>
                      {t('ourHistory')}
                    </Title>
                    <Text ta="center" c="#654321" style={{ lineHeight: 1.6 }}>
                      {t('historyText')}
                    </Text>
                  </Stack>
                </Paper>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Paper 
                  p="xl" 
                  withBorder
                  className="hover-card"
                  style={{ 
                    backgroundColor: 'rgba(230, 220, 190, 0.85)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(139, 69, 19, 0.25)',
                    borderRadius: '12px',
                    height: '100%',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer'
                  }}
                >
                  <Stack align="center" gap="md">
                    <ThemeIcon 
                      size={60} 
                      color="#8B4513" 
                      variant="light"
                      style={{ borderRadius: '50%' }}
                    >
                      <Target size={30} />
                    </ThemeIcon>
                    <Title order={3} c="#8B4513" ta="center" style={{ fontFamily: 'serif' }}>
                      {t('ourMission')}
                    </Title>
                    <Text ta="center" c="#654321" style={{ lineHeight: 1.6 }}>
                      {t('missionText')}
                    </Text>
                  </Stack>
                </Paper>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Paper 
                  p="xl" 
                  withBorder
                  className="hover-card"
                  style={{ 
                    backgroundColor: 'rgba(230, 220, 190, 0.85)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(139, 69, 19, 0.25)',
                    borderRadius: '12px',
                    height: '100%',
                    transition: 'transform 0.3s ease',
                    cursor: 'pointer'
                  }}
                >
                  <Stack align="center" gap="md">
                    <ThemeIcon 
                      size={60} 
                      color="#8B4513" 
                      variant="light"
                      style={{ borderRadius: '50%' }}
                    >
                      <Star size={30} />
                    </ThemeIcon>
                    <Title order={3} c="#8B4513" ta="center" style={{ fontFamily: 'serif' }}>
                      {t('ourValues')}
                    </Title>
                    <Text ta="center" c="#654321" style={{ lineHeight: 1.6 }}>
                      {t('valuesText')}
                    </Text>
                  </Stack>
                </Paper>
              </Grid.Col>
            </Grid>

            {/* Our Ministries Section */}
            <Paper 
              p="xl" 
              withBorder
              style={{ 
                backgroundColor: 'rgba(230, 220, 190, 0.85)',
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
                    <Flame size={25} />
                  </ThemeIcon>
                  <Title order={2} c="#8B4513" style={{ fontFamily: 'serif' }}>
                    {t('ministries')}
                  </Title>
                  <Text c="#654321" mt="sm">
                    {t('serviceText')}
                  </Text>
                </Box>

                <Divider color="rgba(139, 69, 19, 0.2)" />

                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
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
                      <Stack gap="sm" align="center">
                        <ThemeIcon size="lg" color="#8B4513" variant="light">
                          <Cross size={24} />
                        </ThemeIcon>
                        <Title order={4} c="#8B4513" ta="center" style={{ fontFamily: 'serif' }}>
                          {t('orthodoxTradition')}
                        </Title>
                        <Text c="#654321" size="sm" ta="center" style={{ lineHeight: 1.6 }}>
                          {t('traditionText')}
                        </Text>
                      </Stack>
                    </Card>
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
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
                      <Stack gap="sm" align="center">
                        <ThemeIcon size="lg" color="#8B4513" variant="light">
                          <Heart size={24} />
                        </ThemeIcon>
                        <Title order={4} c="#8B4513" ta="center" style={{ fontFamily: 'serif' }}>
                          {t('communityService')}
                        </Title>
                        <Text c="#654321" size="sm" ta="center" style={{ lineHeight: 1.6 }}>
                          {t('serviceText')}
                        </Text>
                      </Stack>
                    </Card>
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
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
                      <Stack gap="sm" align="center">
                        <ThemeIcon size="lg" color="#8B4513" variant="light">
                          <BookOpen size={24} />
                        </ThemeIcon>
                        <Title order={4} c="#8B4513" ta="center" style={{ fontFamily: 'serif' }}>
                          {t('spiritualGrowth')}
                        </Title>
                        <Text c="#654321" size="sm" ta="center" style={{ lineHeight: 1.6 }}>
                          {t('growthText')}
                        </Text>
                      </Stack>
                    </Card>
                  </Grid.Col>
                </Grid>
              </Stack>
            </Paper>

            {/* Join Our Family Section */}
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
                      {t('joinOurFamily')}
                    </Title>
                    <Text size="lg" c="white" style={{ lineHeight: 1.7, opacity: 0.95 }}>
                      {t('joinText')}
                    </Text>
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
          </Stack>
        </Container>

        <style>{`
          .hover-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(139, 69, 19, 0.2) !important;
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

export default About
