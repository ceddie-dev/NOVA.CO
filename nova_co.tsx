import React, { useState, useEffect, createContext, useContext, useMemo, useCallback } from 'react';
import { 
  ShoppingBag, Search, User, Menu, X, ChevronRight, ChevronLeft, 
  Star, Filter, ArrowUpDown, Trash2, Plus, Minus, Check, 
  CreditCard, Truck, Package, LayoutDashboard, Settings, 
  Users, BarChart3, AlertCircle, LogOut
} from 'lucide-react';

const INITIAL_PRODUCTS = [
  { id: '1', name: 'Minimal Ceramic Mug', description: 'Hand-finished ceramic mug designed for your morning coffee or afternoon tea. Microwave and dishwasher safe.', price: 18.00, category: 'Drinkware', sku: 'NOVA-D001', stock: 24, rating: 4.8, reviews: 12, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=600', featured: true, sale: false },
  { id: '2', name: 'Matte Black Tumbler', description: 'Insulated stainless steel tumbler keeps drinks cold for 24 hours or hot for 12.', price: 28.00, category: 'Drinkware', sku: 'NOVA-D002', stock: 15, rating: 4.9, reviews: 34, image: 'https://images.unsplash.com/photo-1618365908648-718d461536c5?auto=format&fit=crop&q=80&w=600', featured: false, sale: true },
  { id: '3', name: 'Soy Wax Candle - Sandalwood', description: 'Hand-poured soy candle with a wooden wick. Burn time: 40 hours.', price: 24.00, category: 'Home', sku: 'NOVA-H001', stock: 8, rating: 4.5, reviews: 8, image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=600', featured: true, sale: false },
  { id: '4', name: 'Oak Desk Organizer', description: 'Solid oak organizer for pens, clips, and your phone. Keeps your workspace tidy.', price: 45.00, category: 'Desk', sku: 'NOVA-DK001', stock: 5, rating: 4.7, reviews: 19, image: 'https://images.unsplash.com/photo-1595225306915-08e1a8bb2839?auto=format&fit=crop&q=80&w=600', featured: true, sale: false },
  { id: '5', name: 'Heavyweight Canvas Tote', description: 'Durable cotton canvas tote bag, perfect for groceries or a laptop.', price: 22.00, category: 'Gifts', sku: 'NOVA-G001', stock: 40, rating: 4.6, reviews: 22, image: 'https://images.unsplash.com/photo-1597484661643-2f5fef640df1?auto=format&fit=crop&q=80&w=600', featured: false, sale: false },
  { id: '6', name: 'Linen Bound Notebook', description: 'Lay-flat dot grid notebook with a premium linen cover. 160 pages.', price: 16.00, category: 'Desk', sku: 'NOVA-DK002', stock: 0, rating: 4.9, reviews: 45, image: 'https://images.unsplash.com/photo-1531346878377-a541e4ab69e5?auto=format&fit=crop&q=80&w=600', featured: false, sale: false },
  { id: '7', name: 'Ribbed Glass Vase', description: 'Minimalist clear glass vase, perfect for dried flowers or fresh stems.', price: 32.00, category: 'Home', sku: 'NOVA-H002', stock: 12, rating: 4.4, reviews: 6, image: 'https://images.unsplash.com/photo-1580975618210-9171f25f23bc?auto=format&fit=crop&q=80&w=600', featured: false, sale: false },
  { id: '8', name: 'Waffle Knit Throw Blanket', description: '100% cotton waffle knit blanket. Lightweight and cozy.', price: 68.00, category: 'Home', sku: 'NOVA-H003', stock: 18, rating: 5.0, reviews: 11, image: 'https://images.unsplash.com/photo-1585521550974-9b2f676b701c?auto=format&fit=crop&q=80&w=600', featured: true, sale: false },
  { id: '9', name: 'Concrete Planter', description: 'Small concrete planter with drainage hole. Ideal for succulents.', price: 14.00, category: 'Home', sku: 'NOVA-H004', stock: 30, rating: 4.3, reviews: 15, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=600', featured: false, sale: true },
  { id: '10', name: 'Brass Pen Set', description: 'Set of two solid brass gel pens. Weighted for comfortable writing.', price: 38.00, category: 'Desk', sku: 'NOVA-DK003', stock: 22, rating: 4.8, reviews: 29, image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&q=80&w=600', featured: false, sale: false },
  { id: '11', name: 'Leather Cable Organizer', description: 'Keep your charging cables neat with this genuine leather roll.', price: 26.00, category: 'Desk', sku: 'NOVA-DK004', stock: 14, rating: 4.5, reviews: 18, image: 'https://images.unsplash.com/photo-1620228892408-724f5a2b005f?auto=format&fit=crop&q=80&w=600', featured: false, sale: false },
  { id: '12', name: 'Felt Desk Mat', description: 'Premium wool felt desk pad. Protects your desk and warms up your space.', price: 34.00, category: 'Desk', sku: 'NOVA-DK005', stock: 2, rating: 4.7, reviews: 52, image: 'https://images.unsplash.com/photo-1615569427329-843813ff16bc?auto=format&fit=crop&q=80&w=600', featured: true, sale: false },
  { id: '13', name: 'Borosilicate Glass Bottle', description: 'Sleek glass water bottle with a bamboo lid and silicone sleeve.', price: 20.00, category: 'Drinkware', sku: 'NOVA-D003', stock: 19, rating: 4.6, reviews: 24, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=600', featured: false, sale: false },
  { id: '14', name: 'Ceramic Travel Cup', description: 'Reusable ceramic cup with a spill-proof silicone lid.', price: 25.00, category: 'Drinkware', sku: 'NOVA-D004', stock: 11, rating: 4.2, reviews: 14, image: 'https://images.unsplash.com/photo-1554522967-873611388bf3?auto=format&fit=crop&q=80&w=600', featured: false, sale: false },
  { id: '15', name: 'Curated Gift Box', description: 'A perfect gift set including a mug, coffee beans, and a small candle.', price: 55.00, category: 'Gifts', sku: 'NOVA-G002', stock: 10, rating: 4.9, reviews: 9, image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600', featured: true, sale: false },
  { id: '16', name: 'Sunday Self-Care Kit', description: 'Bath salts, body oil, and a face mask in a beautiful linen pouch.', price: 48.00, category: 'Gifts', sku: 'NOVA-G003', stock: 7, rating: 4.8, reviews: 16, image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=600', featured: false, sale: false },
  { id: '17', name: 'Mini Candle Set', description: 'Trio of our best-selling scents in 2oz travel tins.', price: 30.00, category: 'Gifts', sku: 'NOVA-G004', stock: 16, rating: 4.6, reviews: 21, image: 'https://images.unsplash.com/photo-1608181186105-0e7845348bb9?auto=format&fit=crop&q=80&w=600', featured: false, sale: false },
  { id: '18', name: 'Stationery Bundle', description: 'Two notebooks, a pen set, and assorted greeting cards.', price: 42.00, category: 'Gifts', sku: 'NOVA-G005', stock: 9, rating: 4.7, reviews: 13, image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=600', featured: false, sale: true },
  { id: '19', name: 'Speckled Ceramic Plate', description: 'Handmade dinner plate with a matte speckled glaze.', price: 26.00, category: 'Home', sku: 'NOVA-H005', stock: 20, rating: 4.5, reviews: 10, image: 'https://images.unsplash.com/photo-1616781216666-857e4e16dff5?auto=format&fit=crop&q=80&w=600', featured: false, sale: false },
  { id: '20', name: 'Linen Napkin Set', description: 'Set of four washed linen napkins in natural oatmeal.', price: 32.00, category: 'Home', sku: 'NOVA-H006', stock: 14, rating: 4.8, reviews: 17, image: 'https://images.unsplash.com/photo-1584288019623-289b4f2c5e53?auto=format&fit=crop&q=80&w=600', featured: false, sale: false },
];

const StoreContext = createContext();

const useStore = () => useContext(StoreContext);

const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('nova_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('nova_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('nova_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [toasts, setToasts] = useState([]);

  // Persistence
  useEffect(() => localStorage.setItem('nova_products', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('nova_cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('nova_orders', JSON.stringify(orders)), [orders]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        const newQty = existing.quantity + quantity;
        if (newQty > product.stock) {
          addToast(`Only ${product.stock} available in stock.`, 'error');
          return prev;
        }
        addToast('Cart updated');
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: newQty } : item);
      }
      if (quantity > product.stock) {
         addToast(`Only ${product.stock} available in stock.`, 'error');
         return prev;
      }
      addToast('Added to cart');
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    addToast('Item removed', 'info');
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const product = products.find(p => p.id === productId);
    if (product && newQuantity > product.stock) {
        addToast(`Only ${product.stock} available.`, 'error');
        return;
    }
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity: newQuantity } : item));
  };

  const clearCart = () => setCart([]);

  const placeOrder = (customerInfo, addressInfo) => {
    const newOrder = {
      id: `NOVA-${Math.floor(Math.random() * 100000)}`,
      date: new Date().toISOString(),
      customer: customerInfo,
      address: addressInfo,
      items: [...cart],
      total: cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) * 1.07 + 5, // Includes fake tax & shipping
      status: 'Processing',
      paymentStatus: 'Paid (Demo)'
    };

    // Reduce inventory
    setProducts(prevProducts => 
      prevProducts.map(p => {
        const cartItem = cart.find(ci => ci.product.id === p.id);
        if (cartItem) {
          return { ...p, stock: p.stock - cartItem.quantity };
        }
        return p;
      })
    );

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  // Admin Actions
  const updateProductStock = (id, newStock) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: newStock } : p));
  };
  const updateOrderStatus = (id, newStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };
  const addProduct = (prod) => {
    setProducts(prev => [{...prod, id: Date.now().toString()}, ...prev]);
    addToast('Product added');
  };
  const updateProduct = (id, updates) => {
     setProducts(prev => prev.map(p => p.id === id ? {...p, ...updates} : p));
     addToast('Product updated');
  }
  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    addToast('Product deleted');
  }

  const value = {
    products, cart, orders, toasts,
    addToCart, removeFromCart, updateCartQuantity, clearCart, placeOrder,
    updateProductStock, updateOrderStatus, addProduct, updateProduct, deleteProduct
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

// Simple custom router to handle multi-page feel without react-router
const RouterContext = createContext();

const useRouter = () => useContext(RouterContext);

const RouterProvider = ({ children }) => {
  const [path, setPath] = useState(window.location.hash.replace('#', '') || '/');

  useEffect(() => {
    const handleHashChange = () => {
      setPath(window.location.hash.replace('#', '') || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = useCallback((newPath) => {
    window.location.hash = newPath;
    window.scrollTo(0, 0);
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 font-medium transition-all duration-200 ease-in-out rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-stone-900 text-white hover:bg-stone-800 focus:ring-stone-900",
    secondary: "bg-stone-200 text-stone-900 hover:bg-stone-300 focus:ring-stone-500",
    outline: "border-2 border-stone-200 text-stone-900 hover:border-stone-900 focus:ring-stone-900",
    ghost: "bg-transparent text-stone-600 hover:text-stone-900 hover:bg-stone-100",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
  };
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Input = ({ label, error, className = '', ...props }) => (
  <div className="w-full mb-4">
    {label && <label className="block text-sm font-medium text-stone-700 mb-1">{label}</label>}
    <input 
      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-stone-900 focus:border-stone-900 outline-none transition-shadow ${error ? 'border-red-500' : 'border-stone-300'} ${className}`} 
      {...props} 
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: "bg-stone-100 text-stone-800",
    success: "bg-green-100 text-green-800",
    warning: "bg-amber-100 text-amber-800",
    danger: "bg-red-100 text-red-800",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

const formatPrice = (price) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

const ToastContainer = () => {
  const { toasts } = useStore();
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(toast => (
        <div key={toast.id} className={`flex items-center p-4 rounded-lg shadow-lg text-sm font-medium animate-in slide-in-from-right-4 fade-in duration-300 ${
          toast.type === 'error' ? 'bg-red-600 text-white' : 
          toast.type === 'info' ? 'bg-blue-600 text-white' : 'bg-stone-900 text-white'
        }`}>
          {toast.type === 'success' && <Check className="w-4 h-4 mr-2" />}
          {toast.type === 'error' && <AlertCircle className="w-4 h-4 mr-2" />}
          {toast.message}
        </div>
      ))}
    </div>
  );
};

const Navbar = () => {
  const { cart } = useStore();
  const { navigate, path } = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const NavLinks = () => (
    <>
      <button onClick={() => { navigate('/'); setIsMobileMenuOpen(false); }} className={`hover:text-stone-900 transition-colors ${path === '/' ? 'text-stone-900 font-medium' : 'text-stone-500'}`}>Home</button>
      <button onClick={() => { navigate('/shop'); setIsMobileMenuOpen(false); }} className={`hover:text-stone-900 transition-colors ${path === '/shop' ? 'text-stone-900 font-medium' : 'text-stone-500'}`}>Shop</button>
      <button onClick={() => { navigate('/shop'); setIsMobileMenuOpen(false); }} className={`hover:text-stone-900 transition-colors text-stone-500`}>Collections</button>
    </>
  );

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-1 flex items-center md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-stone-600">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          <div className="flex-1 md:flex-none flex justify-center md:justify-start">
            <button onClick={() => navigate('/')} className="text-2xl font-bold tracking-tighter text-stone-900">
              NOVA & CO.
            </button>
          </div>

          <div className="hidden md:flex flex-1 justify-center space-x-10">
            <NavLinks />
          </div>

          <div className="flex-1 flex justify-end items-center space-x-4">
            <button onClick={() => navigate('/shop')} className="p-2 text-stone-600 hover:text-stone-900 transition-colors hidden sm:block">
              <Search className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('/account')} className="p-2 text-stone-600 hover:text-stone-900 transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('/cart')} className="p-2 text-stone-600 hover:text-stone-900 transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-amber-700 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-100 p-4 flex flex-col space-y-4 shadow-lg absolute w-full">
          <NavLinks />
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  const { navigate } = useRouter();
  return (
    <footer className="bg-stone-900 text-stone-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-white text-xl font-bold tracking-tighter mb-4">NOVA & CO.</h3>
          <p className="text-stone-400 text-sm leading-relaxed mb-6">Simple things. Better living. Thoughtfully selected essentials for your desk, home, and everyday life.</p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => navigate('/shop')} className="hover:text-white transition-colors">All Products</button></li>
            <li><button onClick={() => navigate('/shop')} className="hover:text-white transition-colors">Home</button></li>
            <li><button onClick={() => navigate('/shop')} className="hover:text-white transition-colors">Desk</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><button className="hover:text-white transition-colors">FAQ</button></li>
            <li><button className="hover:text-white transition-colors">Shipping & Returns</button></li>
            <li><button className="hover:text-white transition-colors">Contact Us</button></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">Admin</h4>
          <ul className="space-y-2 text-sm">
            <li><button onClick={() => navigate('/admin')} className="text-amber-500 hover:text-amber-400 transition-colors flex items-center"><Settings className="w-4 h-4 mr-2"/> Store Dashboard</button></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-stone-800 text-sm text-stone-500 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} NOVA & CO. Demo Portfolio Project.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <span className="hover:text-white cursor-pointer">Privacy</span>
          <span className="hover:text-white cursor-pointer">Terms</span>
        </div>
      </div>
    </footer>
  );
};

const CustomerLayout = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900 selection:bg-stone-200">
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

const ProductCard = ({ product }) => {
  const { navigate } = useRouter();
  const { addToCart } = useStore();
  
  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <div 
        className="relative aspect-square overflow-hidden cursor-pointer bg-stone-100"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {product.sale && (
          <div className="absolute top-3 left-3">
            <Badge variant="warning">Sale</Badge>
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-stone-900 text-white px-4 py-2 rounded-full text-sm font-medium">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs text-stone-500 mb-1">{product.category}</div>
        <h3 
          className="font-medium text-stone-900 mb-2 cursor-pointer hover:text-amber-700 transition-colors line-clamp-1"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          {product.name}
        </h3>
        <div className="flex items-center mb-4">
          <div className="flex text-amber-500">
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="text-xs text-stone-500 ml-1">({product.reviews})</span>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="font-semibold text-lg">{formatPrice(product.price)}</span>
          <button 
            disabled={product.stock === 0}
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            className="p-2.5 rounded-full bg-stone-100 text-stone-900 hover:bg-stone-900 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Add to cart"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const { products } = useStore();
  const { navigate } = useRouter();
  const bestSellers = useMemo(() => products.filter(p => p.featured).slice(0, 4), [products]);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-stone-200 overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=2000" alt="Lifestyle interior" className="w-full h-full object-cover opacity-60" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-xl bg-white/90 backdrop-blur-sm p-10 md:p-14 rounded-3xl shadow-2xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-stone-900 mb-6 leading-tight">
              Simple things.<br/><span className="text-amber-700">Better living.</span>
            </h1>
            <p className="text-lg text-stone-600 mb-8 leading-relaxed">
              Thoughtfully selected essentials for your desk, home, and everyday life. Elevate your daily routines.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => navigate('/shop')} className="px-8 py-4 text-lg">Shop Collection</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Home', 'Desk', 'Drinkware', 'Gifts'].map((cat) => (
              <div 
                key={cat} 
                onClick={() => navigate('/shop')}
                className="group cursor-pointer relative rounded-2xl overflow-hidden aspect-[4/5] bg-stone-200"
              >
                <img 
                  src={`https://images.unsplash.com/photo-${cat === 'Home' ? '1513694203232-719a280e022f' : cat === 'Desk' ? '1505843490538-5133c6c7d0e1' : cat === 'Drinkware' ? '1514228742587-6b1558fcca3d' : '1549465220-1a8b9238cd48'}?auto=format&fit=crop&q=80&w=600`}
                  alt={cat}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <h3 className="absolute bottom-6 left-6 text-white text-2xl font-medium">{cat}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Best Sellers</h2>
            <button onClick={() => navigate('/shop')} className="hidden md:flex items-center text-stone-600 hover:text-stone-900 font-medium transition-colors">
              View all <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <button onClick={() => navigate('/shop')} className="mt-10 w-full md:hidden flex items-center justify-center text-stone-600 hover:text-stone-900 font-medium">
            View all products <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </section>

      {/* Promo */}
      <section className="bg-stone-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">Make your everyday space better.</h2>
            <p className="text-xl text-stone-400">Small upgrades to your environment can make a big difference in how you feel and work.</p>
            <Button variant="secondary" onClick={() => navigate('/shop')} className="mt-4">Explore the Collection</Button>
          </div>
          <div className="flex-1 w-full">
            <img src="https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&q=80&w=800" alt="Promo" className="rounded-3xl shadow-2xl w-full object-cover aspect-video md:aspect-square" />
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-stone-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Get 10% off your first order</h2>
          <p className="text-stone-600 mb-8">Join our newsletter for exclusive offers, new arrivals, and design inspiration.</p>
          {subscribed ? (
             <div className="p-4 bg-green-100 text-green-800 rounded-xl inline-flex items-center font-medium">
                <Check className="w-5 h-5 mr-2" /> Thanks for subscribing!
             </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                required 
                placeholder="Email address" 
                className="flex-grow px-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-900"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <Button type="submit">Subscribe</Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

const ShopPage = () => {
  const { products } = useStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ['All', 'Home', 'Desk', 'Drinkware', 'Gifts'];

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => category === 'All' || p.category === category)
      .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
      .filter(p => !inStockOnly || p.stock > 0)
      .sort((a, b) => {
        if (sort === 'price-low') return a.price - b.price;
        if (sort === 'price-high') return b.price - a.price;
        if (sort === 'rating') return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); // Featured first
      });
  }, [products, category, search, sort, inStockOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <div className={`w-full md:w-64 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
          <div className="sticky top-28 space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input 
                  type="text" 
                  placeholder="Find products..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map(cat => (
                  <li key={cat}>
                    <button 
                      onClick={() => setCategory(cat)}
                      className={`text-left w-full transition-colors ${category === cat ? 'font-medium text-stone-900' : 'text-stone-500 hover:text-stone-900'}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
               <h3 className="text-lg font-bold mb-4">Availability</h3>
               <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="rounded text-stone-900 focus:ring-stone-900" />
                  <span className="text-stone-600">In stock only</span>
               </label>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Collection {category !== 'All' ? ` - ${category}` : ''}</h1>
            <div className="flex gap-4">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)} 
                className="md:hidden flex items-center px-4 py-2 border border-stone-200 rounded-lg bg-white"
              >
                <Filter className="w-4 h-4 mr-2" /> Filters
              </button>
              <div className="relative hidden sm:block">
                <select 
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none bg-white border border-stone-200 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-stone-900"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Best Rated</option>
                </select>
                <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-2xl">
              <Package className="w-12 h-12 text-stone-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-stone-900 mb-2">No products found</h3>
              <p className="text-stone-500">Try adjusting your filters or search term.</p>
              <Button onClick={() => { setSearch(''); setCategory('All'); setInStockOnly(false); }} className="mt-6" variant="outline">Clear Filters</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductPage = ({ id }) => {
  const { products, addToCart } = useStore();
  const { navigate } = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button onClick={() => navigate('/shop')} className="inline-flex items-center text-sm text-stone-500 hover:text-stone-900 mb-8 transition-colors">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Collection
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-16">
        {/* Images */}
        <div className="rounded-3xl overflow-hidden bg-stone-100 aspect-square">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <div className="mb-2 text-sm font-medium text-amber-700 uppercase tracking-wider">{product.category}</div>
          <h1 className="text-4xl font-bold text-stone-900 mb-4 tracking-tight">{product.name}</h1>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-medium">{formatPrice(product.price)}</span>
            <div className="flex items-center gap-1 bg-stone-100 px-3 py-1 rounded-full text-sm font-medium">
              <Star className="w-4 h-4 text-amber-500 fill-current" /> {product.rating} <span className="text-stone-500 font-normal">({product.reviews})</span>
            </div>
          </div>
          
          <p className="text-stone-600 text-lg leading-relaxed mb-8">{product.description}</p>

          <div className="mb-8">
             <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Quantity</span>
                {product.stock > 0 ? (
                  <span className="text-sm text-green-600 font-medium">In Stock — {product.stock} available</span>
                ) : (
                  <span className="text-sm text-red-600 font-medium">Out of Stock</span>
                )}
             </div>
             <div className="flex items-center gap-4">
                <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden h-12 bg-white">
                  <button 
                    className="px-4 text-stone-500 hover:text-stone-900 transition-colors"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={product.stock === 0}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button 
                    className="px-4 text-stone-500 hover:text-stone-900 transition-colors"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={product.stock === 0}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <Button 
                  className="flex-1 h-12 text-lg" 
                  disabled={product.stock === 0}
                  onClick={handleAddToCart}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
             </div>
          </div>

          <div className="border-t border-stone-200 pt-6 mt-auto">
            <div className="flex gap-8 border-b border-stone-200 mb-6">
               <button 
                  className={`pb-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'details' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-500 hover:text-stone-900'}`}
                  onClick={() => setActiveTab('details')}
                >
                  Product Details
               </button>
               <button 
                  className={`pb-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'shipping' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-500 hover:text-stone-900'}`}
                  onClick={() => setActiveTab('shipping')}
                >
                  Shipping & Returns
               </button>
            </div>
            
            <div className="text-stone-600 text-sm leading-relaxed min-h-[100px]">
              {activeTab === 'details' && (
                <ul className="space-y-2 list-disc list-inside">
                  <li>SKU: {product.sku}</li>
                  <li>Premium materials crafted for longevity.</li>
                  <li>Care instructions: See product packaging.</li>
                  <li>Designed by NOVA & CO. in-house team.</li>
                </ul>
              )}
              {activeTab === 'shipping' && (
                <p>We offer free standard shipping on all orders over $50. Orders are processed within 1-2 business days. Returns are accepted within 30 days of purchase for items in original condition.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Reviews Mockup */}
      <div className="mt-24">
        <h3 className="text-2xl font-bold mb-8">Customer Reviews</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[1,2,3].map(i => (
             <div key={i} className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex text-amber-500 mb-3">
                   {[...Array(5)].map((_, j) => <Star key={j} className={`w-4 h-4 ${j < 4 || i===1 ? 'fill-current' : ''}`} />)}
                </div>
                <h4 className="font-bold text-stone-900 mb-2">Great product, highly recommend</h4>
                <p className="text-stone-600 text-sm mb-4">"The quality is exactly what I was hoping for. Looks perfect on my desk and arrived really quickly!"</p>
                <div className="text-xs text-stone-400 font-medium">— Alex M. (Verified Buyer)</div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CartPage = () => {
  const { cart, removeFromCart, updateCartQuantity } = useStore();
  const { navigate } = useRouter();

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 0 ? (subtotal > 50 ? 0 : 5.00) : 0;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-32 text-center">
        <ShoppingBag className="w-16 h-16 text-stone-200 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-stone-500 mb-8">Looks like you haven't added anything yet.</p>
        <Button onClick={() => navigate('/shop')}>Start Shopping</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Cart Items */}
        <div className="flex-grow">
          <ul className="divide-y divide-stone-200 border-t border-stone-200">
            {cart.map((item) => (
              <li key={item.product.id} className="py-6 flex gap-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-stone-100 rounded-xl overflow-hidden cursor-pointer" onClick={() => navigate(`/product/${item.product.id}`)}>
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between mb-1">
                      <h3 className="font-bold text-stone-900 cursor-pointer hover:text-amber-700" onClick={() => navigate(`/product/${item.product.id}`)}>{item.product.name}</h3>
                      <p className="font-bold">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                    <p className="text-sm text-stone-500">{formatPrice(item.product.price)} each</p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-white">
                      <button className="p-2 text-stone-500 hover:bg-stone-100" onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}><Minus className="w-3 h-3" /></button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button className="p-2 text-stone-500 hover:bg-stone-100" onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}><Plus className="w-3 h-3" /></button>
                    </div>
                    <button className="text-sm text-red-600 font-medium hover:text-red-800 flex items-center" onClick={() => removeFromCart(item.product.id)}>
                      <Trash2 className="w-4 h-4 mr-1" /> Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Summary */}
        <div className="w-full lg:w-[400px] flex-shrink-0">
          <div className="bg-stone-50 rounded-2xl p-8 sticky top-28">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 text-sm text-stone-600 mb-6">
              <div className="flex justify-between"><span>Subtotal</span><span className="text-stone-900 font-medium">{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span className="text-stone-900 font-medium">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
              <div className="flex justify-between"><span>Estimated Tax</span><span className="text-stone-900 font-medium">{formatPrice(tax)}</span></div>
            </div>
            <div className="border-t border-stone-200 pt-4 mb-8">
              <div className="flex justify-between items-center text-lg font-bold text-stone-900">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <Button className="w-full mb-4" onClick={() => navigate('/checkout')}>Proceed to Checkout</Button>
            <Button variant="outline" className="w-full" onClick={() => navigate('/shop')}>Continue Shopping</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  const { cart, placeOrder } = useStore();
  const { navigate } = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', phone: '555-0198',
    address: '123 Lifestyle Ave', city: 'Design District', state: 'CA', zip: '90210', country: 'US'
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  if (cart.length === 0 && step !== 4) {
    return <div className="p-12 text-center">Your cart is empty. <button onClick={() => navigate('/shop')} className="text-blue-600 underline">Shop</button></div>;
  }

  const handleNext = (e) => { e.preventDefault(); setStep(s => s + 1); };
  
  const handlePlaceOrder = () => {
    const order = placeOrder(
      { name: `${formData.firstName} ${formData.lastName}`, email: formData.email, phone: formData.phone },
      { address: formData.address, city: formData.city, state: formData.state, zip: formData.zip }
    );
    navigate(`/order-confirmation/${order.id}`);
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const total = subtotal * 1.07 + (subtotal > 50 ? 0 : 5);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-12">
      
      {/* Form Steps */}
      <div className="flex-grow">
        <div className="flex items-center gap-4 mb-8 text-sm font-medium">
           <span className={step >= 1 ? 'text-stone-900' : 'text-stone-400'}>1. Info</span>
           <span className="text-stone-300">-</span>
           <span className={step >= 2 ? 'text-stone-900' : 'text-stone-400'}>2. Shipping</span>
           <span className="text-stone-300">-</span>
           <span className={step >= 3 ? 'text-stone-900' : 'text-stone-400'}>3. Payment</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8">
          {step === 1 && (
            <form onSubmit={handleNext}>
              <h2 className="text-2xl font-bold mb-6">Customer Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
                <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
              <Input label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} required />
              <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required />
              <Button type="submit" className="mt-4">Continue to Shipping</Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNext}>
              <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
              <Input label="Street Address" name="address" value={formData.address} onChange={handleChange} required />
              <div className="grid grid-cols-2 gap-4">
                <Input label="City" name="city" value={formData.city} onChange={handleChange} required />
                <Input label="State/Province" name="state" value={formData.state} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="ZIP/Postal Code" name="zip" value={formData.zip} onChange={handleChange} required />
                <Input label="Country" name="country" value={formData.country} onChange={handleChange} required />
              </div>
              <div className="flex gap-4 mt-4">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button type="submit">Continue to Payment</Button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Payment</h2>
              <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg mb-6 flex items-start text-sm">
                <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
                <p>This is a demo checkout. No real payment will be processed. You can place the order without entering real card details.</p>
              </div>
              
              <div className="border border-stone-200 rounded-xl p-4 mb-4 flex items-center justify-between cursor-pointer border-stone-900 bg-stone-50 ring-1 ring-stone-900">
                 <div className="flex items-center">
                    <CreditCard className="w-6 h-6 mr-3 text-stone-700" />
                    <span className="font-medium">Demo Credit Card</span>
                 </div>
                 <div className="w-4 h-4 rounded-full border-4 border-stone-900 bg-white"></div>
              </div>

              <div className="space-y-4 opacity-50 pointer-events-none mb-8">
                 <Input label="Card Number" value="**** **** **** 4242" readOnly />
                 <div className="grid grid-cols-2 gap-4">
                    <Input label="Expiry" value="12/25" readOnly />
                    <Input label="CVC" value="***" readOnly />
                 </div>
              </div>

              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => setStep(2)}>Back</Button>
                <Button onClick={handlePlaceOrder} className="flex-grow">Place Demo Order</Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Sidebar */}
      <div className="w-full md:w-[380px] flex-shrink-0">
        <div className="bg-stone-50 rounded-2xl p-6 sticky top-28">
          <h3 className="font-bold mb-4">Order Summary</h3>
          <ul className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
            {cart.map(item => (
              <li key={item.product.id} className="flex gap-4 text-sm">
                <div className="w-16 h-16 bg-white rounded-md overflow-hidden flex-shrink-0 border border-stone-200 relative">
                   <img src={item.product.image} className="w-full h-full object-cover" />
                   <span className="absolute -top-2 -right-2 bg-stone-900 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">{item.quantity}</span>
                </div>
                <div className="flex-grow">
                   <p className="font-medium text-stone-900 line-clamp-1">{item.product.name}</p>
                   <p className="text-stone-500">{formatPrice(item.product.price)}</p>
                </div>
                <div className="font-medium">{formatPrice(item.product.price * item.quantity)}</div>
              </li>
            ))}
          </ul>
          <div className="border-t border-stone-200 pt-4 space-y-2 text-sm text-stone-600 mb-4">
             <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
             <div className="flex justify-between"><span>Shipping</span><span>{subtotal > 50 ? 'Free' : formatPrice(5)}</span></div>
             <div className="flex justify-between"><span>Tax (7%)</span><span>{formatPrice(subtotal * 0.07)}</span></div>
          </div>
          <div className="border-t border-stone-200 pt-4 flex justify-between items-center text-lg font-bold">
             <span>Total</span>
             <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderConfirmationPage = ({ id }) => {
  const { navigate } = useRouter();
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
        <Check className="w-10 h-10 text-green-600" />
      </div>
      <h1 className="text-4xl font-bold mb-4">Thank you for your order!</h1>
      <p className="text-xl text-stone-600 mb-8">Your demo order has been placed successfully.</p>
      <div className="bg-stone-50 rounded-2xl p-8 mb-8 inline-block text-left w-full max-w-md">
        <p className="text-sm text-stone-500 uppercase tracking-wide font-bold mb-1">Order Number</p>
        <p className="text-2xl font-bold text-stone-900 mb-4">{id}</p>
        <p className="text-sm text-stone-600">You will receive an email confirmation shortly (not really, it's a demo).</p>
      </div>
      <div>
        <Button onClick={() => navigate('/shop')} className="mr-4">Continue Shopping</Button>
        <Button variant="outline" onClick={() => navigate('/account')}>View My Orders</Button>
      </div>
    </div>
  );
};

const AccountPage = () => {
  const { orders } = useStore();
  const { navigate } = useRouter();
  
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 flex-shrink-0">
           <ul className="space-y-1">
              <li><button className="w-full text-left px-4 py-2 bg-stone-900 text-white rounded-lg font-medium">Order History</button></li>
              <li><button className="w-full text-left px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg">Profile</button></li>
              <li><button className="w-full text-left px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg">Addresses</button></li>
              <li><button onClick={() => navigate('/')} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg flex items-center mt-4"><LogOut className="w-4 h-4 mr-2"/> Sign Out</button></li>
           </ul>
        </div>
        
        <div className="flex-grow bg-white border border-stone-200 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6">Order History</h2>
          {orders.length === 0 ? (
             <p className="text-stone-500">You haven't placed any orders yet.</p>
          ) : (
             <div className="space-y-6">
               {orders.map(order => (
                 <div key={order.id} className="border border-stone-200 rounded-xl p-6">
                    <div className="flex flex-wrap justify-between items-center mb-4 pb-4 border-b border-stone-100 gap-4">
                       <div>
                          <span className="font-bold block">{order.id}</span>
                          <span className="text-sm text-stone-500">{new Date(order.date).toLocaleDateString()}</span>
                       </div>
                       <div>
                          <span className="text-sm text-stone-500 block">Total Amount</span>
                          <span className="font-bold">{formatPrice(order.total)}</span>
                       </div>
                       <div>
                          <Badge variant={order.status === 'Processing' ? 'warning' : order.status === 'Delivered' ? 'success' : 'default'}>
                             {order.status}
                          </Badge>
                       </div>
                    </div>
                    <ul className="space-y-3">
                       {order.items.map((item, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                             <img src={item.product.image} alt="" className="w-10 h-10 rounded bg-stone-100 object-cover mr-4" />
                             <span className="flex-grow font-medium">{item.product.name}</span>
                             <span className="text-stone-500">Qty: {item.quantity}</span>
                          </li>
                       ))}
                    </ul>
                 </div>
               ))}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminLayout = ({ children }) => {
  const { navigate, path } = useRouter();
  
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Inventory', path: '/admin/inventory', icon: Check }, // Re-using check for simple icon
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen bg-stone-100 font-sans text-stone-900 selection:bg-stone-200 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-stone-900 text-stone-300 flex flex-col flex-shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-stone-800">
          <span className="text-xl font-bold text-white tracking-tighter">NOVA & CO. Admin</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
                path === item.path 
                  ? 'bg-amber-700 text-white font-medium shadow-md' 
                  : 'hover:bg-stone-800 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 mr-3 ${path === item.path ? 'text-white' : 'text-stone-400'}`} />
              {item.name}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-stone-800">
          <button onClick={() => navigate('/')} className="w-full flex items-center px-4 py-2 text-sm text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition-colors">
             <ChevronLeft className="w-4 h-4 mr-2" /> Back to Store
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-stone-200 flex items-center justify-between px-8 flex-shrink-0 shadow-sm z-10">
          <h2 className="text-xl font-bold text-stone-800">
            {navItems.find(i => i.path === path)?.name || 'Admin'}
          </h2>
          <div className="flex items-center">
             <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">A</div>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

const AdminDashboard = () => {
  const { orders, products } = useStore();
  
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  // Simple unique customers count
  const uniqueCustomers = new Set(orders.map(o => o.customer.email)).size;
  const totalProducts = products.length;

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Sales', value: formatPrice(totalSales), icon: BarChart3, color: 'text-green-600', bg: 'bg-green-100' },
          { title: 'Orders', value: totalOrders, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-100' },
          { title: 'Customers', value: uniqueCustomers, icon: Users, color: 'text-amber-600', bg: 'bg-amber-100' },
          { title: 'Products', value: totalProducts, icon: Package, color: 'text-purple-600', bg: 'bg-purple-100' },
        ].map(stat => (
          <div key={stat.title} className="bg-white rounded-xl p-6 shadow-sm border border-stone-100 flex items-center">
            <div className={`w-12 h-12 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center mr-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-stone-500 font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-stone-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="p-6 border-b border-stone-100 flex justify-between items-center">
          <h3 className="font-bold text-lg">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-50 text-stone-500">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {orders.slice(0, 5).map(order => (
                <tr key={order.id} className="hover:bg-stone-50/50">
                  <td className="px-6 py-4 font-medium">{order.id}</td>
                  <td className="px-6 py-4">{order.customer.name}</td>
                  <td className="px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-medium">{formatPrice(order.total)}</td>
                  <td className="px-6 py-4">
                    <Badge variant={order.status === 'Processing' ? 'warning' : 'default'}>{order.status}</Badge>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-stone-500">No orders yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AdminProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const defaultProduct = { name: '', description: '', price: 0, category: 'Home', sku: '', stock: 0, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', featured: false, sale: false, rating: 5.0, reviews: 0 };

  const handleSave = (e) => {
    e.preventDefault();
    if (currentProduct.id) {
       updateProduct(currentProduct.id, currentProduct);
    } else {
       addProduct(currentProduct);
    }
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-8 max-w-2xl">
         <h2 className="text-2xl font-bold mb-6">{currentProduct.id ? 'Edit Product' : 'Add New Product'}</h2>
         <form onSubmit={handleSave} className="space-y-4">
            <Input label="Name" value={currentProduct.name} onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})} required />
            <div>
               <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
               <textarea className="w-full px-4 py-2 border border-stone-300 rounded-lg" rows="3" value={currentProduct.description} onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <Input label="Price ($)" type="number" step="0.01" value={currentProduct.price} onChange={e => setCurrentProduct({...currentProduct, price: parseFloat(e.target.value)})} required />
               <Input label="SKU" value={currentProduct.sku} onChange={e => setCurrentProduct({...currentProduct, sku: e.target.value})} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Category</label>
                  <select className="w-full px-4 py-2 border border-stone-300 rounded-lg bg-white" value={currentProduct.category} onChange={e => setCurrentProduct({...currentProduct, category: e.target.value})}>
                     <option>Home</option><option>Desk</option><option>Drinkware</option><option>Gifts</option>
                  </select>
               </div>
               <Input label="Initial Stock" type="number" value={currentProduct.stock} onChange={e => setCurrentProduct({...currentProduct, stock: parseInt(e.target.value, 10)})} required />
            </div>
            <Input label="Image URL (Unsplash recommended)" value={currentProduct.image} onChange={e => setCurrentProduct({...currentProduct, image: e.target.value})} />
            
            <div className="flex gap-4 pt-4">
               <label className="flex items-center"><input type="checkbox" checked={currentProduct.featured} onChange={e => setCurrentProduct({...currentProduct, featured: e.target.checked})} className="mr-2"/> Featured Product</label>
               <label className="flex items-center"><input type="checkbox" checked={currentProduct.sale} onChange={e => setCurrentProduct({...currentProduct, sale: e.target.checked})} className="mr-2"/> On Sale</label>
            </div>

            <div className="flex gap-4 mt-8 pt-4 border-t">
               <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
               <Button type="submit">Save Product</Button>
            </div>
         </form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
      <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-stone-50/50">
        <h3 className="font-bold text-lg">Product Catalog</h3>
        <Button onClick={() => { setCurrentProduct(defaultProduct); setIsEditing(true); }} className="py-2"><Plus className="w-4 h-4 mr-2"/> Add Product</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-white text-stone-500 border-b border-stone-100">
            <tr>
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">SKU</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-stone-50 transition-colors">
                <td className="px-6 py-4 flex items-center">
                  <img src={product.image} className="w-10 h-10 rounded object-cover mr-3 bg-stone-100" />
                  <span className="font-medium text-stone-900">{product.name}</span>
                </td>
                <td className="px-6 py-4 text-stone-600">{product.sku}</td>
                <td className="px-6 py-4"><Badge>{product.category}</Badge></td>
                <td className="px-6 py-4 font-medium">{formatPrice(product.price)}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button onClick={() => { setCurrentProduct(product); setIsEditing(true); }} className="text-amber-700 hover:text-amber-900 font-medium">Edit</button>
                  <button onClick={() => deleteProduct(product.id)} className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminInventory = () => {
  const { products, updateProductStock } = useStore();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
      <div className="p-6 border-b border-stone-100 bg-stone-50/50">
        <h3 className="font-bold text-lg">Inventory Management</h3>
        <p className="text-sm text-stone-500 mt-1">Update stock levels. Changes save automatically.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-white text-stone-500 border-b border-stone-100">
            <tr>
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">SKU</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium w-48">Stock Quantity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-stone-50">
                <td className="px-6 py-4 font-medium text-stone-900 line-clamp-1">{product.name}</td>
                <td className="px-6 py-4 text-stone-600">{product.sku}</td>
                <td className="px-6 py-4">
                  {product.stock > 10 ? <Badge variant="success">In Stock</Badge> : 
                   product.stock > 0 ? <Badge variant="warning">Low Stock</Badge> : 
                   <Badge variant="danger">Out of Stock</Badge>}
                </td>
                <td className="px-6 py-4">
                  <input 
                    type="number" 
                    min="0"
                    value={product.stock}
                    onChange={(e) => updateProductStock(product.id, parseInt(e.target.value) || 0)}
                    className="w-24 px-3 py-1 border border-stone-300 rounded focus:ring-2 focus:ring-amber-500 outline-none text-right"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminOrders = () => {
  const { orders, updateOrderStatus } = useStore();
  const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
      <div className="p-6 border-b border-stone-100 bg-stone-50/50">
        <h3 className="font-bold text-lg">Order Management</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-white text-stone-500 border-b border-stone-100">
            <tr>
              <th className="px-6 py-4 font-medium">Order ID</th>
              <th className="px-6 py-4 font-medium">Date & Time</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Total</th>
              <th className="px-6 py-4 font-medium">Status Update</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {orders.map(order => (
              <tr key={order.id} className="hover:bg-stone-50">
                <td className="px-6 py-4 font-bold text-stone-900">{order.id}</td>
                <td className="px-6 py-4 text-stone-600">{new Date(order.date).toLocaleString()}</td>
                <td className="px-6 py-4">
                   <div className="font-medium text-stone-900">{order.customer.name}</div>
                   <div className="text-xs text-stone-500">{order.customer.email}</div>
                </td>
                <td className="px-6 py-4 font-medium">{formatPrice(order.total)}</td>
                <td className="px-6 py-4">
                  <select 
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className={`px-3 py-1.5 border rounded-lg text-sm font-medium outline-none focus:ring-2 focus:ring-stone-900 ${
                       order.status === 'Delivered' ? 'bg-green-50 border-green-200 text-green-800' :
                       order.status === 'Cancelled' ? 'bg-red-50 border-red-200 text-red-800' :
                       'bg-stone-50 border-stone-200 text-stone-800'
                    }`}
                  >
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
                <tr><td colSpan="5" className="px-6 py-12 text-center text-stone-500 text-lg">No orders found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AppContent = () => {
  const { path } = useRouter();

  // Simple Router Switch
  const renderRoute = () => {
    // Admin Routes
    if (path.startsWith('/admin')) {
      return (
        <AdminLayout>
          {path === '/admin' && <AdminDashboard />}
          {path === '/admin/products' && <AdminProducts />}
          {path === '/admin/inventory' && <AdminInventory />}
          {path === '/admin/orders' && <AdminOrders />}
          {(path === '/admin/customers' || path === '/admin/analytics') && (
            <div className="text-center py-24 text-stone-500 bg-white rounded-2xl border border-stone-100">
              <LayoutDashboard className="w-12 h-12 mx-auto mb-4 text-stone-300" />
              <h2 className="text-xl font-medium">Coming Soon</h2>
              <p>This module is under development.</p>
            </div>
          )}
        </AdminLayout>
      );
    }

    // Customer Routes
    return (
      <CustomerLayout>
        {path === '/' && <HomePage />}
        {path === '/shop' && <ShopPage />}
        {path.startsWith('/product/') && <ProductPage id={path.split('/')[2]} />}
        {path === '/cart' && <CartPage />}
        {path === '/checkout' && <CheckoutPage />}
        {path.startsWith('/order-confirmation/') && <OrderConfirmationPage id={path.split('/')[2]} />}
        {path === '/account' && <AccountPage />}
      </CustomerLayout>
    );
  };

  return (
    <>
      {renderRoute()}
      <ToastContainer />
    </>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </StoreProvider>
  );
}