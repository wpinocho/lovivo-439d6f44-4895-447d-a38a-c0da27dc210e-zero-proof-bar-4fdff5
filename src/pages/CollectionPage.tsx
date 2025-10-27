import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { EcommerceTemplate } from '@/templates/EcommerceTemplate'
import { ProductCard } from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { supabase, type Collection, type Product } from '@/lib/supabase'
import { STORE_ID } from '@/lib/config'
import { Sparkles, ArrowLeft } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

const CollectionPage = () => {
  const { handle } = useParams<{ handle: string }>()
  const navigate = useNavigate()
  const [collection, setCollection] = useState<Collection | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (handle) {
      fetchCollectionAndProducts()
    }
  }, [handle])

  const fetchCollectionAndProducts = async () => {
    try {
      // Fetch collection
      const { data: collectionData, error: collectionError } = await supabase
        .from('collections')
        .select('*')
        .eq('handle', handle)
        .eq('status', 'active')
        .eq('store_id', STORE_ID)
        .single()

      if (collectionError || !collectionData) {
        setNotFound(true)
        setLoading(false)
        return
      }

      setCollection(collectionData)

      // Fetch products in this collection
      const { data: collectionProducts, error: cpError } = await supabase
        .from('collection_products')
        .select('product_id')
        .eq('collection_id', collectionData.id)

      if (cpError) {
        console.error('Error fetching collection products:', cpError)
        setLoading(false)
        return
      }

      if (!collectionProducts || collectionProducts.length === 0) {
        setProducts([])
        setLoading(false)
        return
      }

      const productIds = collectionProducts.map(cp => cp.product_id)

      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('status', 'active')
        .in('id', productIds)
        .order('created_at', { ascending: false })

      if (productsError) {
        console.error('Error fetching products:', productsError)
        setLoading(false)
        return
      }

      setProducts(productsData || [])
    } catch (error) {
      console.error('Error fetching collection:', error)
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <EcommerceTemplate>
        <div className="space-y-8">
          <Skeleton className="h-64 w-full rounded-2xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-96 rounded-2xl" />
            ))}
          </div>
        </div>
      </EcommerceTemplate>
    )
  }

  if (notFound || !collection) {
    return (
      <EcommerceTemplate>
        <div className="text-center py-16">
          <h1 className="text-4xl font-bold text-white mb-4">Collection not found</h1>
          <p className="text-y2k-aqua mb-8">The collection you're looking for doesn't exist.</p>
          <Button 
            onClick={() => navigate('/collections')}
            className="bg-y2k-cyan hover:bg-y2k-aqua text-y2k-black font-bold"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Collections
          </Button>
        </div>
      </EcommerceTemplate>
    )
  }

  return (
    <EcommerceTemplate>
      {/* Collection Header */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-y2k-black rounded-3xl mb-12">
        {collection.image && (
          <div className="absolute inset-0">
            <img 
              src={collection.image}
              alt={collection.name}
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-y2k-black via-y2k-black/50 to-transparent"></div>
          </div>
        )}

        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-y2k-cyan rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-y2k-aqua rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Button
            variant="ghost"
            onClick={() => navigate('/collections')}
            className="mb-6 text-y2k-cyan hover:text-y2k-aqua"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Collections
          </Button>

          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full y2k-glass y2k-border-glow">
            <Sparkles className="w-4 h-4 text-y2k-cyan" />
            <span className="text-y2k-aqua text-sm font-bold uppercase tracking-wider">Collection</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 y2k-gradient-text leading-tight">
            {collection.name}
          </h1>

          {collection.description && (
            <p className="text-xl md:text-2xl text-y2k-aqua max-w-3xl mx-auto font-light">
              {collection.description}
            </p>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-20">
        {products.length === 0 ? (
          <div className="text-center py-16 y2k-glass rounded-3xl y2k-border-glow">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-y2k-cyan/20 mb-6">
              <Sparkles className="w-10 h-10 text-y2k-cyan" />
            </div>
            <h2 className="text-3xl font-black text-white mb-4">
              No Products Yet
            </h2>
            <p className="text-y2k-aqua text-lg mb-8">
              This collection is being curated. Check back soon!
            </p>
            <Button 
              onClick={() => navigate('/collections')}
              className="bg-y2k-cyan hover:bg-y2k-aqua text-y2k-black font-bold"
            >
              Explore Other Collections
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-black text-white">
                {products.length} {products.length === 1 ? 'Product' : 'Products'}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="transform hover:scale-105 transition-all duration-300">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </EcommerceTemplate>
  )
}

export default CollectionPage