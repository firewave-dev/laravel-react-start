import React, { useEffect } from 'react'
import { Notification } from '@mantine/core'
import { Check, X, AlertCircle } from 'lucide-react'
import { usePage } from '@inertiajs/react'

const FlashMessage = () => {
  const { flash } = usePage().props
  const [visible, setVisible] = React.useState(false)

  useEffect(() => {
    if (flash?.success || flash?.error || flash?.info) {
      setVisible(true)
      const timer = setTimeout(() => setVisible(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [flash])

  if (!visible || (!flash?.success && !flash?.error && !flash?.info)) {
    return null
  }

  const getMessage = () => {
    if (flash.success) return { type: 'success', message: flash.success, icon: <Check size={18} /> }
    if (flash.error) return { type: 'error', message: flash.error, icon: <X size={18} /> }
    if (flash.info) return { type: 'info', message: flash.info, icon: <AlertCircle size={18} /> }
    return null
  }

  const data = getMessage()
  if (!data) return null

  const colors = {
    success: 'green',
    error: 'red',
    info: 'blue'
  }

  return (
    <div style={{ 
      position: 'fixed', 
      top: 80, 
      right: 20, 
      zIndex: 9999,
      maxWidth: '400px'
    }}>
      <Notification
        icon={data.icon}
        color={colors[data.type]}
        title={data.type.charAt(0).toUpperCase() + data.type.slice(1)}
        onClose={() => setVisible(false)}
        style={{
          backgroundColor: 'rgba(26, 31, 46, 0.95)',
          backdropFilter: 'blur(10px)',
          border: `1px solid rgba(255, 215, 0, 0.3)`,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
        }}
        styles={{
          title: { color: '#FFD700' },
          description: { color: '#b8b8b8' }
        }}
      >
        {data.message}
      </Notification>
    </div>
  )
}

export default FlashMessage
