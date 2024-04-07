import Notification from "../models/notifications.model";

export class NotificationService{
    static async createNotification(recipient: any, message: string, postId?: any){
        const newNotification= await new Notification({
            recipient,
            message,
            postId
        }).save()

        return newNotification
    }

    static async getUserNotifications(id: any){
        const userNotifications= await Notification.find({recipient:id}).sort({ createdAt: -1})
        return userNotifications
    }
}