import {useState} from 'react';

export default function useDisclouse () {

    const [buttonIsClicked, setbuttonIsClicked] = useState(false);

    function onOpen ():void {
        setbuttonIsClicked(true);
     }

    function onClose ():void {
        setbuttonIsClicked(false);
    }
    return {onClose,onOpen,buttonIsClicked}
}