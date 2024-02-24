import { useMutation } from "react-query"
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm"
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from '../api-client';

function AddHotel() {
    const { showToast }= useAppContext()
    const { mutate, isLoading }=useMutation(apiClient.addMyHotel, {
        onSuccess: ()=>{
            showToast({
                message:"Hotel Saved",
                type:"Success"
            });
        },
        onError:()=>{
            showToast({
                message:"Erro Saving Hotel",
                type:"Error"
            });
        }
    });
    const hotelSave=(hotelFormData: FormData)=>{
        mutate(hotelFormData)
    }
  return (
    <ManageHotelForm onSave={hotelSave} isLoading={isLoading}/>
  )
}

export default AddHotel