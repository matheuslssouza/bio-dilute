export function handleInputChange(e, values, setValues, molarMass) {
    e.preventDefault();
    const { name, value } = e.target;
    const updatedValues = {
      ...values,
      [name]: value,
    };
  
    const mol = parseFloat(name === 'molarity' ? value : updatedValues.molarity);
    const vol = parseFloat(name === 'volume' ? value : updatedValues.volume);
    const massa = molarMass.Ci;
  
    if (!isNaN(mol) && !isNaN(vol) && massa) {
      updatedValues.massRequired = Number(mol * vol * massa).toFixed(2);
    } else {
      updatedValues.massRequired = '';
    }
  
    setValues(updatedValues);
  }