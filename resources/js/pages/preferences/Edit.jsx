import React from 'react'
import { Container, Title, Text, Paper, TextInput, Select, Button, Group, Textarea, Switch } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@inertiajs/react'
import { Save, ArrowLeft } from 'lucide-react'
import { Link } from '@inertiajs/react'
import Layout from '../../layouts/app/Backend/Layout'

const PreferencesEdit = ({ preference }) => {
  const { data, setData, put, processing, errors } = useForm({
    phone: preference.phone || '',
    address: preference.address || '',
    date_of_birth: preference.date_of_birth ? new Date(preference.date_of_birth) : null,
    gender: preference.gender || '',
    notes: preference.notes || '',
    email_notifications: preference.email_notifications ?? true,
    sms_notifications: preference.sms_notifications ?? false,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    put(`/preferences/${preference.id}`)
  }

  return (
    <Layout>
      <Container size="md" py="xl">
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
            <Link href="/preferences">
              <Button 
                variant="subtle" 
                leftSection={<ArrowLeft size={18} />}
                c="#FFD700"
              >
                Back to Preferences
              </Button>
            </Link>
          </Group>

          <Title order={2} c="#FFD700" mb="md" style={{ fontFamily: 'serif' }}>
            Edit User Preferences
          </Title>
          <Text c="#b8b8b8" mb="xs">
            Update preferences for {preference.user?.name}
          </Text>
          <Text c="#b8b8b8" size="sm" mb="xl">
            {preference.user?.email}
          </Text>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Phone Number"
              placeholder="Enter phone number"
              value={data.phone}
              onChange={(e) => setData('phone', e.target.value)}
              error={errors.phone}
              mb="md"
              styles={{
                label: { color: '#FFD700', fontWeight: 500, marginBottom: 8 },
                input: {
                  backgroundColor: 'rgba(26, 31, 46, 0.6)',
                  border: '1px solid rgba(255, 215, 0, 0.2)',
                  color: '#fff'
                }
              }}
            />

            <Textarea
              label="Address"
              placeholder="Enter address"
              value={data.address}
              onChange={(e) => setData('address', e.target.value)}
              error={errors.address}
              mb="md"
              minRows={3}
              styles={{
                label: { color: '#FFD700', fontWeight: 500, marginBottom: 8 },
                input: {
                  backgroundColor: 'rgba(26, 31, 46, 0.6)',
                  border: '1px solid rgba(255, 215, 0, 0.2)',
                  color: '#fff'
                }
              }}
            />

            <DateInput
              label="Date of Birth"
              placeholder="Select date"
              value={data.date_of_birth}
              onChange={(value) => setData('date_of_birth', value)}
              error={errors.date_of_birth}
              mb="md"
              valueFormat="YYYY-MM-DD"
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
              label="Gender"
              placeholder="Select gender"
              value={data.gender}
              onChange={(value) => setData('gender', value)}
              error={errors.gender}
              mb="md"
              data={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' }
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

            <Textarea
              label="Notes"
              placeholder="Admin notes"
              value={data.notes}
              onChange={(e) => setData('notes', e.target.value)}
              error={errors.notes}
              mb="xl"
              minRows={3}
              styles={{
                label: { color: '#FFD700', fontWeight: 500, marginBottom: 8 },
                input: {
                  backgroundColor: 'rgba(26, 31, 46, 0.6)',
                  border: '1px solid rgba(255, 215, 0, 0.2)',
                  color: '#fff'
                }
              }}
            />

            <Text c="#FFD700" fw={500} mb="md">Notification Preferences</Text>

            <Switch
              label="Email Notifications"
              checked={data.email_notifications}
              onChange={(e) => setData('email_notifications', e.currentTarget.checked)}
              mb="md"
              styles={{
                label: { color: '#b8b8b8' }
              }}
            />

            <Switch
              label="SMS Notifications"
              checked={data.sms_notifications}
              onChange={(e) => setData('sms_notifications', e.currentTarget.checked)}
              mb="xl"
              styles={{
                label: { color: '#b8b8b8' }
              }}
            />

            <Group justify="flex-end">
              <Button
                component={Link}
                href="/preferences"
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
                Update Preferences
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </Layout>
  )
}

export default PreferencesEdit
