import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImageSection from "./ImageSection";

export type HotelForm={
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    adultCount: number;
    childCount: number;
  
}

type Props = {
    onSave: (hotelFormData: FormData) => void,
    isLoading: boolean
}
function ManageHotelForm({onSave, isLoading}:Props) {
    const formMethods=useForm<HotelForm>();
    const {handleSubmit}=formMethods
    const onSubmit=handleSubmit((data: HotelForm)=>{
        const formData= new FormData();
        formData.append("name",data.name);
        formData.append("city",data.city);
        formData.append("country",data.country);
        formData.append("description",data.description);
        formData.append("type", data.type);
        formData.append("pricePerNight", data.pricePerNight.toString());
        formData.append("starRating", data.starRating.toString());
        formData.append("adultCount",data.adultCount.toString());
        formData.append("childCount",data.childCount.toString());
        data.facilities.forEach((facility, index)=>{
            formData.append(`facilities[${index}]`,facility)
        })
        Array.from(data.imageFiles).forEach((image)=>{
            formData.append("imageFiles",image);
        })
        onSave(formData)

    })
  return (
    <FormProvider {...formMethods}>
        <form className="flex flex-col gap-10" onSubmit={onSubmit}>
            <DetailsSection />
            <TypeSection />
            <FacilitiesSection />
            <GuestSection />
            <ImageSection />
            <span className="flex justify-end">
                <button 
                disabled={isLoading}
                type="submit" 
                className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-50">
                    { isLoading ? "Saving..." : "Save"}
                </button>
            </span>
        </form> 
    </FormProvider>
  )
}

export default ManageHotelForm