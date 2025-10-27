import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { HeadlessProductCard } from "@/components/headless/HeadlessProductCard"
import type { Product } from "@/lib/supabase"
import { Sparkles } from "lucide-react"

interface ProductCardUIProps {
  product: Product
}

export const ProductCardUI = ({ product }: ProductCardUIProps) => {
  return (
    <HeadlessProductCard product={product}>
      {(logic) => (
        <Card className="bg-transparent border-0 overflow-hidden group">
          <CardContent className="p-0">
            <div className="y2k-glass rounded-2xl overflow-hidden y2k-border-glow hover:scale-105 transition-all duration-300">
              <Link to={`/products/${logic.product.slug}`} className="block">
                <div className="aspect-square bg-gradient-to-br from-y2k-cyan/10 to-y2k-aqua/10 overflow-hidden relative">
                  {(logic.matchingVariant?.image || (logic.product.images && logic.product.images.length > 0)) ? (
                    <img
                      src={(logic.matchingVariant?.image as any) || logic.product.images![0]}
                      alt={logic.product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Sparkles className="w-16 h-16 text-y2k-cyan" />
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {logic.discountPercentage && (
                      <span className="bg-y2k-cyan text-y2k-black text-xs px-3 py-1 rounded-full font-black uppercase">
                        -{logic.discountPercentage}%
                      </span>
                    )}
                    {logic.product.featured && (
                      <span className="bg-y2k-aqua text-y2k-black text-xs px-3 py-1 rounded-full font-black uppercase">
                        Featured
                      </span>
                    )}
                    {!logic.inStock && (
                      <span className="bg-gray-600 text-white text-xs px-3 py-1 rounded-full font-black uppercase">
                        Out of stock
                      </span>
                    )}
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-y2k-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </Link>

              <div className="p-4">
                <Link to={`/products/${logic.product.slug}`}>
                  <h3 className="text-white font-bold text-base mb-2 line-clamp-2 group-hover:text-y2k-cyan transition-colors">
                    {logic.product.title}
                  </h3>
                  {logic.product.description && (
                    <p className="text-y2k-aqua/70 text-xs mb-3 line-clamp-2">
                      {logic.product.description.replace(/<[^>]*>/g, '')}
                    </p>
                  )}
                </Link>

                {logic.hasVariants && logic.options && (
                  <div className="mb-3 space-y-2">
                    {logic.options.map((opt) => (
                      <div key={opt.id}>
                        <div className="text-xs font-bold text-y2k-cyan mb-1 uppercase">{opt.name}</div>
                        <div className="flex flex-wrap gap-2">
                          {opt.values.filter(val => logic.isOptionValueAvailable(opt.name, val)).map((val) => {
                            const isSelected = logic.selected[opt.name] === val
                            const swatch = opt.name.toLowerCase() === 'color' ? opt.swatches?.[val] : undefined

                            if (swatch) {
                              return (
                                <button
                                  key={val}
                                  type="button"
                                  onClick={() => logic.handleOptionChange(opt.name, val)}
                                  title={`${opt.name}: ${val}`}
                                  className={`h-6 w-6 rounded-full border-2 ${
                                    isSelected ? 'border-y2k-cyan ring-2 ring-y2k-cyan/50' : 'border-y2k-aqua/30'
                                  } ${logic.selected[opt.name] && !isSelected ? 'opacity-40' : ''}`}
                                  style={{ backgroundColor: swatch }}
                                  aria-label={`${opt.name}: ${val}`}
                                />
                              )
                            }

                            return (
                              <button
                                key={val}
                                type="button"
                                onClick={() => logic.handleOptionChange(opt.name, val)}
                                className={`border rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                                  isSelected 
                                    ? 'border-y2k-cyan bg-y2k-cyan text-y2k-black' 
                                    : logic.selected[opt.name] && !isSelected
                                      ? 'border-y2k-aqua/20 bg-transparent text-y2k-aqua/40'
                                      : 'border-y2k-aqua/30 bg-transparent text-y2k-aqua hover:border-y2k-cyan'
                                }`}
                                aria-pressed={isSelected}
                                aria-label={`${opt.name}: ${val}`}
                                title={`${opt.name}: ${val}`}
                              >
                                {val}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-y2k-cyan font-black text-lg">
                      {logic.formatMoney(logic.currentPrice)}
                    </span>
                    {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
                      <span className="text-y2k-aqua/50 text-xs line-through">
                        {logic.formatMoney(logic.currentCompareAt)}
                      </span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    onClick={() => {
                      logic.onAddToCartSuccess()
                      logic.handleAddToCart()
                    }}
                    disabled={!logic.canAddToCart}
                    className="bg-y2k-cyan hover:bg-y2k-aqua text-y2k-black font-bold rounded-full px-4 transition-all duration-300 disabled:opacity-50"
                  >
                    {logic.inStock ? 'Add' : 'Out of stock'}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </HeadlessProductCard>
  )
}