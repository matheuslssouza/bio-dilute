import { useAuth } from "../../context/AuthContext"
import handleApi from "../../services/handleApi";


function ModalDeleteExperiment({setModalDelete, modalDelete, setRowId, rowId}){
    const {token} = useAuth();

    const handleDelete = async () => {
        try {
            const responseDeleteExperiment = await handleApi("experiments/delete",{id:rowId},token)
        } catch (error) {
            alert("Delete Row Error!")
        }
        setModalDelete(!modalDelete)
    }

    return(
        <div className="modal fade  show d-block" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Warning!!!!!</h1>
                        <button type="button" className="btn-close" onClick={()=>{setModalDelete(!modalDelete)}} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    Do you have sure? You will delete your experiment!
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={()=>{setModalDelete(!modalDelete)}}>No, close!</button>
                        <button type="button" className="btn btn-danger" onClick={handleDelete}>Yes!</button>
                    </div>
                    </div>
                </div>
                </div>
    )
}

export default ModalDeleteExperiment