import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Database } from '../database.types';
import CakeModal from '../components/CakeModal';
import OrderForm from '../components/OrderForm';
import AddressPopover from '../components/AddressPopover';
import { Link } from "react-router-dom";

interface ProductDetail {
  id: number;
  model_3d_url: string | null;
  ingredients: string | null;
  model_position: any;
  model_scale: any;
  model_rotation: any;
  description: string | null;
  price: number;
  is_active: boolean;
}

type SupabaseProduct = Database['public']['Tables']['products']['Row'];

interface Cake extends SupabaseProduct {
  image: string | null;
  product_details: ProductDetail | null;
  variants?: { product_detail_id: { price: number } | null }[];
}

export default function CakeList() {
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCake, setSelectedCake] = useState<Cake | null>(null);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          product_details:product_detail_id (*),
          variants (
            product_detail_id (
              price
            )
          )
        `)
        .eq('product_details.is_active', true);

      if (error) {
        console.error('Error fetching products:', error.message);
        setError(error.message);
        setLoading(false);
        return;
      }

      if (data) {
        const normalized: Cake[] = data.map((p) => ({
          id: p.id,
          name: p.name,
          image: p.image_url,
          category: p.category,
          has_variants: p.has_variants,
          description: p.description,
          product_details: p.product_details,
          variants: p.variants ?? [],
        }));
        setCakes(normalized);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const cakeItems = cakes.filter((item) => item.category === 'cake');
  const breadItems = cakes.filter((item) => item.category === 'bread');

  const getPriceRange = (variants: Cake['variants']) => {
    const prices = variants
      ?.map((v) => v?.product_detail_id?.price)
      .filter((p): p is number => typeof p === 'number');

    if (!prices.length) return 'No price';
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min !== max
      ? `€ ${min.toFixed(2)} – ${max.toFixed(2)}`
      : `€ ${min.toFixed(2)}`;
  };

  return (
    <>
      {/* Nav Bar */}
      <header className="absolute top-0 left-0 w-full z-20 bg-vanilla-beige bg-opacity-90 text-dark-brown shadow-md">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-caramel-gold">Patisserie</h1>
          <nav className="space-x-6 text-dark-brown text-base font-medium">
            <a href="/about" className="hover:text-pistachio-green transition-colors">About</a>
            <Link to="/login" className="hover:text-pistachio-green transition-colors">
              Login
            </Link>
            <Link to="/signup" className="hover:text-pistachio-green transition-colors">
              Sign up
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="min-h-screen bg-vanilla-beige pt-20">
        <section className="max-w-7xl mx-auto px-4 py-12">
          {cakeItems.length > 0 && (
            <>
              <h2 className="text-3xl font-bold text-coffee-brown mb-8 text-center">Cakes</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {cakeItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-vanilla-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 h-[480px]"
                    onClick={() => setSelectedCake(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-72 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-coffee-brown mb-2">{item.name}</h3>
                      <p className="text-dark-brown text-sm mb-3">{item.description}</p>
                      <p className="text-xl font-bold text-caramel-gold">
                        {item.has_variants && item.variants?.length
                          ? getPriceRange(item.variants)
                          : item.product_details?.price != null
                            ? `€ ${item.product_details.price.toFixed(2)}`
                            : '—'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {breadItems.length > 0 && (
            <>
              <h2 className="text-3xl font-bold text-coffee-brown mb-8 text-center mt-20">Breads</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {breadItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-vanilla-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 h-[480px]"
                    onClick={() => setSelectedCake(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-72 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      
                      <h3 className="text-lg font-semibold text-coffee-brown mb-2">{item.name}</h3>
                      <p className="text-dark-brown text-sm mb-3">{item.description}</p>
                      <p className="text-xl font-bold text-caramel-gold">
                        {item.product_details?.price != null
                          ? `€ ${item.product_details.price.toFixed(2)}`
                          : '—'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Floating buttons: Address and Order */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-4">
          <div className="relative">
            <button
              onClick={() => setIsAddressOpen(!isAddressOpen)}
              className="w-14 h-14 bg-sage-green hover:bg-pistachio-green text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-xl"
            >
              📍
            </button>
            {isAddressOpen && <AddressPopover onClose={() => setIsAddressOpen(false)} />}
          </div>
          <button
            onClick={() => setIsOrderFormOpen(true)}
            className="w-14 h-14 bg-caramel-gold hover:bg-pistachio-green text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-xl"
          >
            🛒
          </button>
        </div>

        {/* Modals */}
        {selectedCake && <CakeModal cake={selectedCake} onClose={() => setSelectedCake(null)} />}
        {isOrderFormOpen && <OrderForm onClose={() => setIsOrderFormOpen(false)} />}
      </div>
    </>
  );
}
