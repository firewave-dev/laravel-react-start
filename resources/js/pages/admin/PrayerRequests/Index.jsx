import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import {
  Container,
  Title,
  Text,
  Table,
  Button,
  Group,
  Badge,
  ActionIcon,
  Select,
  Paper,
  Stack,
  Pagination,
  Alert,
  Modal,
  Textarea,
  ThemeIcon,
  Box
} from '@mantine/core';
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  Filter,
  Heart,
  AlertCircle,
  CheckCircle,
  Archive,
  Clock
} from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import Layout from '../../../layouts/app/Backend/Layout';

export default function AdminPrayerRequestsIndex({ prayerRequests, filters }) {
  const { t } = useLanguage();
  const [deleteModal, setDeleteModal] = useState({ opened: false, request: null });
  const [answerModal, setAnswerModal] = useState({ opened: false, request: null });
  const [answerNotes, setAnswerNotes] = useState('');

  const handleDelete = (request) => {
    setDeleteModal({ opened: true, request });
  };

  const confirmDelete = () => {
    if (deleteModal.request) {
      router.delete(`/admin/prayer-requests/${deleteModal.request.id}`, {
        onSuccess: () => {
          setDeleteModal({ opened: false, request: null });
        }
      });
    }
  };

  const handleAnswer = (request) => {
    setAnswerModal({ opened: true, request });
    setAnswerNotes(request.answer_notes || '');
  };

  const confirmAnswer = () => {
    if (answerModal.request) {
      router.put(`/admin/prayer-requests/${answerModal.request.id}`, {
        status: 'answered',
        answer_notes: answerNotes
      }, {
        onSuccess: () => {
          setAnswerModal({ opened: false, request: null });
          setAnswerNotes('');
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

  const getVisibilityColor = (visibility) => {
    const colors = {
      public: 'green',
      private: 'red',
      anonymous: 'yellow'
    };
    return colors[visibility] || 'gray';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <Clock size={14} />;
      case 'answered':
        return <CheckCircle size={14} />;
      case 'archived':
        return <Archive size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  return (
    <Layout>
      <Head title={`${t('prayerRequests')} - Admin`} />
      
      <Container size="xl" py="xl">
      
      {/* Header */}
      <Group justify="space-between" align="center" mb="xl">
        <Box>
          <Title order={1} size="h1" c="white" mb="sm">
            {t('prayerRequests')}
          </Title>
          <Text size="lg" c="rgba(255, 255, 255, 0.7)">
            {t('managePrayerRequests')}
          </Text>
        </Box>
        
        <Button
          leftSection={<Plus size={16} />}
          component="a"
          href="/prayer-requests/create"
          style={{
            backgroundColor: '#8B4513',
            border: 'none'
          }}
        >
          {t('addNewPrayerRequest')}
        </Button>
      </Group>

      {/* Statistics */}
      <Group mb="xl">
        <Paper
          p="md"
          style={{
            backgroundColor: 'rgba(26, 31, 46, 0.8)',
            border: '1px solid rgba(255, 215, 0, 0.2)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Group>
            <ThemeIcon color="blue" variant="light">
              <Clock size={20} />
            </ThemeIcon>
            <Box>
              <Text size="sm" c="rgba(255, 255, 255, 0.7)">
                {t('activeRequests')}
              </Text>
              <Text size="xl" fw={700} c="white">
                {prayerRequests.data.filter(r => r.status === 'active').length}
              </Text>
            </Box>
          </Group>
        </Paper>

        <Paper
          p="md"
          style={{
            backgroundColor: 'rgba(26, 31, 46, 0.8)',
            border: '1px solid rgba(255, 215, 0, 0.2)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Group>
            <ThemeIcon color="green" variant="light">
              <CheckCircle size={20} />
            </ThemeIcon>
            <Box>
              <Text size="sm" c="rgba(255, 255, 255, 0.7)">
                {t('answeredRequests')}
              </Text>
              <Text size="xl" fw={700} c="white">
                {prayerRequests.data.filter(r => r.status === 'answered').length}
              </Text>
            </Box>
          </Group>
        </Paper>

        <Paper
          p="md"
          style={{
            backgroundColor: 'rgba(26, 31, 46, 0.8)',
            border: '1px solid rgba(255, 215, 0, 0.2)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Group>
            <ThemeIcon color="red" variant="light">
              <AlertCircle size={20} />
            </ThemeIcon>
            <Box>
              <Text size="sm" c="rgba(255, 255, 255, 0.7)">
                {t('urgentRequests')}
              </Text>
              <Text size="xl" fw={700} c="white">
                {prayerRequests.data.filter(r => r.is_urgent).length}
              </Text>
            </Box>
          </Group>
        </Paper>
      </Group>

      {/* Filters */}
      <Paper
        p="md"
        mb="xl"
        style={{
          backgroundColor: 'rgba(26, 31, 46, 0.8)',
          border: '1px solid rgba(255, 215, 0, 0.2)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <Group>
          <Select
            placeholder={t('filterByStatus')}
            value={filters.status || ''}
            onChange={(value) => {
              const params = new URLSearchParams(window.location.search);
              if (value) params.set('status', value);
              else params.delete('status');
              router.get(`/admin/prayer-requests?${params.toString()}`);
            }}
            data={[
              { value: '', label: t('allStatuses') },
              { value: 'active', label: t('activeStatus') },
              { value: 'answered', label: t('answeredStatus') },
              { value: 'archived', label: t('archivedStatus') }
            ]}
            leftSection={<Filter size={16} />}
            styles={{
              input: {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white'
              }
            }}
          />
          
          <Select
            placeholder={t('filterByVisibility')}
            value={filters.visibility || ''}
            onChange={(value) => {
              const params = new URLSearchParams(window.location.search);
              if (value) params.set('visibility', value);
              else params.delete('visibility');
              router.get(`/admin/prayer-requests?${params.toString()}`);
            }}
            data={[
              { value: '', label: t('allVisibilities') },
              { value: 'public', label: t('publicVisibility') },
              { value: 'private', label: t('privateVisibility') },
              { value: 'anonymous', label: t('anonymousVisibility') }
            ]}
            styles={{
              input: {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white'
              }
            }}
          />
        </Group>
      </Paper>

      {/* Prayer Requests Table */}
      <Paper
        p="md"
        style={{
          backgroundColor: 'rgba(26, 31, 46, 0.8)',
          border: '1px solid rgba(255, 215, 0, 0.2)',
          backdropFilter: 'blur(10px)'
        }}
      >
        {prayerRequests.data.length > 0 ? (
          <Table 
            striped 
            highlightOnHover
            styles={{
              thead: {
                backgroundColor: 'rgba(26, 31, 46, 0.9)',
              },
              tbody: {
                backgroundColor: 'rgba(26, 31, 46, 0.8)',
              },
              tr: {
                backgroundColor: 'rgba(26, 31, 46, 0.8)',
                '&:hover': {
                  backgroundColor: 'rgba(26, 31, 46, 0.9) !important',
                },
                '&:nthOfType(even)': {
                  backgroundColor: 'rgba(26, 31, 46, 0.7) !important',
                  '&:hover': {
                    backgroundColor: 'rgba(26, 31, 46, 0.9) !important',
                  },
                },
              },
              td: {
                backgroundColor: 'transparent !important',
                borderColor: 'rgba(255, 215, 0, 0.1)',
                color: 'white',
              },
              th: {
                backgroundColor: 'rgba(26, 31, 46, 0.9) !important',
                borderColor: 'rgba(255, 215, 0, 0.2)',
                color: 'white',
                fontWeight: 600,
              },
            }}
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th c="white">{t('title')}</Table.Th>
                <Table.Th c="white">{t('requester')}</Table.Th>
                <Table.Th c="white">{t('category')}</Table.Th>
                <Table.Th c="white">{t('status')}</Table.Th>
                <Table.Th c="white">{t('visibility')}</Table.Th>
                <Table.Th c="white">{t('prayers')}</Table.Th>
                <Table.Th c="white">{t('created')}</Table.Th>
                <Table.Th c="white">{t('actions')}</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {prayerRequests.data.map((request) => (
                <Table.Tr key={request.id}>
                  <Table.Td>
                    <Box>
                      <Text fw={500} c="white" size="sm">
                        {request.title}
                      </Text>
                      {request.is_urgent && (
                        <Badge color="red" size="xs" leftSection={<AlertCircle size={10} />}>
                          {t('urgent')}
                        </Badge>
                      )}
                    </Box>
                  </Table.Td>
                  <Table.Td>
                    <Text c="rgba(255, 255, 255, 0.8)" size="sm">
                      {request.requester_name || t('anonymous')}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Badge color={getCategoryColor(request.category)} variant="light">
                      {request.category}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      color={getStatusColor(request.status)}
                      variant="light"
                      leftSection={getStatusIcon(request.status)}
                    >
                      {request.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Badge color={getVisibilityColor(request.visibility)} variant="light">
                      {request.visibility}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <ThemeIcon size="sm" color="blue" variant="light">
                        <Heart size={12} />
                      </ThemeIcon>
                      <Text c="white" size="sm">
                        {request.prayer_count}
                      </Text>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Text c="rgba(255, 255, 255, 0.8)" size="sm">
                      {formatDate(request.created_at)}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <ActionIcon
                        variant="light"
                        color="blue"
                        size="sm"
                        component="a"
                        href={`/prayer-requests/${request.id}`}
                        title={t('viewDetails')}
                      >
                        <Eye size={14} />
                      </ActionIcon>
                      
                      <ActionIcon
                        variant="light"
                        color="orange"
                        size="sm"
                        component="a"
                        href={`/admin/prayer-requests/${request.id}/edit`}
                        title={t('edit')}
                      >
                        <Edit size={14} />
                      </ActionIcon>
                      
                      {request.status === 'active' && (
                        <ActionIcon
                          variant="light"
                          color="green"
                          size="sm"
                          onClick={() => handleAnswer(request)}
                          title={t('markAsAnswered')}
                        >
                          <CheckCircle size={14} />
                        </ActionIcon>
                      )}
                      
                      <ActionIcon
                        variant="light"
                        color="red"
                        size="sm"
                        onClick={() => handleDelete(request)}
                        title={t('delete')}
                      >
                        <Trash2 size={14} />
                      </ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        ) : (
          <Alert
            icon={<Heart size={16} />}
            title={t('noPrayerRequestsFound')}
            color="blue"
            variant="light"
          >
            <Text c="rgba(255, 255, 255, 0.8)">
              {t('noPrayerRequestsFoundDescription')}
            </Text>
          </Alert>
        )}

        {/* Pagination */}
        {prayerRequests.last_page > 1 && (
          <Group justify="center" mt="xl">
            <Pagination
              total={prayerRequests.last_page}
              value={prayerRequests.current_page}
              onChange={(page) => {
                const params = new URLSearchParams(window.location.search);
                params.set('page', page);
                router.get(`/admin/prayer-requests?${params.toString()}`);
              }}
              color="#8B4513"
            />
          </Group>
        )}
      </Paper>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={deleteModal.opened}
        onClose={() => setDeleteModal({ opened: false, request: null })}
        title={t('confirmDelete')}
        centered
      >
        <Stack gap="md">
          <Text>
            {t('deletePrayerRequestConfirmation')}
          </Text>
          <Text fw={500} c="red">
            "{deleteModal.request?.title}"
          </Text>
          <Group justify="flex-end">
            <Button
              variant="light"
              onClick={() => setDeleteModal({ opened: false, request: null })}
            >
              {t('cancel')}
            </Button>
            <Button
              color="red"
              onClick={confirmDelete}
            >
              {t('delete')}
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Answer Modal */}
      <Modal
        opened={answerModal.opened}
        onClose={() => setAnswerModal({ opened: false, request: null })}
        title={t('markAsAnswered')}
        centered
        size="md"
      >
        <Stack gap="md">
          <Text>
            {t('answerPrayerRequestDescription')}
          </Text>
          <Text fw={500}>
            "{answerModal.request?.title}"
          </Text>
          <Textarea
            label={t('answerNotes')}
            placeholder={t('answerNotesPlaceholder')}
            value={answerNotes}
            onChange={(e) => setAnswerNotes(e.target.value)}
            minRows={3}
          />
          <Group justify="flex-end">
            <Button
              variant="light"
              onClick={() => setAnswerModal({ opened: false, request: null })}
            >
              {t('cancel')}
            </Button>
            <Button
              color="green"
              onClick={confirmAnswer}
            >
              {t('markAsAnswered')}
            </Button>
          </Group>
        </Stack>
      </Modal>
      </Container>
    </Layout>
  );
}
