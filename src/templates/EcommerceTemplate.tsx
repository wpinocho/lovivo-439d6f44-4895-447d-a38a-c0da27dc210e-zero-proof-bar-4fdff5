import { ReactNode } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { ProfileMenu } from '@/components/ProfileMenu'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import { useCartUI } from '@/components/CartProvider'
import { useCart } from '@/contexts/CartContext'

interface EcommerceTemplateProps {
  children: ReactNode
  pageTitle?: string
  showCart?: boolean
  className?: string
  headerClassName?: string
  footerClassName?: string
  layout?: 'default' | 'full-width' | 'centered'
}

export const EcommerceTemplate = ({
  children,
  pageTitle,
  showCart = true,
  className,
  headerClassName,
  footerClassName,
  layout = 'default'
}: EcommerceTemplateProps) => {
  const { openCart } = useCartUI()
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  const header = (
    <div className={`py-4 bg-y2k-black/95 backdrop-blur-lg border-b border-y2k-cyan/20 ${headerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-black y2k-gradient-text hover:scale-105 transition-transform">
              <BrandLogoLeft />
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              <Link 
                to="/" 
                className="text-y2k-aqua hover:text-y2k-cyan transition-colors font-bold uppercase text-sm tracking-wider"
              >
                Home
              </Link>
              <Link 
                to="/collections" 
                className="text-y2k-aqua hover:text-y2k-cyan transition-colors font-bold uppercase text-sm tracking-wider"
              >
                Collections
              </Link>
              <Link 
                to="/about" 
                className="text-y2k-aqua hover:text-y2k-cyan transition-colors font-bold uppercase text-sm tracking-wider"
              >
                About Us
              </Link>
              <Link 
                to="/blog" 
                className="text-y2k-aqua hover:text-y2k-cyan transition-colors font-bold uppercase text-sm tracking-wider"
              >
                Blog
              </Link>
            </nav>
          </div>

          {/* Profile & Cart */}
          <div className="flex items-center space-x-2">
            <ProfileMenu />
            
            {showCart && (
              <Button
                variant="ghost"
                size="icon"
                onClick={openCart}
                className="relative text-y2k-cyan hover:text-y2k-aqua hover:bg-y2k-cyan/10 transition-all"
                aria-label="Ver carrito"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-y2k-cyan text-y2k-black text-xs font-black rounded-full h-5 w-5 flex items-center justify-center y2k-box-glow">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Page Title */}
        {pageTitle && (
          <div className="mt-6">
            <h1 className="text-4xl font-black y2k-gradient-text">
              {pageTitle}
            </h1>
          </div>
        )}
      </div>
    </div>
  )

  const footer = (
    <div className={`bg-y2k-black border-t border-y2k-cyan/20 py-12 ${footerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-black y2k-gradient-text mb-4">
              <BrandLogoLeft />
            </div>
            <p className="text-y2k-aqua/70">
              Premium zero-proof beverages for the modern lifestyle
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-black mb-4 text-y2k-cyan uppercase tracking-wider">Quick Links</h3>
            <div className="space-y-2">
              <Link 
                to="/" 
                className="block text-y2k-aqua hover:text-y2k-cyan transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/collections" 
                className="block text-y2k-aqua hover:text-y2k-cyan transition-colors"
              >
                Collections
              </Link>
              <Link 
                to="/about" 
                className="block text-y2k-aqua hover:text-y2k-cyan transition-colors"
              >
                About Us
              </Link>
              <Link 
                to="/blog" 
                className="block text-y2k-aqua hover:text-y2k-cyan transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-black mb-4 text-y2k-cyan uppercase tracking-wider">Connect</h3>
            <SocialLinks />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-y2k-cyan/20 text-center text-y2k-aqua/50">
          <p>&copy; 2024 Zero-Proof Bar. All rights reserved.</p>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <PageTemplate 
        header={header}
        footer={footer}
        className={className}
        layout={layout}
      >
        {children}
      </PageTemplate>
      
      {showCart && <FloatingCart />}
    </>
  )
}