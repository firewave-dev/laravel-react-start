import React from 'react'
import { Paper, Title, Text, Group, Box, Container } from '@mantine/core'
import { useLanguage } from '../../../../contexts/LanguageContext'
import styles from './Footer.module.css'

const Footer = () => {
  const { t } = useLanguage()

  return (
    <Paper p="xl" mt="xl" className={styles.footer}>
      <Container size="xl">
        <Group justify="space-between" align="flex-start">
          <Box>
            <Title order={4} c="white" mb="sm">
              {t('churchName')}
            </Title>
            <Text className={styles.faithCommunity}>
              {t('faithCommunity')}
            </Text>
          </Box>
          <Box>
            <Text className={styles.copyright}>
              © {new Date().getFullYear()} {t('churchName')}. {t('allRightsReserved')}.
            </Text>
          </Box>
        </Group>
      </Container>
    </Paper>
  )
}

export default Footer
