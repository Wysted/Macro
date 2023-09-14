import ContainerSetup from "./components/ContainerSetup";
import Buttons from "./components/Buttons";
const App = () => {
    return (
        <div
            className="min-h-screen w-full flex items-center flex-col py-4 bg-slate-800
        "
        >
            <Buttons />
            <ContainerSetup />
        </div>
    );
};

export default App;
