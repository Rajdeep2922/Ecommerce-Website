import { createPortal } from 'react-dom'
import { useToast } from '../context/ToastContext'
import { useState, useEffect } from 'react'

function Toast() {
    const { toasts, removeToast } = useToast()
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    if (toasts.length === 0) return null

    const containerStyle = {
        position: 'fixed',
        bottom: '24px',
        left: isMobile ? '50%' : 'auto',
        right: isMobile ? 'auto' : '24px',
        transform: isMobile ? 'translateX(-50%)' : 'none',
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: isMobile ? 'calc(100% - 32px)' : 'auto',
        maxWidth: '380px'
    }

    return createPortal(
        <div style={containerStyle}>
            {toasts.map((toast) => {
                const isSuccess = toast.type === 'success'
                const isError = toast.type === 'error'

                const toastStyle = {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px 20px',
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    borderRadius: '12px',
                    border: `1px solid ${isError ? '#ef444440' : '#10b98140'}`,
                    boxShadow: `0 20px 50px rgba(0, 0, 0, 0.4), 0 0 20px ${isError ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)'}`,
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)'
                }

                const iconContainerStyle = {
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: isError ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                }

                const iconStyle = {
                    fontSize: '16px',
                    color: isError ? '#ef4444' : '#10b981'
                }

                const messageStyle = {
                    color: '#f8fafc',
                    fontSize: '14px',
                    fontWeight: '500',
                    lineHeight: '1.4'
                }

                return (
                    <div
                        key={toast.id}
                        style={toastStyle}
                        onClick={() => removeToast(toast.id)}
                    >
                        <div style={iconContainerStyle}>
                            <span style={iconStyle}>
                                {isSuccess ? '✓' : isError ? '✕' : 'ℹ'}
                            </span>
                        </div>
                        <span style={messageStyle}>{toast.message}</span>
                    </div>
                )
            })}
        </div>,
        document.body
    )
}

export default Toast
