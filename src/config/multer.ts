import multer from "multer"

export const upload= multer({
    storage:multer.diskStorage({}),
    fileFilter: (req,file,cb)=>{
        const types=["image/jpeg", "image/png", "video/mp4", "video/mpeg", "video/webm"]
    if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
        cb(null, true);
    }else{
        return cb(null, false);
    } 
    }
})