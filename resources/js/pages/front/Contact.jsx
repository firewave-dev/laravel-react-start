import React from 'react'
import { 
  Paper, 
  Text, 
  Title, 
  Stack,
  Box,
  ThemeIcon,
  Group,
  Card,
  Grid,
  TextInput,
  Textarea,
  Button,
  Container
} from '@mantine/core'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import FrontLayout from '../../layouts/app/Front/FrontLayout'
import { useLanguage } from '../../contexts/LanguageContext'

const Contact = ({ auth }) => {
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
          <Grid>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Stack gap="lg">
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
                  <Title order={1} mb="md" c="#8B4513" style={{ fontFamily: 'serif' }}>
                    {t('contactUs')}
                  </Title>
                  <Text size="lg" c="#654321" style={{ lineHeight: 1.7 }}>
                    {t('contactIntro')}
                  </Text>
                </Paper>

                {/* Contact Form */}
                <Paper 
                  p="xl" 
                  withBorder
                  style={{ 
                    backgroundColor: 'rgba(230, 220, 190, 0.85)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(139, 69, 19, 0.25)',
                    borderRadius: '12px',
                    boxShadow: '0 4px 16px rgba(139, 69, 19, 0.1)'
                  }}
                >
                  <Title order={3} mb="lg" c="#8B4513" style={{ fontFamily: 'serif' }}>
                    {t('sendMessage')}
                  </Title>
                  <Stack gap="md">
                    <Grid>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                          label={t('fullName')}
                          placeholder={t('namePlaceholder')}
                          styles={{
                            input: {
                              borderColor: 'rgba(139, 69, 19, 0.3)',
                              '&:focus': { borderColor: '#8B4513' }
                            }
                          }}
                        />
                      </Grid.Col>
                      <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                          label={t('emailAddress')}
                          placeholder={t('emailPlaceholder')}
                          leftSection={<Mail size={16} color="#8B4513" />}
                          styles={{
                            input: {
                              borderColor: 'rgba(139, 69, 19, 0.3)',
                              '&:focus': { borderColor: '#8B4513' }
                            }
                          }}
                        />
                      </Grid.Col>
                    </Grid>
                    <TextInput
                      label={t('subject')}
                      placeholder={t('subjectPlaceholder')}
                      styles={{
                        input: {
                          borderColor: 'rgba(139, 69, 19, 0.3)',
                          '&:focus': { borderColor: '#8B4513' }
                        }
                      }}
                    />
                    <Textarea
                      label={t('message')}
                      placeholder={t('messagePlaceholder')}
                      rows={6}
                      styles={{
                        input: {
                          borderColor: 'rgba(139, 69, 19, 0.3)',
                          '&:focus': { borderColor: '#8B4513' }
                        }
                      }}
                    />
                    <Button 
                      leftSection={<Send size={16} />}
                      size="lg"
                      style={{
                        backgroundColor: '#8B4513',
                        fontWeight: 600,
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#6d3410'
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 69, 19, 0.4)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#8B4513'
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      {t('sendMessageBtn')}
                    </Button>
                  </Stack>
                </Paper>
          </Stack>
        </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Stack gap="md">
                {/* Visit Us Card */}
                <Paper 
                  p="lg" 
                  withBorder
                  style={{ 
                    backgroundColor: 'rgba(230, 220, 190, 0.85)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(139, 69, 19, 0.25)',
                    borderRadius: '12px',
                    boxShadow: '0 4px 16px rgba(139, 69, 19, 0.1)'
                  }}
                >
                  <Group mb="md">
                    <ThemeIcon color="#8B4513" variant="light" size="lg">
                      <MapPin size={20} />
                    </ThemeIcon>
                    <Title order={4} c="#8B4513" style={{ fontFamily: 'serif' }}>
                      {t('visitUs')}
                    </Title>
                  </Group>
                  <Stack gap="sm">
                    <Group align="flex-start">
                      <ThemeIcon size="md" color="#8B4513" variant="light">
                        <MapPin size={16} />
                      </ThemeIcon>
                      <Box>
                        <Text size="sm" fw={500} c="#8B4513">{t('address')}</Text>
                        <Text size="sm" c="#654321">
                          {t('address')}
                        </Text>
                      </Box>
                    </Group>
                    <Group align="flex-start">
                      <ThemeIcon size="md" color="#8B4513" variant="light">
                        <Phone size={16} />
                      </ThemeIcon>
                      <Box>
                        <Text size="sm" fw={500} c="#8B4513">{t('phone')}</Text>
                        <Text size="sm" c="#654321">{t('phone')}</Text>
                      </Box>
                    </Group>
                    <Group align="flex-start">
                      <ThemeIcon size="md" color="#8B4513" variant="light">
                        <Mail size={16} />
                      </ThemeIcon>
                      <Box>
                        <Text size="sm" fw={500} c="#8B4513">{t('emailAddress')}</Text>
                        <Text size="sm" c="#654321">{t('email')}</Text>
                      </Box>
                    </Group>
                  </Stack>
                </Paper>

                {/* Service Times */}
                <Paper 
                  p="lg" 
                  withBorder
                  style={{ 
                    backgroundColor: 'rgba(230, 220, 190, 0.85)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(139, 69, 19, 0.25)',
                    borderRadius: '12px',
                    boxShadow: '0 4px 16px rgba(139, 69, 19, 0.1)'
                  }}
                >
                  <Group mb="md">
                    <ThemeIcon color="#8B4513" variant="light" size="lg">
                      <Clock size={20} />
                    </ThemeIcon>
                    <Title order={4} c="#8B4513" style={{ fontFamily: 'serif' }}>
                      {t('serviceTimesTitle')}
                    </Title>
                  </Group>
                  <Stack gap="sm">
                    <Group justify="space-between">
                      <Text size="sm" c="#654321">{t('sunday')} {t('divineLiturgy')}</Text>
                      <Text size="sm" fw={600} c="#8B4513">9:00 AM</Text>
                    </Group>
                    <Group justify="space-between">
                      <Text size="sm" c="#654321">{t('saturday')} {t('greatVespers')}</Text>
                      <Text size="sm" fw={600} c="#8B4513">5:00 PM</Text>
                    </Group>
                    <Group justify="space-between">
                      <Text size="sm" c="#654321">{t('wednesday')} {t('vespers')}</Text>
                      <Text size="sm" fw={600} c="#8B4513">6:00 PM</Text>
                    </Group>
                  </Stack>
                </Paper>

                {/* Office Hours */}
                <Paper 
                  p="lg" 
                  withBorder
                  style={{ 
                    backgroundColor: 'rgba(230, 220, 190, 0.85)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(139, 69, 19, 0.25)',
                    borderRadius: '12px',
                    boxShadow: '0 4px 16px rgba(139, 69, 19, 0.1)'
                  }}
                >
                  <Group mb="md">
                    <ThemeIcon color="#8B4513" variant="light" size="lg">
                      <Clock size={20} />
                    </ThemeIcon>
                    <Title order={4} c="#8B4513" style={{ fontFamily: 'serif' }}>
                      {t('officeHours')}
                    </Title>
                  </Group>
                  <Stack gap="sm">
                    <Group justify="space-between">
                      <Text size="sm" c="#654321">{t('mondayFriday')}</Text>
                      <Text size="sm" fw={600} c="#8B4513">9:00 AM - 5:00 PM</Text>
                    </Group>
                    <Group justify="space-between">
                      <Text size="sm" c="#654321">{t('saturday')}</Text>
                      <Text size="sm" fw={600} c="#8B4513">9:00 AM - 1:00 PM</Text>
                    </Group>
                    <Group justify="space-between">
                      <Text size="sm" c="#654321">{t('sunday')}</Text>
                      <Text size="sm" fw={600} c="#8B4513">{t('afterLiturgy')}</Text>
                    </Group>
                  </Stack>
                </Paper>
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
    </FrontLayout>
  )
}

export default Contact
