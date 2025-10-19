import React, { useState } from 'react'
import { router } from '@inertiajs/react'
import { 
  Container, 
  Title, 
  Text, 
  Group, 
  Card, 
  Stack, 
  Grid, 
  Paper,
  Select,
  TextInput,
  Button,
  MultiSelect,
  Box,
  Divider,
  Alert
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { 
  Search, 
  Calendar, 
  FileText, 
  Bell, 
  Filter,
  ArrowRight,
  BookOpen,
  Users,
  Clock
} from 'lucide-react'
import FrontLayout from '../../layouts/app/Front/FrontLayout'
import { useLanguage } from '../../contexts/LanguageContext'

const SearchIndex = () => {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [selectedTypes, setSelectedTypes] = useState(['posts', 'events', 'bulletins'])
  const [dateFrom, setDateFrom] = useState(null)
  const [dateTo, setDateTo] = useState(null)
  const [category, setCategory] = useState('')
  const [eventType, setEventType] = useState('')
  const [priority, setPriority] = useState('')

  const contentTypes = [
    { value: 'posts', label: 'Blog Posts' },
    { value: 'events', label: 'Events' },
    { value: 'bulletins', label: 'Bulletins' }
  ]

  const categories = [
    { value: 'liturgy', label: 'Liturgy & Worship' },
    { value: 'community', label: 'Community News' },
    { value: 'education', label: 'Education & Study' },
    { value: 'charity', label: 'Charity & Service' },
    { value: 'announcements', label: 'Announcements' }
  ]

  const eventTypes = [
    { value: 'liturgy', label: 'Divine Liturgy' },
    { value: 'vespers', label: 'Vespers' },
    { value: 'matins', label: 'Matins' },
    { value: 'study', label: 'Bible Study' },
    { value: 'community', label: 'Community Event' },
    { value: 'charity', label: 'Charity Event' },
    { value: 'festival', label: 'Festival' }
  ]

  const priorities = [
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ]

  const languages = [
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'Français' },
    { value: 'sr', label: 'Српски' }
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    const params = new URLSearchParams()
    params.set('q', searchQuery)
    params.set('lang', selectedLanguage)
    params.set('contentTypes', selectedTypes.join(','))
    
    if (dateFrom) params.set('dateFrom', dateFrom)
    if (dateTo) params.set('dateTo', dateTo)
    if (category) params.set('category', category)
    if (eventType) params.set('eventType', eventType)
    if (priority) params.set('priority', priority)

    router.get(`/search?${params.toString()}`)
  }

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedLanguage('en')
    setSelectedTypes(['posts', 'events', 'bulletins'])
    setDateFrom(null)
    setDateTo(null)
    setCategory('')
    setEventType('')
    setPriority('')
  }

  return (
    <FrontLayout>
      <Box 
        style={{ 
          minHeight: 'calc(100vh - 200px)',
          background: 'linear-gradient(135deg, #F5F5DC 0%, #DDD1A0 30%, #D2B48C 70%, #BC9A6A 100%)',
          padding: '3rem 0'
        }}
      >
        <Container size="lg" py="xl">
      {/* Header Section */}
      <Box mb="xl" ta="center">
        <Group justify="center" mb="md">
          <Box
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(255, 215, 0, 0.3)'
            }}
          >
            <Search size={32} color="#1a1f2e" />
          </Box>
        </Group>
        <Title order={1} c="#8B4513" mb="xs" style={{ fontFamily: 'serif' }}>
          {t('searchOurContent')}
        </Title>
        <Text c="#5D4E37" size="lg" maw={600} mx="auto">
          {t('searchSubtitle')}
        </Text>
      </Box>

      {/* Search Form */}
      <Card 
        withBorder 
        p="xl" 
        mb="xl" 
        className="search-form-card"
        style={{ 
          background: 'linear-gradient(135deg, #F5F5DC 0%, #F0E68C 30%, #DDD1A0 70%, #D2B48C 100%)',
          border: '2px solid #8B4513',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(139, 69, 19, 0.3)'
        }}
      >
        <form onSubmit={handleSearch}>
          <Stack gap="lg">
            {/* Main Search Input */}
            <TextInput
              size="lg"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftSection={<Search size={20} />}
              styles={{
                input: {
                  fontSize: '16px',
                  padding: '12px 16px',
                  backgroundColor: '#FFF8DC',
                  border: '2px solid #D2B48C',
                  color: '#8B4513',
                  '&:focus': {
                    borderColor: '#8B4513',
                    boxShadow: '0 0 0 1px #8B4513'
                  },
                  '&::placeholder': {
                    color: 'rgba(139, 69, 19, 0.6)'
                  }
                }
              }}
            />
            
            {/* Search Button */}
            <Group justify="center">
              <Button 
                type="submit" 
                size="lg"
                disabled={!searchQuery.trim()}
                leftSection={<Search size={18} />}
                style={{
                  background: '#8B4513',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '12px 32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  '&:hover': {
                    background: '#A0522D'
                  },
                  '&:disabled': {
                    background: '#D2B48C',
                    color: '#8B4513'
                  }
                }}
              >
                {t('search')}
              </Button>
            </Group>

            {/* Advanced Filters */}
            <Paper 
              p="md" 
              withBorder
              style={{ 
                background: 'linear-gradient(135deg, #F5F5DC 0%, #F0E68C 50%, #DDD1A0 100%)',
                border: '2px solid #D2B48C',
                borderRadius: '12px'
              }}
            >
              <Group mb="md">
                <Filter size={18} color="#8B4513" />
                <Text fw={600} size="sm" c="#8B4513">{t('advancedFilters')}</Text>
              </Group>
              
              <Grid>
                <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                  <Select
                    label={t('language')}
                    value={selectedLanguage}
                    onChange={setSelectedLanguage}
                    data={languages}
                    leftSection={<BookOpen size={16} />}
                    styles={{
                      label: { color: '#8B4513', marginBottom: '8px' },
                      input: {
                        backgroundColor: '#FFF8DC !important',
                        border: '2px solid #D2B48C !important',
                        color: '#8B4513 !important',
                        '&:focus': { 
                          borderColor: '#8B4513 !important',
                          backgroundColor: '#FFF8DC !important'
                        }
                      },
                      dropdown: { backgroundColor: '#FFF8DC !important', border: '2px solid #D2B48C !important' },
                      option: { 
                        color: '#8B4513',
                        '&[dataSelected]': { backgroundColor: '#8B4513 !important', color: '#FFFFFF !important' },
                        '&[dataHovered]': { backgroundColor: '#F5F5DC !important' }
                      }
                    }}
                  />
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, sm: 6, md: 8 }}>
                  <MultiSelect
                    label={t('contentTypes')}
                    value={selectedTypes}
                    onChange={setSelectedTypes}
                    data={contentTypes}
                    placeholder={t('selectContentTypes')}
                    styles={{
                      label: { color: '#8B4513', marginBottom: '8px' },
                      input: {
                        backgroundColor: '#FFF8DC !important',
                        border: '2px solid #D2B48C !important',
                        color: '#8B4513 !important',
                        '&:focus': { 
                          borderColor: '#8B4513 !important',
                          backgroundColor: '#FFF8DC !important'
                        }
                      },
                      dropdown: { backgroundColor: '#FFF8DC !important', border: '2px solid #D2B48C !important' },
                      option: { 
                        color: '#8B4513',
                        '&[dataSelected]': { backgroundColor: '#8B4513 !important', color: '#FFFFFF !important' },
                        '&[dataHovered]': { backgroundColor: '#F5F5DC !important' }
                      }
                    }}
                  />
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                  <DateInput
                    label={t('fromDate')}
                    value={dateFrom}
                    onChange={setDateFrom}
                    placeholder={t('startDate')}
                    leftSection={<Calendar size={16} />}
                    styles={{
                      label: { color: '#8B4513', marginBottom: '8px' },
                      input: {
                        backgroundColor: '#FFF8DC !important',
                        border: '2px solid #D2B48C !important',
                        color: '#8B4513 !important',
                        '&:focus': { 
                          borderColor: '#8B4513 !important',
                          backgroundColor: '#FFF8DC !important'
                        }
                      }
                    }}
                  />
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                  <DateInput
                    label={t('toDate')}
                    value={dateTo}
                    onChange={setDateTo}
                    placeholder={t('endDate')}
                    leftSection={<Calendar size={16} />}
                    styles={{
                      label: { color: '#8B4513', marginBottom: '8px' },
                      input: {
                        backgroundColor: '#FFF8DC !important',
                        border: '2px solid #D2B48C !important',
                        color: '#8B4513 !important',
                        '&:focus': { 
                          borderColor: '#8B4513 !important',
                          backgroundColor: '#FFF8DC !important'
                        }
                      }
                    }}
                  />
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                  <Select
                    label={t('categoryPosts')}
                    value={category}
                    onChange={setCategory}
                    data={categories}
                    placeholder={t('selectCategory')}
                    clearable
                    styles={{
                      label: { color: '#8B4513', marginBottom: '8px' },
                      input: {
                        backgroundColor: '#FFF8DC !important',
                        border: '2px solid #D2B48C !important',
                        color: '#8B4513 !important',
                        '&:focus': { 
                          borderColor: '#8B4513 !important',
                          backgroundColor: '#FFF8DC !important'
                        }
                      },
                      dropdown: { backgroundColor: '#FFF8DC !important', border: '2px solid #D2B48C !important' },
                      option: { 
                        color: '#8B4513',
                        '&[dataSelected]': { backgroundColor: '#8B4513 !important', color: '#FFFFFF !important' },
                        '&[dataHovered]': { backgroundColor: '#F5F5DC !important' }
                      }
                    }}
                  />
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                  <Select
                    label={t('eventType')}
                    value={eventType}
                    onChange={setEventType}
                    data={eventTypes}
                    placeholder={t('selectEventType')}
                    clearable
                    styles={{
                      label: { color: '#8B4513', marginBottom: '8px' },
                      input: {
                        backgroundColor: '#FFF8DC !important',
                        border: '2px solid #D2B48C !important',
                        color: '#8B4513 !important',
                        '&:focus': { 
                          borderColor: '#8B4513 !important',
                          backgroundColor: '#FFF8DC !important'
                        }
                      },
                      dropdown: { backgroundColor: '#FFF8DC !important', border: '2px solid #D2B48C !important' },
                      option: { 
                        color: '#8B4513',
                        '&[dataSelected]': { backgroundColor: '#8B4513 !important', color: '#FFFFFF !important' },
                        '&[dataHovered]': { backgroundColor: '#F5F5DC !important' }
                      }
                    }}
                  />
                </Grid.Col>
                
                <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                  <Select
                    label={t('priorityBulletins')}
                    value={priority}
                    onChange={setPriority}
                    data={priorities}
                    placeholder={t('selectPriority')}
                    clearable
                    styles={{
                      label: { color: '#8B4513', marginBottom: '8px' },
                      input: {
                        backgroundColor: '#FFF8DC !important',
                        border: '2px solid #D2B48C !important',
                        color: '#8B4513 !important',
                        '&:focus': { 
                          borderColor: '#8B4513 !important',
                          backgroundColor: '#FFF8DC !important'
                        }
                      },
                      dropdown: { backgroundColor: '#FFF8DC !important', border: '2px solid #D2B48C !important' },
                      option: { 
                        color: '#8B4513',
                        '&[dataSelected]': { backgroundColor: '#8B4513 !important', color: '#FFFFFF !important' },
                        '&[dataHovered]': { backgroundColor: '#F5F5DC !important' }
                      }
                    }}
                  />
                </Grid.Col>
              </Grid>
            </Paper>

            {/* Action Buttons */}
            <Group justify="space-between">
              <Button 
                variant="outline" 
                onClick={handleClearFilters}
                leftSection={<Filter size={16} />}
                style={{
                  borderColor: '#8B4513',
                  color: '#8B4513',
                  '&:hover': {
                    backgroundColor: '#F5F5DC',
                    borderColor: '#8B4513'
                  }
                }}
              >
                {t('clearFilters')}
              </Button>
              
              <Button 
                type="submit" 
                size="md"
                leftSection={<ArrowRight size={16} />}
                disabled={!searchQuery.trim()}
                style={{
                  background: '#8B4513',
                  color: '#FFFFFF',
                  border: 'none',
                  '&:hover': {
                    background: '#A0522D'
                  },
                  '&:disabled': {
                    background: '#D2B48C',
                    color: 'rgba(139, 69, 19, 0.6)'
                  }
                }}
              >
                {t('searchNow')}
              </Button>
            </Group>
          </Stack>
        </form>
      </Card>

      {/* Quick Search Suggestions */}
      <Grid mb="xl">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card 
            withBorder 
            p="md" 
            className="quick-search-card"
            style={{ 
              background: 'linear-gradient(135deg, #F5F5DC 0%, #F0E68C 30%, #DDD1A0 70%, #D2B48C 100%)',
              border: '2px solid #8B4513',
              borderRadius: '12px',
              boxShadow: '0 4px 16px rgba(139, 69, 19, 0.3)'
            }}
          >
            <Group gap="sm" mb="sm">
              <FileText size={20} color="#8B4513" />
              <Text fw={600} size="sm" c="#8B4513">{t('popularPosts')}</Text>
            </Group>
            <Stack gap="xs">
              <Text size="sm" c="#5D4E37">Recent blog posts and articles</Text>
              <Button 
                variant="light" 
                size="sm" 
                onClick={() => {
                  router.get('/blog')
                }}
                style={{
                  backgroundColor: '#F5F5DC',
                  color: '#8B4513',
                  border: '1px solid #D2B48C',
                  '&:hover': {
                    backgroundColor: '#DDD1A0'
                  }
                }}
              >
{t('viewAllPosts')}
              </Button>
            </Stack>
          </Card>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card 
            withBorder 
            p="md" 
            className="quick-search-card"
            style={{ 
              background: 'linear-gradient(135deg, #F5F5DC 0%, #F0E68C 30%, #DDD1A0 70%, #D2B48C 100%)',
              border: '2px solid #8B4513',
              borderRadius: '12px',
              boxShadow: '0 4px 16px rgba(139, 69, 19, 0.3)'
            }}
          >
            <Group gap="sm" mb="sm">
              <Calendar size={20} color="#8B4513" />
              <Text fw={600} size="sm" c="#8B4513">{t('upcomingEvents')}</Text>
            </Group>
            <Stack gap="xs">
              <Text size="sm" c="#5D4E37">Liturgies, services, and community events</Text>
              <Button 
                variant="light" 
                size="sm" 
                onClick={() => {
                  router.get('/calendar')
                }}
                style={{
                  backgroundColor: '#F5F5DC',
                  color: '#8B4513',
                  border: '1px solid #D2B48C',
                  '&:hover': {
                    backgroundColor: '#DDD1A0'
                  }
                }}
              >
{t('viewAllEvents')}
              </Button>
            </Stack>
          </Card>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card 
            withBorder 
            p="md" 
            className="quick-search-card"
            style={{ 
              background: 'linear-gradient(135deg, #F5F5DC 0%, #F0E68C 30%, #DDD1A0 70%, #D2B48C 100%)',
              border: '2px solid #8B4513',
              borderRadius: '12px',
              boxShadow: '0 4px 16px rgba(139, 69, 19, 0.3)'
            }}
          >
            <Group gap="sm" mb="sm">
              <Bell size={20} color="#8B4513" />
              <Text fw={600} size="sm" c="#8B4513">{t('latestBulletins')}</Text>
            </Group>
            <Stack gap="xs">
              <Text size="sm" c="#5D4E37">Important announcements and updates</Text>
              <Button 
                variant="light" 
                size="sm" 
                onClick={() => {
                  router.get('/bulletin')
                }}
                style={{
                  backgroundColor: '#F5F5DC',
                  color: '#8B4513',
                  border: '1px solid #D2B48C',
                  '&:hover': {
                    backgroundColor: '#DDD1A0'
                  }
                }}
              >
{t('viewAllBulletins')}
              </Button>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Search Tips */}
      <Alert 
        color="blue" 
        variant="light" 
        title={t('searchTips')}
        style={{
          background: 'linear-gradient(135deg, #F5F5DC 0%, #F0E68C 30%, #DDD1A0 70%, #D2B48C 100%)',
          border: '2px solid #8B4513',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(139, 69, 19, 0.3)'
        }}
        styles={{
          title: { color: '#8B4513' },
          message: { color: '#5D4E37' }
        }}
      >
        <Stack gap="xs">
          <Text size="sm" c="#5D4E37">• {t('searchTip1')}</Text>
          <Text size="sm" c="#5D4E37">• {t('searchTip2')}</Text>
          <Text size="sm" c="#5D4E37">• {t('searchTip3')}</Text>
          <Text size="sm" c="#5D4E37">• {t('searchTip4')}</Text>
        </Stack>
      </Alert>
        </Container>
      </Box>
    </FrontLayout>
  )
}

export default SearchIndex
