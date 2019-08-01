import React from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
var clientNames = ["All", "Allianz", "Bestbuy", "BritishGas", "Cap1Enterprise"];


export default function ClientSelector() {
  return (
    <Select
      closeMenuOnSelect={false}
      components={makeAnimated()}
      isMulti
      options={clientNames}
    />
  );
}