import React from 'react'
import { Container, Title, Text, Paper, TextInput, Textarea, Select, Button, Group, Switch } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { useForm } from '@inertiajs/react'
import { Save, ArrowLeft } from 'lucide-react'
import { Link } from '@inertiajs/react'
import Layout from '../../layouts/app/Backend/Layout'
import LanguageTabs from '../../components/LanguageTabs'

const BulletinsCreate = () => {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    message: '',
    priority: 'normal',
    type: 'general',
    expires_at: null,
    is_pinned: false,
    status: 'active',
    translations: {
      fr: { title: '', message: '' },
      sr: { title: '', message: '' }
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post('/bulletins')
  }

  return (
    <Layout>
      <Container size="md" py="xl">
        <Paper p="xl" withBorder style={{ background: 'linear-gradient(135deg, rgba(26, 31, 46, 0.8) 0%, rgba(15, 20, 25, 0.9) 100%)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 215, 0, 0.2)', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)' }}>
          <Group mb="xl">
            <Link href="/bulletins">
              <Button variant="subtle" leftSection={<ArrowLeft size={18} />} c="#FFD700">Back to Bulletins</Button>
            </Link>
          </Group>

          <Title order={2} c="#FFD700" mb="md" style={{ fontFamily: 'serif' }}>Create Bulletin</Title>
          <Text c="#b8b8b8" mb="xl">Post a new announcement or notice</Text>

          <form onSubmit={handleSubmit}>
            <LanguageTabs
              data={data}
              setData={setData}
              errors={errors}
              fields={['title', 'message']}
              fieldLabels={{
                title: 'Bulletin Title',
                message: 'Message'
              }}
            />
            
            <Group grow mb="md">
              <Select label="Type" value={data.type} onChange={(value) => setData('type', value)} error={errors.type} required data={[ { value: 'general', label: 'General' }, { value: 'announcement', label: 'Announcement' }, { value: 'prayer_request', label: 'Prayer Request' }, { value: 'event_notice', label: 'Event Notice' }, { value: 'urgent', label: 'Urgent' } ]} styles={{ label: { color: '#FFD700', fontWeight: 500, marginBottom: 8 }, input: { backgroundColor: 'rgba(26, 31, 46, 0.6)', border: '1px solid rgba(255, 215, 0, 0.2)', color: '#fff' } }} />
              
              <Select label="Priority" value={data.priority} onChange={(value) => setData('priority', value)} error={errors.priority} required data={[ { value: 'low', label: 'Low' }, { value: 'normal', label: 'Normal' }, { value: 'high', label: 'High' } ]} styles={{ label: { color: '#FFD700', fontWeight: 500, marginBottom: 8 }, input: { backgroundColor: 'rgba(26, 31, 46, 0.6)', border: '1px solid rgba(255, 215, 0, 0.2)', color: '#fff' } }} />
            </Group>

            <DateTimePicker label="Expires At (optional)" placeholder="Select expiration date" value={data.expires_at} onChange={(value) => setData('expires_at', value)} error={errors.expires_at} mb="md" styles={{ label: { color: '#FFD700', fontWeight: 500, marginBottom: 8 }, input: { backgroundColor: 'rgba(26, 31, 46, 0.6)', border: '1px solid rgba(255, 215, 0, 0.2)', color: '#fff' } }} />
            
            <Switch label="Pin to Top" checked={data.is_pinned} onChange={(e) => setData('is_pinned', e.currentTarget.checked)} mb="xl" styles={{ label: { color: '#b8b8b8' } }} />

            <Group justify="flex-end">
              <Button component={Link} href="/bulletins" variant="subtle" c="#b8b8b8">Cancel</Button>
              <Button type="submit" loading={processing} leftSection={<Save size={18} />} style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', color: '#1a1f2e', fontWeight: 600 }}>Post Bulletin</Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </Layout>
  )
}

export default BulletinsCreate
