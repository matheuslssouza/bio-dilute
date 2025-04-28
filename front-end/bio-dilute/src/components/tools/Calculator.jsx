import React, { useState } from 'react';
import { handleInputChange } from '../../utils/handleInputChange';
import { useMolarMass } from '../../hooks/fetchMolarMass';
import { getMolarMass } from '../../services/molarMassAPI';
import { calculateDilution } from '../../utils/calculateDilution';
import ModalExperimentForm from '../../modals/CalculatorPage/ModalExperimentForm';
import handleApi from '../../services/handleApi';

export default function Calculator() {
  const [modalAddExperiment, setModalAddExperiment] = useState(false)
  const [compoundNames, setCompoundNames] = useState({ Ci: '' });
  const [values, setValues] = useState({
    Ci: '',
    Vi: '',
    Vf: '',
    Cf: '',
    molarity: '',
    volume: '',
    massRequired: '',
  });

  const { molarMass, fetchMolarMass, loading } = useMolarMass();

  const handleCompoundNameChange = (e) => {
    const { name, value } = e.target;
    setCompoundNames((prevNames) => ({
      ...prevNames,
      [name]: value,
    }));
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="w-100 p-4 p-md-5 rounded-4 shadow-lg" style={{ maxWidth: '1200px', backgroundColor: '#fdfdfd' }}>
        <h2 className="text-center mb-4 fw-bold text-primary">Dilution Calculator</h2>

  
        <div className="mb-4">
          <label className="form-label text-center d-block fw-semibold mb-2">Compound (Ci / Cf):</label>
          <input
            type="text"
            className="form-control text-center mb-3"
            name="Ci"
            value={compoundNames.Ci}
            placeholder="Compound Name (ex: NaCl)"
            onChange={handleCompoundNameChange}
          />
          <div className="d-flex justify-content-center align-items-center gap-3">
            <button className="btn btn-primary" onClick={() => fetchMolarMass('Ci', compoundNames.Ci)}>
              Search molar mass
            </button>
            {molarMass.Ci && (
              <span className="text-secondary">
                Molar Mass: <strong>{Number(molarMass.Ci).toFixed(3)} g/mol</strong>
              </span>
            )}
          </div>
        </div>

    
        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <label className="form-label fw-medium">Molar Desired (mol/L):</label>
            <input
              type="number"
              className="form-control"
              name="molarity"
              value={values.molarity}
              onChange={(e) => handleInputChange(e, values, setValues, molarMass)}
              placeholder="mol/L"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-medium">Volume (L):</label>
            <input
              type="number"
              className="form-control"
              name="volume"
              value={values.volume}
              onChange={(e) => handleInputChange(e, values, setValues, molarMass)}
              placeholder="Liters"
            />
          </div>
        </div>

        <div className="mb-5">
          <h5 className="fw-bold text-secondary">Result:</h5>
          <p className="text-muted mb-0">
            {values.massRequired ? (
              <>Required solution mass: <strong className="text-danger">{values.massRequired} g</strong></>
            ) : (
              <>Enter the molar mass, molarity and volume.</>
            )}
          </p>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <label className="form-label fw-medium">Concentration Ci [mol/L]:</label>
            <input
              type="number"
              className="form-control"
              name="Ci"
              value={values.Ci}
              onChange={(e) => handleInputChange(e, values, setValues, molarMass)}
              placeholder="mol/L"
            />
            <label className="form-label fw-medium mt-3">Volume Vi (L):</label>
            <input
              type="number"
              className="form-control"
              name="Vi"
              value={values.Vi}
              onChange={(e) => handleInputChange(e, values, setValues, molarMass)}
              placeholder="Liters"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-medium">Concentration Cf [mol/L]:</label>
            <input
              type="number"
              className="form-control"
              name="Cf"
              value={values.Cf}
              onChange={(e) => handleInputChange(e, values, setValues, molarMass)}
              placeholder="mol/L"
            />
            <label className="form-label fw-medium mt-3">Final Volume Vf (L):</label>
            <input
              type="number"
              className="form-control"
              name="Vf"
              value={values.Vf}
              onChange={(e) => handleInputChange(e, values, setValues, molarMass)}
              placeholder="Liters"
            />
          </div>
        </div>

        {/* Botões */}
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <button className="btn btn-primary px-4" onClick={(e) => calculateDilution(values, setValues)}>
            Calculate
          </button>
          <button
            type="button"
            className="btn btn-secondary px-4"
            onClick={() => {setModalAddExperiment(!modalAddExperiment)}}
          >
            Save to history
          </button>
        </div>

        {modalAddExperiment && (
          <ModalExperimentForm
          handleForm={handleApi}
          isModalOpen={modalAddExperiment}
          setModal={setModalAddExperiment}
          experimentInfo={null}
          isCalculatorPage={true}
          />
        )}
      </div>
    </div>
  );
}
