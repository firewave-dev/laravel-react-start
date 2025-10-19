import React from 'react'
import { 
  Container, 
  Title, 
  Text, 
  Paper, 
  Stack, 
  Group, 
  Badge, 
  Box, 
  Divider,
  Button
} from '@mantine/core'
import { ArrowLeft, Calendar, Eye, User, Clock } from 'lucide-react'
import { Link } from '@inertiajs/react'
import FrontLayout from '../../layouts/app/Front/FrontLayout'
import { useLanguage } from '../../contexts/LanguageContext'
import { formatDate } from '../../utils/dateUtils'
import { getTranslatedContent } from '../../utils/contentUtils'

const Post = ({ post, currentLocale = 'en' }) => {
  const { t } = useLanguage()
  
  // Helper function to get translated content
  const getTranslatedContent = (item, field) => {
    if (currentLocale === 'en' || !item.translations) {
      return item[field]
    }
    
    const translation = item.translations.find(t => t.locale === currentLocale)
    return translation?.[field] || item[field]
  }

  return (
    <FrontLayout>
      <Box style={{ 
        minHeight: 'calc(100vh - 200px)', 
        background: 'linear-gradient(135deg, #F5F5DC 0%, #DDD1A0 30%, #D2B48C 70%, #BC9A6A 100%)', 
        padding: '3rem 0' 
      }}>
        <Container size="md">
          {/* Back Button */}
          <Group mb="xl">
            <Link href="/blog">
              <Button 
                variant="light" 
                leftSection={<ArrowLeft size={16} />}
                style={{
                  backgroundColor: '#F5F5DC',
                  color: '#8B4513',
                  border: '1px solid #D2B48C',
                  '&:hover': {
                    backgroundColor: '#DDD1A0'
                  }
                }}
              >
                {t('backToBlog') || 'Back to Blog'}
              </Button>
            </Link>
          </Group>

          {/* Post Content */}
          <Paper 
            p="xl" 
            style={{ 
              background: 'linear-gradient(135deg, #F5F5DC 0%, #F0E68C 30%, #DDD1A0 70%, #D2B48C 100%)',
              border: '2px solid #8B4513',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(139, 69, 19, 0.3)'
            }}
          >
            <Stack gap="lg">
              {/* Post Header */}
              <Stack gap="md">
                <Group justify="space-between" align="flex-start">
                  <Box style={{ flex: 1 }}>
                    <Title 
                      order={1} 
                      c="#8B4513" 
                      style={{ 
                        fontFamily: 'serif',
                        fontSize: '2.5rem',
                        lineHeight: 1.2,
                        marginBottom: '1rem'
                      }}
                    >
                      {getTranslatedContent(post, 'title')}
                    </Title>
                    
                    {post.excerpt && (
                      <Text 
                        size="lg" 
                        c="#654321" 
                        style={{ 
                          fontStyle: 'italic',
                          fontSize: '1.2rem',
                          lineHeight: 1.4
                        }}
                      >
                        {getTranslatedContent(post, 'excerpt')}
                      </Text>
                    )}
                  </Box>
                </Group>

                {/* Post Meta */}
                <Group gap="lg" wrap="wrap">
                  <Group gap="xs">
                    <User size={16} color="#8B4513" />
                    <Text size="sm" c="#8B4513" fw={500}>
                      {post.author?.name || 'Unknown Author'}
                    </Text>
                  </Group>
                  
                  <Group gap="xs">
                    <Calendar size={16} color="#8B4513" />
                    <Text size="sm" c="#8B4513">
                      {formatDate(post.published_at || post.created_at)}
                    </Text>
                  </Group>

                  {post.views_count && (
                    <Group gap="xs">
                      <Eye size={16} color="#8B4513" />
                      <Text size="sm" c="#8B4513">
                        {post.views_count} {t('views') || 'views'}
                      </Text>
                    </Group>
                  )}

                  {post.reading_time && (
                    <Group gap="xs">
                      <Clock size={16} color="#8B4513" />
                      <Text size="sm" c="#8B4513">
                        {post.reading_time} {t('minRead') || 'min read'}
                      </Text>
                    </Group>
                  )}
                </Group>

                {/* Categories/Tags */}
                {post.categories && post.categories.length > 0 && (
                  <Group gap="xs">
                    {post.categories.map((category, index) => (
                      <Badge 
                        key={index}
                        color="blue" 
                        variant="light"
                        style={{
                          backgroundColor: '#F5F5DC',
                          color: '#8B4513',
                          border: '1px solid #D2B48C'
                        }}
                      >
                        {category}
                      </Badge>
                    ))}
                  </Group>
                )}
              </Stack>

              <Divider color="#D2B48C" />

              {/* Post Body */}
              <Box>
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: getTranslatedContent(post, 'content') 
                  }}
                  style={{
                    color: '#5D4E37',
                    lineHeight: 1.7,
                    fontSize: '1.1rem',
                    fontFamily: 'Georgia, serif'
                  }}
                />
              </Box>

              {/* Post Footer */}
              <Divider color="#D2B48C" />
              
              <Group justify="space-between">
                <Group gap="xs">
                  <Text size="sm" c="#8B4513" fw={500}>
                    {t('publishedOn') || 'Published on'}:
                  </Text>
                  <Text size="sm" c="#654321">
                    {formatDate(post.published_at || post.created_at)}
                  </Text>
                </Group>
                
                <Group gap="xs">
                  <Text size="sm" c="#8B4513" fw={500}>
                    {t('lastUpdated') || 'Last updated'}:
                  </Text>
                  <Text size="sm" c="#654321">
                    {formatDate(post.updated_at)}
                  </Text>
                </Group>
              </Group>
            </Stack>
          </Paper>
        </Container>
      </Box>
    </FrontLayout>
  )
}

export default Post
