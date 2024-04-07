export class UserDto{
    id: any;
    email: string;
    firstName: string;
    lastName: string;
    followers: any[];
    following: any[];
}

export class PostDto{
    id: any;
    creatorId: any;
    creator: string;
    body: string;
    imageData: {imageId: string, imageUrl: string}[];
    videoData: {videoId: string, videoUrl: string}[];
    likes: number;
    comments: {id: any, name: string, comment: string}[];
}

export class NotificationDto{
    recipient: any;
    message: string;
    postId?: any;
}