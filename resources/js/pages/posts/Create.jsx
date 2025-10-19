import React from 'react'
import { Container, Title, Text, Paper, TextInput, Textarea, Select, Button, Group, Switch } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { useForm } from '@inertiajs/react'
import { Save, ArrowLeft } from 'lucide-react'
import { Link } from '@inertiajs/react'
import Layout from '../../layouts/app/Backend/Layout'
import LanguageTabs from '../../components/LanguageTabs'
import RichTextEditor from '../../components/RichTextEditor'

const PostsCreate = () => {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    excerpt: '',
    content: '',
    category: 'news',
    status: 'draft',
    published_at: null,
    is_featured: false,
    translations: {
      fr: { title: '', excerpt: '', content: '' },
      sr: { title: '', excerpt: '', content: '' }
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post('/posts')
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
          <Group mb="xl">
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

          <Title order={2} c="#FFD700" mb="md" style={{ fontFamily: 'serif' }}>
            Create New Post
          </Title>
          <Text c="#b8b8b8" mb="xl">
            Share news, reflections, and teachings with your community
          </Text>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <LanguageTabs
              data={data}
              setData={setData}
              errors={errors}
              fields={['title', 'excerpt', 'content']}
              RichTextEditor={RichTextEditor}
            />

            <Group grow mb="md">
              <Select
                label="Category"
                placeholder="Select category"
                value={data.category}
                onChange={(value) => setData('category', value)}
                error={errors.category}
                required
                data={[
                  { value: 'news', label: 'News' },
                  { value: 'announcement', label: 'Announcement' },
                  { value: 'reflection', label: 'Reflection' },
                  { value: 'saint_day', label: 'Saint Day' },
                  { value: 'teaching', label: 'Teaching' }
                ]}
                styles={{
                  label: { color: '#FFD700', fontWeight: 500, marginBottom: 8 },
                  input: {
                    backgroundColor: 'rgba(26, 31, 46, 0.6)',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    color: '#fff'
                  }
                }}
              />

              <Select
                label="Status"
                placeholder="Select status"
                value={data.status}
                onChange={(value) => setData('status', value)}
                error={errors.status}
                required
                data={[
                  { value: 'draft', label: 'Draft' },
                  { value: 'published', label: 'Published' }
                ]}
                styles={{
                  label: { color: '#FFD700', fontWeight: 500, marginBottom: 8 },
                  input: {
                    backgroundColor: 'rgba(26, 31, 46, 0.6)',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    color: '#fff'
                  }
                }}
              />
            </Group>

            <DateTimePicker
              label="Publish Date & Time (optional)"
              description="Leave empty to publish immediately when status is 'Published'"
              placeholder="Select date and time"
              value={data.published_at}
              onChange={(value) => setData('published_at', value)}
              error={errors.published_at}
              mb="md"
              clearable
              styles={{
                label: { color: '#FFD700', fontWeight: 500, marginBottom: 8 },
                description: { color: '#b8b8b8', fontSize: '0.75rem', marginTop: 4 },
                input: {
                  backgroundColor: 'rgba(26, 31, 46, 0.6)',
                  border: '1px solid rgba(255, 215, 0, 0.2)',
                  color: '#fff'
                }
              }}
            />

            <Switch
              label="Featured Post"
              checked={data.is_featured}
              onChange={(e) => setData('is_featured', e.currentTarget.checked)}
              mb="xl"
              styles={{ label: { color: '#b8b8b8' } }}
            />

            <Group justify="flex-end">
              <Button
                component={Link}
                href="/posts"
                variant="subtle"
                c="#b8b8b8"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={processing}
                leftSection={<Save size={18} />}
                style={{
                  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                  color: '#1a1f2e',
                  fontWeight: 600
                }}
              >
                Create Post
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </Layout>
  )
}

export default PostsCreate
