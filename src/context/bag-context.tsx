'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';
import { PRODUCTS, type Product } from '@/data/catalog';
import { buildWhatsAppUrl, formatPriceUYU } from '@/lib/utils';

export type DeliveryMode = 'retiro' | 'envio';
export type PaymentMethod = 'efectivo' | 'transferencia' | 'mercadopago';

export interface BagItem {
  key: string;
  productId: string;
  name: string;
  categoryLabel: string;
  price: number;
  variant: string;
  quantity: number;
  note?: string;
}

export interface DeliveryPreferences {
  mode: DeliveryMode;
  customerName: string;
  address: string;
  payment: PaymentMethod;
  extraNotes: string;
}

interface BagStoreState {
  items: BagItem[];
  preferences: DeliveryPreferences;
}

interface BagContextValue {
  items: BagItem[];
  preferences: DeliveryPreferences;
  isDrawerOpen: boolean;
  lastAddedName: string | null;
  totalItems: number;
  subtotal: number;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (
    product: Product,
    variant?: string,
    note?: string,
    openAfterAdd?: boolean
  ) => void;
  updateQuantity: (key: string, delta: number) => void;
  updateItemVariant: (key: string, newVariant: string) => void;
  updateItemNote: (key: string, note: string) => void;
  removeItem: (key: string) => void;
  clearBag: () => void;
  setPreferences: React.Dispatch<React.SetStateAction<DeliveryPreferences>>;
  getProductForItem: (productId: string) => Product | undefined;
  buildOrderMessage: () => string;
  getOrderWhatsAppUrl: () => string;
}

const STORAGE_KEY = 'marifer_sayago_bolso_v1';
const PREFS_STORAGE_KEY = 'marifer_sayago_prefs_v1';

const DEFAULT_PREFERENCES: DeliveryPreferences = {
  mode: 'retiro',
  customerName: '',
  address: '',
  payment: 'efectivo',
  extraNotes: '',
};

const SERVER_SNAPSHOT: BagStoreState = {
  items: [],
  preferences: DEFAULT_PREFERENCES,
};

let clientState: BagStoreState | null = null;
const listeners = new Set<() => void>();

function readInitialClientState(): BagStoreState {
  if (clientState) return clientState;
  let items: BagItem[] = [];
  let preferences: DeliveryPreferences = DEFAULT_PREFERENCES;

  try {
    const savedItems = window.localStorage.getItem(STORAGE_KEY);
    if (savedItems) {
      const parsed = JSON.parse(savedItems);
      if (Array.isArray(parsed)) items = parsed;
    }
    const savedPrefs = window.localStorage.getItem(PREFS_STORAGE_KEY);
    if (savedPrefs) {
      const parsedPrefs = JSON.parse(savedPrefs);
      if (parsedPrefs && typeof parsedPrefs === 'object') {
        preferences = { ...DEFAULT_PREFERENCES, ...parsedPrefs };
      }
    }
  } catch {
    // Modo privado o almacenamiento bloqueado
  }

  clientState = { items, preferences };
  return clientState;
}

function updateStore(updater: (prev: BagStoreState) => BagStoreState) {
  const prev = readInitialClientState();
  const next = updater(prev);
  clientState = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next.items));
    window.localStorage.setItem(
      PREFS_STORAGE_KEY,
      JSON.stringify(next.preferences)
    );
  } catch {
    // Sin acción si localStorage no está disponible
  }
  listeners.forEach((listener) => listener());
}

function subscribeStore(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getClientSnapshot(): BagStoreState {
  return readInitialClientState();
}

function getServerSnapshot(): BagStoreState {
  return SERVER_SNAPSHOT;
}

const BagContext = createContext<BagContextValue | undefined>(undefined);

export function BagProvider({ children }: { children: React.ReactNode }) {
  const store = useSyncExternalStore(
    subscribeStore,
    getClientSnapshot,
    getServerSnapshot
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [lastAddedName, setLastAddedName] = useState<string | null>(null);

  const addItem = useCallback(
    (
      product: Product,
      variant?: string,
      note?: string,
      openAfterAdd = false
    ) => {
      const chosenVariant = variant || product.variants[0] || 'Estándar';
      const key = `${product.id}::${chosenVariant}`;

      updateStore((prev) => {
        const existingIndex = prev.items.findIndex((item) => item.key === key);
        const nextItems =
          existingIndex >= 0
            ? prev.items.map((item, idx) =>
                idx === existingIndex
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                      note: note !== undefined ? note : item.note,
                    }
                  : item
              )
            : [
                ...prev.items,
                {
                  key,
                  productId: product.id,
                  name: product.name,
                  categoryLabel: product.categoryLabel,
                  price: product.price,
                  variant: chosenVariant,
                  quantity: 1,
                  note,
                },
              ];

        return { ...prev, items: nextItems };
      });

      setLastAddedName(product.name);
      window.setTimeout(() => {
        setLastAddedName((current) =>
          current === product.name ? null : current
        );
      }, 2400);

      if (openAfterAdd) {
        setIsDrawerOpen(true);
      }
    },
    []
  );

  const updateQuantity = useCallback((key: string, delta: number) => {
    updateStore((prev) => ({
      ...prev,
      items: prev.items
        .map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0),
    }));
  }, []);

  const updateItemVariant = useCallback((key: string, newVariant: string) => {
    updateStore((prev) => {
      const target = prev.items.find((i) => i.key === key);
      if (!target) return prev;
      const nextKey = `${target.productId}::${newVariant}`;
      if (nextKey === key) return prev;

      const duplicate = prev.items.find((i) => i.key === nextKey);
      const nextItems = duplicate
        ? prev.items
            .filter((i) => i.key !== key)
            .map((i) =>
              i.key === nextKey
                ? { ...i, quantity: i.quantity + target.quantity }
                : i
            )
        : prev.items.map((i) =>
            i.key === key ? { ...i, key: nextKey, variant: newVariant } : i
          );

      return { ...prev, items: nextItems };
    });
  }, []);

  const updateItemNote = useCallback((key: string, note: string) => {
    updateStore((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.key === key ? { ...item, note } : item
      ),
    }));
  }, []);

  const removeItem = useCallback((key: string) => {
    updateStore((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.key !== key),
    }));
  }, []);

  const clearBag = useCallback(() => {
    updateStore((prev) => ({ ...prev, items: [] }));
  }, []);

  const setPreferences: React.Dispatch<
    React.SetStateAction<DeliveryPreferences>
  > = useCallback((action) => {
    updateStore((prev) => ({
      ...prev,
      preferences:
        typeof action === 'function' ? action(prev.preferences) : action,
    }));
  }, []);

  const getProductForItem = useCallback(
    (productId: string) => PRODUCTS.find((p) => p.id === productId),
    []
  );

  const totalItems = useMemo(
    () => store.items.reduce((acc, item) => acc + item.quantity, 0),
    [store.items]
  );

  const subtotal = useMemo(
    () =>
      store.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [store.items]
  );

  const buildOrderMessage = useCallback(() => {
    if (store.items.length === 0) {
      return 'Hola MARIFER! Quiero consultar por productos disponibles en Sayago.';
    }

    const lines: string[] = [
      'Hola MARIFER! Te paso mi bolso armado desde la web:',
      '',
    ];

    store.items.forEach((item, index) => {
      const lineTotal = formatPriceUYU(item.price * item.quantity);
      lines.push(
        `${index + 1}. ${item.quantity}x ${item.name} (${item.variant}) - ${lineTotal}`
      );
      if (item.note?.trim()) {
        lines.push(`   Nota: ${item.note.trim()}`);
      }
    });

    lines.push('');
    lines.push(`Total estimado: ${formatPriceUYU(subtotal)}`);
    lines.push(
      `Modalidad: ${
        store.preferences.mode === 'retiro'
          ? 'Retiro en puerta sin costo (Sayago)'
          : 'Envío en el día (Sayago y alrededores)'
      }`
    );

    const paymentLabel =
      store.preferences.payment === 'efectivo'
        ? 'Efectivo'
        : store.preferences.payment === 'transferencia'
          ? 'Transferencia bancaria / Prex'
          : 'Mercado Pago / QR';
    lines.push(`Forma de pago preferida: ${paymentLabel}`);

    if (store.preferences.customerName.trim()) {
      lines.push(`Nombre: ${store.preferences.customerName.trim()}`);
    }
    if (
      store.preferences.mode === 'envio' &&
      store.preferences.address.trim()
    ) {
      lines.push(`Dirección / Esquina: ${store.preferences.address.trim()}`);
    }
    if (store.preferences.extraNotes.trim()) {
      lines.push(`Aclaración: ${store.preferences.extraNotes.trim()}`);
    }

    return lines.join('\n');
  }, [store.items, store.preferences, subtotal]);

  const getOrderWhatsAppUrl = useCallback(
    () => buildWhatsAppUrl(buildOrderMessage()),
    [buildOrderMessage]
  );

  return (
    <BagContext.Provider
      value={{
        items: store.items,
        preferences: store.preferences,
        isDrawerOpen,
        lastAddedName,
        totalItems,
        subtotal,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        addItem,
        updateQuantity,
        updateItemVariant,
        updateItemNote,
        removeItem,
        clearBag,
        setPreferences,
        getProductForItem,
        buildOrderMessage,
        getOrderWhatsAppUrl,
      }}
    >
      {children}
    </BagContext.Provider>
  );
}

export function useBag() {
  const ctx = useContext(BagContext);
  if (!ctx) {
    throw new Error('useBag debe utilizarse dentro de BagProvider');
  }
  return ctx;
}
