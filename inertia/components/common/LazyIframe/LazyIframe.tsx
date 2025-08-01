import { useRef, useEffect, useState } from 'react'

interface LazyIframeProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  src?: string
  title?: string
}
export function LazyIframe({ src, title, ...props }: LazyIframeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.25 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="w-full h-full relative">
      {visible && (
        <iframe
          src={src}
          title={title}
          width="100%"
          height="100%"
          loading="lazy"
          style={{ border: 0 }}
          allowFullScreen
          {...props}
        />
      )}
    </div>
  )
}
