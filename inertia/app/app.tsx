/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css'
import { createRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { useEffect, useState } from 'react'

const appName = import.meta.env.VITE_APP_NAME || 'Daryll and Hannah - Wedding'

const BrowserWarningModal = () => {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor
    const isFacebookBrowser = userAgent.includes('FBAN') || userAgent.includes('FBAV')
    const isInstagramBrowser = userAgent.includes('Instagram')
    const isHomepage = window.location.pathname === '/'

    if ((isFacebookBrowser || isInstagramBrowser) && isHomepage) {
      setShowModal(true)
    }
  }, [])

  if (!showModal) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: "'Inter Tight', sans-serif",
        textAlign: 'center',
        padding: '20px',
        zIndex: 9999,
      }}
    >
      <div style={{ animation: 'fadeIn 1s ease-in-out' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Open in Default Browser
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          You are using <b>Facebook</b> browser, which may cause layout issues.
          <br />
          <br />
          Please open this page by clicking the <b>3 dots</b> on the bottom right, then select{' '}
          <b>Open in External Browser</b>.
        </p>
        <button
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '1.5rem',
            color: 'white',
            cursor: 'pointer',
          }}
          onClick={() => setShowModal(false)}
        >
          &times;
        </button>
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  )
}

createInertiaApp({
  progress: { color: '#5468FF' },

  title: () => appName,

  resolve: (name) => {
    return resolvePageComponent(`../pages/${name}.tsx`, import.meta.glob('../pages/**/*.tsx'))
  },

  setup({ el, App, props }) {
    createRoot(el).render(
      <>
        <BrowserWarningModal />
        <App {...props} />
      </>
    )
  },
})
