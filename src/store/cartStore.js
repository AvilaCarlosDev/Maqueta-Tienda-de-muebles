/**
 * Store del Carrito - Gestión del Estado del Carrito
 *
 * Este store maneja el estado global del carrito de compras utilizando Zustand.
 * Proporciona funciones para agregar, eliminar y actualizar items en el carrito.
 * Incluye validaciones y sanitización de datos para mayor seguridad.
 */

import { create } from "zustand";

// Validaciones
const validateProduct = (product) => {
  if (!product || typeof product !== "object") return false;

  const requiredFields = ["id", "name", "price", "quantity"];
  return requiredFields.every(
    (field) => product[field] !== undefined && product[field] !== null
  );
};

const sanitizeProduct = (product) => {
  return {
    id: String(product.id).trim(),
    name: String(product.name).trim(),
    price: Number(product.price),
    quantity: Math.max(1, Math.min(100, Number(product.quantity))),
    image: product.image ? String(product.image).trim() : null,
    description: product.description
      ? String(product.description).trim()
      : null,
  };
};

/**
 * Store del carrito con las siguientes funcionalidades:
 * - items: Array de productos en el carrito
 * - addItem: Agrega un nuevo item al carrito con validación
 * - removeItem: Elimina un item del carrito
 * - updateQuantity: Actualiza la cantidad de un item con validación
 * - clearCart: Vacía el carrito
 * - getTotal: Calcula el total del carrito
 */
export const useCartStore = create((set, get) => ({
  // Estado inicial: carrito vacío
  items: [],

  /**
   * Agrega un nuevo item al carrito con validación
   * @param {Object} item - Producto a agregar
   * @returns {boolean} - True si se agregó correctamente
   */
  addItem: (item) => {
    if (!validateProduct(item)) {
      console.error("Producto inválido:", item);
      return false;
    }

    const sanitizedItem = sanitizeProduct(item);

    set((state) => {
      const existingItem = state.items.find((i) => i.id === sanitizedItem.id);
      if (existingItem) {
        const newQuantity = Math.min(
          100,
          existingItem.quantity + sanitizedItem.quantity
        );
        return {
          items: state.items.map((i) =>
            i.id === sanitizedItem.id ? { ...i, quantity: newQuantity } : i
          ),
        };
      }
      return {
        items: [...state.items, { ...sanitizedItem, quantity: 1 }],
      };
    });
    return true;
  },

  /**
   * Elimina un item del carrito
   * @param {string} itemId - ID del item a eliminar
   */
  removeItem: (itemId) => {
    const sanitizedId = String(itemId).trim();
    set((state) => ({
      items: state.items.filter((item) => item.id !== sanitizedId),
    }));
  },

  /**
   * Actualiza la cantidad de un item en el carrito
   * @param {string} itemId - ID del item a actualizar
   * @param {number} quantity - Nueva cantidad
   * @returns {boolean} - True si se actualizó correctamente
   */
  updateQuantity: (itemId, quantity) => {
    const sanitizedId = String(itemId).trim();
    const sanitizedQuantity = Math.max(1, Math.min(100, Number(quantity)));

    set((state) => {
      const itemExists = state.items.some((item) => item.id === sanitizedId);
      if (!itemExists) {
        console.error("Item no encontrado:", sanitizedId);
        return state;
      }

      return {
        items: state.items.map((item) =>
          item.id === sanitizedId
            ? { ...item, quantity: sanitizedQuantity }
            : item
        ),
      };
    });
    return true;
  },

  /**
   * Vacía el carrito
   */
  clearCart: () => set({ items: [] }),

  /**
   * Calcula el total del carrito
   * @returns {number} Total del carrito
   */
  getTotal: () => {
    const state = get();
    return state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },

  /**
   * Obtiene la cantidad total de items en el carrito
   * @returns {number} Cantidad total de items
   */
  getItemCount: () => {
    const state = get();
    return state.items.reduce((total, item) => total + item.quantity, 0);
  },
}));
