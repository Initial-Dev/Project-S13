export type dataToSend = {
    video: File | null,
    thumbnail: File | null,
    title: string,
    description: string,
    visibility: boolean,
    tags: number[],
    allowComments: boolean,
    idUser: number
}

export default dataToSend;