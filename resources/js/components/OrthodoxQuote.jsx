import React, { useState, useEffect } from 'react'
import { 
  Card, 
  Text, 
  Group, 
  Button, 
  Box, 
  Loader, 
  Stack,
  Badge,
  ActionIcon,
  Tooltip,
  Modal
} from '@mantine/core'
import { 
  Quote as QuoteIcon, 
  RefreshCw, 
  BookOpen, 
  Eye,
  X
} from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const OrthodoxQuote = ({ 
  showBrowseButton = false, 
  showRefreshButton = true,
  style = {},
  className = ''
}) => {
  const { currentLanguage } = useLanguage()
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [browseModalOpen, setBrowseModalOpen] = useState(false)
  const [browseQuotes, setBrowseQuotes] = useState([])
  const [browseLoading, setBrowseLoading] = useState(false)

  const fetchRandomQuote = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/quotes/random?lang=${currentLanguage}`)
      if (response.ok) {
        const data = await response.json()
        setQuote(data)
      }
    } catch (error) {
      console.error('Error fetching quote:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchBrowseQuotes = async (page = 1) => {
    setBrowseLoading(true)
    try {
      const response = await fetch(`/api/quotes/browse?lang=${currentLanguage}&page=${page}`)
      if (response.ok) {
        const data = await response.json()
        setBrowseQuotes(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching browse quotes:', error)
    } finally {
      setBrowseLoading(false)
    }
  }

  useEffect(() => {
    fetchRandomQuote()
  }, [currentLanguage])

  const handleBrowseClick = () => {
    setBrowseModalOpen(true)
    fetchBrowseQuotes()
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

  if (loading) {
    return (
      <Card 
        withBorder 
        p="xl"
        style={{
          backgroundColor: 'rgba(139, 69, 19, 0.1)',
          border: '2px solid rgba(255, 215, 0, 0.3)',
          ...style
        }}
        className={className}
      >
        <Group justify="center">
          <Loader size="md" color="#8B4513" />
          <Text c="dimmed">Loading wisdom...</Text>
        </Group>
      </Card>
    )
  }

  if (!quote) {
    return (
      <Card 
        withBorder 
        p="xl"
        style={{
          backgroundColor: 'rgba(139, 69, 19, 0.1)',
          border: '2px solid rgba(255, 215, 0, 0.3)',
          ...style
        }}
        className={className}
      >
        <Text c="dimmed" ta="center">No quotes available</Text>
      </Card>
    )
  }

  return (
    <>
      <Card 
        withBorder 
        p="xl"
        style={{
          backgroundColor: 'rgba(139, 69, 19, 0.1)',
          border: '2px solid rgba(255, 215, 0, 0.3)',
          position: 'relative',
          ...style
        }}
        className={className}
      >
        {/* Quote Icon */}
        <Group justify="space-between" mb="md">
          <Group gap="xs">
            <QuoteIcon size={24} color="#8B4513" />
            <Text size="sm" fw={600} c="#8B4513">
              Daily Wisdom
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
          </Group>
        </Group>

        {/* Quote Text */}
        <Text 
          size="lg" 
          fw={500} 
          c="#8B4513" 
          style={{ 
            fontStyle: 'italic',
            lineHeight: 1.6,
            marginBottom: '16px'
          }}
        >
          "{quote.quote}"
        </Text>

        {/* Author */}
        <Group justify="space-between" align="flex-end">
          <Box>
            <Text fw={600} c="#654321" size="sm">
              — {quote.author}
            </Text>
            {quote.source && (
              <Text size="xs" c="dimmed">
                {quote.source}
              </Text>
            )}
          </Box>
          
          <Group gap="xs">
            {showRefreshButton && (
              <Tooltip label="New Quote">
                <ActionIcon 
                  variant="light" 
                  color="#8B4513"
                  onClick={fetchRandomQuote}
                  loading={loading}
                >
                  <RefreshCw size={16} />
                </ActionIcon>
              </Tooltip>
            )}
            {showBrowseButton && (
              <Tooltip label="Browse All Quotes">
                <ActionIcon 
                  variant="light" 
                  color="#8B4513"
                  onClick={handleBrowseClick}
                >
                  <BookOpen size={16} />
                </ActionIcon>
              </Tooltip>
            )}
          </Group>
        </Group>
      </Card>

      {/* Browse Modal */}
      <Modal
        opened={browseModalOpen}
        onClose={() => setBrowseModalOpen(false)}
        title={
          <Group gap="xs">
            <QuoteIcon size={20} color="#8B4513" />
            <Text fw={600} c="#8B4513">Orthodox Wisdom Collection</Text>
          </Group>
        }
        size="lg"
        styles={{
          header: { backgroundColor: 'rgba(139, 69, 19, 0.1)' },
          body: { backgroundColor: 'rgba(139, 69, 19, 0.05)' }
        }}
      >
        <Stack gap="md">
          {browseLoading ? (
            <Group justify="center" py="xl">
              <Loader size="md" color="#8B4513" />
              <Text c="dimmed">Loading quotes...</Text>
            </Group>
          ) : (
            browseQuotes.map((browseQuote) => (
              <Card 
                key={browseQuote.id}
                withBorder 
                p="md"
                style={{
                  backgroundColor: 'rgba(255, 248, 220, 0.3)',
                  border: '1px solid rgba(255, 215, 0, 0.2)',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setQuote(browseQuote)
                  setBrowseModalOpen(false)
                }}
              >
                <Group justify="space-between" mb="xs">
                  <Badge 
                    size="xs" 
                    color={getCategoryColor(browseQuote.category)}
                    variant="light"
                  >
                    {getCategoryLabel(browseQuote.category)}
                  </Badge>
                  {browseQuote.century && (
                    <Badge size="xs" variant="outline" color="#8B4513">
                      {browseQuote.century}th C
                    </Badge>
                  )}
                </Group>
                
                <Text 
                  size="sm" 
                  c="#8B4513" 
                  style={{ fontStyle: 'italic', lineHeight: 1.5 }}
                  lineClamp={3}
                >
                  "{browseQuote.quote}"
                </Text>
                
                <Text size="xs" c="dimmed" mt="xs">
                  — {browseQuote.author}
                  {browseQuote.source && ` • ${browseQuote.source}`}
                </Text>
              </Card>
            ))
          )}
        </Stack>
      </Modal>
    </>
  )
}

export default OrthodoxQuote
