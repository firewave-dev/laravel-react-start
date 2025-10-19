import React from 'react'
import { Container, Title, Text, Paper, Badge, Group, Button, Divider, Stack } from '@mantine/core'
import { Link } from '@inertiajs/react'
import { ArrowLeft, Edit, User, Calendar, Eye, Tag } from 'lucide-react'
import Layout from '../../layouts/app/Backend/Layout'

const PostsShow = ({ post }) => {
  const getStatusBadgeColor = (status) => {
    return status === 'published' ? 'green' : 'yellow'
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
    <Layout>
      <Container size="lg" py="xl">
        <Paper 
          p="xl" 
          withBorder
          style={{ 
            background: 'linear-gradient(135deg, rgba(26, 31, 46, 0.8) 0%, rgba(15, 20, 25, 0.9) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 215, 0, 0.2)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
          }}
        >
          {/* Header */}
          <Group justify="space-between" mb="xl">
            <Group>
              <Link href="/posts">
                <Button 
                  variant="subtle" 
                  leftSection={<ArrowLeft size={18} />}
                  c="#FFD700"
                >
                  Back to Posts
                </Button>
              </Link>
            </Group>
            <Link href={`/posts/${post.id}/edit`}>
              <Button
                leftSection={<Edit size={18} />}
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  color: '#1a1f2e',
                  fontWeight: 600
                }}
              >
                Edit Post
              </Button>
            </Link>
          </Group>

          {/* Title & Badges */}
          <Title order={2} c="#FFD700" mb="md" style={{ fontFamily: 'serif' }}>
            {post.title}
          </Title>
          <Group mb="xl">
            <Badge color={getCategoryBadgeColor(post.category)} variant="light" tt="capitalize">
              {post.category.replace('_', ' ')}
            </Badge>
            <Badge color={getStatusBadgeColor(post.status)} variant="dot" tt="capitalize">
              {post.status}
            </Badge>
            {post.is_featured && (
              <Badge color="yellow" variant="filled">Featured</Badge>
            )}
          </Group>

          {/* Meta Information */}
          <Group gap="xl" mb="xl">
            <Group gap="xs">
              <User size={16} color="#FFD700" />
              <Text c="#b8b8b8" size="sm">
                {post.author?.name || 'Unknown'}
              </Text>
            </Group>
            {post.published_at && (
              <Group gap="xs">
                <Calendar size={16} color="#FFD700" />
                <Text c="#b8b8b8" size="sm">
                  {new Date(post.published_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Text>
              </Group>
            )}
            <Group gap="xs">
              <Eye size={16} color="#FFD700" />
              <Text c="#b8b8b8" size="sm">
                {post.views_count || 0} views
              </Text>
            </Group>
          </Group>

          <Divider color="rgba(255, 215, 0, 0.2)" mb="xl" />

          {/* Excerpt */}
          {post.excerpt && (
            <Paper
              p="md"
              mb="xl"
              style={{
                backgroundColor: 'rgba(255, 215, 0, 0.05)',
                border: '1px solid rgba(255, 215, 0, 0.15)',
                borderLeft: '4px solid rgba(255, 215, 0, 0.5)'
              }}
            >
              <Text c="#FFD700" fw={500} size="sm" mb="xs">EXCERPT</Text>
              <Text c="#b8b8b8" style={{ fontStyle: 'italic' }}>
                {post.excerpt}
              </Text>
            </Paper>
          )}

          {/* Content */}
          <Paper
            p="xl"
            mb="xl"
            withBorder
            style={{
              backgroundColor: 'rgba(15, 20, 25, 0.5)',
              border: '1px solid rgba(255, 215, 0, 0.1)'
            }}
          >
            <div 
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{ color: '#b8b8b8', lineHeight: 1.8 }}
            />
          </Paper>

          <style>{`
            .post-content h1 {
              font-size: 2rem;
              font-weight: bold;
              margin: 1rem 0;
              color: #FFD700;
              font-family: serif;
            }
            .post-content h2 {
              font-size: 1.5rem;
              font-weight: bold;
              margin: 0.8rem 0;
              color: #FFD700;
              font-family: serif;
            }
            .post-content h3 {
              font-size: 1.25rem;
              font-weight: bold;
              margin: 0.6rem 0;
              color: #FFD700;
              font-family: serif;
            }
            .post-content p {
              margin: 0.5rem 0;
              color: #b8b8b8;
            }
            .post-content ul, .post-content ol {
              padding-left: 1.5rem;
              margin: 0.5rem 0;
              color: #b8b8b8;
            }
            .post-content li {
              margin: 0.25rem 0;
            }
            .post-content img {
              max-width: 100%;
              height: auto;
              border-radius: 8px;
              margin: 1rem 0;
            }
            .post-content a {
              color: #FFD700;
              text-decoration: underline;
            }
            .post-content strong {
              font-weight: 600;
              color: #FFD700;
            }
            .post-content em {
              font-style: italic;
            }
          `}</style>

          {/* Footer Meta */}
          <Divider color="rgba(255, 215, 0, 0.2)" mb="md" />
          <Group justify="space-between">
            <Text c="#b8b8b8" size="sm">
              <strong>Created:</strong> {new Date(post.created_at).toLocaleString()}
            </Text>
            <Text c="#b8b8b8" size="sm">
              <strong>Last Updated:</strong> {new Date(post.updated_at).toLocaleString()}
            </Text>
          </Group>
        </Paper>
      </Container>
    </Layout>
  )
}

export default PostsShow
