import React from 'react'
import { 
  Container, 
  Title, 
  Text, 
  Button, 
  Group, 
  Card,
  Table,
  Badge,
  ActionIcon,
  Stack,
  Box,
  Pagination
} from '@mantine/core'
import { 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  Quote as QuoteIcon,
  BookOpen
} from 'lucide-react'
import { Link, router } from '@inertiajs/react'
import { Head } from '@inertiajs/react'
import Layout from '../../../layouts/app/Backend/Layout'

const QuotesIndex = ({ quotes }) => {
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

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this quote?')) {
      router.delete(route('quotes.destroy', id))
    }
  }

  return (
    <>
      <Head title="Quotes Management" />
      <Layout>
        <Container size="xl">
          <Stack gap="xl">
            {/* Header */}
            <Group justify="space-between" align="flex-start">
              <Box>
                <Title order={1} mb="sm" c="white">Daily Quotes</Title>
                <Text c="dimmed">Manage Orthodox wisdom quotes for the frontend</Text>
              </Box>
                <Button 
                  leftSection={<Plus size={16} />}
                  component={Link}
                  href="/quotes/create"
                >
                  Add New Quote
                </Button>
            </Group>

            {/* Stats */}
            <Group gap="md">
              <Card 
                withBorder 
                p="md"
                style={{
                  backgroundColor: 'rgba(26, 31, 46, 0.8)',
                  border: '1px solid rgba(255, 215, 0, 0.2)'
                }}
              >
                <Group gap="xs">
                  <QuoteIcon size={20} color="#FFD700" />
                  <Box>
                    <Text size="lg" fw={700} c="white">{quotes.total}</Text>
                    <Text size="xs" c="dimmed">Total Quotes</Text>
                  </Box>
                </Group>
              </Card>
              
              <Card 
                withBorder 
                p="md"
                style={{
                  backgroundColor: 'rgba(26, 31, 46, 0.8)',
                  border: '1px solid rgba(255, 215, 0, 0.2)'
                }}
              >
                <Group gap="xs">
                  <BookOpen size={20} color="#00D4AA" />
                  <Box>
                    <Text size="lg" fw={700} c="white">
                      {quotes.data.filter(q => q.is_active).length}
                    </Text>
                    <Text size="xs" c="dimmed">Active Quotes</Text>
                  </Box>
                </Group>
              </Card>
            </Group>

            {/* Quotes Table */}
            <Card 
              withBorder
              style={{
                backgroundColor: 'rgba(26, 31, 46, 0.8)',
                border: '1px solid rgba(255, 215, 0, 0.2)'
              }}
            >
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th c="white">Quote</Table.Th>
                    <Table.Th c="white">Author</Table.Th>
                    <Table.Th c="white">Category</Table.Th>
                    <Table.Th c="white">Century</Table.Th>
                    <Table.Th c="white">Status</Table.Th>
                    <Table.Th c="white">Actions</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {quotes.data.map((quote) => (
                    <Table.Tr key={quote.id}>
                      <Table.Td>
                        <Text 
                          size="sm" 
                          c="white" 
                          style={{ fontStyle: 'italic' }}
                          lineClamp={2}
                        >
                          "{quote.quote_en}"
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" c="white">
                          {quote.title_en ? `${quote.title_en} ${quote.author_en}` : quote.author_en}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Badge 
                          size="sm" 
                          color={getCategoryColor(quote.category)}
                          variant="light"
                        >
                          {getCategoryLabel(quote.category)}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        {quote.century && (
                          <Text size="sm" c="dimmed">
                            {quote.century}th
                          </Text>
                        )}
                      </Table.Td>
                      <Table.Td>
                        <Badge 
                          size="sm" 
                          color={quote.is_active ? 'green' : 'red'}
                          variant="light"
                        >
                          {quote.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <ActionIcon 
                            variant="light" 
                            color="blue"
                            component={Link}
                            href={`/quotes/${quote.id}`}
                          >
                            <Eye size={14} />
                          </ActionIcon>
                              <ActionIcon 
                                variant="light" 
                                color="yellow"
                                component={Link}
                                href={`/quotes/${quote.id}/edit`}
                              >
                                <Edit size={14} />
                              </ActionIcon>
                          <ActionIcon 
                            variant="light" 
                            color="red"
                            onClick={() => handleDelete(quote.id)}
                          >
                            <Trash2 size={14} />
                          </ActionIcon>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>

              {/* Pagination */}
              {quotes.last_page > 1 && (
                <Group justify="center" mt="md">
                  <Pagination 
                    total={quotes.last_page}
                    value={quotes.current_page}
                    onChange={(page) => router.get(`/quotes?page=${page}`)}
                    color="#8B4513"
                  />
                </Group>
              )}
            </Card>
          </Stack>
        </Container>
      </Layout>
    </>
  )
}

export default QuotesIndex
