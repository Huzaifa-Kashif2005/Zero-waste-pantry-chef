// Pantry Manager Component - Add and view pantry items

import { useState } from 'react';
import { PantryItem } from '../lib/database';
import { Trash2, Calendar, Package, AlertCircle, Pencil } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PantryManagerProps {
  pantryItems: PantryItem[];
  onAddItem: (name: string, quantity: string, expiryDate: Date) => void;
  onDeleteItem: (id: number) => void;
  // NEW: Add update handler
  onUpdateItem: (id: number, updates: Partial<PantryItem>) => void;
}

// Helper to format Date object to YYYY-MM-DD string
const formatDate = (date: Date): string => {
  const d = new Date(date);
  const month = '' + (d.getMonth() + 1);
  const day = '' + d.getDate();
  const year = d.getFullYear();

  return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
};

export function PantryManager({ pantryItems, onAddItem, onDeleteItem, onUpdateItem }: PantryManagerProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  // NEW: State for editing an item
  const [editingItem, setEditingItem] = useState<PantryItem | null>(null);
  const [editQuantity, setEditQuantity] = useState('');
  const [editExpiryDate, setEditExpiryDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !expiryDate) return;

    const expiry = new Date(expiryDate);
    // Adjust expiry to midnight UTC to prevent timezone issues causing it to expire a day early
    expiry.setUTCHours(23, 59, 59, 999); 
    
    onAddItem(name, quantity || '1 unit', expiry);
    
    // Reset form
    setName('');
    setQuantity('');
    setExpiryDate('');
  };
  
  const handleStartEdit = (item: PantryItem) => {
    setEditingItem(item);
    setEditQuantity(item.quantity);
    setEditExpiryDate(formatDate(item.expiryDate));
  };
  
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editExpiryDate) return;

    const expiry = new Date(editExpiryDate);
    // Adjust expiry to midnight UTC to prevent timezone issues
    expiry.setUTCHours(23, 59, 59, 999);
    
    onUpdateItem(editingItem.id, {
      quantity: editQuantity,
      expiryDate: expiry,
    });
    
    setEditingItem(null); // Close the edit mode
  };

  const getDaysUntilExpiry = (expiryDate: Date): number => {
    const now = new Date();
    // Use UTC date for calculation to avoid local timezone offset issues on expiration day
    const expiryUtc = new Date(expiryDate.getFullYear(), expiryDate.getMonth(), expiryDate.getDate());
    const nowUtc = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const diffTime = expiryUtc.getTime() - nowUtc.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getExpiryColor = (days: number): string => {
    if (days < 0) return 'text-gray-400';
    if (days === 0) return 'text-red-600';
    if (days <= 3) return 'text-orange-600';
    if (days <= 7) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getExpiryBg = (days: number): string => {
    if (days < 0) return 'bg-gray-100';
    if (days === 0) return 'bg-red-50';
    if (days <= 3) return 'bg-orange-50';
    if (days <= 7) return 'bg-yellow-50';
    return 'bg-green-50';
  };

  const sortedItems = [...pantryItems].sort((a, b) => {
    const daysA = getDaysUntilExpiry(a.expiryDate);
    const daysB = getDaysUntilExpiry(b.expiryDate);
    return daysA - daysB;
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <Package className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl">My Pantry</h2>
      </div>

      {/* Add Item Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Item Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Tomatoes, Eggs, Milk"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Quantity (e.g., 3 units, 1 lb, 500g)</label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g., 3, 1 lb, 500g"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Expiry Date</label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            required
          />
        </div>

        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add to Pantry
        </motion.button>
      </form>

      {/* Pantry Items List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm text-gray-600">Current Items ({pantryItems.length})</h3>
          {pantryItems.some(item => getDaysUntilExpiry(item.expiryDate) <= 3 && getDaysUntilExpiry(item.expiryDate) >= 0) && (
            <div className="flex items-center gap-1 text-orange-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Items expiring soon!</span>
            </div>
          )}
        </div>

        {pantryItems.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Your pantry is empty</p>
            <p className="text-sm">Add items to get recipe recommendations</p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto space-y-2">
            <AnimatePresence>
              {sortedItems.map((item) => {
                const daysUntil = getDaysUntilExpiry(item.expiryDate);
                const isExpired = daysUntil < 0;
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={`${getExpiryBg(daysUntil)} rounded-lg p-3 group`}
                  >
                    {editingItem?.id === item.id ? (
                      // Inline Edit Form
                      <form onSubmit={handleSaveEdit} className="space-y-2">
                        <h4 className="font-medium capitalize">{item.name}</h4>
                        <input
                          type="text"
                          value={editQuantity}
                          onChange={(e) => setEditQuantity(e.target.value)}
                          placeholder="Quantity"
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm outline-none"
                          required
                        />
                        <input
                          type="date"
                          value={editExpiryDate}
                          onChange={(e) => setEditExpiryDate(e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md text-sm outline-none"
                          required
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingItem(null)}
                            className="text-gray-600 text-sm px-3 py-1 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-blue-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    ) : (
                      // Display Mode
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="capitalize font-medium">{item.name}</span>
                            <span className="text-sm text-gray-500">• {item.quantity}</span>
                          </div>
                          <div className={`flex items-center gap-1 text-sm ${getExpiryColor(daysUntil)}`}>
                            <Calendar className="w-3 h-3" />
                            {isExpired ? (
                              <span>Expired {Math.abs(daysUntil)} day{Math.abs(daysUntil) > 1 ? 's' : ''} ago</span>
                            ) : daysUntil === 0 ? (
                              <span>Expires today!</span>
                            ) : daysUntil === 1 ? (
                              <span>Expires tomorrow</span>
                            ) : (
                              <span>Expires in {daysUntil} days</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <motion.button
                            onClick={() => handleStartEdit(item)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 hover:text-blue-700 p-2"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Pencil className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            onClick={() => onDeleteItem(item.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700 p-2"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}