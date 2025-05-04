import type { FeatureFlagsStore } from '~/core/services/feature-flags/feature-flags.service'
import { useState } from 'react'
import { useDi } from '~/core/di/useDi'
import styles from './FeatureToggle.module.css'

export function FeatureToggle() {
  const featureFlagsService = useDi('FEATURE_FLAGS_SERVICE_TOKEN')
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const handleToggleFlag = (flag: string) => {
    featureFlagsService.toggle(flag as keyof FeatureFlagsStore)
  }

  return (
    <>
      <button
        type="button"
        className={styles.featureToggleButton}
        onClick={toggleModal}
        aria-label="Toggle feature flags"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.modalOverlay} onClick={toggleModal}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Feature Flags</h2>
              <button type="button" className={styles.closeButton} onClick={toggleModal}>×</button>
            </div>
            <div className={styles.modalContent}>
              {featureFlagsService.getAll().map(flag => (
                <div key={flag.id} className={styles.featureItem}>
                  <div className={styles.featureInfo}>
                    <h3>{flag.name}</h3>
                    <p>{flag.description}</p>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={flag.enabled}
                      onChange={() => handleToggleFlag(flag.id)}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
