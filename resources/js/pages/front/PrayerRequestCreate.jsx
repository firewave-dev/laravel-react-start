import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import {
  Container,
  Title,
  Text,
  Card,
  TextInput,
  Textarea,
  Select,
  Switch,
  Button,
  Group,
  Stack,
  Paper,
  Alert,
  ThemeIcon,
  Box,
  Divider
} from '@mantine/core';
import {
  Heart,
  ArrowLeft,
  Send,
  Info,
  Eye,
  EyeOff,
  User,
  Mail
} from 'lucide-react';
import FrontLayout from '../../layouts/app/Front/FrontLayout';
import { useLanguage } from '../../contexts/LanguageContext';

export default function PrayerRequestCreate() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    title: '',
    request: '',
    requester_name: '',
    requester_email: '',
    visibility: 'public',
    category: 'other',
    is_urgent: false,
    is_anonymous: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'health', label: t('healthCategory') },
    { value: 'family', label: t('familyCategory') },
    { value: 'spiritual', label: t('spiritualCategory') },
    { value: 'work', label: t('workCategory') },
    { value: 'travel', label: t('travelCategory') },
    { value: 'other', label: t('otherCategory') }
  ];

  const visibilityOptions = [
    { value: 'public', label: t('publicVisibility'), description: t('publicVisibilityDescription') },
    { value: 'anonymous', label: t('anonymousVisibility'), description: t('anonymousVisibilityDescription') },
    { value: 'private', label: t('privateVisibility'), description: t('privateVisibilityDescription') }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    router.post('/prayer-requests', formData, {
      onSuccess: () => {
        // Success message will be shown via flash message
      },
      onError: (errors) => {
        setErrors(errors);
        setIsSubmitting(false);
      },
      onFinish: () => {
        setIsSubmitting(false);
      }
    });
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
      <Head title={t('submitPrayerRequest')} />
      
      <Container size="md" py="xl">
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
            {t('submitPrayerRequest')}
          </Title>
          <Text 
            size="lg" 
            c="#654321" 
            maw={600} 
            mx="auto"
            style={{ fontFamily: 'serif', lineHeight: 1.6 }}
          >
            {t('submitPrayerRequestDescription')}
          </Text>
        </Box>

        {/* Form */}
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
          <form onSubmit={handleSubmit}>
            <Stack gap="lg">
              {/* Title */}
              <TextInput
                label={t('prayerRequestTitle')}
                placeholder={t('prayerRequestTitlePlaceholder')}
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
                error={errors.title}
                leftSection={<Heart size={16} />}
                styles={{
                  label: { color: '#8B4513', marginBottom: '8px', fontWeight: 500 },
                  input: {
                    backgroundColor: '#FFF8DC',
                    border: '2px solid #D2B48C',
                    color: '#8B4513',
                    '&:focus': { borderColor: '#8B4513' },
                    '&::placeholder': { color: 'rgba(139, 69, 19, 0.6)' }
                  }
                }}
              />

              {/* Prayer Request Content */}
              <Textarea
                label={t('prayerRequestContent')}
                placeholder={t('prayerRequestContentPlaceholder')}
                value={formData.request}
                onChange={(e) => handleInputChange('request', e.target.value)}
                required
                minRows={4}
                maxRows={8}
                error={errors.request}
                styles={{
                  label: { color: '#8B4513', marginBottom: '8px', fontWeight: 500 },
                  input: {
                    backgroundColor: '#FFF8DC',
                    border: '2px solid #D2B48C',
                    color: '#8B4513',
                    '&:focus': { borderColor: '#8B4513' },
                    '&::placeholder': { color: 'rgba(139, 69, 19, 0.6)' }
                  }
                }}
              />

              {/* Category Selection */}
              <Select
                label={t('category')}
                placeholder={t('selectCategory')}
                value={formData.category}
                onChange={(value) => handleInputChange('category', value)}
                data={categories}
                required
                error={errors.category}
                leftSection={<span>{getCategoryIcon(formData.category)}</span>}
                styles={{
                  label: { color: '#8B4513', marginBottom: '8px', fontWeight: 500 },
                  input: {
                    backgroundColor: '#FFF8DC',
                    border: '2px solid #D2B48C',
                    color: '#8B4513',
                    '&:focus': { borderColor: '#8B4513' }
                  },
                  dropdown: { backgroundColor: '#FFF8DC', border: '2px solid #D2B48C' },
                  option: { 
                    color: '#8B4513',
                    '&[data-selected]': { backgroundColor: '#8B4513', color: '#FFFFFF' },
                    '&[data-hovered]': { backgroundColor: '#F5F5DC' }
                  }
                }}
              />

              {/* Visibility Selection */}
              <Paper
                p="md"
                style={{
                  background: 'rgba(139, 69, 19, 0.05)',
                  border: '1px solid rgba(139, 69, 19, 0.2)',
                  borderRadius: '8px'
                }}
              >
                <Text size="sm" fw={500} c="#8B4513" mb="md">
                  {t('visibilitySettings')}
                </Text>
                <Stack gap="sm">
                  {visibilityOptions.map((option) => (
                    <Paper
                      key={option.value}
                      p="sm"
                      style={{
                        background: formData.visibility === option.value ? 
                          'rgba(139, 69, 19, 0.1)' : 'transparent',
                        border: formData.visibility === option.value ? 
                          '2px solid #8B4513' : '1px solid rgba(139, 69, 19, 0.2)',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                      onClick={() => handleInputChange('visibility', option.value)}
                    >
                      <Group gap="sm">
                        <input
                          type="radio"
                          checked={formData.visibility === option.value}
                          onChange={() => handleInputChange('visibility', option.value)}
                          style={{ accentColor: '#8B4513' }}
                        />
                        <div style={{ flex: 1 }}>
                          <Text size="sm" fw={500} c="#8B4513">
                            {option.label}
                          </Text>
                          <Text size="xs" c="#654321">
                            {option.description}
                          </Text>
                        </div>
                      </Group>
                    </Paper>
                  ))}
                </Stack>
              </Paper>

              {/* Personal Information (conditional) */}
              {formData.visibility !== 'anonymous' && (
                <>
                  <Divider color="rgba(139, 69, 19, 0.2)" />
                  <Text size="sm" fw={500} c="#8B4513">
                    {t('personalInformation')} ({t('optional')})
                  </Text>
                  
                  <TextInput
                    label={t('yourName')}
                    placeholder={t('yourNamePlaceholder')}
                    value={formData.requester_name}
                    onChange={(e) => handleInputChange('requester_name', e.target.value)}
                    leftSection={<User size={16} />}
                    error={errors.requester_name}
                    styles={{
                      label: { color: '#8B4513', marginBottom: '8px', fontWeight: 500 },
                      input: {
                        backgroundColor: '#FFF8DC',
                        border: '2px solid #D2B48C',
                        color: '#8B4513',
                        '&:focus': { borderColor: '#8B4513' },
                        '&::placeholder': { color: 'rgba(139, 69, 19, 0.6)' }
                      }
                    }}
                  />

                  <TextInput
                    label={t('yourEmail')}
                    placeholder={t('yourEmailPlaceholder')}
                    type="email"
                    value={formData.requester_email}
                    onChange={(e) => handleInputChange('requester_email', e.target.value)}
                    leftSection={<Mail size={16} />}
                    error={errors.requester_email}
                    styles={{
                      label: { color: '#8B4513', marginBottom: '8px', fontWeight: 500 },
                      input: {
                        backgroundColor: '#FFF8DC',
                        border: '2px solid #D2B48C',
                        color: '#8B4513',
                        '&:focus': { borderColor: '#8B4513' },
                        '&::placeholder': { color: 'rgba(139, 69, 19, 0.6)' }
                      }
                    }}
                  />
                </>
              )}

              {/* Additional Options */}
              <Paper
                p="md"
                style={{
                  background: 'rgba(139, 69, 19, 0.05)',
                  border: '1px solid rgba(139, 69, 19, 0.2)',
                  borderRadius: '8px'
                }}
              >
                <Text size="sm" fw={500} c="#8B4513" mb="md">
                  {t('additionalOptions')}
                </Text>
                <Stack gap="sm">
                  <Switch
                    label={t('markAsUrgent')}
                    description={t('markAsUrgentDescription')}
                    checked={formData.is_urgent}
                    onChange={(e) => handleInputChange('is_urgent', e.currentTarget.checked)}
                    color="#8B4513"
                    styles={{
                      label: { color: '#8B4513' },
                      description: { color: '#654321' }
                    }}
                  />
                  
                  {formData.visibility === 'public' && (
                    <Switch
                      label={t('hidePersonalDetails')}
                      description={t('hidePersonalDetailsDescription')}
                      checked={formData.is_anonymous}
                      onChange={(e) => handleInputChange('is_anonymous', e.currentTarget.checked)}
                      color="#8B4513"
                      styles={{
                        label: { color: '#8B4513' },
                        description: { color: '#654321' }
                      }}
                    />
                  )}
                </Stack>
              </Paper>

              {/* Information Alert */}
              <Alert
                icon={<Info size={16} />}
                title={t('importantNote')}
                color="#8B4513"
                variant="light"
                style={{
                  background: 'rgba(139, 69, 19, 0.1)',
                  border: '1px solid rgba(139, 69, 19, 0.3)'
                }}
              >
                <Text size="sm" c="#654321" style={{ fontFamily: 'serif' }}>
                  {t('prayerRequestPrivacyNote')}
                </Text>
              </Alert>

              {/* Submit Buttons */}
              <Group justify="space-between" mt="lg">
                <Button
                  variant="light"
                  leftSection={<ArrowLeft size={16} />}
                  component="a"
                  href="/prayer-requests"
                  color="#8B4513"
                >
                  {t('backToPrayerRequests')}
                </Button>
                
                <Button
                  type="submit"
                  leftSection={<Send size={16} />}
                  loading={isSubmitting}
                  style={{
                    backgroundColor: '#8B4513',
                    border: 'none'
                  }}
                >
                  {t('submitPrayerRequest')}
                </Button>
              </Group>
            </Stack>
          </form>
        </Card>
      </Container>
    </FrontLayout>
  );
}
