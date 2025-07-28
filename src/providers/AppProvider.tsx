import { ReactNode } from 'react'
import { LanguageProvider } from './LanguageProvider'
import QueryProvider from './QueryProvider'
interface AppProviderProps {
  children: ReactNode
}


export default function AppProvider({ children }: AppProviderProps) {
  return (
    <QueryProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </QueryProvider>
  )
}
