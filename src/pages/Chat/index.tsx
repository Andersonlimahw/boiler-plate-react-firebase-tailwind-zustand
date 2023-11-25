import { ArrowLineLeft } from '@phosphor-icons/react';

import { useFirebaseChat } from './hooks/use-firebase-chat';
import { useChat } from '../../store/hooks/use-chat-store';
import { Footer } from '../../commons/components/Footer';

export const Chat = () => {
  const fireBaseStore = useFirebaseChat();

  const {
    selectedContact,
    handleResetSelectedContact, 
  } = fireBaseStore;

  const chatStore = useChat();
  const { theme } = chatStore;


  const hasSelectedContact = selectedContact && selectedContact.id !== '';

  const containerClasses = {
    'mobile': 'min-[0px]:block',
    'default': 'min-[690px]:flex flex'
  };

  const messagesContainerClasses = {
    'mobile': !hasSelectedContact ? 'none' : 'min-[0px]:w-full',
    'default': 'max=[600px]:flex-1 w-full'
  };

  const isMobile = () => {
    return window.screen.width <= 690;
  }

  const screnType = isMobile() ? 'mobile' : 'default';

  return (
    <>
     
      <div className={`w-full h-40 bg-gradient-to-r ${theme.styles.gradient}`} >
        <ArrowLineLeft onClick={handleResetSelectedContact} size={48} className={`mx-2 py-2 cursor-pointer ${hasSelectedContact ? 'block' : 'hidden'}`} />
      </div>

      <div className="container mx-auto mt-[-128px] rounded-sm">
        <div className="py-6 h-screen">
          <div className={`flex shadow-lg rounded h-full ${containerClasses[screnType]}`}>
            {/* Left */}
            {
              !hasSelectedContact && (
                <>
                  <h1>
                    Happy customs!
                  </h1>
                  <Footer />
                </>
              )
            }

            {/* Right */}
            <div className={`animate-[wiggle_1s_ease-in-out_infinite] shadow-sm flex flex-col ${messagesContainerClasses[screnType]}`}>
              <h1>
                Lets code!
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
