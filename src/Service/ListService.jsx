import Axios from "../Helpers/Axios/Axios";

export function GetList(token) {
    return Axios("lists/GuardShiftDetails/items", "get", null, token)
}
export function GetDocument(token) {
    return Axios("drives", "get", null, token)
}
export function GetItems(driveId, token) {
    return Axios(`drives/${driveId}/root/children`, "get", null, token)
}
export function CreateFolder(driveId, data, token) {
    return Axios(`drives/${driveId}/root/children`, "post", data, token)
}
export function UploadFile(driveId, selectedFolderId, file, token) {
    return Axios(`/drives/${driveId}/items/${selectedFolderId}:/${file.name}:/content`, "put", file, token, true)
}