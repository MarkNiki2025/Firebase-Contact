import {useState} from 'react';

export default function useDisclouse () {

    const [buttonIsClicked, setbuttonIsClicked] = useState(false);

    function onOpen () {
        setbuttonIsClicked(true);
     }

    function onClose () {
        setbuttonIsClicked(false);
    }
    return {onClose,onOpen,buttonIsClicked}
}