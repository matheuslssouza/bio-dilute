
  export function calculateDilution(values, setValues){
    const { Ci, Vi, Cf, Vf } = values;
    const parse = (val) => (val === '' ? null : parseFloat(val));
    const ci = parse(Ci);
    const vi = parse(Vi);
    const cf = parse(Cf);
    const vf = parse(Vf);

    let result = { ...values };

    if (ci !== null && vi !== null && cf !== null && vf === null) {
      result.Vf = Number((ci * vi) / cf).toFixed(2);
    } else if (ci !== null && vi !== null && cf === null && vf !== null) {
      result.Cf = Number((ci * vi) / vf).toFixed(2);
    } else if (ci !== null && vi === null && cf !== null && vf !== null) {
      result.Vi = Number((cf * vf) / ci).toFixed(2);
    } else if (ci === null && vi !== null && cf !== null && vf !== null) {
      result.Ci = Number((cf * vf) / vi).toFixed(2);
    } else {
      alert("Preencha 3 valores para calcular o quarto.");
      return;
    }

    setValues(result);
  };
