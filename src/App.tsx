import { useState } from "react";
import { AboutSection } from "./components/AboutSection";
import { CartDrawer, type CartItem } from "./components/CartDrawer";
import { ContactFooter } from "./components/ContactFooter";
import { GallerySection } from "./components/GallerySection";
import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";
import { ShopSection } from "./components/ShopSection";
import { SpecsModal } from "./components/SpecsModal";
import { NITRO_PRODUCTS, type NitroProduct } from "./data/products";

export function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [specsProduct, setSpecsProduct] = useState<NitroProduct | null>(null);

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (product: NitroProduct) => {
    setOrderPlaced(false);
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleHeroBuyNow = () => {
    // Flagship Nitro Green (index 2)
    const flagship = NITRO_PRODUCTS[2];
    if (cartItems.length === 0) {
      handleAddToCart(flagship);
    } else {
      setOrderPlaced(false);
      setCartOpen(true);
    }
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === id
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== id));
  };

  const handleCheckout = () => {
    setOrderPlaced(true);
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar
        cartCount={totalCount}
        onOpenCart={() => {
          setOrderPlaced(false);
          setCartOpen(true);
        }}
      />

      <main>
        <HeroSection onBuyNow={handleHeroBuyNow} />
        <AboutSection />
        <ShopSection
          onAddToCart={handleAddToCart}
          onSelectSpecs={(product) => setSpecsProduct(product)}
        />
        <GallerySection />
      </main>

      <ContactFooter />

      <CartDrawer
        open={cartOpen}
        items={cartItems}
        orderPlaced={orderPlaced}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onAddProduct={handleAddToCart}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <SpecsModal
        product={specsProduct}
        onClose={() => setSpecsProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default App;
