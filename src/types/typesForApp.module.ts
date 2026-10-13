export interface ICreatedUser {
    email?: string,
    name?:string,

}

export interface IUser extends ICreatedUser{
    id: string,
}

export interface PropsForModal {
    onClose: () => void,
    closeEdit: () => void,
    getContact: () => void,
    isUpdate: boolean,
    contacts: IUser[],
    contactForEdit:IUser | null,
}

export interface PropsNavBar {
    setbuttonIsClicked: (arg0:boolean) => void;
    filterContacts:(e:React.ChangeEvent<HTMLInputElement>) => void;
}

export interface PropsPersonCard {
    contact:IUser,
    onDelete: (arg:string) => void,
    setIsUpdate: (arg:boolean) => void,
    setIsContactForEdit: (arg0:IUser | null) => void, 
}

export interface PropsForSearchBar extends PropsNavBar{}