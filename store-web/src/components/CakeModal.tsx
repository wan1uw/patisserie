import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, Line, Bounds } from '@react-three/drei';
import { supabase } from '../lib/supabaseClient';
import type { Database } from '../database.types';

type Product = Database['public']['Tables']['products']['Row'];

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

interface VariantWithDetail {
  id: number;
  name: string;
  product_detail: ProductDetail | null;
}

interface ProductWithVariants extends Product {
  product_details: ProductDetail | null;
  variants: VariantWithDetail[];
}

interface CakeModalProps {
  cake: ProductWithVariants;
  onClose: () => void;
}

// Helper to parse JSON vectors from your DB
function parseVector(value: any, fallback: [number, number, number]): [number, number, number] {
  if (Array.isArray(value) && value.length === 3) return value as [number, number, number];
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed) && parsed.length === 3) return parsed;
    } catch {
      console.warn('Invalid vector string:', value);
    }
  }
  return fallback;
}

// Component to load and render a GLTF model
function GLTFModel({
  url,
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
}: {
  url: string;
  position?: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const { scene } = useGLTF(url, true);
  return (
    <group position={position} scale={scale} rotation={rotation}>
      <primitive object={scene} />
    </group>
  );
}

export default function CakeModal({ cake, onClose }: CakeModalProps) {
  const [variants, setVariants] = useState<VariantWithDetail[]>([]);
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null); // use local state
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('products')
      .select(`
        *,
        base:product_detail_id (
          id, price, model_3d_url, ingredients,
          model_position, model_scale, model_rotation,
          description, is_active
        ),
        variants:variants (
          id, name,
          detail:product_detail_id (
            id, price, model_3d_url, ingredients,
            model_position, model_scale, model_rotation,
            description, is_active
          )
        )
      `)
      .eq('id', cake.id)
      .single()
      .then(({ data, error }) => {
        setLoading(false);
        if (error) {
          console.error('Error loading product + variants:', error);
          return;
        }

        const baseDetail: ProductDetail | null = data.base ?? null;
        const flatVars: VariantWithDetail[] = (data.variants ?? []).map((v: any) => ({
          id: v.id,
          name: v.name,
          product_detail: Array.isArray(v.detail) ? v.detail[0] : v.detail
        }));
        setVariants(flatVars);
        setProductDetail(baseDetail);
      });
  }, [cake]);

  const currentDetail: ProductDetail | null = cake.has_variants
    ? variants[current]?.product_detail ?? null
    : productDetail;

  const price = currentDetail?.price ?? 0;
  const modelUrl = currentDetail?.model_3d_url ?? '';
  const modelPosition = parseVector(currentDetail?.model_position, [0, 0, 0]);
  const modelScale = parseVector(currentDetail?.model_scale, [1, 1, 1]);
  const modelRotation = parseVector(currentDetail?.model_rotation, [0, 0, 0]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-vanilla-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 bg-milk-white rounded-full shadow-md flex items-center justify-center text-taupe-gray hover:text-coffee-brown"
          >
            ✕
          </button>

          {/* 3D model viewer or fallback image */}
          {modelUrl ? (
            <Canvas
              gl={{ preserveDrawingBuffer: true, powerPreference: 'high-performance' }}
              style={{ width: '100%', height: 400, borderRadius: '12px' }}
              camera={{ position: [0, 0, 2.5], fov: 50 }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[2, 5, 2]} intensity={1} />
              <Suspense fallback={<Html center><div>Loading 3D...</div></Html>}>
                <Bounds fit clip observe margin={1.2}>
                  <GLTFModel
                    url={modelUrl}
                    position={modelPosition}
                    scale={modelScale}
                    rotation={modelRotation}
                  />
                </Bounds>
              </Suspense>
              <OrbitControls enablePan enableZoom enableRotate />
            </Canvas>
          ) : (
            <img
              src={cake.image_url ?? '/placeholder.png'}
              alt={cake.name}
              className="w-full h-64 object-cover rounded-t-xl"
            />
          )}

          {/* Navigation arrows for multiple variants */}
          {!loading && cake.has_variants && variants.length > 1 && (
            <div className="absolute inset-x-0 top-1/2 flex justify-between px-4 pointer-events-none">
              <button
                onClick={() => setCurrent((c) => (c - 1 + variants.length) % variants.length)}
                className="pointer-events-auto bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow"
              >‹</button>
              <button
                onClick={() => setCurrent((c) => (c + 1) % variants.length)}
                className="pointer-events-auto bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow"
              >›</button>
            </div>
          )}
        </div>

        {/* Product details section */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-coffee-brown">{cake.name}</h2>
            {productDetail?.is_active && (
              <span className="bg-honey-rose text-amber-brown px-3 py-1 rounded-full text-sm font-bold">
                Today’s Special
              </span>
            )}
          </div>

          {/* Product description */}
          <p className="text-dark-brown mb-4 leading-relaxed">
            {currentDetail?.description}
          </p>

          {/* Variant selection and price */}
          <div className="flex justify-between items-center mb-6">
            {cake.has_variants && variants.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {variants.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => setCurrent(i)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                      i === current
                        ? 'bg-coffee-brown text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            ) : (
              <span className="text-sm text-taupe-gray">Single Flavor</span>
            )}

            <div className="text-3xl font-bold text-caramel-gold">
              € {price.toFixed(2)}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mb-4">
            <button className="flex-1 bg-caramel-gold hover:bg-pistachio-green text-white py-3 px-6 rounded-lg font-semibold">
              Add to Cart
            </button>
            <button className="flex-1 bg-caramel-gold hover:bg-pistachio-green text-white py-3 px-6 rounded-lg font-semibold">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}