import { registerFormData } from "./pages/Register";
import { SignInFormType } from "./pages/SignIn";
const API_BASE_URL=import.meta.env.VITE_API_BASE_URL || '';

export const register= async (formData: registerFormData) => {
    const response=await fetch(`${API_BASE_URL}/api/users/register`,{
        method: "POST",
        credentials:"include",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(formData),
    });

    const responseBody= await response.json();

    if(!response.ok){
        throw new Error(responseBody.message);
    }
}

export const signIn= async (formData: SignInFormType)=>{
    const response= await fetch(`${API_BASE_URL}/api/auth/login`,{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(formData)
    });
    const body= await response.json();

    if(!response.ok){
        throw new Error(body.message)
    }

    return body;
}

export const validateToken= async ()=>{
    const response= await fetch(`${API_BASE_URL}/api/auth/validate-token`,{
        credentials:"include"
    })

    if(!response.ok){
        throw new Error("Token Invalid")
    }

    return response.json()
}

export const signOut= async()=>{
    const response= await fetch(`${API_BASE_URL}/api/auth/logout`,{
        method:"POST",
        credentials:"include"
    })

    if(!response.ok){
        throw new Error('error during logout')
    }
}

export const addMyHotel=async(hotelFormData: FormData)=>{
    const response= await fetch(`${API_BASE_URL}/api/my-hotels`,{
        method:"POST",
        credentials:"include",
        body: hotelFormData,
    })
    if(!response.ok){
        throw new Error("faild to add hotel");
    }
     
    return response.json();
}