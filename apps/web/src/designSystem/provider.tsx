'use client'

import { ConfigProvider } from 'antd'
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

import { Snackbar } from './providers/snackbar'
import './style/main.scss'
import { DarkTheme, LightTheme } from './theme/theme'

export type DesignSystemContext = {
  isMobile: boolean
  toggleTheme: () => void
  theme: any
}

const DesignSystemContext = createContext<DesignSystemContext>(undefined)

export const useDesignSystem = (): DesignSystemContext => {
  return useContext(DesignSystemContext)
}

type Props = {
  children: ReactNode
}

export namespace DesignSystem {
  export const Provider: React.FC<Props> = ({ children }) => {
    const [isMobile, setMobile] = useState(false)

    const isWindow = typeof window !== 'undefined'

    // const theme = LightTheme as any

    const [theme, setTheme] : any = useState(() => {
      return LightTheme
    });

    useEffect(() => {
      if (!isWindow) {
        return
      }

      const theme = localStorage.getItem('theme') || 'light';
      setTheme(theme === 'light' ? LightTheme : DarkTheme);
    }, [])



    const toggleTheme = () => {
      setTheme((prevTheme) => { 
        const newTheme = prevTheme === LightTheme ? DarkTheme : LightTheme;
        localStorage.setItem('theme', newTheme === LightTheme ? 'light' : 'dark');
        return newTheme;
       })
    }

    

    useEffect(() => {
      if (!isWindow) {
        return
      }

      setMobile(window.innerWidth < 992)

      const handleResize = () => {
        setMobile(window.innerWidth < 992)
      }

      // Attach the event listener
      window.addEventListener('resize', handleResize)

      // Cleanup the event listener on component unmount
      return () => {
        if (!isWindow) {
          return
        }

        window.removeEventListener('resize', handleResize)
      }
    }, [])

    return (
      <ConfigProvider theme={theme}>
        <DesignSystemContext.Provider value={{ isMobile, toggleTheme, theme }}>
          {children}
        </DesignSystemContext.Provider>
      </ConfigProvider>
    )
  }

  export const Nested: React.FC<Props> = ({ children }) => {
    return <Snackbar.Provider>{children}</Snackbar.Provider>
  }
}
