import axios from 'axios';

const API_URL = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name";

export const getMolarMass = async (compoundName) => {
  try {
    const url = `${API_URL}/${encodeURIComponent(compoundName)}/property/MolecularWeight/JSON`;
    const response = await axios.get(url);
    const weight = response.data?.PropertyTable?.Properties?.[0]?.MolecularWeight;
    return weight || null;
  } catch (error) {
    console.error("Erro ao buscar massa molar:", error);
    return null;
  }
};
