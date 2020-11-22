import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const InternalLink = ({
  as,
  children,
  id,
  href,
  prefetch = true,
  ...props
}) => {
  const router = useRouter()
  return (
    <Link as={as} prefetch={prefetch} href={href} id={id}>
      <a
        onClick={(e) => {
          e.preventDefault()
          router.push(href)
        }}
        {...props}
      >
        {children}
      </a>
    </Link>
  )
}

export default InternalLink
