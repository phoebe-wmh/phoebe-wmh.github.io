import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';

interface CategoriesProps {
  categories: string[];
  entries: { id: string; title: string; category: string; date?: string }[];
  activeCategory: string;
  onCategoryClick: (category: string) => void;
  onPostClick: (id: string) => void;
}

export default function Categories({
  categories,
  entries,
  activeCategory,
  onCategoryClick,
  onPostClick,
}: CategoriesProps) {
  const { t } = useTranslation();
  const validCategories = categories.filter(c => c !== 'All' && c !== 'About');

  const getCategoryCount = (category: string) => {
    return entries.filter(e => e.category === category && e.id !== 'about').length;
  };

  return (
    <motion.div
      key="categories"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="content-card"
    >
      <h2 className="text-[20px] font-bold text-text-title mb-8 border-b border-border pb-2">{t('categories')}</h2>
      <div className="flex flex-col gap-1">
        {validCategories.map(category => (
          <div
            key={category}
            className={`flex items-center justify-between px-4 py-3 cursor-pointer border-b border-border transition-all hover:bg-surface-hover ${activeCategory === category ? 'text-accent' : 'text-text-main'}`}
            onClick={() => onCategoryClick(category)}
          >
            <span className="text-[14px]">{category}</span>
            <span className="text-[12px] text-text-muted">{getCategoryCount(category)} 篇</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
