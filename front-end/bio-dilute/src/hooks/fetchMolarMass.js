
import { useState } from 'react';
import { getMolarMass } from '../services/molarMassAPI';

export function useMolarMass() {
  const [molarMass, setMolarMass] = useState({Ci: null});
  const [loading, setLoading] = useState(false);
  

  const fetchMolarMass = async (field, compoundName) => {
    if (!compoundName) return;
    setLoading(true);
    const mass = await getMolarMass(compoundName);
    if (mass) {
      setMolarMass((prev) => ({ ...prev, [field]: mass }));
    } else {
      alert("Composto não encontrado.");
    }
    setLoading(false);
  };

  return { molarMass, fetchMolarMass, loading };
}
