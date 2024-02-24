import express, { Request, Response } from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import Hotel, { hotelType } from '../models/hotel';
import verifyToken from '../middleware/auth';
import { body } from 'express-validator';

const storage= multer.memoryStorage();
const upload=multer({
    storage,
    limits:{
        fileSize: 5 * 1024 * 1024 //5mb
    }

})
const router= express.Router();
router.post(
    '/',
    verifyToken,
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("city").notEmpty().withMessage("City is required"),
        body("country").notEmpty().withMessage("Country is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("type").notEmpty().withMessage("Type is required"),
        body("pricePerNight").notEmpty().isNumeric().withMessage("price per night is required and must be number"),
        body("facilities").notEmpty().isArray().withMessage("facilities is required"),
    ],
    upload.array("imageFiles",6),
    async (req: Request, res: Response)=>{
        try {
            const imageFiles= req.files as Express.Multer.File[];
            const newHotel: hotelType= req.body;

            const uploadPromises= imageFiles.map(async(image)=>{
                const b64= Buffer.from(image.buffer).toString("base64");
                let dataURI=`data:${image.mimetype};base64,${b64}`;
                const res= await cloudinary.v2.uploader.upload(dataURI);
                return res.url;
            })
            const imageUrls= await Promise.all(uploadPromises);
            newHotel.imageUrls=imageUrls;
            newHotel.lastUpdated= new Date();
            newHotel.userId= req.userId;

            const hotel= new Hotel(newHotel);
            hotel.save()

            res.status(201).send(hotel);
        } catch (error) {
            console.log("error while creating hotel",error);
            res.status(500).json({message:"Something went wrong"});
            
        }
    }
)

export default router
