import React from 'react';
import { FlagProps } from '@/types';

// Country code enum
enum CountryCode {
  USA = 'USA',
  NOR = 'NOR',
  RUS = 'RUS',
  NED = 'NED',
  FRA = 'FRA',
  SWE = 'SWE',
  ITA = 'ITA',
  CAN = 'CAN',
  SUI = 'SUI',
  BLR = 'BLR',
  GER = 'GER',
  AUT = 'AUT',
  CHN = 'CHN'
}

// Flag sprite class enum
enum FlagClass {
  USA = 'flag-sprite flag-usa',
  NOR = 'flag-sprite flag-nor',
  RUS = 'flag-sprite flag-rus',
  NED = 'flag-sprite flag-ned',
  FRA = 'flag-sprite flag-fra',
  SWE = 'flag-sprite flag-swe',
  ITA = 'flag-sprite flag-ita',
  CAN = 'flag-sprite flag-can',
  SUI = 'flag-sprite flag-sui',
  BLR = 'flag-sprite flag-blr',
  GER = 'flag-sprite flag-ger',
  AUT = 'flag-sprite flag-aut',
  CHN = 'flag-sprite flag-chn'
}

// Flag sprite class mapping using enums
const flagClasses: Record<CountryCode, FlagClass> = {
  [CountryCode.USA]: FlagClass.USA,
  [CountryCode.NOR]: FlagClass.NOR,
  [CountryCode.RUS]: FlagClass.RUS,
  [CountryCode.NED]: FlagClass.NED,
  [CountryCode.FRA]: FlagClass.FRA,
  [CountryCode.SWE]: FlagClass.SWE,
  [CountryCode.ITA]: FlagClass.ITA,
  [CountryCode.CAN]: FlagClass.CAN,
  [CountryCode.SUI]: FlagClass.SUI,
  [CountryCode.BLR]: FlagClass.BLR,
  [CountryCode.GER]: FlagClass.GER,
  [CountryCode.AUT]: FlagClass.AUT,
  [CountryCode.CHN]: FlagClass.CHN
};

// Utility function to get flag class for a country
const getFlagClass = (countryCode: string): string => {
  const upperCode = countryCode.toUpperCase() as CountryCode;
  return flagClasses[upperCode] || 'flag-placeholder';
};

// Utility function to check if country has a flag sprite
const hasFlag = (countryCode: string): boolean => {
  const upperCode = countryCode.toUpperCase() as CountryCode;
  return upperCode in flagClasses;
};

const Flag: React.FC<FlagProps> = ({ 
  countryCode, 
  countryName, 
  className = '' 
}) => {
  const flagClass = getFlagClass(countryCode);
  const displayName = countryName || countryCode;
  
  return (
    <div 
      className={`${flagClass} ${className}`.trim()}
      title={`${displayName} flag`}
      aria-label={`Flag of ${displayName}`}
      role="img"
    >
      {!hasFlag(countryCode) && (
        <span className="text-xs font-bold">{countryCode}</span>
      )}
    </div>
  );
};

export default Flag; 