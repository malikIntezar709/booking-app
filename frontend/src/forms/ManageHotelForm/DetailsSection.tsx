import { useFormContext } from "react-hook-form"
import { HotelForm } from "./ManageHotelForm";

function DetailsSection() {
    const { register, formState:{errors} }= useFormContext<HotelForm>();
  return (
    <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
        <label className="text-gray-700 font-bold text-sm">
            Name
            <input 
            type='text'
            className="border rounded w-full py-1 px-2 font-normal"
            {...register('name',{required:'Hotel Name is required'})}
            />
            {
                errors.name && (
                <p className='text-red-500'>{errors.name.message}</p>
                )
            }
        </label> 
        <div className="flex gap-4">
            <label className="text-gray-700 font-bold text-sm">
                City
                <input 
                type='text'
                className="border rounded w-full py-1 px-2 font-normal"
                {...register('city',{required:'City is required'})}
                />
                {
                    errors.city && (
                    <p className='text-red-500'>{errors.city.message}</p>
                    )
                }
            </label> 
            <label className="text-gray-700 font-bold text-sm">
                Country
                <input 
                type='text'
                className="border rounded w-full py-1 px-2 font-normal"
                {...register('country',{required:'Country is required'})}
                />
                {
                    errors.country && (
                    <p className='text-red-500'>{errors.country.message}</p>
                    )
                }
            </label> 
        </div>
        <label className="text-gray-700 font-bold text-sm">
            Description
            <textarea 
            rows={10}
            className="border rounded w-full py-1 px-2 font-normal"
            {...register('description',{required:'description is required'})}
            ></textarea>
            {
                errors.description && (
                <p className='text-red-500'>{errors.description.message}</p>
                )
            }
        </label> 
        <label className="text-gray-700 font-bold text-sm">
            Price Per Night
            <input 
            type='number'
            min={1}
            className="border rounded w-full py-1 px-2 font-normal"
            {...register('pricePerNight',{required:'Price is required'})}
            />
            {
                errors.pricePerNight && (
                <p className='text-red-500'>{errors.pricePerNight.message}</p>
                )
            }
        </label> 
        <label className="text-gray-700 font-bold text-sm">
            Star Rating
            <select
            {...register("starRating",{
                required:'Star Rating is required'
            })}
            className="border rounded w-full p-2 text-gray-700 font-normal"
            >
                <option value="" className="text-sm font-bold">
                    Select as Rating
                </option>
                {
                    [1,2,3,4,5].map((num)=>(
                        <option value={num}>{num}</option>
                    ))
                }
            </select>
            {
                errors.starRating && (
                <p className='text-red-500'>{errors.starRating.message}</p>
                )
            }
        </label> 

    </div>
  )
}

export default DetailsSection