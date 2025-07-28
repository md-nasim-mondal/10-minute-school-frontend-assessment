'use client'

import { useLanguage } from '@/providers/LanguageProvider'

interface CallToActionProps {
  className?: string
  name: string
  price?: number
}

function CallToAction({ className = '', name, price = 1000 }: CallToActionProps) {
  const { t } = useLanguage()
  
  return (
    <div className={`${className}`}>
      <div className="mb-4">
        <div className="text-2xl font-bold text-green-600 mb-2">
          {t('price.default') !== 'price.default' ? t('price.default').replace('1000', price.toString()) : `৳${price}`}
        </div>
        <button 
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          onClick={() => {
            // Add enrollment logic here
            console.log('Enrolling in course...')
          }}
        >
          {name || t('enroll.now')}
        </button>
      </div>
    </div>
  )
}

export default CallToAction;
