import React from 'react';
import { CATEGORIES } from '../data/categories';
import { CategoryCard } from '../components/common/CategoryCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const CategoriesPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Kategori' }]} />

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Kategori Alat Online
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Pilih kategori yang sesuai dengan kebutuhan pekerjaan atau proyek Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CATEGORIES.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};
