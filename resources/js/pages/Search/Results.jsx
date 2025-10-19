import React, { useState, useEffect } from 'react'
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
  MultiSelect,
  Tabs,
  Pagination,
  Box,
  Divider,
  Alert
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { Link, router } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'
import FrontLayout from '../../layouts/app/Front/FrontLayout'
import { useLanguage } from '../../contexts/LanguageContext'
import { 
  Search, 
  Calendar, 
  FileText, 
  Bell, 
  MapPin,
  Clock,
  User,
  Tag
} from 'lucide-react'
import { formatDate } from '../../utils/dateUtils'
import { getTranslatedContent } from '../../utils/contentUtils'

const SearchResults = ({ query, language, results, filters }) => {
  const { url } = usePage()
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState(query || '')
  const [selectedLanguage, setSelectedLanguage] = useState(language || 'en')
  const [selectedTypes, setSelectedTypes] = useState(filters.contentTypes || ['posts', 'events', 'bulletins'])
  const [dateFrom, setDateFrom] = useState(filters.dateFrom || null)
  const [dateTo, setDateTo] = useState(filters.dateTo || null)
  const [category, setCategory] = useState(filters.category || '')
  const [eventType, setEventType] = useState(filters.eventType || '')
  const [priority, setPriority] = useState(filters.priority || '')
  const [status, setStatus] = useState(filters.status || 'published')

  const contentTypes = [
    { value: 'posts', label: t('postsLabel') },
    { value: 'events', label: t('eventsLabel') },
    { value: 'bulletins', label: t('bulletinsLabel') }
  ]

  const categories = [
    { value: 'news', label: t('newsCategory') },
    { value: 'announcements', label: t('announcementsCategory') },
    { value: 'spiritual', label: t('spiritualCategory') },
    { value: 'community', label: t('communityCategory') }
  ]

  const eventTypes = [
    { value: 'liturgy', label: t('liturgyType') },
    { value: 'feast', label: t('feastType') },
    { value: 'meeting', label: t('meetingType') },
    { value: 'social', label: t('socialType') }
  ]

  const priorities = [
    { value: 'low', label: t('lowPriority') },
    { value: 'normal', label: t('normalPriority') },
    { value: 'high', label: t('highPriority') },
    { value: 'urgent', label: t('urgentPriority') }
  ]

  const handleSearch = () => {
    const params = new URLSearchParams()
    
    if (searchQuery) params.set('q', searchQuery)
    if (selectedLanguage) params.set('lang', selectedLanguage)
    if (selectedTypes.length) params.set('types', selectedTypes.join(','))
    if (dateFrom) params.set('date_from', dateFrom)
    if (dateTo) params.set('date_to', dateTo)
    if (category) params.set('category', category)
    if (eventType) params.set('event_type', eventType)
    if (priority) params.set('priority', priority)
    if (status) params.set('status', status)

    router.visit(`/search?${params.toString()}`, {
      preserveScroll: true,
      preserveState: true
    })
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'red'
      case 'high': return 'orange'
      case 'normal': return 'blue'
      case 'low': return 'gray'
      default: return 'gray'
    }
  }

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'liturgy': return 'gold'
      case 'feast': return 'violet'
      case 'meeting': return 'blue'
      case 'social': return 'green'
      default: return 'gray'
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'news': return 'blue'
      case 'announcements': return 'orange'
      case 'spiritual': return 'violet'
      case 'community': return 'green'
      default: return 'gray'
    }
  }

  const totalResults = (results.posts?.data?.length || 0) + 
                      (results.events?.data?.length || 0) + 
                      (results.bulletins?.data?.length || 0)

  return (
    <FrontLayout>
      <Box 
        style={{ 
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #F5F5DC 0%, #F0E68C 30%, #DDD1A0 70%, #D2B48C 100%)',
          padding: '2rem 0'
        }}
      >
        <Container size="xl">
          <Title 
            order={1} 
            mb="lg"
            style={{ 
              color: '#8B4513',
              textAlign: 'center',
              fontSize: '2.5rem',
              fontWeight: '700',
              textShadow: '2px 2px 4px rgba(139, 69, 19, 0.3)'
            }}
          >
            {t('searchOurContent')}
          </Title>
      
          {/* Search Form */}
          <Paper 
            p="lg" 
            mb="xl" 
            style={{ 
              background: 'linear-gradient(135deg, #F5F5DC 0%, #F0E68C 30%, #DDD1A0 70%, #D2B48C 100%)',
              border: '2px solid #8B4513',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(139, 69, 19, 0.3)'
            }}
          >
        <Grid>
          <Grid.Col span={12}>
            <TextInput
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              leftSection={<Search size={20} />}
              size="lg"
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
            <Group justify="center" mt="md">
              <Button 
                onClick={handleSearch}
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
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Select
              label={t('language')}
              value={selectedLanguage}
              onChange={setSelectedLanguage}
              data={[
                { value: 'en', label: t('english') },
                { value: 'fr', label: t('french') },
                { value: 'sr', label: t('serbian') }
              ]}
            />
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <MultiSelect
              label={t('contentTypes')}
              value={selectedTypes}
              onChange={setSelectedTypes}
              data={contentTypes}
              placeholder={t('selectTypes')}
            />
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <DateInput
              label={t('fromDate')}
              value={dateFrom}
              onChange={setDateFrom}
              placeholder={t('startDate')}
            />
          </Grid.Col>
          
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <DateInput
              label={t('toDate')}
              value={dateTo}
              onChange={setDateTo}
              placeholder={t('endDate')}
            />
          </Grid.Col>
          
          {selectedTypes.includes('posts') && (
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Select
                label={t('categoryPosts')}
                value={category}
                onChange={setCategory}
                data={categories}
                placeholder={t('allCategories')}
                clearable
              />
            </Grid.Col>
          )}
          
          {selectedTypes.includes('events') && (
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Select
                label={t('eventType')}
                value={eventType}
                onChange={setEventType}
                data={eventTypes}
                placeholder={t('allTypes')}
                clearable
              />
            </Grid.Col>
          )}
          
          {selectedTypes.includes('bulletins') && (
            <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
              <Select
                label={t('priorityBulletins')}
                value={priority}
                onChange={setPriority}
                data={priorities}
                placeholder={t('allPriorities')}
                clearable
              />
            </Grid.Col>
          )}
          
          <Grid.Col span={12}>
            <Button onClick={handleSearch} size="md">
              <Search size={16} style={{ marginRight: 8 }} />
              {t('search')}
            </Button>
          </Grid.Col>
        </Grid>
      </Paper>

          {/* Results Summary */}
          {query && (
            <Paper 
              p="lg" 
              mb="xl"
              style={{ 
                background: 'linear-gradient(135deg, #F5F5DC 0%, #F0E68C 30%, #DDD1A0 70%, #D2B48C 100%)',
                border: '2px solid #8B4513',
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(139, 69, 19, 0.2)'
              }}
            >
              <Text 
                size="xl" 
                style={{ 
                  color: '#8B4513',
                  fontWeight: '600',
                  textAlign: 'center'
                }}
              >
                {t('foundResults').replace('{count}', totalResults).replace('{query}', query)}
              </Text>
            </Paper>
          )}

      {/* Results */}
      {totalResults > 0 ? (
        <Tabs defaultValue="all" className="search-results">
          <Tabs.List>
            <Tabs.Tab value="all">{t('allResults')} ({totalResults})</Tabs.Tab>
            {selectedTypes.includes('posts') && (
              <Tabs.Tab value="posts">
                {t('postsResults')} ({results.posts?.data?.length || 0})
              </Tabs.Tab>
            )}
            {selectedTypes.includes('events') && (
              <Tabs.Tab value="events">
                {t('eventsResults')} ({results.events?.data?.length || 0})
              </Tabs.Tab>
            )}
            {selectedTypes.includes('bulletins') && (
              <Tabs.Tab value="bulletins">
                {t('bulletinsResults')} ({results.bulletins?.data?.length || 0})
              </Tabs.Tab>
            )}
          </Tabs.List>

          <Tabs.Panel value="all" pt="md">
            <Stack gap="md">
              {/* Posts */}
              {results.posts?.data?.map((post) => (
                <Card key={post.id} p="md" className="search-result-card">
                  <Group mb="xs">
                    <FileText size={16} />
                    <Badge color={getCategoryColor(post.category)} variant="light">
                      {post.category}
                    </Badge>
                    <Text size="sm" c="dimmed">
                      {formatDate(post.published_at || post.created_at)}
                    </Text>
                  </Group>
                  
                  <Title order={3} mb="xs">
                    <Link href={`/blog/${post.slug}`}>
                      {getTranslatedContent(post, 'title')}
                    </Link>
                  </Title>
                  
                  {post.excerpt && (
                    <Text mb="sm">
                      {getTranslatedContent(post, 'excerpt')}
                    </Text>
                  )}
                  
                  <Group>
                    <Group gap="xs">
                      <User size={14} />
                      <Text size="sm">{post.author?.name}</Text>
                    </Group>
                    <Group gap="xs">
                      <Tag size={14} />
                      <Text size="sm">{post.views_count} views</Text>
                    </Group>
                  </Group>
                </Card>
              ))}

              {/* Events */}
              {results.events?.data?.map((event) => (
                <Card key={event.id} p="md" className="search-result-card">
                  <Group mb="xs">
                    <Calendar size={16} />
                    <Badge color={getEventTypeColor(event.event_type)} variant="light">
                      {event.event_type}
                    </Badge>
                    <Text size="sm" c="dimmed">
                      {formatDate(event.event_date)}
                    </Text>
                  </Group>
                  
                  <Title order={3} mb="xs">
                    {getTranslatedContent(event, 'title')}
                  </Title>
                  
                  {event.description && (
                    <Text mb="sm">
                      {getTranslatedContent(event, 'description')}
                    </Text>
                  )}
                  
                  <Group>
                    {event.start_time && (
                      <Group gap="xs">
                        <Clock size={14} />
                        <Text size="sm">{event.start_time}</Text>
                      </Group>
                    )}
                    {event.location && (
                      <Group gap="xs">
                        <MapPin size={14} />
                        <Text size="sm">{getTranslatedContent(event, 'location')}</Text>
                      </Group>
                    )}
                  </Group>
                </Card>
              ))}

              {/* Bulletins */}
              {results.bulletins?.data?.map((bulletin) => (
                <Card key={bulletin.id} p="md" className="search-result-card">
                  <Group mb="xs">
                    <Bell size={16} />
                    <Badge color={getPriorityColor(bulletin.priority)} variant="light">
                      {bulletin.priority}
                    </Badge>
                    <Text size="sm" c="dimmed">
                      {formatDate(bulletin.created_at)}
                    </Text>
                  </Group>
                  
                  <Title order={3} mb="xs">
                    {getTranslatedContent(bulletin, 'title')}
                  </Title>
                  
                  <Text mb="sm">
                    {getTranslatedContent(bulletin, 'message')}
                  </Text>
                  
                  <Group>
                    <Group gap="xs">
                      <User size={14} />
                      <Text size="sm">{bulletin.poster?.name}</Text>
                    </Group>
                    <Badge size="sm" variant="outline">
                      {bulletin.type}
                    </Badge>
                  </Group>
                </Card>
              ))}
            </Stack>
          </Tabs.Panel>

          {selectedTypes.includes('posts') && (
            <Tabs.Panel value="posts" pt="md">
              <Stack gap="md">
                {results.posts?.data?.map((post) => (
                  <Card key={post.id} p="md" className="search-result-card">
                    <Group mb="xs">
                      <FileText size={16} />
                      <Badge color={getCategoryColor(post.category)} variant="light">
                        {post.category}
                      </Badge>
                      <Text size="sm" c="dimmed">
                        {formatDate(post.published_at || post.created_at)}
                      </Text>
                    </Group>
                    
                    <Title order={3} mb="xs">
                      <Link href={`/blog/${post.slug}`}>
                        {getTranslatedContent(post, 'title')}
                      </Link>
                    </Title>
                    
                    {post.excerpt && (
                      <Text mb="sm">
                        {getTranslatedContent(post, 'excerpt')}
                      </Text>
                    )}
                    
                    <Group>
                      <Group gap="xs">
                        <User size={14} />
                        <Text size="sm">{post.author?.name}</Text>
                      </Group>
                      <Group gap="xs">
                        <Tag size={14} />
                        <Text size="sm">{post.views_count} views</Text>
                      </Group>
                    </Group>
                  </Card>
                ))}
              </Stack>
            </Tabs.Panel>
          )}

          {selectedTypes.includes('events') && (
            <Tabs.Panel value="events" pt="md">
              <Stack gap="md">
                {results.events?.data?.map((event) => (
                  <Card key={event.id} p="md" className="search-result-card">
                    <Group mb="xs">
                      <Calendar size={16} />
                      <Badge color={getEventTypeColor(event.event_type)} variant="light">
                        {event.event_type}
                      </Badge>
                      <Text size="sm" c="dimmed">
                        {formatDate(event.event_date)}
                      </Text>
                    </Group>
                    
                    <Title order={3} mb="xs">
                      {getTranslatedContent(event, 'title')}
                    </Title>
                    
                    {event.description && (
                      <Text mb="sm">
                        {getTranslatedContent(event, 'description')}
                      </Text>
                    )}
                    
                    <Group>
                      {event.start_time && (
                        <Group gap="xs">
                          <Clock size={14} />
                          <Text size="sm">{event.start_time}</Text>
                        </Group>
                      )}
                      {event.location && (
                        <Group gap="xs">
                          <MapPin size={14} />
                          <Text size="sm">{getTranslatedContent(event, 'location')}</Text>
                        </Group>
                      )}
                    </Group>
                  </Card>
                ))}
              </Stack>
            </Tabs.Panel>
          )}

          {selectedTypes.includes('bulletins') && (
            <Tabs.Panel value="bulletins" pt="md">
              <Stack gap="md">
                {results.bulletins?.data?.map((bulletin) => (
                  <Card key={bulletin.id} p="md" className="search-result-card">
                    <Group mb="xs">
                      <Bell size={16} />
                      <Badge color={getPriorityColor(bulletin.priority)} variant="light">
                        {bulletin.priority}
                      </Badge>
                      <Text size="sm" c="dimmed">
                        {formatDate(bulletin.created_at)}
                      </Text>
                    </Group>
                    
                    <Title order={3} mb="xs">
                      {getTranslatedContent(bulletin, 'title')}
                    </Title>
                    
                    <Text mb="sm">
                      {getTranslatedContent(bulletin, 'message')}
                    </Text>
                    
                    <Group>
                      <Group gap="xs">
                        <User size={14} />
                        <Text size="sm">{bulletin.poster?.name}</Text>
                      </Group>
                      <Badge size="sm" variant="outline">
                        {bulletin.type}
                      </Badge>
                    </Group>
                  </Card>
                ))}
              </Stack>
            </Tabs.Panel>
          )}
        </Tabs>
      ) : query ? (
        <Alert title={t('noResultsFound')} color="yellow">
          {t('tryAdjustingSearch')}
        </Alert>
      ) : null}
        </Container>
      </Box>
    </FrontLayout>
  )
}

export default SearchResults
