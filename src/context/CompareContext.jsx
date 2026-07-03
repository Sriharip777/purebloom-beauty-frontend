import { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const CompareContext = createContext(null);

export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState([]);

  const addToCompare = (product) => {
    setCompareList((prev) => {
      if (prev.length >= 3) {
        toast.error('You can compare up to 3 products');
        return prev;
      }
      if (prev.some((p) => p._id === product._id)) {
        toast('Already in compare list');
        return prev;
      }
      toast.success('Added to compare');
      return [...prev, product];
    });
  };

  const removeFromCompare = (productId) => {
    setCompareList((prev) => {
      const updated = prev.filter((p) => p._id !== productId);
      toast('Removed from compare');
      return updated;
    });
  };

  const clearCompare = () => {
    setCompareList([]);
    toast.success('Compare list cleared');
  };

  const isInCompare = (productId) => compareList.some((p) => p._id === productId);

  return (
    <CompareContext.Provider value={{
      compareList, addToCompare, removeFromCompare, clearCompare, isInCompare, count: compareList.length,
    }}>
      {children}
    </CompareContext.Provider>
  );
}

export const useCompare = () => useContext(CompareContext);
