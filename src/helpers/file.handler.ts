import { cloudinary } from "../config/cloudinary";

//To upload files to cloudinary
export const fileUpload = async(filePath: string, folder: string, resource_type: any) => {
    return cloudinary.uploader.upload(filePath, {folder, resource_type:resource_type},(err: any, result: any) => {
      if (err) {
        console.error(err);
        return
      } else {
        // console.log(result);
        return result
      }
    });
  };

  //To delete files from cloudinary
export const deleteUpload= async (id: string)=>{
    try{
      //delete using img_id
    const result = await cloudinary.uploader.destroy(id)
    console.log(result)
    }catch(error){
      console.log(error)
    }
  }
