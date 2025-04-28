// src/ModalExperiment.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const ModalExperimentForm = ({handleForm, setModal, isModalOpen, experimentInfo,isCalculatorPage}) => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id:'',
    experimentName: '',
    ingredient: '',
    date: '',
    weight: '',
    volume: '',
    solvent: '',
    methodDilution: '',
    observations: ''
  });

  useEffect(() => {
    if (experimentInfo) {
      setFormData({
        id: experimentInfo.id || '',
        experimentName: experimentInfo.experimentName || '',
        ingredient: experimentInfo.ingredient || '',
        date: experimentInfo.date || '',
        weight: experimentInfo.weight || '',
        volume: experimentInfo.volume || '',
        solvent: experimentInfo.solvent || '',
        methodDilution: experimentInfo.methodDilution || '',
        observations: experimentInfo.observations || ''
      });
    }
  }, [experimentInfo]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    const endpoint = isCalculatorPage ? "experiments" : "experiments/update";
        try {
          await handleForm(endpoint,formData,token);
          setModal(!isModalOpen)
        } catch (error) {
          console.error("Erro ao criar experimento:", error);
        }
    
  };

  return (
    <div
      className="modal fade show d-block"
      id="createExperimentModal"
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="createExperimentModalLabel">Experiment</h5>
            <button type="button" className="btn-close" onClick={()=> {setModal(!isModalOpen)}} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="experimentName">Experiment Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="experimentName"
                  name="experimentName"
                  value={formData.experimentName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="ingredient">Ingredient Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="ingredient"
                  name="ingredient"
                  value={formData.ingredient}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="weight">Desired Molar</label>
                <input
                  type="number"
                  className="form-control"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="volume">Desired Volume</label>
                <input
                  type="number"
                  className="form-control"
                  id="volume"
                  name="volume"
                  value={formData.volume}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="solvent">Solvent</label>
                <input
                  type="text"
                  className="form-control"
                  id="solvent"
                  name="solvent"
                  value={formData.solvent}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="methodDilution">Dilution Method</label>
                <input
                  type="text"
                  className="form-control"
                  id="methodDilution"
                  name="methodDilution"
                  value={formData.methodDilution}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="observations">Description</label>
                <textarea
                  className="form-control"
                  id="observations"
                  name="observations"
                  rows="3"
                  value={formData.observations}
                  onChange={handleInputChange}
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => {setModal(!isModalOpen)}}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save experiment</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalExperimentForm;
