import React from 'react'
import { 
  Container, 
  Title, 
  Text, 
  Button, 
  Group, 
  Card,
  Stack,
  Grid,
  Box,
  Badge,
  Divider
} from '@mantine/core'
import { ArrowLeft, Edit, Quote as QuoteIcon } from 'lucide-react'
import { Link } from '@inertiajs/react'
import { Head } from '@inertiajs/react'
import Layout from '../../../layouts/app/Backend/Layout'

const QuotesShow = ({ quote }) => {
  if (!quote) {
    return (
      <>
        <Head title="Quote Not Found" />
        <Layout>
          <Container size="lg">
            <Text>Quote not found</Text>
          </Container>
        </Layout>
      </>
    )
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'prayer': return 'blue'
      case 'theology': return 'purple'
      case 'spiritual': return 'green'
      case 'pastoral': return 'orange'
      default: return 'gray'
    }
  }

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'prayer': return 'Prayer'
      case 'theology': return 'Theology'
      case 'spiritual': return 'Spiritual'
      case 'pastoral': return 'Pastoral'
      default: return 'General'
    }
  }

  return (
    <>
      <Head title={`Quote: ${quote.quote_en.substring(0, 50)}...`} />
      <Layout>
        <Container size="lg">
          <Stack gap="xl">
            {/* Header */}
            <Group justify="space-between" align="flex-start">
              <Box>
                <Title order={1} mb="sm" c="white">Quote Details</Title>
                <Text c="dimmed">View Orthodox wisdom quote</Text>
              </Box>
              <Group gap="xs">
                <Button 
                  variant="light"
                  leftSection={<Edit size={16} />}
                  component={Link}
                  href={`/quotes/${quote.id}/edit`}
                >
                  Edit Quote
                </Button>
                <Button 
                  variant="light"
                  leftSection={<ArrowLeft size={16} />}
                  component={Link}
                  href="/quotes"
                >
                  Back to Quotes
                </Button>
              </Group>
            </Group>

            {/* Quote Display */}
            <Card 
              withBorder
              p="xl"
              style={{
                backgroundColor: 'rgba(139, 69, 19, 0.1)',
                border: '2px solid rgba(255, 215, 0, 0.3)'
              }}
            >
              <Stack gap="md">
                <Group justify="space-between">
                  <Group gap="xs">
                    <QuoteIcon size={24} color="#8B4513" />
                    <Text size="lg" fw={600} c="#8B4513">
                      Orthodox Wisdom
                    </Text>
                  </Group>
                  <Group gap="xs">
                    <Badge 
                      size="sm" 
                      color={getCategoryColor(quote.category)}
                      variant="light"
                    >
                      {getCategoryLabel(quote.category)}
                    </Badge>
                    {quote.century && (
                      <Badge size="sm" variant="outline" color="#8B4513">
                        {quote.century}th Century
                      </Badge>
                    )}
                    <Badge 
                      size="sm" 
                      color={quote.is_active ? 'green' : 'red'}
                      variant="light"
                    >
                      {quote.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </Group>
                </Group>

                <Text 
                  size="xl" 
                  fw={500} 
                  c="#8B4513" 
                  style={{ 
                    fontStyle: 'italic',
                    lineHeight: 1.6
                  }}
                >
                  "{quote.quote_en}"
                </Text>

                <Group justify="space-between" align="flex-end">
                  <Box>
                    <Text fw={600} c="#654321" size="lg">
                      — {quote.title_en ? `${quote.title_en} ${quote.author_en}` : quote.author_en}
                    </Text>
                    {quote.source_en && (
                      <Text size="sm" c="dimmed">
                        {quote.source_en}
                      </Text>
                    )}
                  </Box>
                </Group>
              </Stack>
            </Card>

            {/* Multilingual Content */}
            <Grid>
              {/* French Translation */}
              {(quote.quote_fr || quote.author_fr || quote.title_fr) && (
                <Grid.Col span={12}>
                  <Card 
                    withBorder
                    style={{
                      backgroundColor: 'rgba(26, 31, 46, 0.8)',
                      border: '1px solid rgba(255, 215, 0, 0.2)'
                    }}
                  >
                    <Stack gap="md">
                      <Title order={3} c="#FFD700">French Translation</Title>
                      
                      {quote.quote_fr && (
                        <Box>
                          <Text size="sm" c="dimmed" mb="xs">Quote</Text>
                          <Text 
                            size="lg" 
                            c="white" 
                            style={{ fontStyle: 'italic', lineHeight: 1.6 }}
                          >
                            "{quote.quote_fr}"
                          </Text>
                        </Box>
                      )}

                      {(quote.author_fr || quote.title_fr) && (
                        <Box>
                          <Text size="sm" c="dimmed" mb="xs">Author</Text>
                          <Text c="white">
                            {quote.title_fr ? `${quote.title_fr} ${quote.author_fr}` : quote.author_fr}
                          </Text>
                        </Box>
                      )}

                      {quote.source_fr && (
                        <Box>
                          <Text size="sm" c="dimmed" mb="xs">Source</Text>
                          <Text c="white">{quote.source_fr}</Text>
                        </Box>
                      )}
                    </Stack>
                  </Card>
                </Grid.Col>
              )}

              {/* Serbian Translation */}
              {(quote.quote_sr || quote.author_sr || quote.title_sr) && (
                <Grid.Col span={12}>
                  <Card 
                    withBorder
                    style={{
                      backgroundColor: 'rgba(26, 31, 46, 0.8)',
                      border: '1px solid rgba(255, 215, 0, 0.2)'
                    }}
                  >
                    <Stack gap="md">
                      <Title order={3} c="#FFD700">Serbian Translation</Title>
                      
                      {quote.quote_sr && (
                        <Box>
                          <Text size="sm" c="dimmed" mb="xs">Quote</Text>
                          <Text 
                            size="lg" 
                            c="white" 
                            style={{ fontStyle: 'italic', lineHeight: 1.6 }}
                          >
                            "{quote.quote_sr}"
                          </Text>
                        </Box>
                      )}

                      {(quote.author_sr || quote.title_sr) && (
                        <Box>
                          <Text size="sm" c="dimmed" mb="xs">Author</Text>
                          <Text c="white">
                            {quote.title_sr ? `${quote.title_sr} ${quote.author_sr}` : quote.author_sr}
                          </Text>
                        </Box>
                      )}

                      {quote.source_sr && (
                        <Box>
                          <Text size="sm" c="dimmed" mb="xs">Source</Text>
                          <Text c="white">{quote.source_sr}</Text>
                        </Box>
                      )}
                    </Stack>
                  </Card>
                </Grid.Col>
              )}
            </Grid>

            {/* Metadata */}
            <Card 
              withBorder
              style={{
                backgroundColor: 'rgba(26, 31, 46, 0.8)',
                border: '1px solid rgba(255, 215, 0, 0.2)'
              }}
            >
              <Stack gap="md">
                <Title order={3} c="#FFD700">Metadata</Title>
                
                <Grid>
                  <Grid.Col span={6}>
                    <Box>
                      <Text size="sm" c="dimmed" mb="xs">Category</Text>
                      <Badge 
                        color={getCategoryColor(quote.category)}
                        variant="light"
                        size="lg"
                      >
                        {getCategoryLabel(quote.category)}
                      </Badge>
                    </Box>
                  </Grid.Col>
                  
                  {quote.century && (
                    <Grid.Col span={6}>
                      <Box>
                        <Text size="sm" c="dimmed" mb="xs">Century</Text>
                        <Text size="lg" fw={600} c="white">
                          {quote.century}th Century
                        </Text>
                      </Box>
                    </Grid.Col>
                  )}
                  
                  <Grid.Col span={6}>
                    <Box>
                      <Text size="sm" c="dimmed" mb="xs">Display Order</Text>
                      <Text size="lg" fw={600} c="white">
                        {quote.display_order}
                      </Text>
                    </Box>
                  </Grid.Col>
                  
                  <Grid.Col span={6}>
                    <Box>
                      <Text size="sm" c="dimmed" mb="xs">Status</Text>
                      <Badge 
                        color={quote.is_active ? 'green' : 'red'}
                        variant="light"
                        size="lg"
                      >
                        {quote.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </Box>
                  </Grid.Col>
                </Grid>

                <Divider color="rgba(255, 215, 0, 0.2)" />

                <Grid>
                  <Grid.Col span={6}>
                    <Box>
                      <Text size="sm" c="dimmed" mb="xs">Created</Text>
                      <Text c="white">
                        {new Date(quote.created_at).toLocaleDateString()}
                      </Text>
                    </Box>
                  </Grid.Col>
                  
                  <Grid.Col span={6}>
                    <Box>
                      <Text size="sm" c="dimmed" mb="xs">Last Updated</Text>
                      <Text c="white">
                        {new Date(quote.updated_at).toLocaleDateString()}
                      </Text>
                    </Box>
                  </Grid.Col>
                </Grid>
              </Stack>
            </Card>
          </Stack>
        </Container>
      </Layout>
    </>
  )
}

export default QuotesShow
