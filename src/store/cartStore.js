/**
 * Store del Carrito - Gestión del Estado del Carrito
 *
 * Este store maneja el estado global del carrito de compras utilizando Zustand.
 * Proporciona funciones para agregar, eliminar y actualizar items en el carrito.
 */

import { create } from "zustand";

/**
 * Store del carrito con las siguientes funcionalidades:
 * - items: Array de productos en el carrito
 * - addItem: Agrega un nuevo item al carrito
 * - removeItem: Elimina un item del carrito
 * - updateQuantity: Actualiza la cantidad de un item
 * - clearCart: Vacía el carrito
 * - getTotal: Calcula el total del carrito
 */
export const useCartStore = create((set, get) => ({
  // Estado inicial: carrito vacío
  items: [],

  /**
   * Agrega un nuevo item al carrito
   * Si el item ya existe, aumenta su cantidad
   * @param {Object} item - Producto a agregar
   */
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        items: [...state.items, { ...item, quantity: 1 }],
      };
    }),

  /**
   * Elimina un item del carrito
   * @param {number} itemId - ID del item a eliminar
   */
  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    })),

  /**
   * Actualiza la cantidad de un item en el carrito
   * @param {number} itemId - ID del item a actualizar
   * @param {number} quantity - Nueva cantidad
   */
  updateQuantity: (itemId, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    })),

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
}));
