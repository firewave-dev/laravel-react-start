import React from 'react'
import { Container, Title, Text, Paper, TextInput, Textarea, Select, Button, Group, Switch, NumberInput } from '@mantine/core'
import { DateInput, TimeInput, DateTimePicker } from '@mantine/dates'
import { useForm } from '@inertiajs/react'
import { Save, ArrowLeft } from 'lucide-react'
import { Link } from '@inertiajs/react'
import Layout from '../../layouts/app/Backend/Layout'
import LanguageTabs from '../../components/LanguageTabs'

const EventsCreate = () => {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
    event_date: null,
    start_time: '',
    end_time: '',
    location: '',
    event_type: 'other',
    is_recurring: false,
    recurrence_pattern: '',
    status: 'draft',
    published_at: null,
    is_featured: false,
    max_attendees: null,
    // Registration fields
    registration_required: false,
    registration_enabled: false,
    registration_capacity: null,
    allow_waitlist: false,
    registration_deadline: null,
    registration_opens_at: null,
    registration_instructions: '',
    registration_fee: null,
    fee_required: false,
    send_reminders: false,
    reminder_days_before: 1,
    translations: {
      fr: { title: '', description: '', location: '' },
      sr: { title: '', description: '', location: '' }
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post('/events')
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
            <Link href="/events">
              <Button 
                variant="subtle" 
                leftSection={<ArrowLeft size={18} />}
                c="#FFD700"
              >
                Back to Events
              </Button>
            </Link>
          </Group>

          <Title order={2} c="#FFD700" mb="md" style={{ fontFamily: 'serif' }}>
            Create New Event
          </Title>
          <Text c="#b8b8b8" mb="xl">
            Add a new church event or liturgy
          </Text>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <LanguageTabs
              data={data}
              setData={setData}
              errors={errors}
              fields={['title', 'description', 'location']}
              fieldLabels={{
                title: 'Event Title',
                description: 'Description', 
                location: 'Location'
              }}
            />

            <Group grow mb="md">
              <DateInput
                label="Event Date"
                placeholder="Select date"
                value={data.event_date}
                onChange={(value) => setData('event_date', value)}
                error={errors.event_date}
                required
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

              <TimeInput
                label="Start Time"
                value={data.start_time}
                onChange={(e) => setData('start_time', e.target.value)}
                error={errors.start_time}
                styles={{
                  label: { color: '#FFD700', fontWeight: 500, marginBottom: 8 },
                  input: {
                    backgroundColor: 'rgba(26, 31, 46, 0.6)',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    color: '#fff'
                  }
                }}
              />

              <TimeInput
                label="End Time"
                value={data.end_time}
                onChange={(e) => setData('end_time', e.target.value)}
                error={errors.end_time}
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

            <TextInput
              label="Location"
              placeholder="e.g., Main Church, Fellowship Hall"
              value={data.location}
              onChange={(e) => setData('location', e.target.value)}
              error={errors.location}
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

            <Group grow mb="md">
              <Select
                label="Event Type"
                placeholder="Select type"
                value={data.event_type}
                onChange={(value) => setData('event_type', value)}
                error={errors.event_type}
                required
                data={[
                  { value: 'liturgy', label: 'Liturgy' },
                  { value: 'feast', label: 'Feast Day' },
                  { value: 'social', label: 'Social Event' },
                  { value: 'study', label: 'Bible Study' },
                  { value: 'service', label: 'Service' },
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

              <Select
                label="Status"
                placeholder="Select status"
                value={data.status}
                onChange={(value) => setData('status', value)}
                error={errors.status}
                required
                data={[
                  { value: 'draft', label: 'Draft' },
                  { value: 'published', label: 'Published' },
                  { value: 'cancelled', label: 'Cancelled' }
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

            <NumberInput
              label="Maximum Attendees (optional)"
              placeholder="Leave empty for unlimited"
              value={data.max_attendees}
              onChange={(value) => setData('max_attendees', value)}
              error={errors.max_attendees}
              min={1}
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

            {/* Registration Section */}
            <Paper p="md" mb="md" style={{ 
              backgroundColor: 'rgba(255, 215, 0, 0.05)', 
              border: '1px solid rgba(255, 215, 0, 0.2)' 
            }}>
              <Text size="lg" fw={600} c="#FFD700" mb="md">Registration Settings</Text>
              
              <Group mb="md">
                <Switch
                  label="Registration Required"
                  description="Users must register to attend this event"
                  checked={data.registration_required}
                  onChange={(e) => setData('registration_required', e.currentTarget.checked)}
                  styles={{ 
                    label: { color: '#b8b8b8' },
                    description: { color: '#888' }
                  }}
                />
                
                <Switch
                  label="Registration Enabled"
                  description="Allow users to register for this event"
                  checked={data.registration_enabled}
                  onChange={(e) => setData('registration_enabled', e.currentTarget.checked)}
                  styles={{ 
                    label: { color: '#b8b8b8' },
                    description: { color: '#888' }
                  }}
                />
              </Group>

              {data.registration_required && (
                <>
                  <Group grow mb="md">
                    <NumberInput
                      label="Registration Capacity"
                      placeholder="Maximum number of registrations"
                      value={data.registration_capacity}
                      onChange={(value) => setData('registration_capacity', value)}
                      error={errors.registration_capacity}
                      min={1}
                      styles={{
                        label: { color: '#FFD700', fontWeight: 500, marginBottom: 8 },
                        input: {
                          backgroundColor: 'rgba(26, 31, 46, 0.6)',
                          border: '1px solid rgba(255, 215, 0, 0.2)',
                          color: '#fff'
                        }
                      }}
                    />
                    
                    <NumberInput
                      label="Registration Fee"
                      placeholder="Fee amount (leave 0 for free)"
                      value={data.registration_fee}
                      onChange={(value) => setData('registration_fee', value)}
                      error={errors.registration_fee}
                      min={0}
                      step={0.01}
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

                  <Group grow mb="md">
                    <DateInput
                      label="Registration Deadline"
                      placeholder="Last day to register"
                      value={data.registration_deadline}
                      onChange={(value) => setData('registration_deadline', value)}
                      error={errors.registration_deadline}
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
                      label="Registration Opens"
                      placeholder="When registration becomes available"
                      value={data.registration_opens_at}
                      onChange={(value) => setData('registration_opens_at', value)}
                      error={errors.registration_opens_at}
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

                  <Textarea
                    label="Registration Instructions"
                    placeholder="Special instructions for registrants (dietary restrictions, what to bring, etc.)"
                    value={data.registration_instructions}
                    onChange={(e) => setData('registration_instructions', e.target.value)}
                    error={errors.registration_instructions}
                    minRows={3}
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

                  <Group mb="md">
                    <Switch
                      label="Allow Waitlist"
                      description="Allow users to join waitlist when event is full"
                      checked={data.allow_waitlist}
                      onChange={(e) => setData('allow_waitlist', e.currentTarget.checked)}
                      styles={{ 
                        label: { color: '#b8b8b8' },
                        description: { color: '#888' }
                      }}
                    />
                    
                    <Switch
                      label="Send Reminders"
                      description="Send email reminders to registered users"
                      checked={data.send_reminders}
                      onChange={(e) => setData('send_reminders', e.currentTarget.checked)}
                      styles={{ 
                        label: { color: '#b8b8b8' },
                        description: { color: '#888' }
                      }}
                    />
                  </Group>

                  {data.send_reminders && (
                    <NumberInput
                      label="Reminder Days Before Event"
                      placeholder="Number of days before event to send reminder"
                      value={data.reminder_days_before}
                      onChange={(value) => setData('reminder_days_before', value)}
                      error={errors.reminder_days_before}
                      min={1}
                      max={30}
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
                  )}
                </>
              )}
            </Paper>

            <DateTimePicker
              label="Publish Date & Time (optional)"
              description="Schedule when this event becomes visible to the public"
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

            <Group mb="xl">
              <Switch
                label="Featured Event"
                checked={data.is_featured}
                onChange={(e) => setData('is_featured', e.currentTarget.checked)}
                styles={{ label: { color: '#b8b8b8' } }}
              />

              <Switch
                label="Recurring Event"
                checked={data.is_recurring}
                onChange={(e) => setData('is_recurring', e.currentTarget.checked)}
                styles={{ label: { color: '#b8b8b8' } }}
              />
            </Group>

            {data.is_recurring && (
              <TextInput
                label="Recurrence Pattern"
                placeholder="e.g., Weekly on Sunday, Monthly first Friday"
                value={data.recurrence_pattern}
                onChange={(e) => setData('recurrence_pattern', e.target.value)}
                error={errors.recurrence_pattern}
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
            )}

            <Group justify="flex-end" mt="xl">
              <Button
                component={Link}
                href="/events"
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
                Create Event
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </Layout>
  )
}

export default EventsCreate
