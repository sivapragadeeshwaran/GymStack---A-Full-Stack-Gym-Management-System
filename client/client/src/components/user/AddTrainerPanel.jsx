import PlanDetail from "./PlanDetail"
import AddTrainerToUser from "./AddTrainerToUser"
export default function AddTrainerPanel(){
    return(<div>
        <div>
            <PlanDetail />
        </div>
        <div className="md:-mt-8" >
            <AddTrainerToUser />
        </div>
    </div>)
}