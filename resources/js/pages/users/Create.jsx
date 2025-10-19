import React from 'react'
import { Container, Title, Text, Paper, TextInput, Select, Button, Group, PasswordInput } from '@mantine/core'
import { useForm } from '@inertiajs/react'
import { Save, ArrowLeft } from 'lucide-react'
import { Link } from '@inertiajs/react'
import Layout from '../../layouts/app/Backend/Layout'

const UsersCreate = () => {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'member',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    post('/users')
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
            <Link href="/users">
              <Button 
                variant="subtle" 
                leftSection={<ArrowLeft size={18} />}
                c="#FFD700"
              >
                Back to Users
              </Button>
            </Link>
          </Group>

          <Title order={2} c="#FFD700" mb="md" style={{ fontFamily: 'serif' }}>
            Create New User
          </Title>
          <Text c="#b8b8b8" mb="xl">
            Add a new member or administrator to the system
          </Text>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Full Name"
              placeholder="Enter full name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              error={errors.name}
              required
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

            <TextInput
              label="Email Address"
              type="email"
              placeholder="user@example.com"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              error={errors.email}
              required
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

            <Select
              label="Role"
              placeholder="Select role"
              value={data.role}
              onChange={(value) => setData('role', value)}
              error={errors.role}
              required
              mb="md"
              data={[
                { value: 'member', label: 'Member' },
                { value: 'manager', label: 'Manager' },
                { value: 'operator', label: 'Operator' },
                { value: 'admin', label: 'Administrator' }
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

            <PasswordInput
              label="Password"
              placeholder="Enter password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              error={errors.password}
              required
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

            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm password"
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              error={errors.password_confirmation}
              required
              mb="xl"
              styles={{
                label: { color: '#FFD700', fontWeight: 500, marginBottom: 8 },
                input: {
                  backgroundColor: 'rgba(26, 31, 46, 0.6)',
                  border: '1px solid rgba(255, 215, 0, 0.2)',
                  color: '#fff'
                }
              }}
            />

            <Group justify="flex-end">
              <Button
                component={Link}
                href="/users"
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
                Create User
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </Layout>
  )
}

export default UsersCreate
