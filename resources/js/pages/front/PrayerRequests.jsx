import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import {
  Container,
  Title,
  Text,
  Card,
  Grid,
  Badge,
  Button,
  Group,
  Stack,
  Select,
  Tabs,
  Box,
  ThemeIcon,
  ActionIcon,
  Alert,
  Paper,
  Avatar,
  Textarea,
  Modal,
  TextInput,
  Switch,
  Divider
} from '@mantine/core';
import {
  Heart,
  Plus,
  Filter,
  Eye,
  AlertCircle,
  Users,
  Calendar,
  Clock,
  CheckCircle,
  Archive
} from 'lucide-react';
import FrontLayout from '../../layouts/app/Front/FrontLayout';
import { useLanguage } from '../../contexts/LanguageContext';

export default function PrayerRequests({ prayerRequests, currentCategory, currentStatus }) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState(currentCategory || 'all');
  const [selectedStatus, setSelectedStatus] = useState(currentStatus || 'active');
  const [showPrayerModal, setShowPrayerModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const categories = [
    { value: 'all', label: t('allCategories') },
    { value: 'health', label: t('healthCategory') },
    { value: 'family', label: t('familyCategory') },
    { value: 'spiritual', label: t('spiritualCategory') },
    { value: 'work', label: t('workCategory') },
    { value: 'travel', label: t('travelCategory') },
    { value: 'other', label: t('otherCategory') }
  ];

  const statuses = [
    { value: 'active', label: t('activeStatus') },
    { value: 'answered', label: t('answeredStatus') }
  ];

  const handleFilterChange = () => {
    const params = new URLSearchParams();
    if (selectedCategory !== 'all') params.append('category', selectedCategory);
    if (selectedStatus !== 'active') params.append('status', selectedStatus);
    
    router.get('/prayer-requests', Object.fromEntries(params), {
      preserveState: true,
      replace: true
    });
  };

  const handlePrayForRequest = (request) => {
    setSelectedRequest(request);
    setShowPrayerModal(true);
  };

  const submitPrayer = () => {
    if (selectedRequest) {
      router.post(`/prayer-requests/${selectedRequest.id}/pray`, {}, {
        onSuccess: () => {
          setShowPrayerModal(false);
          setSelectedRequest(null);
          // Refresh the page to show updated prayer count
          router.reload();
        }
      });
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      health: 'red',
      family: 'blue',
      spiritual: 'violet',
      work: 'orange',
      travel: 'green',
      other: 'gray'
    };
    return colors[category] || 'gray';
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'blue',
      answered: 'green',
      archived: 'gray'
    };
    return colors[status] || 'gray';
  };

  return (
    <FrontLayout>
      <Head title={t('prayerRequests')} />
      
      <Container size="lg" py="xl">
        {/* Header */}
        <Box ta="center" mb="xl">
          <ThemeIcon 
            size={60} 
            color="#8B4513" 
            variant="light"
            style={{ 
              borderRadius: '50%',
              boxShadow: '0 4px 20px rgba(139, 69, 19, 0.2)',
              margin: '0 auto 16px'
            }}
          >
            <Heart size={30} />
          </ThemeIcon>
          <Title 
            order={1} 
            size="h1" 
            c="#8B4513" 
            mb="md"
            style={{ fontFamily: 'serif' }}
          >
            {t('prayerRequests')}
          </Title>
          <Text 
            size="lg" 
            c="#654321" 
            maw={600} 
            mx="auto"
            style={{ fontFamily: 'serif', lineHeight: 1.6 }}
          >
            {t('prayerRequestsDescription')}
          </Text>
        </Box>

        {/* Action Bar */}
        <Paper 
          p="lg" 
          mb="xl"
          style={{ 
            background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.08) 0%, rgba(255, 215, 0, 0.05) 100%)',
            border: '2px solid rgba(139, 69, 19, 0.2)',
            borderRadius: '12px'
          }}
        >
          <Group justify="space-between" align="center">
            <Group>
              <Select
                label={t('filterByCategory')}
                value={selectedCategory}
                onChange={setSelectedCategory}
                data={categories}
                leftSection={<Filter size={16} />}
                styles={{
                  label: { color: '#8B4513', marginBottom: '8px' },
                  input: {
                    backgroundColor: '#FFF8DC',
                    border: '2px solid #D2B48C',
                    color: '#8B4513',
                    '&:focus': { borderColor: '#8B4513' }
                  }
                }}
              />
              <Select
                label={t('filterByStatus')}
                value={selectedStatus}
                onChange={setSelectedStatus}
                data={statuses}
                leftSection={<Clock size={16} />}
                styles={{
                  label: { color: '#8B4513', marginBottom: '8px' },
                  input: {
                    backgroundColor: '#FFF8DC',
                    border: '2px solid #D2B48C',
                    color: '#8B4513',
                    '&:focus': { borderColor: '#8B4513' }
                  }
                }}
              />
              <Button
                onClick={handleFilterChange}
                leftSection={<Filter size={16} />}
                style={{
                  backgroundColor: '#8B4513',
                  border: 'none',
                  marginTop: '24px'
                }}
              >
                {t('applyFilters')}
              </Button>
            </Group>
            
            <Button
              component="a"
              href="/prayer-requests/create"
              leftSection={<Plus size={16} />}
              size="md"
              style={{
                backgroundColor: '#8B4513',
                border: 'none'
              }}
            >
              {t('submitPrayerRequest')}
            </Button>
          </Group>
        </Paper>

        {/* Prayer Requests Grid */}
        <Grid>
          {prayerRequests.data.length > 0 ? (
            prayerRequests.data.map((request) => (
              <Grid.Col span={{ base: 12, md: 6, lg: 4 }} key={request.id}>
                <Card
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                  style={{
                    background: 'linear-gradient(135deg, rgba(235, 225, 195, 0.9) 0%, rgba(255, 248, 220, 0.9) 100%)',
                    border: '2px solid rgba(139, 69, 19, 0.2)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Card.Section withBorder inheritPadding py="xs">
                    <Group justify="space-between" align="center">
                      <Group>
                        <Badge
                          color={getCategoryColor(request.category)}
                          variant="light"
                          leftSection={<Heart size={12} />}
                        >
                          {request.category_label}
                        </Badge>
                        {request.is_urgent && (
                          <Badge
                            color="red"
                            variant="filled"
                            leftSection={<AlertCircle size={12} />}
                          >
                            {t('urgent')}
                          </Badge>
                        )}
                      </Group>
                      <Badge
                        color={getStatusColor(request.status)}
                        variant="light"
                        leftSection={
                          request.status === 'answered' ? 
                            <CheckCircle size={12} /> : 
                            <Clock size={12} />
                        }
                      >
                        {request.status_label}
                      </Badge>
                    </Group>
                  </Card.Section>

                  <Stack gap="sm" style={{ flex: 1 }}>
                    <Title order={3} size="h4" c="#8B4513" style={{ fontFamily: 'serif' }}>
                      {request.title}
                    </Title>
                    
                    <Text 
                      size="sm" 
                      c="#654321" 
                      lineClamp={3}
                      style={{ fontFamily: 'serif', lineHeight: 1.5 }}
                    >
                      {request.request}
                    </Text>

                    <Group justify="space-between" align="center" mt="auto">
                      <Group gap="xs">
                        <Avatar
                          size="sm"
                          color="#8B4513"
                          radius="xl"
                        >
                          {request.display_name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Text size="xs" c="#654321" fw={500}>
                          {request.display_name}
                        </Text>
                      </Group>
                      
                      <Text size="xs" c="#654321">
                        <Calendar size={12} style={{ marginRight: '4px', display: 'inline' }} />
                        {request.created_at}
                      </Text>
                    </Group>

                    <Divider color="rgba(139, 69, 19, 0.2)" />

                    <Group justify="space-between" align="center">
                      <Group>
                        <Group gap="xs">
                          <ThemeIcon
                            size="sm"
                            color="#8B4513"
                            variant="light"
                          >
                            <Heart size={14} />
                          </ThemeIcon>
                          <Text size="sm" c="#654321">
                            {request.prayer_count} {t('peoplePrayed')}
                          </Text>
                        </Group>
                      </Group>
                      
                      <Group gap="xs">
                        <ActionIcon
                          variant="light"
                          color="#8B4513"
                          size="sm"
                          onClick={() => handlePrayForRequest(request)}
                          title={t('prayForThis')}
                        >
                          <Heart size={16} />
                        </ActionIcon>
                        <ActionIcon
                          variant="light"
                          color="#8B4513"
                          size="sm"
                          component="a"
                          href={`/prayer-requests/${request.id}`}
                          title={t('viewDetails')}
                        >
                          <Eye size={16} />
                        </ActionIcon>
                      </Group>
                    </Group>
                  </Stack>
                </Card>
              </Grid.Col>
            ))
          ) : (
            <Grid.Col span={12}>
              <Alert
                icon={<Heart size={16} />}
                title={t('noPrayerRequests')}
                color="#8B4513"
                variant="light"
                style={{
                  background: 'rgba(139, 69, 19, 0.1)',
                  border: '1px solid rgba(139, 69, 19, 0.3)'
                }}
              >
                <Text c="#654321">
                  {t('noPrayerRequestsDescription')}
                </Text>
              </Alert>
            </Grid.Col>
          )}
        </Grid>

        {/* Pagination */}
        {prayerRequests.last_page > 1 && (
          <Group justify="center" mt="xl">
            {prayerRequests.links.map((link, index) => (
              <Button
                key={index}
                variant={link.active ? 'filled' : 'light'}
                color="#8B4513"
                size="sm"
                disabled={!link.url}
                onClick={() => link.url && router.get(link.url)}
              >
                <span dangerouslySetInnerHTML={{ __html: link.label }} />
              </Button>
            ))}
          </Group>
        )}

        {/* Prayer Modal */}
        <Modal
          opened={showPrayerModal}
          onClose={() => setShowPrayerModal(false)}
          title={t('prayForRequest')}
          centered
          size="md"
          styles={{
            header: { backgroundColor: '#FFF8DC', borderBottom: '2px solid #D2B48C' },
            content: { backgroundColor: '#FFF8DC' }
          }}
        >
          {selectedRequest && (
            <Stack gap="md">
              <Paper
                p="md"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%)',
                  border: '1px solid rgba(139, 69, 19, 0.2)',
                  borderRadius: '8px'
                }}
              >
                <Title order={4} c="#8B4513" style={{ fontFamily: 'serif' }}>
                  {selectedRequest.title}
                </Title>
                <Text size="sm" c="#654321" mt="xs" style={{ fontFamily: 'serif' }}>
                  {selectedRequest.request}
                </Text>
                <Group gap="xs" mt="md">
                  <Badge color={getCategoryColor(selectedRequest.category)} variant="light">
                    {selectedRequest.category_label}
                  </Badge>
                  <Text size="xs" c="#654321">
                    <Users size={12} style={{ marginRight: '4px', display: 'inline' }} />
                    {selectedRequest.prayer_count} {t('peoplePrayed')}
                  </Text>
                </Group>
              </Paper>

              <Text size="sm" c="#654321" ta="center" style={{ fontFamily: 'serif' }}>
                {t('prayerConfirmationMessage')}
              </Text>

              <Group justify="center" gap="md">
                <Button
                  variant="light"
                  onClick={() => setShowPrayerModal(false)}
                  color="#8B4513"
                >
                  {t('cancel')}
                </Button>
                <Button
                  onClick={submitPrayer}
                  leftSection={<Heart size={16} />}
                  style={{
                    backgroundColor: '#8B4513',
                    border: 'none'
                  }}
                >
                  {t('prayNow')}
                </Button>
              </Group>
            </Stack>
          )}
        </Modal>
      </Container>
    </FrontLayout>
  );
}
