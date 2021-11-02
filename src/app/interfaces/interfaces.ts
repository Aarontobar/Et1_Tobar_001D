export interface RespuestaToHeadLines {
    count: string;
    next: string;
    previus: string;
    results: result[];
}

export interface result{
    id: string;
    name: string;
    background_image: string;
    rating: string;
}