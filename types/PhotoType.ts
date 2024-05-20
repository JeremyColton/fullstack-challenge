type PhotoType = {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
    parentOnClickHandler: (url: string, title: string) => void,
};

export default PhotoType


