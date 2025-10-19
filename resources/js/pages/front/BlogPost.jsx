import React from 'react'
import { Container, Title, Text, Paper, Badge, Group, Box, Divider } from '@mantine/core'
import { Calendar, User, Eye, Tag } from 'lucide-react'
import FrontLayout from '../../layouts/app/Front/FrontLayout'

const BlogPost = ({ post }) => {
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
        <Container size="lg">
          <Paper 
            p="xl" 
            withBorder
            style={{ 
              backgroundColor: 'rgba(240, 230, 200, 0.95)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(139, 69, 19, 0.25)',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(139, 69, 19, 0.1)'
            }}
          >
            {/* Category & Status */}
            <Group mb="md">
              <Badge color={getCategoryBadgeColor(post.category)} variant="light" size="lg" tt="capitalize">
                {post.category.replace('_', ' ')}
              </Badge>
              {post.is_featured && (
                <Badge color="yellow" variant="filled" size="sm">Featured</Badge>
              )}
            </Group>

            {/* Title */}
            <Title order={1} mb="md" c="#8B4513" style={{ fontFamily: 'serif', fontSize: '2.5rem' }}>
              {post.title}
            </Title>

            {/* Meta Information */}
            <Group gap="xl" mb="xl">
              <Group gap="xs">
                <User size={18} color="#8B4513" />
                <Text c="#654321" fw={500} size="sm">
                  {post.author?.name || 'Unknown'}
                </Text>
              </Group>
              <Group gap="xs">
                <Calendar size={18} color="#8B4513" />
                <Text c="#654321" size="sm">
                  {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Text>
              </Group>
              <Group gap="xs">
                <Eye size={18} color="#8B4513" />
                <Text c="#654321" size="sm">
                  {post.views_count || 0} views
                </Text>
              </Group>
            </Group>

            <Divider color="rgba(139, 69, 19, 0.3)" mb="xl" />

            {/* Excerpt */}
            {post.excerpt && (
              <Paper
                p="lg"
                mb="xl"
                style={{
                  backgroundColor: 'rgba(139, 69, 19, 0.08)',
                  border: '1px solid rgba(139, 69, 19, 0.2)',
                  borderLeft: '4px solid #8B4513',
                  borderRadius: '8px'
                }}
              >
                <Text c="#8B4513" fw={500} size="lg" style={{ fontStyle: 'italic', lineHeight: 1.8 }}>
                  {post.excerpt}
                </Text>
              </Paper>
            )}

            {/* Content */}
            <Box mb="xl">
              <div 
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
                style={{ lineHeight: 1.9, fontSize: '1.05rem' }}
              />
            </Box>

            <style>{`
              .blog-content h1 {
                font-size: 2rem;
                font-weight: bold;
                margin: 1.5rem 0 1rem 0;
                color: #8B4513;
                font-family: serif;
              }
              .blog-content h2 {
                font-size: 1.5rem;
                font-weight: bold;
                margin: 1.2rem 0 0.8rem 0;
                color: #8B4513;
                font-family: serif;
              }
              .blog-content h3 {
                font-size: 1.25rem;
                font-weight: bold;
                margin: 1rem 0 0.6rem 0;
                color: #8B4513;
                font-family: serif;
              }
              .blog-content p {
                margin: 0.8rem 0;
                color: #654321;
              }
              .blog-content ul, .blog-content ol {
                padding-left: 2rem;
                margin: 1rem 0;
                color: #654321;
              }
              .blog-content li {
                margin: 0.5rem 0;
              }
              .blog-content img {
                max-width: 100%;
                height: auto;
                border-radius: 8px;
                margin: 1.5rem 0;
                box-shadow: 0 4px 12px rgba(139, 69, 19, 0.2);
              }
              .blog-content a {
                color: #8B4513;
                text-decoration: underline;
                font-weight: 500;
              }
              .blog-content strong {
                font-weight: 600;
                color: #8B4513;
              }
              .blog-content em {
                font-style: italic;
              }
              .blog-content blockquote {
                border-left: 4px solid #8B4513;
                padding-left: 1rem;
                margin: 1rem 0;
                font-style: italic;
                color: #654321;
              }
            `}</style>

            <Divider color="rgba(139, 69, 19, 0.3)" my="xl" />

            {/* Footer */}
            <Group justify="space-between">
              <Text c="#8B4513" size="sm">
                Published on {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
              <Text c="#8B4513" size="sm">
                by {post.author?.name}
              </Text>
            </Group>
          </Paper>
        </Container>
      </Box>
    </FrontLayout>
  )
}

export default BlogPost

