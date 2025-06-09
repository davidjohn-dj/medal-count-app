'use client';

import React from 'react';
import { MedalTableProps } from '@/types';
import Flag from '@/components/Flag';

// Country name mapping
const countryNames: Record<string, string> = {
  'USA': 'United States',
  'NOR': 'Norway',
  'RUS': 'Russia',
  'NED': 'Netherlands',
  'FRA': 'France',
  'SWE': 'Sweden',
  'ITA': 'Italy',
  'CAN': 'Canada',
  'SUI': 'Switzerland',
  'BLR': 'Belarus',
  'GER': 'Germany',
  'AUT': 'Austria',
  'CHN': 'China'
};



const MedalTable: React.FC<MedalTableProps> = ({ medals, currentSort, onSortChange }) => {
  return (
    <div className="bg-card rounded-2xl shadow-card overflow-hidden mb-5">
      <table className="w-full border-collapse">
        <thead className="bg-gradient-primary text-primary-foreground">
          <tr>
            <th className="py-4 px-2.5 md:py-4 md:px-2.5 text-left font-semibold text-sm uppercase tracking-wide first:pl-5 last:pr-5 md:first:pl-5 md:last:pr-5 md:text-sm text-xs">
              Rank
            </th>
            <th className="py-4 px-2.5 md:py-4 md:px-2.5 text-left font-semibold text-sm uppercase tracking-wide first:pl-5 last:pr-5 md:first:pl-5 md:last:pr-5 md:text-sm text-xs">
              Country
            </th>
            <th 
              className={`py-4 px-2.5 md:py-4 md:px-2.5 text-center font-semibold text-sm uppercase tracking-wide first:pl-5 last:pr-5 md:first:pl-5 md:last:pr-5 md:text-sm text-xs sortable-header ${currentSort === 'gold' ? 'sortable-header-active' : ''}`}
              onClick={() => onSortChange('gold')}
            >
              🥇 {currentSort === 'gold' && '↓'}
            </th>
            <th 
              className={`py-4 px-2.5 md:py-4 md:px-2.5 text-center font-semibold text-sm uppercase tracking-wide first:pl-5 last:pr-5 md:first:pl-5 md:last:pr-5 md:text-sm text-xs sortable-header ${currentSort === 'silver' ? 'sortable-header-active' : ''}`}
              onClick={() => onSortChange('silver')}
            >
              🥈 {currentSort === 'silver' && '↓'}
            </th>
            <th 
              className={`py-4 px-2.5 md:py-4 md:px-2.5 text-center font-semibold text-sm uppercase tracking-wide first:pl-5 last:pr-5 md:first:pl-5 md:last:pr-5 md:text-sm text-xs sortable-header ${currentSort === 'bronze' ? 'sortable-header-active' : ''}`}
              onClick={() => onSortChange('bronze')}
            >
              🥉 {currentSort === 'bronze' && '↓'}
            </th>
            <th 
              className={`py-4 px-2.5 md:py-4 md:px-2.5 text-center font-semibold text-sm uppercase tracking-wide first:pl-5 last:pr-5 md:first:pl-5 md:last:pr-5 md:text-sm text-xs sortable-header ${currentSort === 'total' ? 'sortable-header-active' : ''}`}
              onClick={() => onSortChange('total')}
            >
              TOTAL {currentSort === 'total' && '↓'}
            </th>
          </tr>
        </thead>
        <tbody>
          {medals.map((country, index: number) => (
            <tr key={country.code} className="medal-table-row last:border-b-0">
              <td className="py-4 px-2.5 md:py-4 md:px-2.5 align-middle first:pl-5 last:pr-5 md:first:pl-5 md:last:pr-5 font-bold text-lg text-muted-foreground w-15 text-center">
                {index + 1}
              </td>
              <td className="py-4 px-2.5 md:py-4 md:px-2.5 align-middle first:pl-5 last:pr-5 md:first:pl-5 md:last:pr-5 flex items-center gap-2.5 font-semibold min-w-[150px]">
                <Flag 
                  countryCode={country.code}
                  countryName={countryNames[country.code]}
                />
                <div>
                  <span className="text-base text-card-foreground">{country.code}</span>
                  <div className="text-xs text-muted-foreground mt-0.5 hidden md:block">
                    {countryNames[country.code] || country.code}
                  </div>
                </div>
              </td>
              <td className="medal-cell text-gold drop-shadow-sm">
                {country.gold}
              </td>
              <td className="medal-cell text-silver drop-shadow-sm">
                {country.silver}
              </td>
              <td className="medal-cell text-bronze drop-shadow-sm">
                {country.bronze}
              </td>
              <td className="medal-cell text-card-foreground bg-muted text-lg font-extrabold">
                {country.total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedalTable; 