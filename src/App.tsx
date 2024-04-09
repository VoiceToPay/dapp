import bg from './assets/bg.png';
import RecordButton from './components/button/RecordButton';
import Header from './components/header/Header';
import VoiceChatContainer from './components/message/VoiceChatContainer';
import { useVoiceChat } from './components/provider/VoiceChatProvider';
import { SizeEnum } from './lib/enum';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { listening, isStart, onRecording } = useVoiceChat();

  return (
    <main
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}
      className="relative mx-auto h-screen w-full"
    >
      <Header />
      {!isStart ? (
        <div className="flex h-[calc(100vh-72px)] items-center justify-center">
          <RecordButton listening={listening} onClick={onRecording} />
        </div>
      ) : (
        <div className="mx-auto h-[calc(100vh-72px)] max-w-[1440px] px-4 py-[40px] md:px-[120px]">
          <VoiceChatContainer />
        </div>
      )}
      {isStart && (
        <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 mix-blend-plus-lighter">
          <RecordButton listening={listening} onClick={onRecording} size={SizeEnum.SMALL} />
        </div>
      )}
    </main>
  );
}

export default App;
