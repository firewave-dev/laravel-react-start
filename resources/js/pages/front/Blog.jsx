import React, { useState } from 'react'
import { Container, Title, Text, Paper, Card, Badge, Group, Stack, Box, Grid, Button, TextInput } from '@mantine/core'
import { Link } from '@inertiajs/react'
import { Calendar, User, Eye, Search, ArrowRight } from 'lucide-react'
import FrontLayout from '../../layouts/app/Front/FrontLayout'
import { useLanguage } from '../../contexts/LanguageContext'

const Blog = ({ posts, filters, currentLocale = 'en' }) => {
  const { t } = useLanguage()
  const [search, setSearch] = useState(filters?.search || '')
  
  // Helper function to get translated content
  const getTranslatedContent = (item, field) => {
    if (currentLocale === 'en' || !item.translations) {
      return item[field]
    }
    
    const translation = item.translations.find(t => t.locale === currentLocale)
    return translation?.[field] || item[field]
  }
  
  // Helper function to format dates based on locale
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const localeMap = {
      'en': 'en-US',
      'fr': 'fr-FR',
      'sr': 'sr-RS'
    }
    
    return date.toLocaleDateString(localeMap[currentLocale] || 'en-US')
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
            {/* Header */}
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
              <Box>
                <Title order={1} c="#8B4513" style={{ fontFamily: 'serif' }} mb="xs">
                  {t('news')}
                </Title>
                <Text size="lg" c="#654321">
                  {t('blogSubtitle')}
                </Text>
              </Box>
            </Paper>

            {/* Featured Posts */}
            {posts?.data && posts.data.filter(p => p.is_featured).length > 0 && (
              <div>
                <Title order={3} c="#8B4513" mb="md" style={{ fontFamily: 'serif' }}>
                  Featured
                </Title>
                <Grid>
                  {posts.data.filter(p => p.is_featured).slice(0, 3).map((post) => (
                    <Grid.Col key={post.id} span={{ base: 12, md: 4 }}>
                      <Card
                        p="lg"
                        withBorder
                        shadow="sm"
                        style={{
                          backgroundColor: 'rgba(240, 230, 200, 0.9)',
                          border: '2px solid rgba(139, 69, 19, 0.2)',
                          borderRadius: '12px',
                          height: '100%',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-4px)'
                          e.currentTarget.style.boxShadow = '0 12px 32px rgba(139, 69, 19, 0.2)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)'
                          e.currentTarget.style.boxShadow = 'none'
                        }}
                      >
                        <Badge color="yellow" variant="filled" mb="sm">Featured</Badge>
                        <Title order={4} c="#8B4513" mb="sm" style={{ fontFamily: 'serif' }}>
                          {getTranslatedContent(post, 'title')}
                        </Title>
                        {post.excerpt && (
                          <Text size="sm" c="#654321" mb="md" lineClamp={3}>
                            {getTranslatedContent(post, 'excerpt')}
                          </Text>
                        )}
                        <Group gap="xs" mb="md">
                          <Calendar size={14} color="#8B4513" />
                          <Text size="xs" c="#8B4513">
                            {formatDate(post.published_at || post.created_at)}
                          </Text>
                          <Eye size={14} color="#8B4513" />
                          <Text size="xs" c="#8B4513">{post.views_count || 0} views</Text>
                        </Group>
                        <Link href={`/blog/${post.slug}`}>
                          <Button 
                            fullWidth
                            rightSection={<ArrowRight size={16} />}
                            style={{
                              backgroundColor: '#8B4513',
                              color: '#FFF8DC'
                            }}
                          >
                            Read More
                          </Button>
                        </Link>
                      </Card>
                    </Grid.Col>
                  ))}
                </Grid>
              </div>
            )}

            {/* All Posts */}
            <Title order={3} c="#8B4513" mb="md" style={{ fontFamily: 'serif' }}>
              All Posts
            </Title>
            <Stack gap="md">
              {posts?.data && posts.data.length > 0 ? (
                posts.data.map((post) => (
                  <Paper
                    key={post.id}
                    p="lg"
                    withBorder
                    style={{
                      backgroundColor: 'rgba(240, 230, 200, 0.85)',
                      border: '2px solid rgba(139, 69, 19, 0.2)',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(240, 230, 200, 1)'
                      e.currentTarget.style.borderColor = 'rgba(139, 69, 19, 0.3)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(240, 230, 200, 0.85)'
                      e.currentTarget.style.borderColor = 'rgba(139, 69, 19, 0.2)'
                    }}
                  >
                    <Group justify="space-between" align="flex-start">
                      <Box style={{ flex: 1 }}>
                        <Group gap="xs" mb="sm">
                          <Badge color={getCategoryBadgeColor(post.category)} variant="light" size="sm" tt="capitalize">
                            {post.category.replace('_', ' ')}
                          </Badge>
                          {post.is_featured && (
                            <Badge color="yellow" variant="filled" size="xs">Featured</Badge>
                          )}
                        </Group>
                        <Title order={4} c="#8B4513" mb="xs" style={{ fontFamily: 'serif' }}>
                          {getTranslatedContent(post, 'title')}
                        </Title>
                        {post.excerpt && (
                          <Text size="sm" c="#654321" mb="sm" lineClamp={2}>
                            {getTranslatedContent(post, 'excerpt')}
                          </Text>
                        )}
                        <Group gap="md">
                          <Group gap="xs">
                            <User size={14} color="#8B4513" />
                            <Text size="xs" c="#8B4513">{post.author?.name}</Text>
                          </Group>
                          <Group gap="xs">
                            <Calendar size={14} color="#8B4513" />
                            <Text size="xs" c="#8B4513">
                              {formatDate(post.published_at || post.created_at)}
                            </Text>
                          </Group>
                          <Group gap="xs">
                            <Eye size={14} color="#8B4513" />
                            <Text size="xs" c="#8B4513">{post.views_count || 0}</Text>
                          </Group>
                        </Group>
                      </Box>
                      <Link href={`/blog/${post.slug}`}>
                        <Button
                          variant="light"
                          rightSection={<ArrowRight size={16} />}
                          style={{
                            color: '#8B4513',
                            borderColor: 'rgba(139, 69, 19, 0.3)'
                          }}
                        >
                          Read
                        </Button>
                      </Link>
                    </Group>
                  </Paper>
                ))
              ) : (
                <Paper
                  p="xl"
                  style={{
                    backgroundColor: 'rgba(240, 230, 200, 0.9)',
                    textAlign: 'center'
                  }}
                >
                  <Text c="#8B4513">No posts available yet</Text>
                </Paper>
              )}
            </Stack>
          </Stack>
        </Container>
      </Box>
    </FrontLayout>
  )
}

export default Blog
