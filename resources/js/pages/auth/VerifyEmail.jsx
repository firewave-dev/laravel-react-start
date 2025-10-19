import React from 'react'
import { Paper, Title, Text, Button, Stack, Alert } from '@mantine/core'
import { Link, useForm } from '@inertiajs/react'
import { Mail, RefreshCw } from 'lucide-react'
import AuthLayout from '../../layouts/auth/AuthLayout'
import { useLanguage } from '../../contexts/LanguageContext'

const VerifyEmail = ({ status }) => {
  const { t } = useLanguage()
  const { post, processing } = useForm({})

  const submit = (e) => {
    e.preventDefault()
    post(route('verification.send'))
  }

  return (
    <AuthLayout>
      <Paper 
        p="xl" 
        withBorder 
        shadow="xl"
        style={{ 
          width: '100%',
          maxWidth: '500px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(139, 69, 19, 0.25)',
          borderRadius: '12px',
        }}
      >
        <Stack gap="lg" align="center">
          {/* Icon */}
          <Mail size={64} color="#8B4513" strokeWidth={1.5} />

          {/* Header */}
          <Title 
            order={1} 
            c="#8B4513" 
            ta="center"
            style={{ fontFamily: 'serif', fontSize: '2rem' }}
          >
            {t('verifyEmail')}
          </Title>

          {/* Success Message */}
          {status === 'verification-link-sent' && (
            <Alert color="green" variant="light" style={{ width: '100%' }}>
              {t('verificationEmailSent')}
            </Alert>
          )}

          {/* Instructions */}
          <Stack gap="sm" style={{ width: '100%' }}>
            <Text size="md" c="#654321" ta="center" style={{ lineHeight: 1.7 }}>
              {t('verificationSent')}
            </Text>
            <Text size="md" c="#654321" ta="center" style={{ lineHeight: 1.7 }}>
              {t('checkEmail')}
            </Text>
          </Stack>

          {/* Resend Button */}
          <form onSubmit={submit} style={{ width: '100%' }}>
            <Button
              type="submit"
              size="lg"
              fullWidth
              loading={processing}
              leftSection={<RefreshCw size={20} />}
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
              {t('resendVerification')}
            </Button>
          </form>

          {/* Back to Login */}
          <Link href={route('login')}>
            <Text size="sm" c="#8B4513" fw={600}>
              ← {t('backToLogin')}
            </Text>
          </Link>
        </Stack>
      </Paper>
    </AuthLayout>
  )
}

export default VerifyEmail
