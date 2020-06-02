export type photosType = { // dialogs-reducer
    small: string | null
    large: string | null
}
export type dialogType = {
    id: number
    userName: string
    hasNewMessages: boolean
    lastDialogActivityDate: string
    lastUserActivityDate: string
    newMessagesCount: number
    photos: photosType
}
export type messageType = {
    id: string
    body: string
    translatedBody: null
    addedAt: string
    senderId: number
    senderName: string
    recipientId: number
    viewed: boolean
}
export type newMessageType = {
    addedAt: string
    body: string
    deletedByRecipient: boolean
    deletedBySender: boolean
    distributionId: null
    id: string
    isSpam: boolean
    recipientId: number
    recipientName: string
    senderId: number
    senderName: string
    translatedBody: null
    viewed: boolean
}
export type contactsType = { // profile-reducer
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
export type profileType = {
    userId: number
    lookingForAJob: boolean | null
    lookingForAJobDescription: string | null
    fullName: string
    contacts: contactsType
    photos: photosType
    aboutMe?: string | null
}
export type postType = {
    id: number
    message: string
    likesCount: number
}
export type userType = { // user-reducer
    followed: boolean
    id: number
    name: string
    photos: photosType
    status: string | null
    uniqueUrlName?: null
}
