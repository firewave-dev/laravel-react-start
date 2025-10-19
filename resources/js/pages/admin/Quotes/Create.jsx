import React, { useState } from 'react'
import { 
  Container, 
  Title, 
  Text, 
  Button, 
  Group, 
  Card,
  TextInput,
  Textarea,
  Select,
  NumberInput,
  Switch,
  Stack,
  Grid,
  Box
} from '@mantine/core'
import { ArrowLeft, Save } from 'lucide-react'
import { Link, router } from '@inertiajs/react'
import { Head } from '@inertiajs/react'
import Layout from '../../../layouts/app/Backend/Layout'

const QuotesCreate = () => {
  const [formData, setFormData] = useState({
    quote_en: '',
    quote_fr: '',
    quote_sr: '',
    author_en: '',
    author_fr: '',
    author_sr: '',
    title_en: '',
    title_fr: '',
    title_sr: '',
    source_en: '',
    source_fr: '',
    source_sr: '',
    century: null,
    category: 'general',
    is_active: true,
    display_order: 0
  })

  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    
    router.post('/quotes', formData, {
      onFinish: () => setLoading(false),
      onError: () => setLoading(false)
    })
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'prayer', label: 'Prayer' },
    { value: 'theology', label: 'Theology' },
    { value: 'spiritual', label: 'Spiritual' },
    { value: 'pastoral', label: 'Pastoral' }
  ]

  return (
    <>
      <Head title="Create Quote" />
      <Layout>
        <Container size="lg">
          <Stack gap="xl">
            {/* Header */}
            <Group justify="space-between" align="flex-start">
              <Box>
                <Title order={1} mb="sm" c="white">Create New Quote</Title>
                <Text c="dimmed">Add a new Orthodox wisdom quote</Text>
              </Box>
              <Button 
                variant="light"
                leftSection={<ArrowLeft size={16} />}
                component={Link}
                href="/quotes"
              >
                Back to Quotes
              </Button>
            </Group>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <Card 
                withBorder
                style={{
                  backgroundColor: 'rgba(26, 31, 46, 0.8)',
                  border: '1px solid rgba(255, 215, 0, 0.2)'
                }}
              >
                <Stack gap="xl">
                  {/* English Content */}
                  <Box>
                    <Title order={3} mb="md" c="#FFD700">English Content</Title>
                    <Grid>
                      <Grid.Col span={12}>
                        <Textarea
                          label="Quote (English) *"
                          placeholder="Enter the quote text in English..."
                          value={formData.quote_en}
                          onChange={(e) => handleChange('quote_en', e.target.value)}
                          required
                          minRows={4}
                          styles={{
                            label: { color: '#FFD700', marginBottom: '8px' },
                            input: {
                              backgroundColor: 'rgba(255, 248, 220, 0.1)',
                              border: '1px solid rgba(255, 215, 0, 0.3)',
                              color: '#FFF8DC'
                            }
                          }}
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <TextInput
                          label="Author (English) *"
                          placeholder="Author name in English"
                          value={formData.author_en}
                          onChange={(e) => handleChange('author_en', e.target.value)}
                          required
                          styles={{
                            label: { color: '#FFD700', marginBottom: '8px' },
                            input: {
                              backgroundColor: 'rgba(255, 248, 220, 0.1)',
                              border: '1px solid rgba(255, 215, 0, 0.3)',
                              color: '#FFF8DC'
                            }
                          }}
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <TextInput
                          label="Title (English)"
                          placeholder="Saint, Archbishop, etc."
                          value={formData.title_en}
                          onChange={(e) => handleChange('title_en', e.target.value)}
                          styles={{
                            label: { color: '#FFD700', marginBottom: '8px' },
                            input: {
                              backgroundColor: 'rgba(255, 248, 220, 0.1)',
                              border: '1px solid rgba(255, 215, 0, 0.3)',
                              color: '#FFF8DC'
                            }
                          }}
                        />
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <TextInput
                          label="Source (English)"
                          placeholder="Homily on Love, Letters, etc."
                          value={formData.source_en}
                          onChange={(e) => handleChange('source_en', e.target.value)}
                          styles={{
                            label: { color: '#FFD700', marginBottom: '8px' },
                            input: {
                              backgroundColor: 'rgba(255, 248, 220, 0.1)',
                              border: '1px solid rgba(255, 215, 0, 0.3)',
                              color: '#FFF8DC'
                            }
                          }}
                        />
                      </Grid.Col>
                    </Grid>
                  </Box>

                  {/* French Content */}
                  <Box>
                    <Title order={3} mb="md" c="#FFD700">French Translation</Title>
                    <Grid>
                      <Grid.Col span={12}>
                        <Textarea
                          label="Quote (French)"
                          placeholder="Enter the quote text in French (optional)..."
                          value={formData.quote_fr}
                          onChange={(e) => handleChange('quote_fr', e.target.value)}
                          minRows={4}
                          styles={{
                            label: { color: '#FFD700', marginBottom: '8px' },
                            input: {
                              backgroundColor: 'rgba(255, 248, 220, 0.1)',
                              border: '1px solid rgba(255, 215, 0, 0.3)',
                              color: '#FFF8DC'
                            }
                          }}
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <TextInput
                          label="Author (French)"
                          placeholder="Author name in French"
                          value={formData.author_fr}
                          onChange={(e) => handleChange('author_fr', e.target.value)}
                          styles={{
                            label: { color: '#FFD700', marginBottom: '8px' },
                            input: {
                              backgroundColor: 'rgba(255, 248, 220, 0.1)',
                              border: '1px solid rgba(255, 215, 0, 0.3)',
                              color: '#FFF8DC'
                            }
                          }}
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <TextInput
                          label="Title (French)"
                          placeholder="Saint, Archevêque, etc."
                          value={formData.title_fr}
                          onChange={(e) => handleChange('title_fr', e.target.value)}
                          styles={{
                            label: { color: '#FFD700', marginBottom: '8px' },
                            input: {
                              backgroundColor: 'rgba(255, 248, 220, 0.1)',
                              border: '1px solid rgba(255, 215, 0, 0.3)',
                              color: '#FFF8DC'
                            }
                          }}
                        />
                      </Grid.Col>
                    </Grid>
                  </Box>

                  {/* Serbian Content */}
                  <Box>
                    <Title order={3} mb="md" c="#FFD700">Serbian Translation</Title>
                    <Grid>
                      <Grid.Col span={12}>
                        <Textarea
                          label="Quote (Serbian)"
                          placeholder="Enter the quote text in Serbian (optional)..."
                          value={formData.quote_sr}
                          onChange={(e) => handleChange('quote_sr', e.target.value)}
                          minRows={4}
                          styles={{
                            label: { color: '#FFD700', marginBottom: '8px' },
                            input: {
                              backgroundColor: 'rgba(255, 248, 220, 0.1)',
                              border: '1px solid rgba(255, 215, 0, 0.3)',
                              color: '#FFF8DC'
                            }
                          }}
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <TextInput
                          label="Author (Serbian)"
                          placeholder="Author name in Serbian"
                          value={formData.author_sr}
                          onChange={(e) => handleChange('author_sr', e.target.value)}
                          styles={{
                            label: { color: '#FFD700', marginBottom: '8px' },
                            input: {
                              backgroundColor: 'rgba(255, 248, 220, 0.1)',
                              border: '1px solid rgba(255, 215, 0, 0.3)',
                              color: '#FFF8DC'
                            }
                          }}
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <TextInput
                          label="Title (Serbian)"
                          placeholder="Sveti, Arhiepiskop, etc."
                          value={formData.title_sr}
                          onChange={(e) => handleChange('title_sr', e.target.value)}
                          styles={{
                            label: { color: '#FFD700', marginBottom: '8px' },
                            input: {
                              backgroundColor: 'rgba(255, 248, 220, 0.1)',
                              border: '1px solid rgba(255, 215, 0, 0.3)',
                              color: '#FFF8DC'
                            }
                          }}
                        />
                      </Grid.Col>
                    </Grid>
                  </Box>

                  {/* Metadata */}
                  <Box>
                    <Title order={3} mb="md" c="#FFD700">Metadata</Title>
                    <Grid>
                      <Grid.Col span={6}>
                        <Select
                          label="Category *"
                          placeholder="Select category"
                          value={formData.category}
                          onChange={(value) => handleChange('category', value)}
                          data={categories}
                          required
                          styles={{
                            label: { color: '#FFD700', marginBottom: '8px' },
                            input: {
                              backgroundColor: 'rgba(255, 248, 220, 0.1)',
                              border: '1px solid rgba(255, 215, 0, 0.3)',
                              color: '#FFF8DC'
                            }
                          }}
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <NumberInput
                          label="Century"
                          placeholder="e.g., 4 for 4th century"
                          value={formData.century}
                          onChange={(value) => handleChange('century', value)}
                          min={1}
                          max={21}
                          styles={{
                            label: { color: '#FFD700', marginBottom: '8px' },
                            input: {
                              backgroundColor: 'rgba(255, 248, 220, 0.1)',
                              border: '1px solid rgba(255, 215, 0, 0.3)',
                              color: '#FFF8DC'
                            }
                          }}
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <NumberInput
                          label="Display Order"
                          placeholder="Order for display"
                          value={formData.display_order}
                          onChange={(value) => handleChange('display_order', value)}
                          min={0}
                          styles={{
                            label: { color: '#FFD700', marginBottom: '8px' },
                            input: {
                              backgroundColor: 'rgba(255, 248, 220, 0.1)',
                              border: '1px solid rgba(255, 215, 0, 0.3)',
                              color: '#FFF8DC'
                            }
                          }}
                        />
                      </Grid.Col>
                      <Grid.Col span={6}>
                        <Switch
                          label="Active"
                          description="Show this quote on the frontend"
                          checked={formData.is_active}
                          onChange={(e) => handleChange('is_active', e.currentTarget.checked)}
                          color="#8B4513"
                          styles={{
                            label: { color: '#FFD700' },
                            description: { color: 'rgba(255, 248, 220, 0.7)' }
                          }}
                        />
                      </Grid.Col>
                    </Grid>
                  </Box>

                  {/* Submit Button */}
                  <Group justify="flex-end">
                    <Button 
                      type="submit"
                      leftSection={<Save size={16} />}
                      loading={loading}
                      size="md"
                    >
                      Create Quote
                    </Button>
                  </Group>
                </Stack>
              </Card>
            </form>
          </Stack>
        </Container>
      </Layout>
    </>
  )
}

export default QuotesCreate
