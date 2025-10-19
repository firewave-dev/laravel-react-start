import React from 'react'
import { Tabs, TextInput, Textarea, Badge, Group, Text, Paper } from '@mantine/core'
import { Globe } from 'lucide-react'

const LanguageTabs = ({ 
  data, 
  setData, 
  errors, 
  fields = ['title', 'excerpt', 'content'],
  fieldLabels = {
    title: 'Title',
    excerpt: 'Excerpt',
    content: 'Content',
    description: 'Description',
    location: 'Location',
    message: 'Message'
  },
  RichTextEditor = null
}) => {
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'sr', name: 'Serbian', flag: '🇷🇸' },
  ]

  const handleTranslationChange = (locale, field, value) => {
    setData('translations', {
      ...data.translations,
      [locale]: {
        ...data.translations?.[locale],
        [field]: value
      }
    })
  }

  return (
    <Tabs defaultValue="en" mb="xl">
      <Tabs.List mb="md">
        {languages.map((lang) => (
          <Tabs.Tab 
            key={lang.code} 
            value={lang.code}
            leftSection={<Text size="sm">{lang.flag}</Text>}
          >
            <Group gap="xs">
              <Text size="sm">{lang.name}</Text>
              {lang.code === 'en' && (
                <Badge size="xs" color="blue" variant="light">Primary</Badge>
              )}
            </Group>
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {/* English Tab - Primary content */}
      <Tabs.Panel value="en">
        <Text size="sm" c="#FFD700" mb="md" fw={500}>
          <Globe size={16} style={{ marginRight: 8, verticalAlign: 'text-bottom' }} />
          Primary Language Content
        </Text>
        
        {fields.map((field) => {
          if (field === 'content' && RichTextEditor) {
            return (
              <RichTextEditor
                key={field}
                label={fieldLabels[field]}
                content={data[field] || ''}
                onChange={(value) => setData(field, value)}
              />
            )
          }
          
          if (field === 'content' && !RichTextEditor) {
            return (
              <Textarea
                key={field}
                label={fieldLabels[field]}
                value={data[field] || ''}
                onChange={(e) => setData(field, e.currentTarget.value)}
                error={errors[field]}
                mb="md"
                minRows={6}
                styles={{
                  label: { color: '#FFD700', fontWeight: 500, marginBottom: 8 },
                  input: {
                    backgroundColor: 'rgba(26, 31, 46, 0.6)',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    color: '#fff'
                  }
                }}
              />
            )
          }
          
          const Component = field === 'excerpt' || field === 'description' || field === 'message' 
            ? Textarea : TextInput
            
          return (
            <Component
              key={field}
              label={fieldLabels[field]}
              value={data[field] || ''}
              onChange={(e) => setData(field, e.currentTarget.value)}
              error={errors[field]}
              mb="md"
              styles={{
                label: { color: '#FFD700', fontWeight: 500, marginBottom: 8 },
                input: {
                  backgroundColor: 'rgba(26, 31, 46, 0.6)',
                  border: '1px solid rgba(255, 215, 0, 0.2)',
                  color: '#fff'
                }
              }}
              minRows={Component === Textarea ? 3 : undefined}
            />
          )
        })}
      </Tabs.Panel>

      {/* French Tab */}
      <Tabs.Panel value="fr">
        <Text size="sm" c="#FFD700" mb="md" fw={500}>
          <Globe size={16} style={{ marginRight: 8, verticalAlign: 'text-bottom' }} />
          French Translation (Optional)
        </Text>
        
        {fields.map((field) => {
          if (field === 'content' && RichTextEditor) {
            return (
              <RichTextEditor
                key={field}
                label={`${fieldLabels[field]} (French)`}
                content={data.translations?.fr?.[field] || ''}
                onChange={(value) => handleTranslationChange('fr', field, value)}
              />
            )
          }
          
          if (field === 'content' && !RichTextEditor) {
            return (
              <Textarea
                key={field}
                label={`${fieldLabels[field]} (French)`}
                placeholder={`Enter French ${fieldLabels[field].toLowerCase()}...`}
                value={data.translations?.fr?.[field] || ''}
                onChange={(e) => handleTranslationChange('fr', field, e.currentTarget.value)}
                mb="md"
                minRows={6}
                styles={{
                  label: { color: '#FFD700', fontWeight: 500, marginBottom: 8 },
                  input: {
                    backgroundColor: 'rgba(26, 31, 46, 0.6)',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    color: '#fff'
                  }
                }}
              />
            )
          }
          
          const Component = field === 'excerpt' || field === 'description' || field === 'message' 
            ? Textarea : TextInput
            
          return (
            <Component
              key={field}
              label={`${fieldLabels[field]} (French)`}
              placeholder={`Enter French ${fieldLabels[field].toLowerCase()}...`}
              value={data.translations?.fr?.[field] || ''}
              onChange={(e) => handleTranslationChange('fr', field, e.currentTarget.value)}
              mb="md"
              styles={{
                label: { color: '#FFD700', fontWeight: 500, marginBottom: 8 },
                input: {
                  backgroundColor: 'rgba(26, 31, 46, 0.6)',
                  border: '1px solid rgba(255, 215, 0, 0.2)',
                  color: '#fff'
                }
              }}
              minRows={Component === Textarea ? 3 : undefined}
            />
          )
        })}
      </Tabs.Panel>

      {/* Serbian Tab */}
      <Tabs.Panel value="sr">
        <Text size="sm" c="#FFD700" mb="md" fw={500}>
          <Globe size={16} style={{ marginRight: 8, verticalAlign: 'text-bottom' }} />
          Serbian Translation (Optional)
        </Text>
        
        {fields.map((field) => {
          if (field === 'content' && RichTextEditor) {
            return (
              <RichTextEditor
                key={field}
                label={`${fieldLabels[field]} (Serbian)`}
                content={data.translations?.sr?.[field] || ''}
                onChange={(value) => handleTranslationChange('sr', field, value)}
              />
            )
          }
          
          if (field === 'content' && !RichTextEditor) {
            return (
              <Textarea
                key={field}
                label={`${fieldLabels[field]} (Serbian)`}
                placeholder={`Enter Serbian ${fieldLabels[field].toLowerCase()}...`}
                value={data.translations?.sr?.[field] || ''}
                onChange={(e) => handleTranslationChange('sr', field, e.currentTarget.value)}
                mb="md"
                minRows={6}
                styles={{
                  label: { color: '#FFD700', fontWeight: 500, marginBottom: 8 },
                  input: {
                    backgroundColor: 'rgba(26, 31, 46, 0.6)',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    color: '#fff'
                  }
                }}
              />
            )
          }
          
          const Component = field === 'excerpt' || field === 'description' || field === 'message' 
            ? Textarea : TextInput
            
          return (
            <Component
              key={field}
              label={`${fieldLabels[field]} (Serbian)`}
              placeholder={`Enter Serbian ${fieldLabels[field].toLowerCase()}...`}
              value={data.translations?.sr?.[field] || ''}
              onChange={(e) => handleTranslationChange('sr', field, e.currentTarget.value)}
              mb="md"
              styles={{
                label: { color: '#FFD700', fontWeight: 500, marginBottom: 8 },
                input: {
                  backgroundColor: 'rgba(26, 31, 46, 0.6)',
                  border: '1px solid rgba(255, 215, 0, 0.2)',
                  color: '#fff'
                }
              }}
              minRows={Component === Textarea ? 3 : undefined}
            />
          )
        })}
      </Tabs.Panel>
    </Tabs>
  )
}

export default LanguageTabs
