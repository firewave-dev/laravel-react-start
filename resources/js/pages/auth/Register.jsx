import React from 'react'
import { Paper, Title, TextInput, PasswordInput, Button, Stack, Text, Anchor, Divider, Alert } from '@mantine/core'
import { Link, useForm } from '@inertiajs/react'
import { UserPlus } from 'lucide-react'
import AuthLayout from '../../layouts/auth/AuthLayout'
import { useLanguage } from '../../contexts/LanguageContext'

const Register = () => {
  const { t } = useLanguage()
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const submit = (e) => {
    e.preventDefault()
    post(route('register.store'), {
      onFinish: () => reset('password', 'password_confirmation'),
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
            {t('memberRegister')}
          </Title>
          <Text size="sm" c="#654321" ta="center">
            {t('joinCommunity')}
          </Text>
        </Stack>

        {/* Form */}
        <form onSubmit={submit}>
          <Stack gap="md">
            <TextInput
              label={t('fullName')}
              placeholder={t('fullNamePlaceholder')}
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              error={errors.name}
              required
              size="md"
              styles={{
                input: {
                  borderColor: errors.name ? '#fa5252' : 'rgba(139, 69, 19, 0.3)',
                  '&:focus': {
                    borderColor: '#8B4513',
                  }
                }
              }}
            />

            <TextInput
              label={t('emailAddress')}
              placeholder={t('emailPlaceholder')}
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              error={errors.email}
              required
              size="md"
              type="email"
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

            <PasswordInput
              label={t('confirmPassword')}
              placeholder={t('confirmPasswordPlaceholder')}
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              error={errors.password_confirmation}
              required
              size="md"
              styles={{
                input: {
                  borderColor: errors.password_confirmation ? '#fa5252' : 'rgba(139, 69, 19, 0.3)',
                  '&:focus': {
                    borderColor: '#8B4513',
                  }
                }
              }}
            />

            <Button
              type="submit"
              size="lg"
              fullWidth
              loading={processing}
              leftSection={<UserPlus size={20} />}
              style={{
                backgroundColor: '#8B4513',
                fontWeight: 600,
                transition: 'all 0.3s ease',
                marginTop: '0.5rem'
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
              {t('createAccount')}
            </Button>
          </Stack>
        </form>

        <Divider my="xl" label={t('or')} labelPosition="center" />

        {/* Login Link */}
        <Text ta="center" size="sm" c="#654321">
          {t('alreadyHaveAccount')}{' '}
          <Link href={route('login')}>
            <Anchor c="#8B4513" fw={600}>
              {t('login')}
            </Anchor>
          </Link>
        </Text>
      </Paper>
    </AuthLayout>
  )
}

export default Register