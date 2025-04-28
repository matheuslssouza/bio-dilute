import { useState, useEffect } from "react";
import ModalDeleteExperiment from "../../modals/HistoryPage/ModalDeleteExperiment";
import { useAuth } from "../../context/AuthContext";
import getExperiments from "../../services/getExperiments";
import ModalExperimentForm from "../../modals/CalculatorPage/ModalExperimentForm";
import handleApi from "../../services/handleApi";

function TableHistory() {
  const [experiments, setExperiments] = useState([]);
  const {token} = useAuth();
  const [modalDelete, setModalDelete] = useState(false);
  const [rowId, setRowId] = useState();
  const [modalEdit, setModalEdit] = useState(false);
  const [experimentInfo, setExperimentInfo] = useState([])

  const fetchExperiments = async () => {
    try {
      const dataExperiments = await getExperiments(token);
      setExperiments(dataExperiments.data);
    } catch (error) {
      alert("Search experiment error!")
    }
  }

  useEffect(() => {
    fetchExperiments();
  }, []);

  useEffect(()=> {
    if(!modalDelete){
      fetchExperiments();
    }
  },[modalDelete])


  return (
    <div className="d-flex justify-content-center p-5">
      <div className="card shadow-lg border-0 rounded-4 w-100">
        <div className="table-responsive rounded-4">
          <table className="table table-hover table-striped align-middle mb-0 text-center">
            <thead className="table-primary">
              <tr>
                <th>Experiment Name</th>
                <th>Ingredient</th>
                <th>Date</th>
                <th>Desired Molar (mol/L)</th>
                <th>Desired Volume (L)</th>
                <th>Solvent</th>
                <th>Dilution Method</th>
                <th style={{ width: "25%" }}>Observations</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {experiments.map((data) => (
                <tr key={data.id}>
                  <td>{data.experimentName}</td>
                  <td>{data.ingredient}</td>
                  <td>{data.date}</td>
                  <td>{data.weight}</td>
                  <td>{data.volume}</td>
                  <td>{data.solvent}</td>
                  <td>{data.methodDilution}</td>
                  <td style={{ whiteSpace: "pre-wrap" }}>{data.observations}</td>
                  <td className="text-center">
                  <img
                      src="../../../public/file-edit.svg"
                      alt="Edit"
                      style={{ cursor: 'pointer', width: '20px', height: '20px' }}
                      onClick={() => {setModalEdit(!modalEdit)
                      setExperimentInfo(data)}}
                      
                    />
                  </td>
                  <td className="text-center">
                  <img
                      src="../../../public/trash.svg"
                      alt="Delete"
                      style={{ cursor: 'pointer', width: '20px', height: '20px' }}
                      onClick={() => {setModalDelete(!modalDelete)
                      setRowId(data.id)}}
                    />
                  </td>
                </tr>
              ))}
              {experiments.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center text-muted py-4">
                    No experiments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {modalDelete && (
                  <ModalDeleteExperiment 
                  setModalDelete={setModalDelete} 
                  modalDelete={modalDelete}
                  setRowId={setRowId}
                  rowId={rowId}
                  />
              )}
          {modalEdit && (
            <ModalExperimentForm
            handleForm={handleApi}
            setModal={setModalEdit}
            isModalOpen={modalEdit}
            experimentInfo={experimentInfo}
            isCalculatorPage={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TableHistory;
