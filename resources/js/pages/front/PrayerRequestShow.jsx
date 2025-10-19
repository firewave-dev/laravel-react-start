import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import {
  Container,
  Title,
  Text,
  Card,
  Button,
  Group,
  Stack,
  Paper,
  Badge,
  ThemeIcon,
  Box,
  Divider,
  Alert,
  ActionIcon,
  Modal
} from '@mantine/core';
import {
  Heart,
  ArrowLeft,
  Calendar,
  Users,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import FrontLayout from '../../layouts/app/Front/FrontLayout';
import { useLanguage } from '../../contexts/LanguageContext';

export default function PrayerRequestShow({ prayerRequest }) {
  const { t } = useLanguage();
  const [showPrayerModal, setShowPrayerModal] = useState(false);
  const [hasPrayed, setHasPrayed] = useState(false);

  const handlePrayForRequest = () => {
    setShowPrayerModal(true);
  };

  const submitPrayer = () => {
    router.post(`/prayer-requests/${prayerRequest.id}/pray`, {}, {
      onSuccess: () => {
        setShowPrayerModal(false);
        setHasPrayed(true);
        // Refresh the page to show updated prayer count
        router.reload();
      }
    });
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

  const getCategoryIcon = (category) => {
    const icons = {
      health: '🏥',
      family: '👨‍👩‍👧‍👦',
      spiritual: '🙏',
      work: '💼',
      travel: '✈️',
      other: '💭'
    };
    return icons[category] || '💭';
  };

  return (
    <FrontLayout>
      <Head title={`${t('prayerRequest')} - ${prayerRequest.title}`} />
      
      <Container size="md" py="xl">
        {/* Back Button */}
        <Group mb="xl">
          <Button
            variant="light"
            leftSection={<ArrowLeft size={16} />}
            component="a"
            href="/prayer-requests"
            color="#8B4513"
          >
            {t('backToPrayerRequests')}
          </Button>
        </Group>

        {/* Main Card */}
        <Card
          shadow="lg"
          padding="xl"
          radius="md"
          withBorder
          style={{
            background: 'linear-gradient(135deg, rgba(235, 225, 195, 0.95) 0%, rgba(255, 248, 220, 0.95) 100%)',
            border: '2px solid rgba(139, 69, 19, 0.3)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Header */}
          <Group justify="space-between" align="flex-start" mb="lg">
            <Box style={{ flex: 1 }}>
              <Group gap="md" mb="sm">
                <Badge
                  color={getCategoryColor(prayerRequest.category)}
                  variant="light"
                  size="lg"
                  leftSection={<span style={{ fontSize: '16px' }}>{getCategoryIcon(prayerRequest.category)}</span>}
                >
                  {prayerRequest.category_label}
                </Badge>
                {prayerRequest.is_urgent && (
                  <Badge
                    color="red"
                    variant="filled"
                    size="lg"
                    leftSection={<AlertCircle size={14} />}
                  >
                    {t('urgent')}
                  </Badge>
                )}
                <Badge
                  color={getStatusColor(prayerRequest.status)}
                  variant="light"
                  size="lg"
                  leftSection={
                    prayerRequest.status === 'answered' ? 
                      <CheckCircle size={14} /> : 
                      <Heart size={14} />
                  }
                >
                  {prayerRequest.status_label}
                </Badge>
              </Group>
              
              <Title 
                order={1} 
                size="h1" 
                c="#8B4513" 
                mb="md"
                style={{ fontFamily: 'serif', lineHeight: 1.3 }}
              >
                {prayerRequest.title}
              </Title>
            </Box>
          </Group>

          <Divider color="rgba(139, 69, 19, 0.2)" mb="lg" />

          {/* Prayer Request Content */}
          <Paper
            p="lg"
            mb="lg"
            style={{
              background: 'rgba(139, 69, 19, 0.05)',
              border: '1px solid rgba(139, 69, 19, 0.2)',
              borderRadius: '8px'
            }}
          >
            <Text 
              size="lg" 
              c="#654321" 
              style={{ 
                fontFamily: 'serif', 
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap'
              }}
            >
              {prayerRequest.request}
            </Text>
          </Paper>

          {/* Request Details */}
          <Group justify="space-between" align="center" mb="lg">
            <Group>
              <ThemeIcon
                size="sm"
                color="#8B4513"
                variant="light"
              >
                <Users size={14} />
              </ThemeIcon>
              <Text size="sm" c="#654321">
                <strong>{prayerRequest.display_name}</strong>
              </Text>
            </Group>
            
            <Group>
              <ThemeIcon
                size="sm"
                color="#8B4513"
                variant="light"
              >
                <Calendar size={14} />
              </ThemeIcon>
              <Text size="sm" c="#654321">
                {t('submittedOn')} {prayerRequest.created_at}
              </Text>
            </Group>
          </Group>

          {/* Prayer Count and Action */}
          <Paper
            p="md"
            mb="lg"
            style={{
              background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(255, 215, 0, 0.05) 100%)',
              border: '1px solid rgba(139, 69, 19, 0.2)',
              borderRadius: '8px'
            }}
          >
            <Group justify="space-between" align="center">
              <Group>
                <ThemeIcon
                  size="lg"
                  color="#8B4513"
                  variant="light"
                >
                  <Heart size={20} />
                </ThemeIcon>
                <Box>
                  <Text size="xl" fw={700} c="#8B4513">
                    {prayerRequest.prayer_count}
                  </Text>
                  <Text size="sm" c="#654321">
                    {t('peoplePrayed')}
                  </Text>
                </Box>
              </Group>
              
              {prayerRequest.status === 'active' && (
                <Button
                  onClick={handlePrayForRequest}
                  leftSection={<Heart size={16} />}
                  size="md"
                  disabled={hasPrayed}
                  style={{
                    backgroundColor: hasPrayed ? '#90EE90' : '#8B4513',
                    border: 'none'
                  }}
                >
                  {hasPrayed ? t('prayed') : t('prayForThis')}
                </Button>
              )}
            </Group>
          </Paper>

          {/* Answer Section (if answered) */}
          {prayerRequest.status === 'answered' && (
            <Alert
              icon={<CheckCircle size={16} />}
              title={t('prayerAnswered')}
              color="green"
              variant="light"
              mb="lg"
              style={{
                background: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.3)'
              }}
            >
              <Stack gap="sm">
                <Text size="sm" c="#166534">
                  {t('answeredOn')} {prayerRequest.answered_at}
                </Text>
                {prayerRequest.answer_notes && (
                  <Text size="sm" c="#166534" style={{ fontFamily: 'serif', whiteSpace: 'pre-wrap' }}>
                    {prayerRequest.answer_notes}
                  </Text>
                )}
              </Stack>
            </Alert>
          )}

          {/* Prayer Tips */}
          <Alert
            icon={<Heart size={16} />}
            title={t('prayerTips')}
            color="#8B4513"
            variant="light"
            style={{
              background: 'rgba(139, 69, 19, 0.1)',
              border: '1px solid rgba(139, 69, 19, 0.3)'
            }}
          >
            <Text size="sm" c="#654321" style={{ fontFamily: 'serif' }}>
              {t('prayerTipsContent')}
            </Text>
          </Alert>
        </Card>

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
                {prayerRequest.title}
              </Title>
              <Text size="sm" c="#654321" mt="xs" style={{ fontFamily: 'serif' }}>
                {prayerRequest.request}
              </Text>
              <Group gap="xs" mt="md">
                <Badge color={getCategoryColor(prayerRequest.category)} variant="light">
                  {prayerRequest.category_label}
                </Badge>
                <Text size="xs" c="#654321">
                  <Users size={12} style={{ marginRight: '4px', display: 'inline' }} />
                  {prayerRequest.prayer_count} {t('peoplePrayed')}
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
        </Modal>
      </Container>
    </FrontLayout>
  );
}
