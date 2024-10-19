import { Text } from '@radix-ui/themes'
import React, { Component, ReactNode, ErrorInfo } from 'react'

// Define the Props interface
interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode // Optional custom fallback component
}

// Define the State interface
interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)

    // Initialize the error state
    this.state = {
      hasError: false,
    }
  }

  // This lifecycle method is invoked if any error occurs
  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true }
  }

  // You can log the error here (e.g., to an external service)
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
  }

  // Render the fallback UI or the children
  render(): ReactNode {
    const { hasError } = this.state
    const { fallback, children } = this.props

    if (hasError) {
      // If a fallback is provided, render it. Otherwise, display a default message.
      return fallback ? fallback : <Text align={'center'}>Something went wrong. Please try again later.</Text>
    }

    return children
  }
}

export default ErrorBoundary
