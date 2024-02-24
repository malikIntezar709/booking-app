import { useFormContext } from "react-hook-form"
import { HotelForm } from "./ManageHotelForm"

function GuestSection() {
    const { register, formState: {errors} }= useFormContext<HotelForm>()
  return (
    <div>
        <h2 className="text-2xl font-bold mb-3">Guest</h2>
        <div className="grid grid-cols-2 p-6 gap-5 bg-gray-300">
            <label className="text-gray-700 text-sm font-semibold">
                Adults
                <input 
                className="border rounded w-full py-2 px-3 font-normal"
                type="number"
                min={1}
                {...register("adultCount",{
                    required:"Adult is required"
                })}
                />
                {
                    errors.adultCount && (
                        <span className="text-sm text-red-50 font-bold">
                            {errors.adultCount.message}
                        </span>
                    )
                }
            </label>
            <label className="text-gray-700 text-sm font-semibold">
                Children
                <input 
                className="border rounded w-full py-2 px-3 font-normal"
                type="number"
                min={0}
                {...register("childCount",{
                    required:"Children is required"
                })}
                />
                {
                    errors.childCount && (
                        <span className="text-sm text-red-50 font-bold">
                            {errors.childCount.message}
                        </span>
                    )
                }
            </label>
            
        </div>
    </div>
  )
}

export default GuestSection