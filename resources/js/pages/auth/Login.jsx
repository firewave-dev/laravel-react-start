import React, { useState } from 'react'
import { Paper, Title, TextInput, PasswordInput, Button, Stack, Text, Checkbox, Anchor, Divider, Alert, Group } from '@mantine/core'
import { Link, useForm } from '@inertiajs/react'
import { AlertCircle, LogIn } from 'lucide-react'
import AuthLayout from '../../layouts/auth/AuthLayout'
import { useLanguage } from '../../contexts/LanguageContext'

const Login = ({ status, canResetPassword }) => {
  const { t } = useLanguage()
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  })

  const submit = (e) => {
    e.preventDefault()
    post(route('login.store'), {
      onFinish: () => reset('password'),
    })
  }

  return (
    <AuthLayout>
      <Paper 
        p="xl" 
        withBorder 
        shadow="xl"
        style={{ 
          width: '100%',
          maxWidth: '450px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(139, 69, 19, 0.25)',
          borderRadius: '12px',
        }}
      >
        {/* Header */}
        <Stack gap="md" mb="xl">
          <Title 
            order={1} 
            c="#8B4513" 
            ta="center"
            style={{ fontFamily: 'serif', fontSize: '2rem' }}
          >
            {t('memberLogin')}
          </Title>
          {status && (
            <Alert color="green" variant="light">
              {status}
            </Alert>
          )}
        </Stack>

        {/* Form */}
        <form onSubmit={submit}>
          <Stack gap="md">
            <TextInput
              label={t('emailAddress')}
              placeholder={t('emailPlaceholder')}
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              error={errors.email}
              required
              size="md"
              styles={{
                input: {
                  borderColor: errors.email ? '#fa5252' : 'rgba(139, 69, 19, 0.3)',
                  '&:focus': {
                    borderColor: '#8B4513',
                  }
                }
              }}
            />

            <PasswordInput
              label={t('password')}
              placeholder={t('passwordPlaceholder')}
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              error={errors.password}
              required
              size="md"
              styles={{
                input: {
                  borderColor: errors.password ? '#fa5252' : 'rgba(139, 69, 19, 0.3)',
                  '&:focus': {
                    borderColor: '#8B4513',
                  }
                }
              }}
            />

            <Group justify="space-between">
              <Checkbox
                label={t('rememberMe')}
                checked={data.remember}
                onChange={(e) => setData('remember', e.currentTarget.checked)}
                color="#8B4513"
                size="sm"
              />

              {canResetPassword && (
                <Link href={route('password.request')}>
                  <Anchor size="sm" c="#8B4513">
                    {t('forgotPassword')}
                  </Anchor>
                </Link>
              )}
            </Group>

            <Button
              type="submit"
              size="lg"
              fullWidth
              loading={processing}
              leftSection={<LogIn size={20} />}
              style={{
                backgroundColor: '#8B4513',
                fontWeight: 600,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#6d3410'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 69, 19, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#8B4513'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {t('login')}
            </Button>
          </Stack>
        </form>

        <Divider my="xl" label={t('or')} labelPosition="center" />

        {/* Register Link */}
        <Text ta="center" size="sm" c="#654321">
          {t('dontHaveAccount')}{' '}
          <Link href={route('register')}>
            <Anchor c="#8B4513" fw={600}>
              {t('createAccount')}
            </Anchor>
          </Link>
        </Text>
      </Paper>
    </AuthLayout>
  )
}

export default Login