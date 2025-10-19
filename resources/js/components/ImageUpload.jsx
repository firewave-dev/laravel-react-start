import React, { useState } from 'react'
import { FileInput, Button, Group, Image, Text, Paper, ActionIcon } from '@mantine/core'
import { Upload, X } from 'lucide-react'
import { router } from '@inertiajs/react'

const ImageUpload = ({ 
  currentImage, 
  onImageChange, 
  uploadRoute = '/upload/avatar',
  label = 'Upload Image',
  accept = 'image/*'
}) => {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(currentImage || null)

  const handleFileSelect = async (file) => {
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    
    // Determine the field name based on route
    const fieldName = uploadRoute.includes('avatar') ? 'avatar' : 'image'
    formData.append(fieldName, file)

    try {
      const response = await fetch(uploadRoute, {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
        },
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setPreview(data.url)
        onImageChange(data.path) // Pass the storage path to parent
      }
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    onImageChange(null)
  }

  return (
    <div>
      <Text c="#FFD700" fw={500} size="sm" mb="xs">{label}</Text>
      
      {preview ? (
        <Paper
          p="md"
          withBorder
          style={{
            backgroundColor: 'rgba(26, 31, 46, 0.6)',
            border: '1px solid rgba(255, 215, 0, 0.2)',
            position: 'relative'
          }}
        >
          <Group justify="space-between" align="center">
            <Image
              src={preview}
              alt="Preview"
              width={120}
              height={120}
              fit="cover"
              radius="md"
            />
            <ActionIcon
              color="red"
              variant="filled"
              onClick={handleRemove}
            >
              <X size={16} />
            </ActionIcon>
          </Group>
        </Paper>
      ) : (
        <FileInput
          placeholder="Choose file"
          accept={accept}
          onChange={handleFileSelect}
          leftSection={<Upload size={16} />}
          disabled={uploading}
          styles={{
            input: {
              backgroundColor: 'rgba(26, 31, 46, 0.6)',
              border: '1px solid rgba(255, 215, 0, 0.2)',
              color: '#fff'
            }
          }}
        />
      )}
      
      {uploading && (
        <Text size="xs" c="#FFD700" mt="xs">Uploading...</Text>
      )}
    </div>
  )
}

export default ImageUpload
