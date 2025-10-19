import React, { useState } from 'react'
import { Container, Title, Text, Paper, TextInput, PasswordInput, Button, Tabs, Stack, Divider } from '@mantine/core'
import { useForm } from '@inertiajs/react'
import { Save, User, Shield, Smartphone } from 'lucide-react'
import Layout from '../../layouts/app/Backend/Layout'
import { useLanguage } from '../../contexts/LanguageContext'

const AccountSettings = ({ user, twoFactorEnabled }) => {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('profile')

  // Profile form
  const profileForm = useForm({
    name: user?.name || '',
    email: user?.email || '',
  })

  // Password form
  const passwordForm = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  })

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    profileForm.put('/settings/profile')
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    passwordForm.put('/settings/password', {
      onSuccess: () => passwordForm.reset()
    })
  }

  return (
    <Layout>
      <Container size="lg" py="xl">
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
          <Title order={2} c="#FFD700" mb="md" style={{ fontFamily: 'serif' }}>
            Account Settings
          </Title>
          <Text c="#b8b8b8" mb="xl">
            Manage your profile, security, and authentication settings
          </Text>

          <Tabs 
            value={activeTab} 
            onChange={setActiveTab}
            styles={{
              tab: {
                color: '#b8b8b8',
                '&[data-active]': {
                  color: '#FFD700',
                  borderColor: '#FFD700'
                },
                '&:hover': {
                  color: '#FFD700'
                }
              },
              tabLabel: {
                fontSize: '0.9rem'
              }
            }}
          >
            <Tabs.List mb="xl">
              <Tabs.Tab value="profile" leftSection={<User size={16} />}>
                Profile Information
              </Tabs.Tab>
              <Tabs.Tab value="security" leftSection={<Shield size={16} />}>
                Security
              </Tabs.Tab>
              <Tabs.Tab value="2fa" leftSection={<Smartphone size={16} />}>
                Two-Factor Authentication
              </Tabs.Tab>
            </Tabs.List>

            {/* Profile Tab */}
            <Tabs.Panel value="profile">
              <form onSubmit={handleProfileSubmit}>
                <Stack gap="md">
                  <TextInput
                    label="Full Name"
                    placeholder="Enter your name"
                    value={profileForm.data.name}
                    onChange={(e) => profileForm.setData('name', e.target.value)}
                    error={profileForm.errors.name}
                    required
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
                    placeholder="your.email@example.com"
                    value={profileForm.data.email}
                    onChange={(e) => profileForm.setData('email', e.target.value)}
                    error={profileForm.errors.email}
                    required
                    styles={{
                      label: { color: '#FFD700', fontWeight: 500, marginBottom: 8 },
                      input: {
                        backgroundColor: 'rgba(26, 31, 46, 0.6)',
                        border: '1px solid rgba(255, 215, 0, 0.2)',
                        color: '#fff'
                      }
                    }}
                  />

                  <Button
                    type="submit"
                    loading={profileForm.processing}
                    leftSection={<Save size={18} />}
                    style={{
                      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                      color: '#1a1f2e',
                      fontWeight: 600,
                      marginTop: '1rem'
                    }}
                  >
                    Save Profile Changes
                  </Button>
                </Stack>
              </form>
            </Tabs.Panel>

            {/* Security Tab */}
            <Tabs.Panel value="security">
              <form onSubmit={handlePasswordSubmit}>
                <Stack gap="md">
                  <Text c="#b8b8b8" size="sm" mb="md">
                    Update your password to keep your account secure
                  </Text>

                  <PasswordInput
                    label="Current Password"
                    placeholder="Enter current password"
                    value={passwordForm.data.current_password}
                    onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                    error={passwordForm.errors.current_password}
                    required
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
                    label="New Password"
                    placeholder="Enter new password"
                    value={passwordForm.data.password}
                    onChange={(e) => passwordForm.setData('password', e.target.value)}
                    error={passwordForm.errors.password}
                    required
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
                    label="Confirm New Password"
                    placeholder="Confirm new password"
                    value={passwordForm.data.password_confirmation}
                    onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                    error={passwordForm.errors.password_confirmation}
                    required
                    styles={{
                      label: { color: '#FFD700', fontWeight: 500, marginBottom: 8 },
                      input: {
                        backgroundColor: 'rgba(26, 31, 46, 0.6)',
                        border: '1px solid rgba(255, 215, 0, 0.2)',
                        color: '#fff'
                      }
                    }}
                  />

                  <Button
                    type="submit"
                    loading={passwordForm.processing}
                    leftSection={<Save size={18} />}
                    style={{
                      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                      color: '#1a1f2e',
                      fontWeight: 600,
                      marginTop: '1rem'
                    }}
                  >
                    Update Password
                  </Button>
                </Stack>
              </form>
            </Tabs.Panel>

            {/* 2FA Tab */}
            <Tabs.Panel value="2fa">
              <Stack gap="md">
                <Text c="#b8b8b8" size="sm" mb="md">
                  Two-factor authentication adds an additional layer of security to your account
                </Text>

                <Paper
                  p="md"
                  withBorder
                  style={{
                    backgroundColor: 'rgba(15, 20, 25, 0.5)',
                    border: '1px solid rgba(255, 215, 0, 0.1)'
                  }}
                >
                  <Text c="#FFD700" fw={600} mb="xs">Status</Text>
                  <Text c="#b8b8b8">
                    Two-factor authentication is currently{' '}
                    <Text span fw={600} c={twoFactorEnabled ? 'green' : 'orange'}>
                      {twoFactorEnabled ? 'enabled' : 'disabled'}
                    </Text>
                  </Text>
                </Paper>

                <Text c="#b8b8b8" size="sm" style={{ fontStyle: 'italic' }}>
                  Two-factor authentication configuration coming soon...
                </Text>
              </Stack>
            </Tabs.Panel>
          </Tabs>
        </Paper>
      </Container>
    </Layout>
  )
}

export default AccountSettings
