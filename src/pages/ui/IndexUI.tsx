import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { FloatingCart } from '@/components/FloatingCart';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';
import { Sparkles, Flame, Zap } from 'lucide-react';

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    loading,
    loadingCollections,
    selectedCollectionId,
    filteredProducts,
    handleViewCollectionProducts,
    handleShowAllProducts,
  } = logic;

  const naSpiritsCollection = collections.find(c => c.handle === 'na-spirits');
  const bundlesCollection = collections.find(c => c.handle === 'starter-bundles');

  return (
    <EcommerceTemplate showCart={true}>
      {/* Hero Section - Y2K Mocktails */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-y2k-black">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-y2k-cyan rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-y2k-aqua rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-y2k-cyan rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full y2k-glass y2k-border-glow">
            <Sparkles className="w-4 h-4 text-y2k-cyan" />
            <span className="text-y2k-aqua text-sm font-bold uppercase tracking-wider">Zero Proof • Full Flavor</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-6 y2k-gradient-text leading-tight">
            ZERO-PROOF<br />BAR
          </h1>

          <p className="text-xl md:text-2xl text-y2k-aqua mb-8 max-w-3xl mx-auto font-light">
            Experience the future of non-alcoholic beverages. Premium NA spirits, bold mocktails, zero compromises.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-y2k-cyan hover:bg-y2k-aqua text-y2k-black font-bold text-lg px-8 py-6 rounded-full y2k-box-glow transition-all duration-300 hover:scale-105"
            >
              <Zap className="w-5 h-5 mr-2" />
              Discover Flavors
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-y2k-cyan text-y2k-cyan hover:bg-y2k-cyan hover:text-y2k-black font-bold text-lg px-8 py-6 rounded-full transition-all duration-300"
            >
              Shop Bundles
            </Button>
          </div>

          {/* Hero Product Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {filteredProducts.slice(0, 3).map((product, idx) => (
              <div 
                key={product.id}
                className="y2k-glass rounded-2xl p-6 y2k-border-glow hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${idx * 0.2}s` }}
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-y2k-cyan/20 to-y2k-aqua/20">
                  {product.images && product.images.length > 0 ? (
                    <img 
                      src={product.images[0]} 
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Sparkles className="w-16 h-16 text-y2k-cyan" />
                    </div>
                  )}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{product.title}</h3>
                <p className="text-y2k-aqua text-sm">${product.price?.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NA Spirits Grid */}
      {naSpiritsCollection && (
        <section className="py-20 bg-gradient-to-b from-y2k-black to-[#1a1a1a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Flame className="w-6 h-6 text-y2k-cyan" />
                <span className="text-y2k-cyan text-sm font-bold uppercase tracking-wider">Premium Selection</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-4 y2k-text-glow">
                NA SPIRITS
              </h2>
              <p className="text-y2k-aqua text-lg max-w-2xl mx-auto">
                Sophisticated non-alcoholic spirits crafted for the modern mixologist
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="y2k-glass rounded-2xl h-96 animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts
                  .filter(p => naSpiritsCollection.product_handles?.includes(p.handle || ''))
                  .map((product) => (
                    <div key={product.id} className="transform hover:scale-105 transition-all duration-300">
                      <ProductCard product={product} />
                    </div>
                  ))}
              </div>
            )}

            <div className="text-center mt-12">
              <Button 
                onClick={() => handleViewCollectionProducts(naSpiritsCollection.id)}
                className="bg-transparent border-2 border-y2k-cyan text-y2k-cyan hover:bg-y2k-cyan hover:text-y2k-black font-bold px-8 py-6 rounded-full transition-all duration-300"
              >
                View All Spirits
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Featured Recipes Section */}
      <section className="py-20 bg-y2k-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-y2k-cyan rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-y2k-aqua rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-y2k-cyan" />
              <span className="text-y2k-cyan text-sm font-bold uppercase tracking-wider">Mix It Up</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4 y2k-text-glow">
              FEATURED RECIPES
            </h2>
            <p className="text-y2k-aqua text-lg max-w-2xl mx-auto">
              Signature zero-proof cocktails crafted by expert mixologists
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Cyber Spritz",
                description: "NA Aperitif, tonic, fresh grapefruit, rosemary",
                image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&h=600&fit=crop"
              },
              {
                name: "Neon Mojito",
                description: "NA Rum, mint, lime, sparkling water, agave",
                image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&h=600&fit=crop"
              },
              {
                name: "Digital Martini",
                description: "NA Gin, dry vermouth, olive brine, lemon twist",
                image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=600&fit=crop"
              }
            ].map((recipe, idx) => (
              <div 
                key={idx}
                className="y2k-glass rounded-2xl overflow-hidden y2k-border-glow hover:scale-105 transition-all duration-300 group"
              >
                <div className="aspect-square overflow-hidden relative">
                  <img 
                    src={recipe.image} 
                    alt={recipe.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-y2k-black via-transparent to-transparent opacity-60"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-black text-white mb-2 y2k-gradient-text">{recipe.name}</h3>
                  <p className="text-y2k-aqua text-sm">{recipe.description}</p>
                  <Button 
                    variant="ghost" 
                    className="mt-4 text-y2k-cyan hover:text-y2k-aqua font-bold"
                  >
                    Get Recipe →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Starter Bundles */}
      {bundlesCollection && (
        <section className="py-20 bg-gradient-to-b from-[#1a1a1a] to-y2k-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6 text-y2k-cyan" />
                <span className="text-y2k-cyan text-sm font-bold uppercase tracking-wider">Best Value</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-white mb-4 y2k-text-glow">
                STARTER BUNDLES
              </h2>
              <p className="text-y2k-aqua text-lg max-w-2xl mx-auto">
                Everything you need to build your zero-proof bar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {filteredProducts
                .filter(p => bundlesCollection.product_handles?.includes(p.handle || ''))
                .map((product) => (
                  <div 
                    key={product.id}
                    className="y2k-glass rounded-3xl p-8 y2k-border-glow hover:scale-105 transition-all duration-300"
                  >
                    <div className="aspect-square rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-y2k-cyan/20 to-y2k-aqua/20">
                      {product.images && product.images.length > 0 ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Sparkles className="w-20 h-20 text-y2k-cyan" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-3xl font-black text-white mb-3 y2k-gradient-text">
                      {product.title}
                    </h3>
                    <p className="text-y2k-aqua mb-6">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-4xl font-black text-y2k-cyan">
                        ${product.price?.toFixed(2)}
                      </span>
                      <Button 
                        className="bg-y2k-cyan hover:bg-y2k-aqua text-y2k-black font-bold px-6 py-6 rounded-full y2k-box-glow transition-all duration-300"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-24 bg-y2k-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-y2k-cyan via-y2k-aqua to-y2k-cyan animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 y2k-text-glow">
            READY TO GO<br />ZERO-PROOF?
          </h2>
          <p className="text-xl text-y2k-aqua mb-10 max-w-2xl mx-auto">
            Join the movement. Discover bold flavors without the alcohol.
          </p>
          <Button 
            size="lg"
            className="bg-y2k-cyan hover:bg-y2k-aqua text-y2k-black font-black text-xl px-12 py-8 rounded-full y2k-box-glow animate-glow-pulse transition-all duration-300 hover:scale-110"
          >
            <Sparkles className="w-6 h-6 mr-2" />
            Discover Flavors
          </Button>
        </div>
      </section>

      <FloatingCart />
    </EcommerceTemplate>
  );
};