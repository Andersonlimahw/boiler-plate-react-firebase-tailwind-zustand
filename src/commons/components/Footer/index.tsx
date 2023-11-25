import { signOut } from "firebase/auth";
import { Power } from '@phosphor-icons/react';
import { auth } from "../../../services";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { toast } from "react-toastify";


export const Footer = () => {
    const handleLogout = async () => {
        try {
            await signOut(auth).then(() => {
                toast('Goodbye!', { type: 'info' });
            });
            
        } catch (error) {
            console.log(error);
            toast('Sorry! try again', { type: 'error' });
        }
    };

    return (
        <div className="w-1/3 absolute bottom-10 flex flex-col">
            <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                <span className="cursor-pointer hover:scale-110 flex">
                    <Power data-testid='button_power' color="#ef4444" size={32} onClick={handleLogout} className="mr-5" /> 
                    <ThemeSwitcher data-testid='button_theme_switcher' />                
                </span>
            </div>
        </div>
    )
}